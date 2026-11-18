window.DB = window.DB || {};
var currentLang = "ru", currentMod = 0, currentState = 0;
var rotX = 0.28, rotY = -0.62, zoom = 1.35;
var isPaused = true, isDragging = false, isXray = false, timeTick = 0;

var canvas = document.getElementById("canvas3d");
var ctx = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
  if (!canvas || !canvas.parentElement) return;
  const r = canvas.parentElement.getBoundingClientRect();
  if (r.width > 0 && r.height > 0 && (canvas.width !== Math.floor(r.width) || canvas.height !== Math.floor(r.height))) {
    canvas.width = Math.floor(r.width);
    canvas.height = Math.floor(r.height);
  }
}

function project3D(x, y, z) {
  const cy = Math.cos(rotY), sy = Math.sin(rotY);
  const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
  const cx = Math.cos(rotX), sx = Math.sin(rotX);
  const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
  const scale = (520 / Math.max(80, 520 + z2)) * zoom;
  return { x: (canvas ? canvas.width / 2 : 400) + x1 * scale, y: (canvas ? canvas.height / 2 : 300) + y2 * scale, z: z2, scale: scale };
}

function draw3DSphere(x, y, r, color) {
  if (!ctx) return;
  ctx.save(); ctx.beginPath();
  ctx.arc(x, y, Math.max(1, r), 0, Math.PI * 2);
  ctx.fillStyle = isXray ? "rgba(56,189,248,0.22)" : color;
  ctx.fill();
  ctx.strokeStyle = isXray ? "rgba(125,211,252,0.75)" : "rgba(15,23,42,0.35)";
  ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
}

function draw3DTube(x1, y1, x2, y2, r, color) {
  if (!ctx) return;
  ctx.save(); ctx.beginPath();
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  ctx.strokeStyle = isXray ? "rgba(56,189,248,0.35)" : color;
  ctx.lineWidth = Math.max(1, r * 2); ctx.lineCap = "round";
  ctx.stroke(); ctx.restore();
}

const sectionBaseZoom = [1.35, 1.25, 1.55, 1.55, 1.35, 1.45, 2.15, 1.45];
const sectionBaseAngles = [
  { rx: 0.28, ry: -0.62 }, { rx: 0.22, ry: -0.45 }, { rx: 0.18, ry: -0.35 }, { rx: 0.35, ry: -0.45 },
  { rx: 0.28, ry: -0.62 }, { rx: 0.20, ry: -0.35 }, { rx: 0.15, ry: -0.30 }, { rx: 0.22, ry: -0.50 }
];

function applySectionCamera(idx) {
  const ang = sectionBaseAngles[idx] || { rx: 0.25, ry: -0.45 };
  rotX = ang.rx; rotY = ang.ry;
  zoom = (sectionBaseZoom[idx] || 1.45) * (window.innerWidth <= 768 ? 0.82 : 1.0);
}

function setLang(l) { currentLang = l; updateUI(); }
function setState(idx) { currentState = idx; updateUI(); }
function setModule(idx) { currentMod = idx; currentState = 0; applySectionCamera(idx); isPaused = true; updatePauseBtn(); updateUI(); }
function setCameraView(v) {
  isPaused = true; updatePauseBtn();
  if (v === "front") applySectionCamera(currentMod);
  else if (v === "side") { rotX = 0.15; rotY = -1.45; }
  else if (v === "top") { rotX = 1.35; rotY = 0.0; }
}
var setView = setCameraView;
function togglePause() { isPaused = !isPaused; updatePauseBtn(); }
function updatePauseBtn() {
  const btn = document.getElementById("pauseBtn"), d = DB[currentLang] || DB.ru;
  if (btn && d) btn.textContent = isPaused ? (d.play || "Пуск ▶") : (d.pause || "Пауза ⏸");
}
function toggleXray() { isXray = !isXray; const btn = document.getElementById("xrayBtn"); if (btn) btn.classList.toggle("active", isXray); }
function zoomStep(d) { zoom = Math.max(0.45, Math.min(3.5, zoom + d)); }
function toggleFullscreen() {
  const vp = document.getElementById("viewport") || document.documentElement;
  if (!document.fullscreenElement) vp.requestFullscreen?.().catch(() => {});
  else document.exitFullscreen?.().catch(() => {});
}
function toggleEditor() {
  const box = document.getElementById("editorBox");
  if (box) box.style.display = box.style.display === "block" ? "none" : "block";
}
function applyEdit() { updateUI(); }
var saveCustomData = applyEdit;
function exportJSON() {}
function openGithubPR() { window.open("https://github.com", "_blank"); }

function updateUI() {
  const d = DB[currentLang] || DB.ru;
  if (!d || !d.modules) return;
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.textContent = v; };
  setTxt("subText", d.sub); setTxt("modLabel", d.modLabel); setTxt("stateLabel", d.stateLabel);
  setTxt("tacticsLabel", d.tacticsLabel); setTxt("authorLabel", d.authorLabel); setTxt("discText", d.disc);
  setTxt("hintText", d.hint); setTxt("editBtn", d.editBtn); setTxt("xrayBtn", d.xrayBtn); setTxt("fsBtn", d.fsBtn);

  const tabsBox = document.getElementById("tabsBox");
  if (tabsBox) {
    tabsBox.innerHTML = "";
    d.modules.forEach((m, i) => {
      const b = document.createElement("button");
      b.className = "tab-btn" + (i === currentMod ? " active" : "");
      b.textContent = m.name; b.onclick = () => setModule(i);
      tabsBox.appendChild(b);
    });
  }
  const statesBox = document.getElementById("statesBox"), mod = d.modules[currentMod];
  if (statesBox && mod && mod.states) {
    statesBox.innerHTML = "";
    mod.states.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "state-btn" + (i === currentState ? " active" : "");
      b.textContent = s.btn; b.onclick = () => setState(i);
      statesBox.appendChild(b);
    });
    const st = mod.states[currentState];
    if (st) {
      setTxt("statusPill", st.pill); setTxt("cardTitle", st.title); setTxt("cardDesc", st.desc);
      setTxt("cardTactics", st.tactics); setTxt("cardAuthor", st.author);
    }
  }
  updatePauseBtn();
}

function renderLoop() {
  requestAnimationFrame(renderLoop);
  resizeCanvas();
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isPaused && !isDragging) rotY += 0.006;
  timeTick += 0.03;

  const builder = window.AtlasParts && window.AtlasParts[currentMod];
  if (!builder) return;
  const model = builder(currentState, timeTick);
  if (!model) return;

  const q = [];
  (model.polys || []).forEach((poly) => {
    if (!poly.pts || !poly.pts.length) return;
    const proj = poly.pts.map((pt) => project3D(pt.at(0), pt.at(1), pt.at(2)));
    const avgZ = proj.reduce((acc, v) => acc + v.z, 0) / proj.length;
    q.push({ z: avgZ, draw: () => {
      ctx.save(); ctx.beginPath();
      proj.forEach((v, idx) => (idx === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)));
      ctx.closePath();
      ctx.fillStyle = isXray ? "rgba(56,189,248,0.14)" : (poly.color || "#94a3b8");
      ctx.fill(); ctx.strokeStyle = "rgba(15,23,42,0.3)"; ctx.stroke(); ctx.restore();
    }});
  });
  (model.tubes || []).forEach((t) => {
    const p1 = project3D(t.a.at(0), t.a.at(1), t.a.at(2));
    const p2 = project3D(t.b.at(0), t.b.at(1), t.b.at(2));
    const rad = (t.r || 4) * ((p1.scale + p2.scale) / 2) * 0.68;
    q.push({ z: (p1.z + p2.z) / 2, draw: () => draw3DTube(p1.x, p1.y, p2.x, p2.y, rad, t.color || "#38bdf8") });
  });
  (model.spheres || []).forEach((s) => {
    const p = project3D(s.p.at(0), s.p.at(1), s.p.at(2));
    q.push({ z: p.z, draw: () => draw3DSphere(p.x, p.y, (s.r || 5) * p.scale * 0.68, s.color || "#f87171") });
  });
  q.sort((a, b) => b.z - a.z);
  q.forEach((item) => item.draw());
}

if (canvas) {
  let lx = 0, ly = 0;
  canvas.addEventListener("mousedown", (e) => { isDragging = true; lx = e.clientX; ly = e.clientY; });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    rotY += (e.clientX - lx) * 0.008;
    rotX = Math.max(-1.45, Math.min(1.45, rotX + (e.clientY - ly) * 0.008));
    lx = e.clientX; ly = e.clientY;
  });
  window.addEventListener("mouseup", () => { isDragging = false; });
  canvas.addEventListener("wheel", (e) => { e.preventDefault(); zoomStep(e.deltaY < 0 ? 0.1 : -0.1); }, { passive: false });
}

updateUI();
renderLoop();
