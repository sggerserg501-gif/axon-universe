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

if (typeof resizeCanvas !== "function") {
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
}

if (typeof project3D !== "function") {
  function project3D(x, y, z) {
    const cy = Math.cos(rotY), sy = Math.sin(rotY);
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const cx = Math.cos(rotX), sx = Math.sin(rotX);
    const y2 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    const fov = 520;
    const denom = Math.max(80, fov + z2);
    const scale = (fov / denom) * zoom;
    return {
      x: (canvas ? canvas.width / 2 : 400) + x1 * scale,
      y: (canvas ? canvas.height / 2 : 300) + y2 * scale,
      z: z2,
      scale: scale
    };
  }
}

if (typeof draw3DSphere !== "function") {
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
}

if (typeof draw3DTube !== "function") {
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
}

const sectionBaseZoom = [1.35, 1.25, 1.55, 1.55, 1.35, 1.45, 2.15, 1.45];
const sectionBaseAngles = [
  { rx: 0.28, ry: -0.62 }, // 0: Позвоночник
  { rx: 0.22, ry: -0.45 }, // 1: Головной мозг
  { rx: 0.18, ry: -0.35 }, // 2: Нейрон и Аксон
  { rx: 0.35, ry: -0.45 }, // 3: Сосуды мозга
  { rx: 0.28, ry: -0.62 }, // 4: Шейный отдел
  { rx: 0.20, ry: -0.35 }, // 5: Сердце и коронары
  { rx: 0.15, ry: -0.30 }, // 6: Вены ног и клапаны
  { rx: 0.22, ry: -0.50 }  // 7: Коленный сустав
];

function applySectionCamera(idx) {
  const ang = sectionBaseAngles[idx] || { rx: 0.25, ry: -0.45 };
  rotX = ang.rx;
  rotY = ang.ry;
  const mobileFactor = window.innerWidth <= 768 ? 0.82 : 1.0;
  zoom = (sectionBaseZoom[idx] || 1.45) * mobileFactor;
}

function setLang(l) {
  currentLang = l;
  updateUI();
}

function setModule(idx) {
  currentMod = idx;
  currentState = 0;
  applySectionCamera(idx);
  isPaused = true;
  updatePauseBtn();
  updateUI();
}

function setState(idx) {
  currentState = idx;
  updateUI();
}

function setCameraView(v) {
  isPaused = true;
  updatePauseBtn();
  if (v === "front") {
    applySectionCamera(currentMod);
  } else if (v === "side") {
    rotX = 0.15;
    rotY = -1.45;
  } else if (v === "top") {
    rotX = 1.35;
    rotY = 0.0;
  }
}
var setView = setCameraView;

function togglePause() {
  isPaused = !isPaused;
  updatePauseBtn();
}

function updatePauseBtn() {
  const btn = document.getElementById("pauseBtn");
  const d = DB[currentLang] || DB.ru;
  if (btn && d) {
    btn.textContent = isPaused ? (d.play || "Пуск ▶") : (d.pause || "Пауза ⏸");
  }
}

function toggleXray() {
  isXray = !isXray;
  const btn = document.getElementById("xrayBtn");
  if (btn) {
    btn.classList.toggle("active", isXray);
  }
}

function zoomStep(delta) {
  zoom = Math.max(0.45, Math.min(3.5, zoom + delta));
}

function toggleFullscreen() {
  const vp = document.getElementById("viewport") || document.documentElement;
  if (!document.fullscreenElement) {
    if (vp.requestFullscreen) vp.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }
}

function toggleEditor() {
  const box = document.getElementById("editorBox");
  if (!box) return;
  const isOpen = box.style.display === "block";
  box.style.display = isOpen ? "none" : "block";
  if (!isOpen) {
    const d = DB[currentLang] || DB.ru;
    const mod = d && d.modules && d.modules[currentMod];
    const stData = mod && mod.states && mod.states[currentState];
    if (stData) {
      const elTitle = document.getElementById("edTitle");
      const elDesc = document.getElementById("edDesc");
      const elTactics = document.getElementById("edTactics");
      const elAuthor = document.getElementById("edAuthor");
      const msg = document.getElementById("guardMsg");
      if (elTitle) elTitle.value = stData.title || "";
      if (elDesc) elDesc.value = stData.desc || "";
      if (elTactics) elTactics.value = stData.tactics || "";
      if (elAuthor) elAuthor.value = stData.author || "";
      if (msg) msg.textContent = "";
    }
  }
}

function applyEdit() {
  const elTitle = document.getElementById("edTitle");
  const elDesc = document.getElementById("edDesc");
  const elTactics = document.getElementById("edTactics");
  const elAuthor = document.getElementById("edAuthor");
  const msg = document.getElementById("guardMsg");

  const title = elTitle ? elTitle.value.trim() : "";
  const desc = elDesc ? elDesc.value.trim() : "";
  const tactics = elTactics ? elTactics.value.trim() : "";
  const author = elAuthor ? elAuthor.value.trim() : "";
  const combined = (title + " " + desc + " " + tactics + " " + author).toLowerCase();

  const forbidden = /(http|www\.|\.ru|\.com|мг|мл|таблет|дозиров|рецепт|телефон|\+7|8\s?\(?\d{3}\)?)/i;
  if (forbidden.test(combined)) {
    if (msg) {
      msg.style.color = "#f87171";
      msg.textContent = "⚠ Заблокировано: запрещены дозировки, рецепты, контакты и ссылки.";
    }
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

  if (msg) {
    msg.style.color = "#34d399";
    msg.textContent = "✓ Изменения проверены и применены.";
  }
  updateUI();
}
var saveCustomData = applyEdit;

function exportJSON() {
  const d = DB[currentLang] || DB.ru;
  const stData = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
  if (!stData) return;
  const jsonStr = JSON.stringify(stData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
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

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  };

  setTxt("subText", d.sub);
  setTxt("modLabel", d.modLabel);
  setTxt("stateLabel", d.stateLabel);
  setTxt("tacticsLabel", d.tacticsLabel);
  setTxt("authorLabel", d.authorLabel);
  setTxt("discText", d.disc);
  setTxt("hintText", d.hint);
  setTxt("editBtn", d.editBtn);
  setTxt("xrayBtn", d.xrayBtn);
  setTxt("fsBtn", d.fsBtn);

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
      setTxt("statusPill", st.pill);
      setTxt("cardTitle", st.title);
      setTxt("cardDesc", st.desc);
      setTxt("cardTactics", st.tactics);
      setTxt("cardAuthor", st.author);

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
  if (typeof resizeCanvas === "function") resizeCanvas();
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isPaused && !isDragging) {
    rotY += 0.006;
  }
  timeTick += 0.03;

  const builder = window.AtlasParts && window.AtlasParts[currentMod];
  if (!builder) return;

  const model = builder(currentState, timeTick);
  if (!model) return;

  const d = DB[currentLang] || DB.ru;
