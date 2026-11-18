const sectionBaseZoom = [1.55, 1.35, 1.65, 1.65, 1.55, 1.55, 1.85, 1.55];
const sectionBaseAngles = [
  { rx: 0.25, ry: -0.45 }, { rx: 0.22, ry: -0.45 },
  { rx: 0.18, ry: -0.35 }, { rx: 0.35, ry: -0.45 },
  { rx: 0.25, ry: -0.45 }, { rx: 0.20, ry: -0.35 },
  { rx: 0.15, ry: -0.30 }, { rx: 0.22, ry: -0.50 }
];

function applySectionCamera(idx) {
  const ang = sectionBaseAngles[idx] || { rx: 0.25, ry: -0.45 };
  rotX = ang.rx;
  rotY = ang.ry;
  zoom = (sectionBaseZoom[idx] || 1.55) * (window.innerWidth <= 768 ? 0.82 : 1.0);
}

function setLang(l) {
  currentLang = l;
  updateUI();
}

function setState(idx) {
  currentState = idx;
  updateUI();
}

function setModule(idx) {
  currentMod = idx;
  currentState = 0;
  applySectionCamera(idx);
  updateUI();
}

function togglePause() {
  isPaused = !isPaused;
  updatePauseBtn();
}

function updatePauseBtn() {
  const btn = document.getElementById("pauseBtn");
  if (!btn) return;
  const playTxt = currentLang === "ru" ? "Пуск ▶" : "Play ▶";
  const pauseTxt = currentLang === "ru" ? "Пауза ⏸" : "Pause ⏸";
  btn.textContent = isPaused ? playTxt : pauseTxt;
}

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
    const d = (typeof DB !== "undefined" && (DB[currentLang] || DB.ru)) || null;
    const st = d?.modules?.[currentMod]?.states?.[currentState];
    if (st) {
      if (document.getElementById("edTitle")) document.getElementById("edTitle").value = st.title || "";
      if (document.getElementById("edDesc")) document.getElementById("edDesc").value = st.desc || "";
      if (document.getElementById("edTactics")) document.getElementById("edTactics").value = st.tactics || "";
      if (document.getElementById("edAuthor")) document.getElementById("edAuthor").value = st.author || "";
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

  if (/(http|www\.|\.ru|\.com|мг|мл|таблет|дозиров|рецепт|телефон|\+7|8\s?\(?\d{3}\)?)/i.test(title + desc + tactics + author)) {
    if (msg) {
      msg.style.color = "#f87171";
      msg.textContent = "⚠ Заблокировано: дозировки, рецепты, телефоны и ссылки запрещены.";
    }
    return;
  }

  const d = (typeof DB !== "undefined" && (DB[currentLang] || DB.ru)) || null;
  const st = d?.modules?.[currentMod]?.states?.[currentState];
  if (st) {
    if (title) st.title = title;
    if (desc) st.desc = desc;
    if (tactics) st.tactics = tactics;
    if (author) st.author = author;
  }
  if (msg) {
    msg.style.color = "#34d399";
    msg.textContent = "✓ Изменения применены к карточке.";
  }
  updateUI();
}

function exportJSON() {
  const d = (typeof DB !== "undefined" && (DB[currentLang] || DB.ru)) || null;
  const st = d?.modules?.[currentMod]?.states?.[currentState];
  if (!st) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(st, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `atlas_${currentLang}_m${currentMod}_s${currentState}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function openGithubPR() {
  const t = encodeURIComponent("Медицинская правка: раздел " + (currentMod + 1) + ", стадия " + (currentState + 1));
  window.open("https://github.com" + t, "_blank");
}

function updateUI() {
  if (typeof DB === "undefined") return;
  const d = DB[currentLang] || DB.ru;
  if (!d || !d.ui || !d.modules) return;

  const setTxt = (id, v) => {
    const el = document.getElementById(id);
    if (el && v !== undefined) el.textContent = v;
  };

  setTxt("subText", d.ui.sub);
  setTxt("modLabel", d.ui.modLabel);
  setTxt("stateLabel", d.ui.stateLabel);
  setTxt("tacticsLabel", d.ui.tacticsLabel);
  setTxt("authorLabel", d.ui.authorLabel);
  setTxt("discText", d.ui.disc);
  setTxt("hintText", d.ui.hint);
  setTxt("editBtn", d.ui.editBtn);
  setTxt("fsBtn", d.ui.fsBtn);

  const tabsBox = document.getElementById("tabsBox");
  if (tabsBox && Array.isArray(d.ui.tabs)) {
    tabsBox.innerHTML = "";
    d.ui.tabs.forEach((tabName, i) => {
      const b = document.createElement("button");
      b.className = "tab-btn" + (i === currentMod ? " active" : "");
      b.textContent = tabName;
      b.onclick = () => setModule(i);
      tabsBox.appendChild(b);
    });
  }

  const statesBox = document.getElementById("statesBox");
  const mod = d.modules[currentMod];
  if (statesBox && mod && Array.isArray(mod.buttons)) {
    statesBox.innerHTML = "";
    mod.buttons.forEach((btnText, i) => {
      const b = document.createElement("button");
      b.className = "state-btn" + (i === currentState ? " active" : "");
      b.textContent = btnText;
      b.onclick = () => setState(i);
      statesBox.appendChild(b);
    });
  }

  const st = mod?.states?.[currentState];
  if (st) {
    setTxt("statusPill", st.pill);
    setTxt("cardTitle", st.title);
    setTxt("cardDesc", st.desc);
    setTxt("cardTactics", st.tactics);
    setTxt("cardAuthor", st.author);
    const pill = document.getElementById("statusPill");
    if (pill) {
      pill.style.background = currentState === 0 ? "rgba(56,189,248,0.16)" : currentState === 1 ? "rgba(245,158,11,0.20)" : "rgba(239,68,68,0.22)";
      pill.style.color = st.color || (currentState === 0 ? "#38bdf8" : currentState === 1 ? "#fbbf24" : "#f87171");
    }
  }
  updatePauseBtn();
}
function drawScene() {
  if (!ctx || !canvas) return;
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isPaused && !isDragging) {
    rotY += 0.004;
  }

  const builder = window.AtlasParts && window.AtlasParts[currentMod];
  if (typeof builder !== "function") return;

  const scene = builder(currentState, currentLang);
  if (!scene) return;

  const renderList = [];

  (scene.polys || []).forEach((poly) => {
    const proj = poly.pts.map((p) => project3D(p.x, p.y, p.z));
    const avgZ = proj.reduce((sum, p) => sum + p.z, 0) / proj.length;
    renderList.push({ type: "poly", z: avgZ, proj, poly });
  });

  (scene.tubes || []).forEach((t) => {
    const p1 = project3D(t.x1, t.y1, t.z1);
    const p2 = project3D(t.x2, t.y2, t.z2);
    renderList.push({
      type: "tube",
      z: (p1.z + p2.z) * 0.5,
      p1,
      p2,
      r1: Math.max(1, t.r * p1.sc),
      r2: Math.max(1, t.r * p2.sc),
      c: t.c,
      isBone: t.isBone
    });
  });

  (scene.pts || []).forEach((pt) => {
    const p = project3D(pt.x, pt.y, pt.z);
    renderList.push({
      type: "sphere",
      z: p.z,
      x: p.x,
      y: p.y,
      r: Math.max(1.5, pt.r * p.sc),
      c: pt.c,
      isBone: pt.isBone
    });
  });

  renderList.sort((a, b) => b.z - a.z);
  renderList.forEach((item) => {
    if (item.type === "poly") {
      ctx.save();
      if (isXray && item.poly.isBone) ctx.globalAlpha = 0.18;
      ctx.beginPath();
      item.proj.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fillStyle = item.poly.c || "#94a3b8";
      ctx.fill();
      if (item.poly.stroke) {
        ctx.strokeStyle = item.poly.stroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();
    } else if (item.type === "tube") {
      draw3DTube(item.p1, item.p2, item.r1, item.r2, item.c, item.isBone);
    } else if (item.type === "sphere") {
      draw3DSphere(item.x, item.y, item.r, item.c, 1, item.isBone);
    }
  });

  (scene.labels || []).forEach((lbl) => {
    const p = project3D(lbl.x, lbl.y, lbl.z);
    const lx = p.x + (lbl.ox || 16);
    const ly = p.y + (lbl.oy || -12);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(lx, ly);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.75)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();

    ctx.font = "600 11px system-ui, -apple-system, sans-serif";
    const tw = ctx.measureText(lbl.t).width;
    const bx = lbl.ox < 0 ? lx - tw - 10 : lx;
    const by = ly - 10;

    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(bx, by, tw + 10, 18);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
    ctx.strokeRect(bx, by, tw + 10, 18);

    ctx.fillStyle = "#f1f5f9";
    ctx.fillText(lbl.t, bx + 5, by + 13);
    ctx.restore();
  });
}

function renderLoop() {
  drawScene();
  requestAnimationFrame(renderLoop);
}

window.addEventListener("DOMContentLoaded", () => {
  applySectionCamera(0);
  updateUI();
  renderLoop();
});

if (document.readyState !== "loading") {
  applySectionCamera(0);
  updateUI();
  renderLoop();
}
