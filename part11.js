(function () {
  // Снимаем ограничение 2.4 и разрешаем увеличение до 3.5
  window.zoomStep = function (delta) {
    if (typeof zoom !== "undefined") {
      zoom = Math.max(0.45, Math.min(3.5, zoom + delta));
    }
  };

  // Делаем 3D-модель крупной почти во весь экран при открытии
  function applyHugeZoom() {
    try {
      if (typeof zoom !== "undefined") {
        zoom = window.innerWidth <= 768 ? 1.75 : 2.15;
      }
    } catch (e) {}
  }

  applyHugeZoom();
  window.addEventListener("load", applyHugeZoom);
  setTimeout(applyHugeZoom, 250);

  const warmNotes = {
    ru: "💛 Помните: организм человека обладает огромным запасом прочности и способностью к восстановлению. Эта 3D-модель создана, чтобы спокойно и понятно разобраться в устройстве своего тела вместе с врачом.",
    en: "💛 Remember: the human body has remarkable resilience and capacity for recovery. This 3D model helps you calmly understand how your body works together with your doctor.",
    es: "💛 Recuerda: el cuerpo humano tiene una gran capacidad de recuperación. Este modelo 3D te ayuda a comprender tu salud con calma junto a tu médico.",
    de: "💛 Denken Sie daran: Der menschliche Körper besitzt eine enorme Kraft zur Erholung. Dieses 3D-Modell hilft Ihnen, Ihren Körper gemeinsam mit Ihrem Arzt in Ruhe zu verstehen.",
    zh: "💛 请记住：人体拥有强大的自我修复与恢复能力。此 3D 模型旨在帮助您与医生一起平和、清晰地了解身体结构。"
  };

  const origUpdateUI = window.updateUI;
  window.updateUI = function () {
    try {
      if (typeof origUpdateUI === "function") origUpdateUI();
      const card = document.getElementById("clinicalCard");
      if (!card) return;
      let note = document.getElementById("warmCareNote");
      if (!note) {
        note = document.createElement("div");
        note.id = "warmCareNote";
        note.style.cssText = "margin-top:12px; padding:10px 12px; background:rgba(14,165,233,0.12); border-left:3px solid #38bdf8; border-radius:6px; font-size:13px; line-height:1.55; color:#e0f2fe;";
        card.appendChild(note);
      }
      const lang = typeof currentLang !== "undefined" ? currentLang : "ru";
      note.textContent = warmNotes[lang] || warmNotes.ru;
    } catch (e) {}
  };

  try {
    if (typeof window.updateUI === "function") window.updateUI();
  } catch (e) {}
})();
