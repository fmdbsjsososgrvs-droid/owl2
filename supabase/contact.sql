-- ============================================================
-- OWL BUTLER · 연락하기 하루 전송 횟수 제한 (선택 사항)
-- 이걸 실행하고 Vercel에 SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY를 넣으면
-- 서버 메모리 대신 여기에 기록해 IP당 하루 제한을 정확히 지킵니다.
-- Supabase SQL Editor에 이 파일 전체를 붙여넣고 Run 하면 됩니다.
-- IP 원문은 저장하지 않고, 서버에서 비밀 salt로 만든 해시만 저장합니다.
-- 이 테이블/함수는 서버(service_role)만 쓰고, 공개 anon 키로는 접근할 수 없습니다.
-- ============================================================

create table if not exists contact_rate (
  ip_hash text not null,
  day date not null default (now() at time zone 'Asia/Seoul')::date,
  count int not null default 0,
  primary key (ip_hash, day)
);

-- RLS를 켜고 정책을 하나도 만들지 않음 = anon/authenticated는 읽기·쓰기 모두 불가
alter table contact_rate enable row level security;
revoke all on contact_rate from anon, authenticated;

-- 카운트를 1 올리고, 한도 안이면 true / 넘으면 false
create or replace function contact_rate_hit(p_key text, p_limit int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := (now() at time zone 'Asia/Seoul')::date;
  n int;
begin
  insert into contact_rate (ip_hash, day, count) values (p_key, today, 1)
  on conflict (ip_hash, day) do update set count = contact_rate.count + 1
  returning count into n;

  -- 오래된 기록 정리 (7일 지난 것)
  delete from contact_rate where day < today - 7;

  return n <= p_limit;
end;
$$;

revoke execute on function contact_rate_hit(text, int) from public, anon, authenticated;
grant execute on function contact_rate_hit(text, int) to service_role;
