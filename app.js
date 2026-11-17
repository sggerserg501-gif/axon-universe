let currentLang = "ru";
let currentMod = 0;
let currentState = 0;
let isPaused = false;

function shadeColor(hex, factor) {
  if (!hex.startsWith("#")) return hex;
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));
  return `rgb(${r},${g},${b})`;
}

function draw3DSphere(x, y, r, color, depthAlpha) {
  ctx.save();
  ctx.globalAlpha = depthAlpha;
  const isGlow = color === "#ef4444" || color === "#f59e0b" || color === "#fef08a" || color === "#facc15";
  if (isGlow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = Math.min(20, r * 1.2);
  }
  if (color.startsWith("rgba")) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 6.28);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    return;
  }
  const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.25, color);
  grad.addColorStop(0.8, shadeColor(color, 0.65));
  grad.addColorStop(1, "#060911");

  ctx.beginPath();
  ctx.arc(x, y, r, 0, 6.28);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

function draw3DTube(p1, p2, r1, r2, color) {
  ctx.save();
  ctx.lineCap = "round";
  const avgR = (r1 + r2) * 0.5;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = shadeColor(color, 0.45);
  ctx.lineWidth = avgR * 2.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = avgR * 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(p1.x - avgR * 0.25, p1.y - avgR * 0.25);
  ctx.lineTo(p2.x - avgR * 0.25, p2.y - avgR * 0.25);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = Math.max(1.5, avgR * 0.45);
  ctx.stroke();
  ctx.restore();
}

function renderLoop() {
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isDragging && !isPaused) rotY += 0.004;

  const scene = buildScene(currentMod, currentState, currentLang);
  let renderList = [];

  for (let o of scene.pts) {
    const q = project3D(o.x, o.y, o.z);
    renderList.push({ type: "pt", z: q.z, x: q.x, y: q.y, r: o.r * q.sc, c: o.c });
  }

  if (scene.tubes) {
    for (let t of scene.tubes) {
      const q1 = project3D(t.x1, t.y1, t.z1);
      const q2 = project3D(t.x2, t.y2, t.z2);
      renderList.push({ type: "tube", z: (q1.z + q2.z) * 0.5, p1: q1, p2: q2, r1: t.r * q1.sc, r2: t.r * q2.sc, c: t.c });
    }
  }

  if (scene.polys) {
    for (let p of scene.polys) {
      const qPts = p.pts.map(pt => project3D(pt.x, pt.y, pt.z));
      const avgZ = qPts.reduce((s, v) => s + v.z, 0) / qPts.length;
      renderList.push({ type: "poly", z: avgZ, pts: qPts, c: p.c, stroke: p.stroke });
    }
  }

  renderList.sort((a, b) => b.z - a.z);

  for (let item of renderList) {
    if (item.type === "pt") {
      const depthAlpha = Math.max(0.5, Math.min(1, 1 - item.z / 550));
      draw3DSphere(item.x, item.y, Math.max(2.5, item.r), item.c, depthAlpha);
    } else if (item.type === "tube") {
      draw3DTube(item.p1, item.p2, Math.max(2, item.r1), Math.max(2, item.r2), item.c);
    } else if (item.type === "poly") {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(item.pts[0].x, item.pts[0].y);
      for (let i = 1; i < item.pts.length; i++) ctx.lineTo(item.pts[i].x, item.pts[i].y);
      ctx.closePath();
      const light = Math.max(0.45, Math.min(1.25, 1 - item.z / 280));
      ctx.fillStyle = shadeColor(item.c, light);
      ctx.fill();
      if (item.stroke) {
        ctx.strokeStyle = item.stroke;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  ctx.font = "bold 14px Segoe UI, Arial, sans-serif";
  for (let l of scene.labels) {
    const q = project3D(l.x, l.y, l.z);
    const w = ctx.measureText(l.t).width + 18;
    let tx = Math.max(12, Math.min(canvas.width - w - 12, q.x + l.ox));
    let ty = Math.max(24, Math.min(canvas.height - 16, q.y + l.oy));

    ctx.beginPath();
    ctx.moveTo(q.x, q.y);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.stroke();

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
  resizeCanvas();
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
  if (/https?:\/\/|www\.|@|(\+?\d[\d\s\-()]{7,}\d)/i.test(full + " " + author)) {
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
  const rawBody = "Author / Clinic: " + info.author + "\nLanguage: " + currentLang.toUpperCase() + "\nModule: " + modName + "\n\nClinical Description:\n" + info.desc + "\n\nClinical Strategy:\n" + info.tactics;
  const title = encodeURIComponent("[Medical Edit - " + currentLang.toUpperCase() + "] " + modName + " - " + info.title);
     const slash = String.fromCharCode(47);
  const base = "https:" + slash + slash + "github.com" + slash + "sggerserg501-gif" + slash + "axon-universe" + slash + "issues" + slash + "new?title=";

 
  


  if (rawBody.length > 1800) {
    navigator.clipboard.writeText(rawBody);
    showReport("warn", currentLang === "ru" ? "⚠ Текст скопирован в буфер обмена — вставьте его в открывшееся окно GitHub." : "⚠ Text copied to clipboard — paste it into the opened GitHub issue.");
    window.open(base + title, "_blank");
    return;
  }

  const url = base + title + "&body=" + encodeURIComponent(rawBody);
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
const DISC_TEXTS = {
  ru: {
    t: "⚠️ Важное медицинское уведомление",
    d: "Платформа <b>OpenNeuroAtlas 3D</b> предназначена исключительно для образовательных и ознакомительных целей. Представленные 3D-модели и тексты не являются медицинской консультацией, диагнозом или назначением лечения. При любых симптомах обратитесь к врачу.",
    b: "Я понимаю и принимаю условия"
  },
  en: {
    t: "⚠️ Important Medical Disclaimer",
    d: "<b>OpenNeuroAtlas 3D</b> is strictly for educational and informational purposes. The 3D models and texts do not constitute medical advice, diagnosis, or treatment. Always consult a qualified physician.",
    b: "I Understand and Accept"
  },
  es: {
    t: "⚠️ Aviso Médico Importante",
    d: "<b>OpenNeuroAtlas 3D</b> tiene fines exclusivamente educativos e informativos. No constituye consejo médico, diagnóstico ni tratamiento. Consulte siempre a un médico.",
    b: "Entiendo y Acepto"
  },
  de: {
    t: "⚠️ Wichtiger Medizinischer Hinweis",
    d: "<b>OpenNeuroAtlas 3D</b> dient ausschließlich Bildungs- und Informationszwecken und ersetzt keine ärztliche Beratung, Diagnose oder Behandlung.",
    b: "Ich verstehe und akzeptiere"
  },
  zh: {
    t: "⚠️ 重要医疗免责声明",
    d: "<b>OpenNeuroAtlas 3D</b> 仅用于教育和科普参考，不构成医疗建议、诊断或治疗方案。如有任何症状，请务必咨询专业医生。",
    b: "我已了解并同意"
  }
};

function updateDisclaimerLang(lang) {
  const m = DISC_TEXTS[lang] || DISC_TEXTS.en;
  const tEl = document.getElementById("discTitle");
  const dEl = document.getElementById("discText");
  const bEl = document.getElementById("discAcceptBtn");
  if (tEl) tEl.innerText = m.t;
  if (dEl) dEl.innerHTML = m.d;
  if (bEl) bEl.innerText = m.b;
}

function acceptMedicalDisclaimer() {
  localStorage.setItem("ona_disclaimer_ok", "1");
  const modal = document.getElementById("medDisclaimerModal");
  if (modal) modal.style.display = "none";
}

(function initSafetyGuard() {
  const modal = document.getElementById("medDisclaimerModal");
  if (modal && localStorage.getItem("ona_disclaimer_ok") === "1") {
    modal.style.display = "none";
  }
   const origChangeLang = window.changeLang;
  if (typeof origChangeLang === "function") {
    window.changeLang = function(langCode) {
      origChangeLang(langCode);
      updateDisclaimerLang(langCode);
    };
  }
  const origValidate = window.validateMedicalText;
  if (typeof origValidate === "function") {
    window.validateMedicalText = function(desc, tactics, author) {
      const fullText = (desc + " " + tactics).toLowerCase();
      const forbidden = /(\d+\s*(мг|мл|г|табл|капс|ед|mg|ml|tab|caps)|дозировк|рецепт|принимать по|колоть|инъекц|dosage|prescription|take \d+)/i;
      if (forbidden.test(fullText)) {
        return {
          status: "err",
          msg: currentLang === "ru"
            ? "⛔ БЛОКИРОВКА БЕЗОПАСНОСТИ: Запрещено указывать конкретные дозировки, рецепты и схемы приёма лекарств!"
            : "⛔ SAFETY BLOCK: Specific dosages, prescriptions, or medication regimens are strictly forbidden!"
        };
      }
      return origValidate(desc, tactics, author);
    };
  }
})();
