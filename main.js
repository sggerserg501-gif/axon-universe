(function () {
  // ===== Камера для каждого из 10 разделов =====
  const sectionBaseZoom = [1.35, 1.25, 1.55, 1.55, 1.35, 1.45, 2.15, 1.45, 1.45, 1.40];
  const sectionBaseAngles = [
    { rx: 0.28, ry: -0.62 }, { rx: 0.22, ry: -0.45 },
    { rx: 0.18, ry: -0.35 }, { rx: 0.35, ry: -0.45 },
    { rx: 0.28, ry: -0.62 }, { rx: 0.20, ry: -0.35 },
    { rx: 0.15, ry: -0.30 }, { rx: 0.22, ry: -0.50 },
    { rx: 0.15, ry: -0.25 }, { rx: 0.20, ry: -0.40 }
  ];

  function applySectionCamera(idx) {
    const ang = sectionBaseAngles[idx] || { rx: 0.25, ry: -0.45 };
    rotX = ang.rx; rotY = ang.ry;
    zoom = (sectionBaseZoom[idx] || 1.45) * (window.innerWidth <= 768 ? 0.82 : 1.0);
  }

  function updatePauseBtn() {
    const btn = document.getElementById("pauseBtn");
    if (btn) btn.textContent = isPaused ? "Пуск ▶" : "Пауза ⏸";
  }

  // ===== ИНТЕРФЕЙС: вкладки, стадии, карточка =====
  window.updateUI = function () {
    const d = DB[currentLang] || DB.ru;
    if (!d || !d.ui) return;
    const setTxt = function (id, v) {
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
      d.ui.tabs.forEach(function (name, i) {
        const b = document.createElement("button");
        b.className = "tab-btn" + (i === currentMod ? " active" : "");
        b.textContent = name;
        b.onclick = function () { setModule(i); };
        tabsBox.appendChild(b);
      });
    }

    const mod = d.modules && d.modules[currentMod];
    const statesBox = document.getElementById("statesBox");
    if (statesBox && mod && Array.isArray(mod.buttons)) {
      statesBox.innerHTML = "";
      mod.buttons.forEach(function (name, i) {
        const b = document.createElement("button");
        b.className = "state-btn" + (i === currentState ? " active" : "");
        b.textContent = name;
        b.onclick = function () { setState(i); };
        statesBox.appendChild(b);
      });
    }

    const st = mod && mod.states && mod.states[currentState];
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
    updatePauseBtn();
  };

  window.setLang = function (l) {
    currentLang = l;
    const sel = document.getElementById("langSelect");
    if (sel) sel.value = l;
    updateUI();
  };

  window.setState = function (idx) { currentState = idx; updateUI(); };

  window.setModule = function (idx) {
    currentMod = idx; currentState = 0;
    applySectionCamera(idx);
    isPaused = true; updatePauseBtn(); updateUI();
  };

  window.togglePause = function () { isPaused = !isPaused; updatePauseBtn(); };

  window.toggleFullscreen = function () {
    const vp = document.getElementById("viewport") || document.documentElement;
    if (!document.fullscreenElement) {
      if (vp.requestFullscreen) vp.requestFullscreen().catch(function () {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
  };

  window.toggleEditor = function () {
    const box = document.getElementById("editorBox");
    if (!box) return;
    const open = box.style.display === "block";
    box.style.display = open ? "none" : "block";
    if (!open) {
      const d = DB[currentLang] || DB.ru;
      const st = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
      if (st) {
        if (document.getElementById("edTitle")) document.getElementById("edTitle").value = st.title || "";
        if (document.getElementById("edDesc")) document.getElementById("edDesc").value = st.desc || "";
        if (document.getElementById("edTactics")) document.getElementById("edTactics").value = st.tactics || "";
        if (document.getElementById("edAuthor")) document.getElementById("edAuthor").value = st.author || "";
        if (document.getElementById("guardMsg")) document.getElementById("guardMsg").textContent = "";
      }
    }
  };

  window.applyEdit = function () {
    const title = (document.getElementById("edTitle") || {}).value || "";
    const desc = (document.getElementById("edDesc") || {}).value || "";
    const tactics = (document.getElementById("edTactics") || {}).value || "";
    const author = (document.getElementById("edAuthor") || {}).value || "";
    const msg = document.getElementById("guardMsg");
    if (/(http|www\.|\.ru|\.com|мг|мл|таблет|дозиров|рецепт|телефон|8\s?$?\d{3}$?
)/i.test(title + desc + tactics + author)) {
      if (msg) { msg.style.color = "#f87171"; msg.textContent = "Заблокировано: дозировки, рецепты и ссылки."; }
      return;
    }
    const d = DB[currentLang] || DB.ru;
    const st = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
    if (st) {
      if (title.trim()) st.title = title.trim();
      if (desc.trim()) st.desc = desc.trim();
      if (tactics.trim()) st.tactics = tactics.trim();
      if (author.trim()) st.author = author.trim();
    }
    if (msg) { msg.style.color = "#34d399"; msg.textContent = "Изменения применены."; }
    updateUI();
  };

  window.exportJSON = function () {
    const d = DB[currentLang] || DB.ru;
    const st = d && d.modules && d.modules[currentMod] && d.modules[currentMod].states[currentState];
    if (!st) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(st, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "atlas_" + currentLang + "_m" + currentMod + "_s" + currentState + ".json";
    a.click();
    URL.revokeObjectURL(url);
  };

  window.openGithubPR = function () {
    const t = encodeURIComponent("Медицинская правка: раздел " + (currentMod + 1) + ", стадия " + (currentState + 1));
    window.open("https://github.com/sggerserg501-gif/axon-universe/issues/new?title=" + t, "_blank");
  };

  // ===== ПОДПИСИ =====
  function drawLabel(lb, p) {
    const text = lb.t || "";
    if (!text) return;
    ctx.save();
    ctx.font = "600 12px system-ui, sans-serif";
    const tw = ctx.measureText(text).width;
    const padX = 6;
    const lx = p.x + (lb.ox || 0);
    const ly = p.y + (lb.oy || 0);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(lx, ly); ctx.stroke();
    const left = (lb.ox || 0) < 0;
    const bx = left ? lx - tw - padX : lx - padX;
    ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
    ctx.fillRect(bx, ly - 14, tw + padX * 2, 20);
    ctx.fillStyle = "#f1f5f9";
    ctx.textAlign = left ? "right" : "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, lx, ly - 4);
    ctx.restore();
  }

  // ===== ЦИКЛ ОТРИСОВКИ =====
  function renderLoop() {
    requestAnimationFrame(renderLoop);
    resizeCanvas();
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isPaused && !isDragging) rotY += 0.005;

    const builder = window.AtlasParts && window.AtlasParts[currentMod];
    if (!builder) return;
    let model;
    try { model = builder(currentState, currentLang); } catch (e) { return; }
    if (!model) return;

    const q = [];

    (model.polys || []).forEach(function (poly) {
      if (!poly.pts || !poly.pts.length) return;
      const proj = poly.pts.map(function (p) { return project3D(p.x, p.y, p.z); });
      const avgZ = proj.reduce(function (acc, v) { return acc + v.z; }, 0) / proj.length;
      q.push({
        z: avgZ,
        draw: function () {
          ctx.save();
          if (isXray && poly.isBone) ctx.globalAlpha = 0.35;
          ctx.beginPath();
          proj.forEach(function (v, i) { if (i === 0) ctx.moveTo(v.x, v.y); else ctx.lineTo(v.x, v.y); });
          ctx.closePath();
          ctx.fillStyle = poly.c || "#94a3b8";
          ctx.fill();
          if (poly.stroke) { ctx.strokeStyle = poly.stroke; ctx.lineWidth = 1; ctx.stroke(); }
          ctx.restore();
        }
      });
    });

    (model.tubes || []).forEach(function (tb) {
      const p1 = project3D(tb.x1, tb.y1, tb.z1);
      const p2 = project3D(tb.x2, tb.y2, tb.z2);
      const r1 = (tb.r || 4) * p1.sc;
      const r2 = (tb.r || 4) * p2.sc;
      q.push({
        z: (p1.z + p2.z) / 2,
        draw: function () { draw3DTube(p1, p2, r1, r2, tb.c || "#38bdf8", tb.isBone); }
      });
    });

    (model.pts || []).forEach(function (s) {
      const p = project3D(s.x, s.y, s.z);
      q.push({
        z: p.z,
        draw: function () { draw3DSphere(p.x, p.y, (s.r || 5) * p.sc, s.c || "#f87171", 1, s.isBone); }
      });
    });

    q.sort(function (a, b) { return b.z - a.z; });
    q.forEach(function (item) { item.draw(); });

    (model.labels || []).forEach(function (lb) {
      drawLabel(lb, project3D(lb.x, lb.y, lb.z));
    });
  }

  // ===== СТАРТ =====
  applySectionCamera(currentMod);
  updateUI();
  renderLoop();
})();
