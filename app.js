let currentLang = "ru";
let currentMod = 0;
let currentState = 0;

function renderLoop() {
  ctx.clearRect(0, 0, 1280, 900);
  if (!isDragging) rotY += 0.004;

  const scene = buildScene(currentMod, currentState, currentLang);
  const projected = scene.pts.map(o => {
    const q = project3D(o.x, o.y, o.z);
    return { ...q, r: o.r * q.sc, c: o.c };
  }).sort((a, b) => b.z - a.z);

  for (let o of projected) {
    ctx.beginPath();
    ctx.arc(o.x, o.y, Math.max(4, o.r), 0, 6.28);
    ctx.fillStyle = o.c;
    ctx.fill();
  }

  ctx.font = "bold 15px Segoe UI, Arial, sans-serif";
  for (let l of scene.labels) {
    const q = project3D(l.x, l.y, l.z);
    const tx = q.x + l.ox;
    const ty = q.y + l.oy;
    ctx.beginPath();
    ctx.moveTo(q.x, q.y);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.stroke();

    const w = ctx.measureText(l.t).width + 18;
    ctx.fillStyle = "rgba(15, 23, 42, 0.94)";
    ctx.fillRect(tx, ty - 18, w, 26);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1;
    ctx.strokeRect(tx, ty - 18, w, 26);
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(l.t, tx + 9, ty + 1);
  }
  requestAnimationFrame(renderLoop);
}

function selectModule(idx, el) {
  currentMod = idx;
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  selectState(0, document.getElementById("st0"));
}

function selectState(idx, el) {
  currentState = idx;
  document.querySelectorAll(".state-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  updateUI();
}

function toggleLang() {
  currentLang = currentLang === "ru" ? "en" : "ru";
  updateUI();
}

function toggleEditor() {
  const box = document.getElementById("editorBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function toggleFullscreen() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function saveDoctorEdit() {
  const stObj = DB[currentLang].modules[currentMod].states[currentState];
  stObj.desc = document.getElementById("editDesc").value;
  stObj.tactics = document.getElementById("editTactics").value;
  updateUI();
}

function exportDatabase() {
  navigator.clipboard.writeText(JSON.stringify(DB, null, 2));
  alert(currentLang === "ru" ? "Обновленная база знаний (JSON) скопирована для GitHub!" : "Updated JSON database copied for GitHub!");
}

function updateUI() {
  const langData = DB[currentLang];
  document.getElementById("langBtn").innerText = currentLang === "ru" ? "EN" : "RU";
  document.getElementById("subTxt").innerText = langData.ui.sub;
  document.getElementById("modLabel").innerText = langData.ui.modLabel;
  document.getElementById("stateLabel").innerText = langData.ui.stateLabel;
  document.getElementById("tacticsLabel").innerText = langData.ui.tacticsLabel;
  document.getElementById("editBtn").innerText = langData.ui.editBtn;
  document.getElementById("fsBtn").innerText = langData.ui.fsBtn;
  document.getElementById("hudHint").innerText = langData.ui.hint;
  document.getElementById("discTxt").innerText = langData.ui.disc;

  for (let i = 0; i < 4; i++) {
    document.getElementById("tab" + i).innerText = langData.ui.tabs[i];
  }
  for (let i = 0; i < 3; i++) {
    document.getElementById("st" + i).innerText = langData.modules[currentMod].buttons[i];
  }

  const info = langData.modules[currentMod].states[currentState];
  const pill = document.getElementById("pillTxt");
  pill.innerText = info.pill;
  pill.style.color = info.color;
  pill.style.background = info.color + "22";

  document.getElementById("cardTitle").innerText = info.title;
  document.getElementById("cardDesc").innerText = info.desc;
  document.getElementById("cardTactics").innerText = info.tactics;
  document.getElementById("cardBox").style.borderLeftColor = info.color;

  document.getElementById("editDesc").value = info.desc;
  document.getElementById("editTactics").value = info.tactics;
}

updateUI();
renderLoop();
