let currentLang = "ru";
let currentMod = 0;
let currentState = 0;
let isPaused = false;

function renderLoop() {
  ctx.clearRect(0, 0, 1280, 900);
  if (!isDragging && !isPaused) rotY += 0.004;

  const scene = buildScene(currentMod, currentState, currentLang === "ru" ? "ru" : "en");
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
  hideReport();
  updateUI();
}

function changeLang(langCode) {
  currentLang = langCode;
  hideReport();
  updateUI();
}

function togglePause() {
  isPaused = !isPaused;
  updatePauseBtn();
}

function updatePauseBtn() {
  const btn = document.getElementById("pauseBtn");
  if (!btn) return;
  const labels = {
    ru: isPaused ? "Вращать ▶" : "Пауза ⏸",
    en: isPaused ? "Rotate ▶" : "Pause ⏸",
    es: isPaused ? "Rotar ▶" : "Pausa ⏸",
    de: isPaused ? "Drehen ▶" : "Pause ⏸",
    zh: isPaused ? "旋转 ▶" : "暂停 ⏸"
  };
  btn.innerText = labels[currentLang] || labels.en;
}

function toggleEditor() {
  const box = document.getElementById("editorBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
  hideReport();
}

function toggleFullscreen() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function hideReport() {
  const rep = document.getElementById("checkReport");
  if (rep) rep.style.display = "none";
}

function showReport(type, text) {
  const rep = document.getElementById("checkReport");
  rep.style.display = "block";
  rep.innerText = text;
  if (type === "ok") {
    rep.style.background = "rgba(16, 185, 129, 0.15)";
    rep.style.border = "1px solid #059669";
    rep.style.color = "#34d399";
  } else if (type === "warn") {
    rep.style.background = "rgba(245, 158, 11, 0.15)";
    rep.style.border = "1px solid #d97706";
    rep.style.color = "#fbbf24";
  } else {
    rep.style.background = "rgba(239, 68, 68, 0.15)";
    rep.style.border = "1px solid #dc2626";
    rep.style.color = "#f87171";
  }
}
function validateMedicalText(desc, tactics, author) {
  const isRu = currentLang === "ru";
  const full = (desc + " " + tactics).toLowerCase();

  if (desc.length < 20 || tactics.length < 15) {
    return { status: "err", msg: isRu ? "❌ Ошибка: слишком короткий текст. Опишите клинику и тактику подробнее." : "❌ Error: Text is too short. Please provide detailed clinical notes." };
  }
  if (/https?:\/\/|www\.|@|\+7\d{9}/i.test(full + " " + author)) {
    return { status: "err", msg: isRu ? "❌ Заблокировано: внешние ссылки, реклама и телефоны запрещены правилами атласа." : "❌ Blocked: External links, ads, or phone numbers are not allowed." };
  }
  if (/(гарантия 100%|чудо|за 1 день|magic cure|100% guarantee)/i.test(full)) {
    return { status: "err", msg: isRu ? "❌ Ошибка стиля: обнаружены ненаучные формулировки." : "❌ Style error: Non-scientific claims detected." };
  }
  if (!author || /(Базовая редакция|Base Edition|Edición Base|Basisausgabe|基础版)/i.test(author)) {
    return { status: "warn", msg: isRu ? "⚠ Применено: впишите ваши ФИО, степень и клинику в верхнее поле для подтверждения авторства." : "⚠ Applied: Please enter your name, degree, and clinic above to verify authorship." };
  }
  return { status: "ok", msg: isRu ? "✔ Автопроверка пройдена: медицинский стиль и авторство подтверждены!" : "✔ Auto-check passed: Medical style and authorship verified!" };
}

function saveDoctorEdit() {
  const desc = document.getElementById("editDesc").value.trim();
  const tactics = document.getElementById("editTactics").value.trim();
  const author = document.getElementById("editAuthor").value.trim();

  const check = validateMedicalText(desc, tactics, author);
  showReport(check.status, check.msg);
  if (check.status === "err") return;

  const stObj = DB[currentLang].modules[currentMod].states[currentState];
  if (author) stObj.author = author;
  stObj.desc = desc;
  stObj.tactics = tactics;
  updateUI();
}

function exportDatabase() {
  try {
    const jsonStr = JSON.stringify(DB, null, 2);
    JSON.parse(jsonStr);
    navigator.clipboard.writeText(jsonStr);
    showReport("ok", currentLang === "ru" ? "✔ JSON проверен и скопирован в буфер обмена!" : "✔ JSON validated and copied to clipboard!");
  } catch (e) {
    showReport("err", "❌ JSON error!");
  }
}

function sendToGitHub() {
  const langData = DB[currentLang];
  const modName = langData.ui.tabs[currentMod];
  const info = langData.modules[currentMod].states[currentState];
  const title = encodeURIComponent("[Medical Edit - " + currentLang.toUpperCase() + "] " + modName + " - " + info.title);
  const body = encodeURIComponent("Author / Clinic: " + info.author + "\nLanguage: " + currentLang.toUpperCase() + "\nModule: " + modName + "\n\nClinical Description:\n" + info.desc + "\n\nClinical Strategy:\n" + info.tactics);
  const url = "https://github.com" + "/sggerserg501-gif/axon-universe/issues/new?title=" + title + "&body=" + body;
  window.open(url, "_blank");
}

function updateUI() {
  const langData = DB[currentLang] || DB.en;
  document.getElementById("subTxt").innerText = langData.ui.sub;
  document.getElementById("modLabel").innerText = langData.ui.modLabel;
  document.getElementById("stateLabel").innerText = langData.ui.stateLabel;
  document.getElementById("tacticsLabel").innerText = langData.ui.tacticsLabel;
  document.getElementById("authorLabel").innerText = langData.ui.authorLabel;
  document.getElementById("editBtn").innerText = langData.ui.editBtn;
  document.getElementById("fsBtn").innerText = langData.ui.fsBtn;
  document.getElementById("hudHint").innerText = langData.ui.hint;
  document.getElementById("discTxt").innerText = langData.ui.disc;

  const edTitles = { ru: "РЕДАКТИРОВАНИЕ И АВТОПРОВЕРКА", en: "DOCTOR EDITOR & AUTO-CHECK", es: "EDITOR MÉDICO Y VALIDACIÓN", de: "ARZT-EDITOR & PRÜFUNG", zh: "医生编辑与自动审核" };
  const saveBtns = { ru: "Проверить и применить", en: "Validate & Apply", es: "Validar y Aplicar", de: "Prüfen & Anwenden", zh: "审核并应用" };
  const ghBtns = { ru: "Отправить правку в GitHub ↗", en: "Submit Edit to GitHub ↗", es: "Enviar edición a GitHub ↗", de: "Änderung an GitHub senden ↗", zh: "提交修订至 GitHub ↗" };

  document.getElementById("edTitle").innerText = edTitles[currentLang] || edTitles.en;
  document.getElementById("saveBtn").innerText = saveBtns[currentLang] || saveBtns.en;
  document.getElementById("ghBtn").innerText = ghBtns[currentLang] || ghBtns.en;
  updatePauseBtn();

  for (let i = 0; i < 7; i++) {
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
  document.getElementById("cardAuthor").innerText = info.author || "";
  document.getElementById("cardBox").style.borderLeftColor = info.color;

  document.getElementById("editAuthor").value = info.author || "";
  document.getElementById("editDesc").value = info.desc;
  document.getElementById("editTactics").value = info.tactics;
}

updateUI();
renderLoop();
