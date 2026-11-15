let rotX = 0.25, rotY = -0.35, zoom = 4.3, isDragging = false, lastX = 0, lastY = 0;
const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", e => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener("mouseup", () => { isDragging = false; });
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  rotY += (e.clientX - lastX) * 0.008;
  rotX += (e.clientY - lastY) * 0.008;
  lastX = e.clientX; lastY = e.clientY;
});
canvas.addEventListener("wheel", e => {
  e.preventDefault();
  zoom = Math.min(6.5, Math.max(1.5, zoom - e.deltaY * 0.002));
}, { passive: false });

canvas.addEventListener("touchstart", e => {
  if (e.touches.length === 1) {
    isDragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  }
}, { passive: true });
window.addEventListener("touchend", () => { isDragging = false; });
canvas.addEventListener("touchmove", e => {
  if (!isDragging || e.touches.length !== 1) return;
  rotY += (e.touches[0].clientX - lastX) * 0.008;
  rotX += (e.touches[0].clientY - lastY) * 0.008;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
}, { passive: true });

function changeZoom(delta) {
  zoom = Math.min(6.5, Math.max(1.5, zoom + delta));
}

function project3D(x, y, z) {
  let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
  let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);
  let scale = (860 * zoom) / (860 + z2 + 320);
  return { x: 640 + x1 * scale, y: 450 + y2 * scale, z: z2, sc: scale };
}

function buildScene(mod, st, lang) {
  let pts = [], labels = [];
  if (mod === 0) {
    [-82, 82].forEach(y => {
      for (let a = 0; a < 6.28; a += 0.25)
        for (let h = -22; h <= 22; h += 11)
          pts.push({ x: Math.cos(a) * 74, y: y + h, z: Math.sin(a) * 64, r: 14, c: "#cbd5e1" });
      for (let z = -64; z >= -142; z -= 12)
        pts.push({ x: 0, y: y, z: z, r: 15, c: "#94a3b8" });
    });
    for (let a = 0; a < 6.28; a += 0.22)
      for (let h = -13; h <= 13; h += 12)
        pts.push({ x: Math.cos(a) * 72, y: h, z: Math.sin(a) * 62, r: 14, c: "#38bdf8" });
    for (let y = -135; y <= 135; y += 11)
      pts.push({ x: 0, y: y, z: -84, r: 18, c: "#facc15" });
    for (let t = 0; t <= 1; t += 0.12) {
      pts.push({ x: t * 92, y: t * 20, z: -84 + t * 20, r: 11, c: "#facc15" });
      pts.push({ x: -t * 92, y: t * 20, z: -84 + t * 20, r: 11, c: "#facc15" });
    }
    labels.push(
      { x: 0, y: -130, z: -84, ox: 50, oy: -35, t: lang === "ru" ? "Спинной мозг" : "Spinal Cord" },
      { x: 72, y: 0, z: 0, ox: 70, oy: 0, t: lang === "ru" ? "Межпозвонковый диск" : "Intervertebral Disc" },
      { x: -74, y: -82, z: 0, ox: -210, oy: -20, t: lang === "ru" ? "Тело позвонка" : "Vertebral Body" }
    );
    if (st > 0) {
      for (let dx = -10; dx <= 10; dx += 9)
        for (let dy = -8; dy <= 8; dy += 8)
          pts.push({ x: 18 + dx, y: dy, z: st === 2 ? -74 : -63, r: st === 2 ? 22 : 15, c: st === 2 ? "#ef4444" : "#f59e0b" });
      labels.push({ x: 18, y: 0, z: -74, ox: 75, oy: 45, t: st === 2 ? (lang === "ru" ? "Компрессия корешка" : "Root Compression") : (lang === "ru" ? "Протрузия" : "Protrusion") });
    }
  } else if (mod === 1) {
    let brainColor = st > 0 ? "rgba(244, 114, 182, 0.22)" : "#f472b6";
    [-1, 1].forEach(k => {
      for (let u = 0; u < 3.14; u += 0.22)
        for (let v = 0; v < 3.14; v += 0.22)
          pts.push({ x: k * (10 + Math.sin(u) * Math.sin(v) * 70), y: -Math.cos(u) * 75, z: Math.sin(u) * Math.cos(v) * 95, r: 15, c: brainColor });
    });
    for (let u = 0; u < 6.28; u += 0.34)
      for (let v = 0; v < 3.14; v += 0.34)
        pts.push({ x: Math.sin(v) * Math.cos(u) * 45, y: 55 + Math.cos(v) * 26, z: -65 + Math.sin(v) * Math.sin(u) * 32, r: 13, c: "#c084fc" });
    for (let y = 42; y <= 120; y += 11)
      pts.push({ x: 0, y: y, z: -20, r: 19, c: "#38bdf8" });
    labels.push(
      { x: 0, y: -75, z: 0, ox: 65, oy: -45, t: lang === "ru" ? "Полушария мозга" : "Cerebral Hemispheres" },
      { x: 0, y: 62, z: -92, ox: 75, oy: 35, t: lang === "ru" ? "Мозжечок" : "Cerebellum" },
      { x: 0, y: 110, z: -20, ox: -185, oy: 30, t: lang === "ru" ? "Ствол мозга" : "Brainstem" }
    );
    if (st > 0) {
      for (let dx = -12; dx <= 12; dx += 8)
        for (let dy = -12; dy <= 12; dy += 8)
          for (let dz = -12; dz <= 12; dz += 8)
            pts.push({ x: 32 + dx, y: -15 + dy, z: 18 + dz, r: st === 2 ? 24 : 17, c: st === 2 ? "#ef4444" : "#f59e0b" });
      labels.push({ x: 32, y: -15, z: 18, ox: 80, oy: -10, t: st === 2 ? (lang === "ru" ? "Объемный очаг" : "Focal Lesion") : (lang === "ru" ? "Зона ангиоспазма" : "Angiospasm Zone") });
    }
  } else if (mod === 2) {
    for (let u = 0; u < 3.14; u += 0.28)
      for (let v = 0; v < 6.28; v += 0.28)
        pts.push({ x: -125 + Math.sin(u) * Math.cos(v) * 34, y: Math.cos(u) * 34, z: Math.sin(u) * Math.sin(v) * 34, r: 14, c: "#a855f7" });
    for (let b = 0; b < 7; b++) {
      let a = b * 0.9;
      for (let t = 1; t <= 5; t++)
        pts.push({ x: -125 - t * 14, y: Math.cos(a) * t * 16, z: Math.sin(a) * t * 16, r: 10, c: "#c084fc" });
    }
    for (let x = -90; x <= 115; x += 9) {
      pts.push({ x: x, y: 0, z: 0, r: 11, c: "#facc15" });
      let sg = Math.floor((x + 90) / 43);
      if ((x + 90) % 43 < 31) {
        let cl = "#38bdf8";
        if (st === 1 && sg === 2) cl = "#f59e0b";
        if (st === 2 && (sg === 2 || sg === 3)) cl = "#ef4444";
        for (let a = 0; a < 6.28; a += 0.65)
          pts.push({ x: x, y: Math.cos(a) * 15, z: Math.sin(a) * 15, r: 11, c: cl });
      }
    }
    for (let b = -2; b <= 2; b++) {
      for (let t = 1; t <= 4; t++)
        pts.push({ x: 115 + t * 11, y: b * t * 8, z: (b % 2) * t * 8, r: 9, c: "#facc15" });
      pts.push({ x: 168, y: b * 32, z: (b % 2) * 32, r: 15, c: st === 2 ? "#ef4444" : "#10b981" });
    }
    labels.push(
      { x: -125, y: -34, z: 0, ox: -40, oy: -70, t: lang === "ru" ? "Тело нейрона (Сома)" : "Neuron Soma" },
      { x: -180, y: 45, z: 0, ox: -120, oy: 60, t: lang === "ru" ? "Дендриты" : "Dendrites" },
      { x: 10, y: -15, z: 0, ox: 20, oy: -65, t: lang === "ru" ? "Аксон и миелин" : "Axon & Myelin" },
      { x: 168, y: -32, z: 0, ox: 35, oy: -50, t: lang === "ru" ? "Синапс" : "Synapse" }
    );
  } else if (mod === 3) {
    let pulse = (Date.now() * 0.004) % 1;
    for (let y = 130; y >= 35; y -= 8) {
      pts.push({ x: 0, y: y, z: -30, r: 14, c: "#ef4444" });
      if (Math.abs(((130 - y) / 95) - pulse) < 0.08) pts.push({ x: 0, y: y, z: -30, r: 16, c: "#fef08a" });
    }
    for (let a = 0; a < 6.28; a += 0.14) {
      let cx0 = Math.sin(a) * 58, cz0 = Math.cos(a) * 65 - 10;
      let isSpasm = (st === 1 && a > 1.1 && a < 2.1);
      pts.push({ x: cx0, y: 15, z: cz0, r: isSpasm ? 7 : 12, c: isSpasm ? "#f59e0b" : "#dc2626" });
    }
    [-1, 1].forEach(side => {
      for (let t = 0; t <= 1; t += 0.08) {
        let bx = side * (58 + t * 85), by = 15 - t * 35, bz = -10 + t * 20;
        let isRightSpasm = (st === 1 && side === 1 && t > 0.2 && t < 0.7);
        pts.push({ x: bx, y: by, z: bz, r: isRightSpasm ? 6.5 : 11.5, c: isRightSpasm ? "#f59e0b" : "#ef4444" });
        if (Math.abs(t - pulse) < 0.08 && !(st === 2 && side === 1 && t > 0.45))
          pts.push({ x: bx, y: by, z: bz, r: 13.5, c: "#fef08a" });
      }
      for (let t = 0; t <= 1; t += 0.1)
        pts.push({ x: side * (22 + t * 15), y: 15 - t * 75, z: 50 + t * 35, r: 10, c: "#f87171" });
    });
    if (st === 2) {
      for (let u = 0; u < 3.14; u += 0.35)
        for (let v = 0; v < 6.28; v += 0.35)
          pts.push({ x: 88 + Math.sin(u) * Math.cos(v) * 24, y: -5 + Math.cos(u) * 24, z: 5 + Math.sin(u) * Math.sin(v) * 24, r: 11, c: "#b91c1c" });
      labels.push({ x: 95, y: -15, z: 5, ox: 55, oy: -40, t: lang === "ru" ? "Аневризма (Риск разрыва)" : "Aneurysm Dome" });
    } else if (st === 1) {
      labels.push({ x: 88, y: 0, z: 0, ox: 55, oy: -35, t: lang === "ru" ? "Зона ангиоспазма" : "Angiospasm Zone" });
    }
    labels.push(
      { x: 0, y: 115, z: -30, ox: 55, oy: 20, t: lang === "ru" ? "Базилярная артерия" : "Basilar Artery" },
      { x: -58, y: 15, z: -10, ox: -185, oy: 15, t: lang === "ru" ? "Виллизиев круг" : "Circle of Willis" },
      { x: -120, y: -15, z: 5, ox: -180, oy: -40, t: lang === "ru" ? "Средняя мозговая артерия" : "Middle Cerebral Artery" }
    );
  } else {
    let pulse = (Date.now() * 0.004) % 1;
    [-95, 0, 95].forEach((y, idx) => {
      let zOff = (idx === 1) ? 10 : 0;
      for (let a = 0; a < 6.28; a += 0.26)
        for (let h = -16; h <= 16; h += 10)
          pts.push({ x: Math.cos(a) * 56, y: y + h, z: zOff + Math.sin(a) * 48, r: 12, c: "#cbd5e1" });
      for (let z = -48; z >= -112; z -= 12)
        pts.push({ x: 0, y: y, z: zOff + z, r: 13, c: "#94a3b8" });
      [-1, 1].forEach(side => {
        for (let x = 48; x <= 76; x += 10)
          pts.push({ x: side * x, y: y, z: zOff - 18, r: 10, c: "#94a3b8" });
      });
    });
    [-48, 48].forEach(dy => {
      for (let a = 0; a < 6.28; a += 0.24)
        for (let h = -9; h <= 9; h += 9)
          pts.push({ x: Math.cos(a) * 54, y: dy + h, z: 5 + Math.sin(a) * 46, r: 12, c: "#38bdf8" });
    });
    for (let y = -135; y <= 135; y += 10)
      pts.push({ x: 0, y: y, z: -65, r: 16, c: "#facc15" });
    [-1, 1].forEach(side => {
      for (let y = 135; y >= -135; y -= 10) {
        let isSpasm = (st === 1 && side === 1 && y > -45 && y < 45);
        pts.push({ x: side * 66, y: y, z: -18, r: isSpasm ? 6 : 11, c: isSpasm ? "#f59e0b" : "#ef4444" });
        if (Math.abs(((135 - y) / 270) - pulse) < 0.06)
          pts.push({ x: side * 66, y: y, z: -18, r: 13, c: "#fef08a" });
      }
    });
      if (st === 1) {
      labels.push({ x: 66, y: 0, z: -18, ox: 55, oy: -25, t: lang === "ru" ? "Спазм позвоночной артерии" : "Vertebral Artery Spasm" });
    } else if (st === 2) {
      for (let dx = -10; dx <= 10; dx += 8)
        for (let dy = -8; dy <= 8; dy += 8)
          pts.push({ x: dx, y: -48 + dy, z: -52, r: 19, c: "#ef4444" });
      labels.push({ x: 0, y: -48, z: -52, ox: 65, oy: -35, t: lang === "ru" ? "Шейная грыжа (Миелопатия)" : "Cervical Herniation" });
    }
    labels.push(
      { x: 0, y: -130, z: -65, ox: 55, oy: -30, t: lang === "ru" ? "Шейный отдел спинного мозга" : "Cervical Spinal Cord" },
      { x: -66, y: 40, z: -18, ox: -210, oy: 10, t: lang === "ru" ? "Позвоночная артерия" : "Vertebral Artery" },
      { x: -56, y: -95, z: 0, ox: -195, oy: -25, t: lang === "ru" ? "Позвонок C4" : "Vertebra C4" }
    );
  }
  return { pts, labels };
}
