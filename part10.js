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
