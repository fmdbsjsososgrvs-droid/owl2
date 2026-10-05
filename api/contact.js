// OWL BUTLER · 연락하기 (Vercel 서버리스 함수)
// 방문자 메시지를 받아 디스코드 웹후크로 전달한다.
// 웹후크 주소는 환경변수에만 있고, 프런트엔드로는 절대 나가지 않는다.
//
// 필요한 환경변수 (Vercel > Project > Settings > Environment Variables, 또는 `vercel env add`)
//   DISCORD_WEBHOOK_URL        디스코드 채널 웹후크 주소 (비밀)
//   CONTACT_IP_SALT            IP를 해시할 때 섞는 임의 문자열 (비밀, 길고 무작위로)
//   CONTACT_DAILY_LIMIT        (선택) IP당 하루 최대 전송 수, 기본 3
//   CONTACT_HOURLY_CAP         (선택) IP와 상관없이 서버 한 대가 1시간에 보내는 최대 수, 기본 20
//
// 횟수 기록은 기본적으로 서버 메모리에 한다. 서버가 재시작되거나 여러 대로 나뉘면 초기화되므로
// 정확한 제한은 아니지만, 시간당 전체 상한과 허니팟이 대량 스팸을 막는다.
// 아래 두 값을 넣으면 Supabase(supabase/contact.sql)에 기록해 IP당 하루 제한을 정확히 지킨다.
//   SUPABASE_URL               (선택) Supabase 프로젝트 주소
//   SUPABASE_SERVICE_ROLE_KEY  (선택) Supabase secret / service_role 키 (비밀)

const crypto = require("crypto");

const LIMITS = { name: 40, contact: 200, message: 2000, minMessage: 5 };
const MAX_BODY_BYTES = 8 * 1024;
const ALLOWED_ORIGINS = [
  "https://owl2-three.vercel.app",
  "http://localhost:3000",
];

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function clientIp(req) {
  const h = req.headers;
  const fwd = h["x-vercel-forwarded-for"] || h["x-forwarded-for"] || h["x-real-ip"] || "";
  return String(fwd).split(",")[0].trim() || (req.socket && req.socket.remoteAddress) || "unknown";
}

// 보이지 않는 제어문자 제거, 줄바꿈은 유지
function clean(s) {
  return String(s == null ? "" : s)
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮⁠-⁤﻿]/g, "")
    .trim();
}

// allowed_mentions로 알림은 이미 막지만, 채널에서 보기에도 멘션처럼 안 보이게 @ 뒤에 폭 0 공백을 넣는다
function defuse(s) {
  return s.replace(/@/g, "@​").replace(/<(@[!&]?|#)(\d+)>/g, "<$1​$2>");
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("too_large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

// ---- 서버 메모리 기록 (서버 한 대 안에서만 유지됨) ----
const memDaily = new Map(); // "날짜|IP해시" -> 횟수
const memHourly = [];       // 최근 1시간 전송 시각들

function seoulDay() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function hitMemoryDaily(ipHash, limit) {
  const day = seoulDay();
  for (const k of memDaily.keys()) if (!k.startsWith(day + "|")) memDaily.delete(k);
  const key = day + "|" + ipHash;
  const n = (memDaily.get(key) || 0) + 1;
  memDaily.set(key, n);
  return n <= limit;
}

function underHourlyCap(cap) {
  const cutoff = Date.now() - 3600 * 1000;
  while (memHourly.length && memHourly[0] < cutoff) memHourly.shift();
  return memHourly.length < cap;
}

// Supabase RPC로 (IP 해시, 날짜) 카운트를 원자적으로 올리고 허용 여부를 받는다
async function hitSupabaseDaily(ipHash, limit) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // 새 형식 비밀키(sb_secret_…)는 apikey 헤더로만, 예전 service_role JWT는 Bearer로도 보낸다
  const headers = { apikey: key, "Content-Type": "application/json" };
  if (!key.startsWith("sb_")) headers.Authorization = "Bearer " + key;
  const r = await fetch(url.replace(/\/$/, "") + "/rest/v1/rpc/contact_rate_hit", {
    method: "POST",
    headers,
    body: JSON.stringify({ p_key: ipHash, p_limit: limit }),
  });
  if (!r.ok) throw new Error("rate_store_" + r.status);
  return (await r.json()) === true;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "POST만 허용됩니다." });
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return send(res, 403, { ok: false, error: "허용되지 않은 출처입니다." });
  }

  const env = process.env;
  if (!env.DISCORD_WEBHOOK_URL || !env.CONTACT_IP_SALT) {
    console.error("contact: 환경변수가 설정되지 않았습니다.");
    return send(res, 503, { ok: false, error: "아직 연락하기 기능이 준비되지 않았습니다." });
  }

  let data;
  try {
    data = await readJson(req);
  } catch (e) {
    return send(res, e.message === "too_large" ? 413 : 400, { ok: false, error: "잘못된 요청입니다." });
  }

  // 허니팟: 사람에겐 안 보이는 칸. 채워져 있으면 봇이니 성공한 척하고 버린다.
  if (clean(data.website)) return send(res, 200, { ok: true });

  const name = clean(data.name);
  const contact = clean(data.contact);
  const message = clean(data.message);

  if (message.length < LIMITS.minMessage) {
    return send(res, 400, { ok: false, error: `메시지를 ${LIMITS.minMessage}자 이상 적어주세요.` });
  }
  if (message.length > LIMITS.message || name.length > LIMITS.name || contact.length > LIMITS.contact) {
    return send(res, 400, { ok: false, error: "글자 수 제한을 넘었습니다." });
  }

  const cap = Math.max(1, parseInt(env.CONTACT_HOURLY_CAP, 10) || 20);
  if (!underHourlyCap(cap)) {
    return send(res, 429, { ok: false, error: "지금은 메시지가 많이 몰려 있어요. 잠시 후 다시 시도해주세요." });
  }

  const limit = Math.max(1, parseInt(env.CONTACT_DAILY_LIMIT, 10) || 3);
  const ipHash = crypto.createHmac("sha256", env.CONTACT_IP_SALT).update(clientIp(req)).digest("hex");
  let allowed;
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      allowed = await hitSupabaseDaily(ipHash, limit);
    } catch (e) {
      console.error("contact: Supabase 기록 실패, 메모리로 대신함", e.message);
      allowed = hitMemoryDaily(ipHash, limit);
    }
  } else {
    allowed = hitMemoryDaily(ipHash, limit);
  }
  if (!allowed) {
    return send(res, 429, { ok: false, error: `하루에 ${limit}통까지만 보낼 수 있습니다. 내일 다시 시도해주세요.` });
  }
  memHourly.push(Date.now());

  const fields = [{ name: "보낸 사람", value: defuse(name) || "(익명)", inline: true }];
  fields.push({ name: "답장 연락처", value: defuse(contact) || "(없음)", inline: true });

  const payload = {
    username: "OWL BUTLER 연락하기",
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: "새 메시지",
        description: defuse(message),
        color: 0xe07b0a,
        fields,
        footer: { text: "IP " + ipHash.slice(0, 8) },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const sep = env.DISCORD_WEBHOOK_URL.includes("?") ? "&" : "?";
    const r = await fetch(env.DISCORD_WEBHOOK_URL + sep + "wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error("discord_" + r.status);
  } catch (e) {
    console.error("contact: 디스코드 전송 실패", e.message);
    return send(res, 502, { ok: false, error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." });
  }

  return send(res, 200, { ok: true });
};
