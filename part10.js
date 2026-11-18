const sectionBaseZoom = [1.35, 1.25, 1.55, 1.55, 1.35, 1.45, 2.15, 1.45];
const sectionBaseAngles = [
  { rx: 0.28, ry: -0.62 }, // 0: Позвоночник (вид сбоку-спереди, видны диск и нервы)
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

function setView(v) {
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

function toggleEditor() {
  const box = document.getElementById("editorBox");
  if (!box) return;
  const isOpen = box.style.display === "block";
  box.style.display = isOpen ? "none" : "block";
  if (!isOpen) {
    const d = DB[currentLang] || DB.ru;
    const stData = d.modules[currentMod].states[currentState];
    document.getElementById("edTitle").value = stData.title || "";
    document.getElementById("edDesc").value = stData.desc || "";
    document.getElementById("edTactics").value = stData.tactics || "";
    document.getElementById("edAuthor").value = stData.author || "";
    document.getElementById("edWarn").style.display = "none";
  }
}

function saveCustomData() {
  const title = document.getElementById("edTitle").value.trim();
  const desc = document.getElementById("edDesc").value.trim();
  const tactics = document.getElementById("edTactics").value.trim();
  const author = document.getElementById("edAuthor").value.trim();
  const combined = (title + " " + desc + " " + tactics + " " + author).toLowerCase();

  const forbidden = /(http|www\.|\.ru|\.com|мг|мл|таблет|дозиров|рецепт|телефон|\+7|8\s?\(?\d{3}\)?)/i;
  if (forbidden.test(combined)) {
    document.getElementById("edWarn").style.display = "block";
    return;
  }

  const d = DB[currentLang] || DB.ru;
  const stData = d.modules[currentMod].states[currentState];
  if (title) stData.title = title;
  if (desc) stData.desc = desc;
  if (tactics) stData.tactics = tactics;
  if (author) stData.author = author;

  document.getElementById("editorBox").style.display = "none";
  updateUI();
}

function updateUI() {
  const d = DB[currentLang] || DB.ru;
  if (!d) return;

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
  setTxt("viewFrontBtn", d.vFront);
  setTxt("viewSideBtn", d.vSide);
  setTxt("viewTopBtn", d.vTop);
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
  if (statesBox && mod) {
    statesBox.innerHTML = "";
    mod.states.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "state-btn" + (i === currentState ? " active" : "");
      b.textContent = s.btn;
      b.onclick = () => setState(i);
      statesBox.appendChild(b);
    });

    const st = mod.states[currentState];
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
  const labelDict = (d && d.labels) || {};
  const thickScale = 0.68;

  const drawQueue = [];

  (model.polys || []).forEach((poly) => {
    const proj = poly.pts.map((p) => project3D(p[0], p[1], p[2]));
    const avgZ = proj.reduce((acc, v) => acc + v.z, 0) / proj.length;
    drawQueue.push({
      z: avgZ,
      draw: () => {
        ctx.save();
        ctx.beginPath();
        proj.forEach((v, idx) => (idx === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)));
        ctx.closePath();
        ctx.fillStyle = isXray ? "rgba(56, 189, 248, 0.14)" : poly.color;
        ctx.fill();
        ctx.strokeStyle = isXray ? "rgba(125, 211, 252, 0.55)" : "rgba(15, 23, 42, 0.35)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
    });
  });

  (model.tubes || []).forEach((t) => {
    const p1 = project3D(t.x1, t.y1, t.z1);
    const p2 = project3D(t.x2, t.y2, t.z2);
    const avgZ = (p1.z + p2.z) * 0.5;
    drawQueue.push({
      z: avgZ,
      draw: () => {
        const r = Math.max(2, t.r * zoom * thickScale);
        draw3DTube(p1.x, p1.y, p2.x, p2.y, r, t.color);
      }
    });
  });

  (model.pts || []).forEach((pt) => {
    const p = project3D(pt.x, pt.y, pt.z);
    drawQueue.push({
      z: p.z,
      draw: () => {
        const r = Math.max(2.5, pt.r * zoom * thickScale);
        draw3DSphere(p.x, p.y, r, pt.color);
      }
    });
  });

  drawQueue.sort((a, b) => b.z - a.z);
  drawQueue.forEach((item) => item.draw());

  (model.labels || []).forEach((lb) => {
    const p = project3D(lb.x, lb.y, lb.z);
    const text = labelDict[lb.key] || lb.key;
    ctx.save();
    ctx.font = "600 13px system-ui, -apple-system, sans-serif";
    const w = ctx.measureText(text).width + 16;
    const h = 24;
    const bx = p.x - w / 2;
    const by = p.y - h - 8;

    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(bx, by, w, h, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, p.x, by + h / 2);
    ctx.restore();
  });
}

applySectionCamera(0);
isPaused = true;
updateUI();
renderLoop();
