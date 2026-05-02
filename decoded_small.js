// =====================================================================
// BITCOIN FULL NODE NETWORK GLOBE
// =====================================================================

const app = document.getElementById('app');
const boot = document.getElementById('boot');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0.3, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
app.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.9));

const world = new THREE.Group();
scene.add(world);
world.rotation.z = 0.12;

// ---------- Globe sphere (dark blue-black ocean) ----------
const GLOBE_R = 3.0;
const globeGeo = new THREE.SphereGeometry(GLOBE_R, 64, 64);
const globeMat = new THREE.MeshBasicMaterial({ color: 0x0d1218 });
const globeMesh = new THREE.Mesh(globeGeo, globeMat);
world.add(globeMesh);

// Very faint equator + prime meridian only
const guideMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.05 });
for (const axis of [[0,1,0], [1,0,0], [0,0,1]]) {
  const g = new THREE.BufferGeometry();
  const pts = [];
  for (let j = 0; j <= 128; j++) {
    const t = (j / 128) * Math.PI * 2;
    const x = Math.cos(t), y = Math.sin(t);
    if (axis[1]) pts.push(new THREE.Vector3(x, 0, y).multiplyScalar(GLOBE_R * 1.001));
    else if (axis[0]) pts.push(new THREE.Vector3(0, x, y).multiplyScalar(GLOBE_R * 1.001));
    else pts.push(new THREE.Vector3(x, y, 0).multiplyScalar(GLOBE_R * 1.001));
  }
  g.setFromPoints(pts);
  world.add(new THREE.Line(g, guideMat));
}

// ---------- Continent dots ----------
function isLand(lat, lon) {
  const blobs = [
    { lat: 50, lon: 80, rlat: 22, rlon: 70, w: 1.0 },
    { lat: 50, lon: 10, rlat: 14, rlon: 22, w: 1.0 },
    { lat: 22, lon: 78, rlat: 12, rlon: 12, w: 1.0 },
    { lat: 10, lon: 105, rlat: 14, rlon: 18, w: 0.9 },
    { lat: 30, lon: 45, rlat: 12, rlon: 18, w: 0.9 },
    { lat: 35, lon: 115, rlat: 16, rlon: 16, w: 1.0 },
    { lat: 65, lon: 100, rlat: 14, rlon: 60, w: 1.0 },
    { lat: 15, lon: 15, rlat: 20, rlon: 22, w: 1.0 },
    { lat: -15, lon: 25, rlat: 18, rlon: 18, w: 1.0 },
    { lat: 42, lon: -80, rlat: 16, rlon: 22, w: 1.0 },
    { lat: 45, lon: -110, rlat: 18, rlon: 20, w: 1.0 },
    { lat: 62, lon: -95, rlat: 12, rlon: 38, w: 1.0 },
    { lat: 63, lon: -150, rlat: 10, rlon: 14, w: 0.9 },
    { lat: 20, lon: -100, rlat: 8, rlon: 12, w: 0.9 },
    { lat: -5, lon: -60, rlat: 15, rlon: 18, w: 1.0 },
    { lat: -30, lon: -65, rlat: 15, rlon: 12, w: 1.0 },
    { lat: -25, lon: 135, rlat: 12, rlon: 18, w: 1.0 },
    { lat: 72, lon: -40, rlat: 10, rlon: 16, w: 0.9 },
    { lat: 54, lon: -4, rlat: 5, rlon: 5, w: 0.9 },
    { lat: 36, lon: 138, rlat: 6, rlon: 4, w: 0.9 },
    { lat: -3, lon: 115, rlat: 5, rlon: 20, w: 0.8 },
    { lat: -42, lon: 172, rlat: 5, rlon: 4, w: 0.8 },
    { lat: -20, lon: 47, rlat: 7, rlon: 3, w: 0.8 },
    { lat: 13, lon: 122, rlat: 6, rlon: 4, w: 0.7 },
  ];
  let best = 0;
  for (const b of blobs) {
    const dlat = (lat - b.lat) / b.rlat;
    let dlon = lon - b.lon;
    if (dlon > 180) dlon -= 360;
    if (dlon < -180) dlon += 360;
    dlon /= b.rlon;
    const d = dlat * dlat + dlon * dlon;
    if (d < 1) {
      const v = (1 - d) * b.w;
      if (v > best) best = v;
    }
  }
  const n =
    0.18 * Math.sin(lat * 0.31 + lon * 0.22) +
    0.12 * Math.sin(lat * 0.77 - lon * 0.44) +
    0.10 * Math.sin(lon * 0.18 + lat * 0.09) +
    0.08 * Math.cos(lon * 0.5 + lat * 0.3);
  return best + n * 0.22 > 0.18;
}

function latLonToVec3(lat, lon, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

// Build dots using dense grid sampling — reads as a real dotted map
function buildDots() {
  const positions = [];
  // Sample by lat bands with even longitude steps, accounting for latitude
  const latStep = 1.6; // degrees
  for (let lat = -85; lat <= 85; lat += latStep) {
    const circ = Math.cos(lat * Math.PI / 180);
    const lonStep = latStep / Math.max(0.12, circ);
    for (let lon = -180; lon < 180; lon += lonStep) {
      if (isLand(lat, lon)) {
        const p = latLonToVec3(lat, lon, GLOBE_R * 1.003);
        positions.push(p);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(positions.length * 3);
  positions.forEach((p, i) => {
    pos[i*3] = p.x; pos[i*3+1] = p.y; pos[i*3+2] = p.z;
  });
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xb8c0c8,
    size: 0.032,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: true,
  });
  const pts = new THREE.Points(geo, mat);
  world.add(pts);
  return positions.length;
}
buildDots();

// ---------- NODES ----------
const COUNTRIES = [
  { cc: 'US', name: 'United States', w: 0.285, centers: [[40,-100],[34,-118],[40,-74],[47,-122],[32,-96]] },
  { cc: 'DE', name: 'Germany',       w: 0.128, centers: [[51,10],[48,11],[53,10]] },
  { cc: 'FR', name: 'France',        w: 0.055, centers: [[48,2],[45,5],[44,-1]] },
  { cc: 'NL', name: 'Netherlands',   w: 0.048, centers: [[52,5]] },
  { cc: 'CA', name: 'Canada',        w: 0.044, centers: [[45,-75],[49,-123],[43,-79]] },
  { cc: 'GB', name: 'United Kingdom',w: 0.042, centers: [[52,-1],[55,-4]] },
  { cc: 'FI', name: 'Finland',       w: 0.038, centers: [[60,25]] },
  { cc: 'RU', name: 'Russia',        w: 0.035, centers: [[55,37],[59,30],[56,60]] },
  { cc: 'JP', name: 'Japan',         w: 0.033, centers: [[35,139],[34,135]] },
  { cc: 'CN', name: 'China',         w: 0.027, centers: [[39,116],[31,121],[23,113]] },
  { cc: 'CH', name: 'Switzerland',   w: 0.024, centers: [[47,8]] },
  { cc: 'AU', name: 'Australia',     w: 0.023, centers: [[-33,151],[-37,144],[-31,115]] },
  { cc: 'SE', name: 'Sweden',        w: 0.022, centers: [[59,18],[57,12]] },
  { cc: 'SG', name: 'Singapore',     w: 0.020, centers: [[1.3,103.8]] },
  { cc: 'UA', name: 'Ukraine',       w: 0.018, centers: [[50,30]] },
  { cc: 'KR', name: 'South Korea',   w: 0.017, centers: [[37,127]] },
  { cc: 'ES', name: 'Spain',         w: 0.016, centers: [[40,-3],[41,2]] },
  { cc: 'IT', name: 'Italy',         w: 0.016, centers: [[45,9],[41,12]] },
  { cc: 'PL', name: 'Poland',        w: 0.015, centers: [[52,21]] },
  { cc: 'BR', name: 'Brazil',        w: 0.014, centers: [[-23,-46],[-22,-43]] },
  { cc: 'IN', name: 'India',         w: 0.013, centers: [[19,72],[28,77],[12,77]] },
  { cc: 'AT', name: 'Austria',       w: 0.011, centers: [[48,16]] },
  { cc: 'NO', name: 'Norway',        w: 0.010, centers: [[59,10]] },
  { cc: 'CZ', name: 'Czechia',       w: 0.009, centers: [[50,14]] },
  { cc: 'BE', name: 'Belgium',       w: 0.008, centers: [[50,4]] },
  { cc: 'IE', name: 'Ireland',       w: 0.008, centers: [[53,-6]] },
  { cc: 'RO', name: 'Romania',       w: 0.007, centers: [[44,26]] },
  { cc: 'HK', name: 'Hong Kong',     w: 0.006, centers: [[22,114]] },
  { cc: 'MX', name: 'Mexico',        w: 0.006, centers: [[19,-99]] },
  { cc: 'ZA', name: 'South Africa',  w: 0.005, centers: [[-26,28],[-34,18]] },
  { cc: 'NZ', name: 'New Zealand',   w: 0.004, centers: [[-41,174]] },
  { cc: 'AR', name: 'Argentina',     w: 0.004, centers: [[-34,-58]] },
  { cc: 'TH', name: 'Thailand',      w: 0.004, centers: [[13,100]] },
  { cc: 'TR', name: 'Turkey',        w: 0.003, centers: [[41,29]] },
  { cc: 'ID', name: 'Indonesia',     w: 0.003, centers: [[-6,106]] },
];

const CLIENTS = [
  ['/Satoshi:27.0.0/', 0.55],
  ['/Satoshi:26.1.0/', 0.20],
  ['/Satoshi:25.2.0/', 0.10],
  ['/Satoshi:24.0.1/', 0.05],
  ['/bitcoin-knots:27.0/', 0.05],
  ['/btcd:0.24.2/', 0.03],
  ['/bcoin:2.2.0/', 0.02],
];
function pickClient() {
  const r = Math.random(); let acc = 0;
  for (const [n, p] of CLIENTS) { acc += p; if (r < acc) return n; }
  return CLIENTS[0][0];
}

const NODE_COUNT = 420;
const nodes = [];
const sumW = COUNTRIES.reduce((s, c) => s + c.w, 0);
function gaussJitter(range) {
  return ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2 * range;
}
for (let i = 0; i < NODE_COUNT; i++) {
  let r = Math.random() * sumW;
  let country = COUNTRIES[0];
  for (const c of COUNTRIES) { r -= c.w; if (r <= 0) { country = c; break; } }
  const center = country.centers[Math.floor(Math.random() * country.centers.length)];
  const lat = center[0] + gaussJitter(2.2);
  const lon = center[1] + gaussJitter(3.0);
  const pos = latLonToVec3(lat, lon, GLOBE_R * 1.01);
  nodes.push({
    i, lat, lon, pos,
    cc: country.cc,
    country: country.name,
    client: pickClient(),
    peers: 8 + Math.floor(Math.random() * 120),
    uptimeDays: Math.floor(Math.random() * 780) + 4,
    phase: Math.random() * Math.PI * 2,
    size: 0.9 + Math.random() * 0.8,
  });
}

// ---------- Node points — SMALL, controlled halo, NON-additive core ----------
const nodeGeo = new THREE.BufferGeometry();
const nodePos = new Float32Array(nodes.length * 3);
const nodeSize = new Float32Array(nodes.length);
const nodePhase = new Float32Array(nodes.length);
nodes.forEach((n, i) => {
  nodePos[i*3] = n.pos.x; nodePos[i*3+1] = n.pos.y; nodePos[i*3+2] = n.pos.z;
  nodeSize[i] = n.size;
  nodePhase[i] = n.phase;
});
nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
nodeGeo.setAttribute('aSize', new THREE.BufferAttribute(nodeSize, 1));
nodeGeo.setAttribute('aPhase', new THREE.BufferAttribute(nodePhase, 1));

const nodeMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0xF7931A) },
    uColorHot: { value: new THREE.Color(0xffcf7a) },
    uPxRatio: { value: renderer.getPixelRatio() },
  },
  vertexShader: `
    attribute float aSize;
    attribute float aPhase;
    uniform float uTime;
    uniform float uPxRatio;
    varying float vTw;
    varying float vFacing;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vec3 toCam = normalize(cameraPosition - worldPos.xyz);
      vec3 normal = normalize(worldPos.xyz);
      vFacing = dot(normal, toCam);
      float tw = 0.5 + 0.5 * sin(uTime * 2.0 + aPhase);
      vTw = tw;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      float s = aSize * (5.5 + 2.0 * tw);
      gl_PointSize = s * uPxRatio;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uColorHot;
    varying float vTw;
    varying float vFacing;
    void main() {
      if (vFacing < 0.0) discard;
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      if (d > 0.5) discard;
      float core = smoothstep(0.28, 0.0, d);
      float halo = smoothstep(0.5, 0.28, d);
      vec3 col = mix(uColor, uColorHot, core);
      float a = core + halo * 0.45 * (0.5 + 0.5 * vTw);
      a *= smoothstep(0.0, 0.15, vFacing);
      gl_FragColor = vec4(col, a);
    }
  `,
});
const nodePoints = new THREE.Points(nodeGeo, nodeMat);
world.add(nodePoints);

// ---------- Connections ----------
function arcPoints(a, b, segs = 36, lift = 0.22) {
  const v1 = a.clone().normalize();
  const v2 = b.clone().normalize();
  const pts = [];
  const angle = Math.acos(Math.min(1, Math.max(-1, v1.dot(v2))));
  if (angle < 0.001) return [a.clone(), b.clone()];
  const axis = new THREE.Vector3().crossVectors(v1, v2).normalize();
  const baseR = a.length();
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const q = new THREE.Quaternion().setFromAxisAngle(axis, angle * t);
    const p = v1.clone().applyQuaternion(q);
    const h = Math.sin(Math.PI * t);
    const r = baseR * (1 + lift * h * Math.min(1, angle / 1.2));
    pts.push(p.multiplyScalar(r));
  }
  return pts;
}

const connections = [];
function addConnection(a, b) {
  if (a === b) return;
  const key = a < b ? `${a}-${b}` : `${b}-${a}`;
  if (connections.some(c => c.key === key)) return;
  const pts = arcPoints(nodes[a].pos, nodes[b].pos);
  connections.push({ key, a, b, pts });
}
for (let i = 0; i < nodes.length; i++) {
  const count = 1 + Math.floor(Math.random() * 3);
  const candidates = [];
  for (let k = 0; k < 10; k++) {
    const j = Math.floor(Math.random() * nodes.length);
    if (j !== i) candidates.push(j);
  }
  candidates.sort((x, y) => {
    const dx = nodes[i].pos.distanceTo(nodes[x].pos);
    const dy = nodes[i].pos.distanceTo(nodes[y].pos);
    return Math.abs(dx - 2.8) - Math.abs(dy - 2.8);
  });
  for (let k = 0; k < count && k < candidates.length; k++) {
    addConnection(i, candidates[k]);
  }
}

const connVerts = [];
const connT = [];
const connSeed = [];
const connNorm = []; // sphere normal at vertex for back-face fade
connections.forEach(c => {
  const seed = Math.random() * 1000;
  for (let i = 0; i < c.pts.length - 1; i++) {
    const p1 = c.pts[i];
    const p2 = c.pts[i+1];
    connVerts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    const t1 = i / (c.pts.length - 1);
    const t2 = (i+1) / (c.pts.length - 1);
    connT.push(t1, t2);
    connSeed.push(seed, seed);
    const n1 = p1.clone().normalize();
    const n2 = p2.clone().normalize();
    connNorm.push(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z);
  }
  c.seed = seed;
});

const connGeo = new THREE.BufferGeometry();
connGeo.setAttribute('position', new THREE.Float32BufferAttribute(connVerts, 3));
connGeo.setAttribute('aT', new THREE.Float32BufferAttribute(connT, 1));
connGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(connSeed, 1));
connGeo.setAttribute('aNorm', new THREE.Float32BufferAttribute(connNorm, 3));

const connMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0xF7931A) },
    uColorHot: { value: new THREE.Color(0xffe2a8) },
  },
  vertexShader: `
    attribute float aT;
    attribute float aSeed;
    attribute vec3 aNorm;
    uniform float uTime;
    varying float vT;
    varying float vSeed;
    varying float vFacing;
    void main() {
      vec3 worldN = normalize(mat3(modelMatrix) * aNorm);
      vec3 worldP = (modelMatrix * vec4(position, 1.0)).xyz;
      vec3 toCam = normalize(cameraPosition - worldP);
      vFacing = dot(worldN, toCam);
      vT = aT;
      vSeed = aSeed;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uColorHot;
    varying float vT;
    varying float vSeed;
    varying float vFacing;
    void main() {
      if (vFacing < 0.05) discard;
      float speed = 0.25 + mod(vSeed, 0.35);
      float head = mod(uTime * speed + vSeed * 0.3, 1.4) - 0.2;
      float d = vT - head;
      float pulse = exp(-pow(d * 9.0, 2.0));
      float base = 0.18;
      float facing = smoothstep(0.0, 0.35, vFacing);
      float a = (base + pulse * 0.8) * facing;
      vec3 col = mix(uColor, uColorHot, pulse * 0.7);
      gl_FragColor = vec4(col, a * 0.9);
    }
  `,
});
const connLines = new THREE.LineSegments(connGeo, connMat);
world.add(connLines);

// ---------- Very subtle atmosphere rim (not a fireball!) ----------
const atmGeo = new THREE.SphereGeometry(GLOBE_R * 1.04, 64, 64);
const atmMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, transparent: true, depthWrite: false,
  blending: THREE.NormalBlending,
  uniforms: { uColor: { value: new THREE.Color(0xF7931A) } },
  vertexShader: `
    varying vec3 vN;
    void main() {
      vN = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vN;
    void main() {
      float intensity = pow(0.62 - dot(vN, vec3(0,0,1.0)), 2.5);
      intensity = clamp(intensity, 0.0, 1.0) * 0.35;
      gl_FragColor = vec4(uColor, intensity);
    }
  `,
});
world.add(new THREE.Mesh(atmGeo, atmMat));

// ---------- Drag / zoom ----------
let isDown = false, lastX = 0, lastY = 0;
let rotY = -0.8, rotX = -0.25;
let velY = 0.0015, velX = 0;
let autoRotate = true;
const rotStateEl = document.getElementById('stat-rot');

const canvas = renderer.domElement;
canvas.addEventListener('pointerdown', e => {
  isDown = true; lastX = e.clientX; lastY = e.clientY;
  autoRotate = false;
  rotStateEl.textContent = 'manual';
});
window.addEventListener('pointerup', () => { isDown = false; });
window.addEventListener('pointermove', e => {
  if (!isDown) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY;
  velY = dx * 0.005;
  velX = dy * 0.005;
  rotY += velY;
  rotX += velX;
  rotX = Math.max(-1.2, Math.min(1.2, rotX));
});
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  camera.position.z = Math.max(7, Math.min(18, camera.position.z + e.deltaY * 0.012));
}, { passive: false });

let idleTimer = 0;
function resetIdle() { idleTimer = 0; }
canvas.addEventListener('pointerdown', resetIdle);
canvas.addEventListener('pointermove', resetIdle);
canvas.addEventListener('wheel', resetIdle);

// ---------- Tooltip / raycaster ----------
const tip = document.getElementById('tip');
const tipCountry = document.getElementById('tip-country');
const tipLL = document.getElementById('tip-ll');
const tipClient = document.getElementById('tip-client');
const tipPeers = document.getElementById('tip-peers');
const tipUp = document.getElementById('tip-up');
const tipHdr = document.getElementById('tip-hdr');
const selEl = document.getElementById('stat-sel');

const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.055;
const mouse = new THREE.Vector2(-999, -999);

canvas.addEventListener('pointermove', e => {
  const r = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  tip.style.left = (e.clientX) + 'px';
  tip.style.top = (e.clientY) + 'px';
});
canvas.addEventListener('pointerleave', () => { mouse.x = -999; });

// ---------- HUD data ----------
function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function fmt(n) { return n.toLocaleString('en-US'); }

const totalNodes = 15742 + Math.floor(Math.random() * 400);
const startTime = performance.now();
const animDur = 1600;

const byCc = {};
nodes.forEach(n => byCc[n.cc] = (byCc[n.cc] || 0) + 1);
const topCc = Object.entries(byCc).sort((a,b) => b[1]-a[1]).slice(0, 8);
const maxCount = topCc[0] ? topCc[0][1] : 1;
const bars = document.getElementById('country-bars');
topCc.forEach(([cc, count]) => {
  const row = document.createElement('div'); row.className = 'bar';
  row.innerHTML = `
    <div class="cc">${cc}</div>
    <div class="track"><div class="fill" style="width:${(count/maxCount*100).toFixed(0)}%"></div></div>
    <div class="val">${Math.round(count / NODE_COUNT * totalNodes).toLocaleString('en-US')}</div>
  `;
  bars.appendChild(row);
});

const tickerRun = document.getElementById('ticker-run');
const tickerItems = [
  `<span class="hl">BTC/USD</span> <span class="up">▲ 108,342.21</span>`,
  `<span class="hl">BLOCK</span> <span>#890,412</span>`,
  `<span>FEES</span> <span class="up">▲ 28 sat/vB</span>`,
  `<span>MEMPOOL</span> <span>12,843 txs · 48 MB</span>`,
  `<span class="hl">NODES/24H</span> <span class="up">▲ +127</span>`,
  `<span>DIFFICULTY</span> <span class="up">▲ 86.87 T</span>`,
  `<span>HASHRATE</span> <span>612.3 EH/s</span>`,
  `<span class="hl">LN CAP</span> <span>5,284 BTC</span>`,
  `<span>LN CHANNELS</span> <span class="dn">▼ 52,118</span>`,
  `<span>SUPPLY</span> <span>19,845,211 BTC</span>`,
  `<span class="hl">REACHABLE</span> <span class="up">▲ 15,742</span>`,
  `<span>UNREACHABLE</span> <span>~48,000</span>`,
  `<span>AVG PING</span> <span>112 ms</span>`,
  `<span>SEGWIT</span> <span class="up">▲ 99.4%</span>`,
  `<span>TAPROOT</span> <span class="up">▲ 68.2%</span>`,
];
tickerRun.innerHTML = tickerItems.join(' · ') + ' · · · ' + tickerItems.join(' · ');

function tickClock() {
  const d = new Date();
  setText('utc', d.toISOString().slice(11, 19));
}
setInterval(tickClock, 1000); tickClock();

let blockAgeSec = 182;
setInterval(() => {
  blockAgeSec++;
  if (Math.random() < 0.003) blockAgeSec = 0;
  const m = Math.floor(blockAgeSec / 60), s = blockAgeSec % 60;
  setText('stat-age', `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')} ago`);
}, 1000);

setInterval(() => {
  const mp = 12500 + Math.floor(Math.random() * 800);
  setText('stat-mempool', fmt(mp));
}, 2500);

let fpsFrames = 0, fpsLast = performance.now();
function updateFps(now) {
  fpsFrames++;
  if (now - fpsLast >= 500) {
    setText('stat-fps', Math.round(fpsFrames * 1000 / (now - fpsLast)));
    fpsFrames = 0; fpsLast = now;
  }
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  nodeMat.uniforms.uPxRatio.value = renderer.getPixelRatio();
});

const clock = new THREE.Clock();
let lastNow = performance.now();
function animate() {
  const now = performance.now();
  const dt = (now - lastNow) / 1000; lastNow = now;
  const t = clock.getElapsedTime();

  const k = Math.min(1, (now - startTime) / animDur);
  const eased = 1 - Math.pow(1 - k, 3);
  setText('stat-nodes', fmt(Math.floor(totalNodes * eased)));
  if (k >= 1) {
    const drift = Math.floor(Math.sin(t * 0.15) * 30);
    setText('stat-nodes', fmt(totalNodes + drift));
  }
  setText('stat-delta', `+${127 + Math.floor(Math.sin(t*0.3) * 8)}`);
  setText('stat-conns', fmt(Math.floor(totalNodes * 8.2 + Math.sin(t*0.5)*500)));
  setText('stat-peers', (8.2 + Math.sin(t*0.7)*0.3).toFixed(1));
  setText('stat-asns', fmt(2841 + Math.floor(Math.sin(t*0.2) * 10)));

  idleTimer += dt;
  if (!isDown && idleTimer > 2.2) {
    autoRotate = true; rotStateEl.textContent = 'auto';
  }
  if (!isDown) {
    velY *= 0.95; velX *= 0.9;
    rotY += velY;
    rotX += velX;
    if (autoRotate) rotY += 0.0012;
  }
  world.rotation.y = rotY;
  world.rotation.x = rotX - 0.25;

  nodeMat.uniforms.uTime.value = t;
  connMat.uniforms.uTime.value = t;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObject(nodePoints);
  if (hits.length > 0) {
    const idx = hits[0].index;
    const n = nodes[idx];
    tipHdr.textContent = `NODE #${String(10000 + idx)}`;
    tipCountry.textContent = `${n.country} (${n.cc})`;
    tipLL.textContent = `${n.lat.toFixed(2)}°, ${n.lon.toFixed(2)}°`;
    tipClient.textContent = n.client;
    tipPeers.textContent = n.peers;
    tipUp.textContent = `${n.uptimeDays}d`;
    tip.classList.add('on');
    selEl.textContent = `#${10000 + idx} · ${n.cc}`;
    canvas.style.cursor = 'pointer';
  } else {
    tip.classList.remove('on');
    selEl.textContent = '—';
    canvas.style.cursor = isDown ? 'grabbing' : 'grab';
  }

  renderer.render(scene, camera);
  updateFps(now);
  requestAnimationFrame(animate);
}

requestAnimationFrame(() => {
  animate();
  setTimeout(() => boot.classList.add('hide'), 600);
  setTimeout(() => boot.remove(), 1400);
});
