window.AtlasParts[0] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.003;
  const pulse = Math.sin(t * 2.2) * 0.5 + 0.5;

  function addVertebra(yc, name) {
    const rx = 56;
    const rz = 44;
    const hh = 26;
    const segs = 16;
    const topR = [];
    const botR = [];

    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const vx = Math.cos(a) * rx;
      let vz = Math.sin(a) * rz;
      if (vz > 0) vz *= 0.85;
      topR.push({ x: vx, y: yc - hh, z: vz });
      botR.push({ x: vx, y: yc + hh, z: vz });
    }

    for (let j = 0; j < segs; j++) {
      const nxt = (j + 1) % segs;
      const col = j < segs / 2 ? "#cbd5e1" : "#94a3b8";
      polys.push({ pts: [topR[j], topR[nxt], botR[nxt], botR[j]], c: col, stroke: "#475569", isBone: true });
    }
    polys.push({ pts: topR, c: "#e2e8f0", stroke: "#64748b", isBone: true });
    polys.push({ pts: botR, c: "#94a3b8", stroke: "#475569", isBone: true });

    // Дужки, поперечные и остистый отросток
    tubes.push({ x1: -34, y1: yc, z1: 20, x2: -24, y2: yc, z2: 40, r: 6, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: 34, y1: yc, z1: 20, x2: 24, y2: yc, z2: 40, r: 6, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: -24, y1: yc, z1: 40, x2: 0, y2: yc + 4, z2: 74, r: 5.5, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: 24, y1: yc, z1: 40, x2: 0, y2: yc + 4, z2: 74, r: 5.5, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: -24, y1: yc, z1: 40, x2: -84, y2: yc - 3, z2: 44, r: 5, c: "#e2e8f0", isBone: true });
    tubes.push({ x1: 24, y1: yc, z1: 40, x2: 84, y2: yc - 3, z2: 44, r: 5, c: "#e2e8f0", isBone: true });
    tubes.push({ x1: 0, y1: yc + 4, z1: 74, x2: 0, y2: yc + 14, z2: 112, r: 6, c: "#e2e8f0", isBone: true });

    labels.push({ x: 0, y: yc, z: -rx - 8, t: name, ox: -16, oy: 0 });
  }

  addVertebra(-54, "L4");
  addVertebra(54, "L5");

  // Спинной мозг в канале
  tubes.push({ x1: 0, y1: -108, z1: 52, x2: 0, y2: 108, z2: 52, r: 6.5, c: "#facc15", isBone: false });
  labels.push({ x: 0, y: -92, z: 54, t: lang === "ru" ? "Спинной мозг" : "Spinal Cord", ox: 20, oy: -12 });

  // Межпозвонковый диск
  const dSegs = 18;
  const dTop = [];
  const dBot = [];
  const bulge = st === 0 ? 0 : (st === 1 ? 16 : 28);
  const dCol = st === 0 ? "#38bdf8" : (st === 1 ? "#f59e0b" : "#ef4444");

  for (let k = 0; k < dSegs; k++) {
    const ang = (k / dSegs) * Math.PI * 2;
    const dx = Math.cos(ang) * 54;
    let dz = Math.sin(ang) * 42;
    if (dz > 14 && dx > -10) {
      const f = Math.sin(ang) * (dx > 0 ? 1.15 : 0.7);
      dz += bulge * Math.max(0, f);
    }
    dTop.push({ x: dx, y: -15, z: dz });
    dBot.push({ x: dx, y: 15, z: dz });
  }

  for (let m = 0; m < dSegs; m++) {
    const n2 = (m + 1) % dSegs;
    polys.push({ pts: [dTop[m], dTop[n2], dBot[n2], dBot[m]], c: dCol, stroke: "#0284c7", isBone: false });
  }
  polys.push({ pts: dTop, c: "#7dd3fc", stroke: "#0284c7", isBone: false });

  // Пульпозное ядро
  const nucZ = st === 0 ? 4 : (st === 1 ? 21 : 36);
  const nucX = st === 0 ? 0 : 12;
  pts.push({ x: nucX, y: 0, z: nucZ, r: st === 2 ? 14 : 11, c: st === 0 ? "#bae6fd" : "#ef4444", isBone: false });

  // Спинномозговые корешки
  tubes.push({ x1: -8, y1: -4, z1: 52, x2: -74, y2: 36, z2: 46, r: 3.5, c: "#fde047", isBone: false });
  const rMidX = 22 + (st === 2 ? 9 : 0);
  const rCol = st === 0 ? "#fde047" : (st === 1 ? "#f59e0b" : (pulse > 0.5 ? "#ef4444" : "#fca5a5"));
  tubes.push({ x1: 8, y1: -4, z1: 52, x2: rMidX, y2: 10, z2: 48, r: 3.5, c: rCol, isBone: false });
  tubes.push({ x1: rMidX, y1: 10, z1: 48, x2: 74, y2: 36, z2: 46, r: 3.5, c: rCol, isBone: false });

  if (st === 0) {
    labels.push({ x: 0, y: 0, z: -54, t: lang === "ru" ? "Диск (Норма)" : "Healthy Disc", ox: -85, oy: 0 });
    labels.push({ x: 74, y: 36, z: 46, t: lang === "ru" ? "Свободный корешок" : "Free Nerve Root", ox: 14, oy: 10 });
  } else if (st === 1) {
    labels.push({ x: 18, y: 0, z: 52, t: lang === "ru" ? "Протрузия диска" : "Disc Protrusion", ox: 24, oy: -14 });
    labels.push({ x: 74, y: 36, z: 46, t: lang === "ru" ? "Раздражение корешка" : "Root Irritation", ox: 14, oy: 10 });
  } else {
    labels.push({ x: 22, y: 0, z: 58, t: lang === "ru" ? "Грыжа диска" : "Disc Herniation", ox: 26, oy: -16 });
    labels.push({ x: 74, y: 36, z: 46, t: lang === "ru" ? "Компрессия корешка" : "Root Compression", ox: 14, oy: 10 });
  }

  return { pts, tubes, polys, labels };
};
