let rotX = 0.22, rotY = -0.35, zoom = 4.3, isDragging = false, lastX = 0, lastY = 0;
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
  } else {
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
  }
  return { pts, labels };
}
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
