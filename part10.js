window.DB = window.DB || {};
var currentLang = window.currentLang || "ru";
var currentMod = window.currentMod || 0;
var currentState = window.currentState || 0;
var rotX = window.rotX || 0.28;
var rotY = window.rotY || -0.62;
var zoom = window.zoom || 1.35;
var isPaused = true;
var isDragging = false;
var isXray = false;
var timeTick = 0;

var canvas = document.getElementById("canvas3d");
var ctx = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
  if (!canvas || !canvas.parentElement) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  const w = Math.floor(rect.width);
  const h = Math.floor(rect.height);
  if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
    canvas.width = w;
    canvas.height = h;
  }
}

function project3D(x, y, z) {
  const cy = Math.cos(rotY), sy = Math.sin(rotY);
  const x1 = x * cy - z * sy;
  const z1 = x * sy + z * cy;
  const cx = Math.cos(rotX), sx = Math.sin(rotX);
  const y2 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;
  const fov = 520;
  const scale = (fov / Math.max(80, fov + z2)) * zoom;
  return {
    x: (canvas ? canvas.width / 2 : 400) + x1 * scale,
    y: (canvas ? canvas.height / 2 : 300) + y2 * scale,
    z: z2,
    scale: scale
  };
}

function draw3DSphere(x, y, r, color) {
  if (!ctx) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, Math.max(1, r), 0, Math.PI * 2);
  ctx.fillStyle = isXray ? "rgba(56,189,248,0.22)" : color;
  ctx.fill();
  ctx.strokeStyle = isXray ? "rgba(125,211,252,0.75)" : "rgba(15,23,42,0.35)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}

function draw3DTube(x1, y1, x2, y2, r, color) {
  if (!ctx) return;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = isXray ? "rgba(56,189,248,0.35)" : color;
  ctx.lineWidth = Math.max(1, r * 2);
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();
}

const sectionBaseZoom = [1.35, 1.25, 1.55, 1.55, 1.35, 1.45, 2.15, 1.45];
const sectionBaseAngles = [
  { rx: 0.28, ry: -0.62 }, { rx: 0.22, ry: -0.45 },
  { rx: 0.18, ry: -0.35 }, { rx: 0.35, ry: -0.45 },
  { rx: 0.28, ry: -0.62 }, { rx: 0.20, ry: -0.35 },
  { rx: 0.15, ry: -0.30 }, { rx: 0.22, ry: -0.50 }
];

function applySectionCamera(idx) {
  const ang = sectionBaseAngles[idx] || { rx: 0.25, ry: -0.45 };
  rotX = ang.rx;
  rotY = ang.ry;
  zoom = (sectionBaseZoom[idx] || 1.45) * (window.innerWidth <= 768 ? 0.82 : 1.0);
}

function setLang(l) { currentLang = l; updateUI(); }
function setState(idx) { currentState = idx; updateUI(); }
function setModule(idx) {
  currentMod = idx;
  currentState = 0;
  applySectionCamera(idx);
  isPaused = true;
  updatePauseBtn();
  updateUI();
}

function setCameraView(v) {
  isPaused = true;
  updatePauseBtn();
  if (v === "front") applySectionCamera(currentMod);
  else if (v === "side") { rotX = 0.15; rotY = -1.45; }
  else if (v === "top") { rotX = 1.35; rotY = 0.0; }
}
var setView = setCameraView;

function togglePause() { isPaused = !isPaused; updatePauseBtn(); }
function updatePauseBtn() {
  const btn = document.getElementById("pauseBtn");
  const d = DB[currentLang] || DB.ru;
  if (btn && d) btn.textContent = isPaused ? (d.play || "Пуск ▶") : (d.pause || "Пауза ⏸");
}

function toggleXray() {
  isXray = !isXray;
  const btn = document.getElementById("xrayBtn");
  if (btn) btn.classList.toggle("active", isXray);
}

function zoomStep(delta) { zoom = Math.max(0.45, Math.min(3.5, zoom + delta)); }

function toggleFullscreen() {
  const vp = document.getElementById("viewport") || document.documentElement;
  if (!document.fullscreenElement) {
    if (vp.requestFullscreen) vp.requestFullscreen().catch(() => {});
  } else if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}
function toggleEditor() {
  const box = document.getElementById("editorBox");
  if (!box) return;
  const isOpen = box.style.display === "block";
  box.style.display = isOpen ? "none" : "block";
  if (!isOpen) {
    const d = DB[currentLang] || DB.ru;
    const stData = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
    if (stData) {
      if (document.getElementById("edTitle")) document.getElementById("edTitle").value = stData.title || "";
      if (document.getElementById("edDesc")) document.getElementById("edDesc").value = stData.desc || "";
      if (document.getElementById("edTactics")) document.getElementById("edTactics").value = stData.tactics || "";
      if (document.getElementById("edAuthor")) document.getElementById("edAuthor").value = stData.author || "";
      if (document.getElementById("guardMsg")) document.getElementById("guardMsg").textContent = "";
    }
  }
}

function applyEdit() {
  const title = (document.getElementById("edTitle")?.value || "").trim();
  const desc = (document.getElementById("edDesc")?.value || "").trim();
  const tactics = (document.getElementById("edTactics")?.value || "").trim();
  const author = (document.getElementById("edAuthor")?.value || "").trim();
  const msg = document.getElementById("guardMsg");
  const combined = (title + " " + desc + " " + tactics + " " + author).toLowerCase();

  if (/(http|www\.|\.ru|\.com|мг|мл|таблет|дозиров|рецепт|телефон|\+7|8\s?\(?\d{3}\)?)/i.test(combined)) {
    if (msg) { msg.style.color = "#f87171"; msg.textContent = "⚠ Заблокировано: дозировки, рецепты и ссылки."; }
    return;
  }

  const d = DB[currentLang] || DB.ru;
  const stData = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
  if (stData) {
    if (title) stData.title = title;
    if (desc) stData.desc = desc;
    if (tactics) stData.tactics = tactics;
    if (author) stData.author = author;
  }
  if (msg) { msg.style.color = "#34d399"; msg.textContent = "✓ Изменения применены."; }
  updateUI();
}
var saveCustomData = applyEdit;

function exportJSON() {
  const d = DB[currentLang] || DB.ru;
  const stData = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
  if (!stData) return;
  const blob = new Blob([JSON.stringify(stData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `openneuroatlas_${currentLang}_m${currentMod}_s${currentState}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function openGithubPR() {
  const title = encodeURIComponent("Медицинская правка: раздел " + (currentMod + 1) + ", стадия " + (currentState + 1));
  window.open("https://github.com" + title, "_blank");
}

function updateUI() {
  const d = DB[currentLang] || DB.ru;
  if (!d || !d.modules) return;
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.textContent = val; };

  setTxt("subText", d.sub); setTxt("modLabel", d.modLabel); setTxt("stateLabel", d.stateLabel);
  setTxt("tacticsLabel", d.tacticsLabel); setTxt("authorLabel", d.authorLabel); setTxt("discText", d.disc);
  setTxt("hintText", d.hint); setTxt("editBtn", d.editBtn); setTxt("xrayBtn", d.xrayBtn); setTxt("fsBtn", d.fsBtn);

  const tabsBox = document.getElementById("tabsBox");
  if (tabsBox) {
    tabsBox.innerHTML = "";
    d.modules.forEach((m, i) => {
      const b = document.createElement("button");
      b.className = "tab-btn" + (i === currentMod ? " active" : "");
      b.textContent = m.name;
      b.onclick = () => setModule(i);
      tabsBox.appendChild(b);
    });
  }

  const statesBox = document.getElementById("statesBox");
  const mod = d.modules[currentMod];
  if (statesBox && mod && mod.states) {
    statesBox.innerHTML = "";
    mod.states.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "state-btn" + (i === currentState ? " active" : "");
      b.textContent = s.btn;
      b.onclick = () => setState(i);
      statesBox.appendChild(b);
    });
    const st = mod.states[currentState];
    if (st) {
      setTxt("statusPill", st.pill); setTxt("cardTitle", st.title); setTxt("cardDesc", st.desc);
      setTxt("cardTactics", st.tactics); setTxt("cardAuthor", st.author);
      const pill = document.getElementById("statusPill");
      if (pill) {
        pill.style.background = currentState === 0 ? "rgba(16,185,129,0.18)" : currentState === 1 ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.22)";
        pill.style.color = currentState === 0 ? "#34d399" : currentState === 1 ? "#fbbf24" : "#f87171";
      }
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

  const d = DB[currentLang] || DB.ru;
  const labelDict = (d && d.labels) || {};
  const drawQueue = [];

  (model.polys || []).forEach((poly) => {
    if (!poly.pts || !poly.pts.length) return;
    const proj = poly.pts.map((p) => project3D(p[0], p[1], p[2]));
    const avgZ = proj.reduce((acc, v) => acc + v.z, 0) / proj.length;
    drawQueue.push({
      z: avgZ,
      draw: () => {
        ctx.save(); ctx.beginPath();
        proj.forEach((v, idx) => (idx === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)));
        ctx.closePath();
        ctx.fillStyle = isXray ? "rgba(56,189,248,0.14)" : (poly.color || "#94a3b8");
        ctx.fill();
        ctx.strokeStyle = isXray ? "rgba(125,211,252,0.55)" : (poly.stroke || "rgba(15,23,42,0.3)");
        ctx.lineWidth = poly.lw || 1;
        ctx.stroke(); ctx.restore();
      }
    });
  });

  (model.tubes || []).forEach((t) => {
    const p1 = project3D(t.a[0], t.a[1], t.a[2]);
    const p2 = project3D(t.b[0], t.b[1], t.b[2]);
    const rad = (t.r || 4) * ((p1.scale + p2.scale) / 2) * 0.68;
    drawQueue.push({ z: (p1.z + p2.z) / 2, draw: () => draw3DTube(p1.x, p1.y, p2.x, p2.y, rad, t.color || "#38bdf8") });
  });

  (model.spheres || []).forEach((s) => {
    const p = project3D(s.p[0], s.p[1], s.p[2]);
    const rad = (s.r || 5) * p.scale * 0.68;
    drawQueue.push({ z: p.z, draw: () => draw3DSphere(p.x, p.y, rad, s.color || "#f87171") });
  });

  drawQueue.sort((a, b) => b.z - a.z);
  drawQueue.forEach((item) => item.draw());

  (model.labels || []).forEach((lb) => {
    const p = project3D(lb.p[0], lb.p[1], lb.p[2]);
    const text = labelDict[lb.key] || lb.text || lb.key || "";
    if (!text) return;
    ctx.save();
    ctx.font = "600 12px system-ui, sans-serif";
    const tw = ctx.measureText(text).width;
    ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
    ctx.fillRect(p.x - tw / 2 - 6, p.y - 11, tw + 12, 20);
    ctx.fillStyle = lb.color || "#f8fafc";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(text, p.x, p.y);
    ctx.restore();
  });
}

if (canvas) {
  let lastX = 0, lastY = 0;
  canvas.addEventListener("mousedown", (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    rotY += (e.clientX - lastX) * 0.008;
    rotX = Math.max(-1.45, Math.min(1.45, rotX + (e.clientY - lastY) * 0.008));
    lastX = e.clientX; lastY = e.clientY;
  });
  window.addEventListener("mouseup", () => { isDragging = false; });
  canvas.addEventListener("wheel", (e) => { e.preventDefault(); zoomStep(e.deltaY < 0 ? 0.1 : -0.1); }, { passive: false });
  canvas.addEventListener("touchstart", (e) => { if (e.touches.length === 1) { isDragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; } }, { passive: true });
  canvas.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    rotY += (e.touches[0].clientX - lastX) * 0.008;
    rotX = Math.max(-1.45, Math.min(1.45, rotX + (e.touches[0].clientY - lastY) * 0.008));
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener("touchend", () => { isDragging = false; });
}

updateUI();
renderLoop();
