function renderLoop() {
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isPaused && !isDragging) {
    rotY += 0.0045;
  }

  const builder = window.AtlasParts[currentMod];
  if (builder) {
    const scene = builder(currentState, currentLang);
    const renderList = [];

    for (let i = 0; i < scene.polys.length; i++) {
      const pl = scene.polys[i];
      const projPts = pl.pts.map(function (p) { return project3D(p.x, p.y, p.z); });
      const avgZ = projPts.reduce(function (s, p) { return s + p.z; }, 0) / projPts.length;
      renderList.push({ type: "poly", z: avgZ, pts: projPts, c: pl.c, stroke: pl.stroke, isBone: pl.isBone });
    }

    for (let j = 0; j < scene.tubes.length; j++) {
      const tb = scene.tubes[j];
      const p1 = project3D(tb.x1, tb.y1, tb.z1);
      const p2 = project3D(tb.x2, tb.y2, tb.z2);
      renderList.push({ type: "tube", z: (p1.z + p2.z) * 0.5, p1: p1, p2: p2, r1: tb.r * p1.sc, r2: tb.r * p2.sc, c: tb.c, isBone: tb.isBone });
    }

    for (let k = 0; k < scene.pts.length; k++) {
      const pt = scene.pts[k];
      const p = project3D(pt.x, pt.y, pt.z);
      renderList.push({ type: "pt", z: p.z, x: p.x, y: p.y, r: pt.r * p.sc, c: pt.c, isBone: pt.isBone });
    }

    renderList.sort(function (a, b) { return b.z - a.z; });

    for (let n = 0; n < renderList.length; n++) {
      const item = renderList[n];
      if (item.type === "pt") {
        const alpha = Math.max(0.5, Math.min(1, 1 - item.z / 550));
        draw3DSphere(item.x, item.y, Math.max(2.5, item.r), item.c, alpha, item.isBone);
      } else if (item.type === "tube") {
        draw3DTube(item.p1, item.p2, Math.max(2, item.r1), Math.max(2, item.r2), item.c, item.isBone);
      } else if (item.type === "poly") {
        ctx.save();
        if (isXray && item.isBone) ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.moveTo(item.pts[0].x, item.pts[0].y);
        for (let m = 1; m < item.pts.length; m++) ctx.lineTo(item.pts[m].x, item.pts[m].y);
        ctx.closePath();
        const light = Math.max(0.45, Math.min(1.25, 1 - item.z / 280));
        ctx.fillStyle = shadeColor(item.c, light);
        ctx.fill();
        if (item.stroke || (isXray && item.isBone)) {
          ctx.strokeStyle = (isXray && item.isBone) ? "rgba(56, 189, 248, 0.75)" : item.stroke;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    for (let l = 0; l < scene.labels.length; l++) {
      const lb = scene.labels[l];
      const p = project3D(lb.x, lb.y, lb.z);
      if (p.z < 120) {
        ctx.save();
        ctx.font = "600 11px Segoe UI, sans-serif";
        const tw = ctx.measureText(lb.t).width;
        const bx = p.x + (lb.ox || 12);
        const by = p.y + (lb.oy || -10);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.6)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.fillRect(bx - 4, by - 9, tw + 8, 18);
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(lb.t, bx, by + 4);
        ctx.restore();
      }
    }
  }
  requestAnimationFrame(renderLoop);
}

function updateUI() {
  const d = DB[currentLang] || DB.ru;
  document.getElementById("subText").textContent = d.ui.sub;
  document.getElementById("modLabel").textContent = d.ui.modLabel;
  document.getElementById("stateLabel").textContent = d.ui.stateLabel;
  document.getElementById("tacticsLabel").textContent = d.ui.tacticsLabel + " ";
  document.getElementById("authorLabel").textContent = d.ui.authorLabel;
  document.getElementById("discText").textContent = d.ui.disc;
  document.getElementById("hintText").textContent = d.ui.hint;
  document.getElementById("editBtn").textContent = d.ui.editBtn;
  updatePauseBtn();

  const tabsBox = document.getElementById("tabsBox");
  tabsBox.innerHTML = "";
  d.ui.tabs.forEach(function (tabName, idx) {
    const b = document.createElement("button");
    b.className = "tab-btn" + (idx === currentMod ? " active" : "");
    b.textContent = tabName;
    b.onclick = function () { currentMod = idx; currentState = 0; updateUI(); };
    tabsBox.appendChild(b);
  });

  const mod = d.modules[currentMod];
  const statesBox = document.getElementById("statesBox");
  statesBox.innerHTML = "";
  mod.buttons.forEach(function (btnLabel, idx) {
    const b = document.createElement("button");
    b.className = "state-btn" + (idx === currentState ? " active" : "");
    b.textContent = btnLabel;
    b.onclick = function () { currentState = idx; updateUI(); };
    statesBox.appendChild(b);
  });

  const st = mod.states[currentState];
  const pill = document.getElementById("statusPill");
  pill.textContent = st.pill;
  pill.style.background = st.color + "22";
  pill.style.color = st.color;
  pill.style.borderColor = st.color;
  document.getElementById("cardTitle").textContent = st.title;
  document.getElementById("cardDesc").textContent = st.desc;
  document.getElementById("cardTactics").textContent = st.tactics;
  document.getElementById("cardAuthor").textContent = st.author;
}

function setLang(l) { currentLang = l; updateUI(); }
function togglePause() { isPaused = !isPaused; updatePauseBtn(); }
function updatePauseBtn() {
  const btn = document.getElementById("pauseBtn");
  if (btn) btn.textContent = isPaused ? "Пуск ▶" : "Пауза ⏸";
}
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}
function toggleEditor() {
  const box = document.getElementById("editorBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}
function applyEdit() {
  const raw = document.getElementById("edDesc").value + " " + document.getElementById("edTactics").value;
  const bad = /(мг|мл|таблет|капсул|укол|инъекц|дозировк|купить|заказать|скидк|http|www\.|\+7)/i;
  const msg = document.getElementById("guardMsg");
  if (bad.test(raw)) {
    msg.style.color = "#ef4444";
    msg.textContent = "⛔ Заблокировано фильтром безопасности (дозировки, рецепты или ссылки запрещены).";
    return;
  }
  const st = DB[currentLang].modules[currentMod].states[currentState];
  if (document.getElementById("edAuthor").value) st.author = document.getElementById("edAuthor").value;
  if (document.getElementById("edTitle").value) st.title = document.getElementById("edTitle").value;
  if (document.getElementById("edDesc").value) st.desc = document.getElementById("edDesc").value;
  if (document.getElementById("edTactics").value) st.tactics = document.getElementById("edTactics").value;
  msg.style.color = "#10b981";
  msg.textContent = "✅ Изменения проверены и применены локально.";
  updateUI();
}
function exportJSON() {
  const blob = new Blob([JSON.stringify(DB, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "openneuroatlas_data.json";
  a.click();
}
function openGithubPR() {
  window.open("https://github.com", "_blank");
}

updateUI();
renderLoop();
