window.AtlasParts[4] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.003;
  const pulse = Math.sin(t * 2.2) * 0.5 + 0.5;

  function addCervicalVertebra(yc, name) {
    const rx = 44;
    const rz = 34;
    const hh = 20;
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

    // Дужки и раздвоенный остистый отросток шейного позвонка
    tubes.push({ x1: -28, y1: yc, z1: 16, x2: -18, y2: yc, z2: 34, r: 4.5, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: 28, y1: yc, z1: 16, x2: 18, y2: yc, z2: 34, r: 4.5, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: -18, y1: yc, z1: 34, x2: 0, y2: yc + 3, z2: 60, r: 4.5, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: 18, y1: yc, z1: 34, x2: 0, y2: yc + 3, z2: 60, r: 4.5, c: "#cbd5e1", isBone: true });
    tubes.push({ x1: -18, y1: yc, z1: 34, x2: -64, y2: yc - 2, z2: 32, r: 4.5, c: "#e2e8f0", isBone: true });
    tubes.push({ x1: 18, y1: yc, z1: 34, x2: 64, y2: yc - 2, z2: 32, r: 4.5, c: "#e2e8f0", isBone: true });
    tubes.push({ x1: 0, y1: yc + 3, z1: 60, x2: 0, y2: yc + 10, z2: 90, r: 5, c: "#e2e8f0", isBone: true });

    labels.push({ x: 0, y: yc, z: -rx - 8, t: name, ox: -16, oy: 0 });
  }

  addCervicalVertebra(-48, "C4");
  addCervicalVertebra(48, "C5");

  // Шейный отдел спинного мозга
  tubes.push({ x1: 0, y1: -98, z1: 42, x2: 0, y2: 98, z2: 42, r: 7, c: "#facc15", isBone: false });

  // Парные позвоночные артерии
  const artCol = st === 1 ? "#f59e0b" : "#ef4444";
  tubes.push({ x1: -50, y1: -96, z1: 26, x2: -50, y2: 96, z2: 26, r: 3.5, c: "#ef4444", isBone: false });
  tubes.push({ x1: 50, y1: -96, z1: 26, x2: 50, y2: 0, z2: 26, r: st === 1 ? 2.0 : 3.5, c: artCol, isBone: false });
  tubes.push({ x1: 50, y1: 0, z1: 26, x2: 50, y2: 96, z2: 26, r: 3.5, c: artCol, isBone: false });
  labels.push({ x: -50, y: -68, z: 26, t: lang === "ru" ? "Позвоночная артерия" : "Vertebral Artery", ox: -115, oy: -10 });

  // Шейный межпозвонковый диск
  const dSegs = 16;
  const dTop = [];
  const dBot = [];
  const bulge = st === 0 ? 0 : (st === 1 ? 13 : 24);
  const dCol = st === 0 ? "#38bdf8" : (st === 1 ? "#f59e0b" : "#ef4444");

  for (let k = 0; k < dSegs; k++) {
    const ang = (k / dSegs) * Math.PI * 2;
    const dx = Math.cos(ang) * 42;
    let dz = Math.sin(ang) * 32;
    if (dz > 10 && dx > -8) {
      dz += bulge * Math.max(0, Math.sin(ang));
    }
    dTop.push({ x: dx, y: -12, z: dz });
    dBot.push({ x: dx, y: 12, z: dz });
  }

  for (let m = 0; m < dSegs; m++) {
    const n2 = (m + 1) % dSegs;
    polys.push({ pts: [dTop[m], dTop[n2], dBot[n2], dBot[m]], c: dCol, stroke: "#0284c7", isBone: false });
  }
  polys.push({ pts: dTop, c: "#7dd3fc", stroke: "#0284c7", isBone: false });

  // Шейные нервные корешки
  tubes.push({ x1: -7, y1: -2, z1: 42, x2: -62, y2: 30, z2: 36, r: 3, c: "#fde047", isBone: false });
  const rCol = st === 0 ? "#fde047" : (st === 1 ? "#f59e0b" : (pulse > 0.5 ? "#ef4444" : "#fca5a5"));
  tubes.push({ x1: 7, y1: -2, z1: 42, x2: 62, y2: 30, z2: 36, r: 3, c: rCol, isBone: false });

  if (st === 0) {
    labels.push({ x: 0, y: 0, z: -42, t: lang === "ru" ? "Диск C4–C5 (Норма)" : "Healthy C4–C5 Disc", ox: -95, oy: 0 });
  } else if (st === 1) {
    labels.push({ x: 50, y: 0, z: 26, t: lang === "ru" ? "Спазм / компрессия артерии" : "Artery Compression", ox: 18, oy: -18 });
  } else {
    labels.push({ x: 18, y: 0, z: 46, t: lang === "ru" ? "Грыжа C5–C6 (радикулопатия)" : "C5–C6 Herniation", ox: 20, oy: -18 });
  }

  return { pts, tubes, polys, labels };
};
