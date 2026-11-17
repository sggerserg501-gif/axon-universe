window.AtlasParts[5] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.004;
  const beat = Math.sin(t * 2.5) * 3.5;

  // Миокард (в режиме Рентген становится полупрозрачным)
  const heartCol = isXray ? "rgba(220, 38, 38, 0.25)" : "#dc2626";
  pts.push({ x: -16, y: 8, z: 0, r: 44 + beat, c: heartCol, isBone: true });
  pts.push({ x: 18, y: -6, z: 4, r: 38 + beat * 0.8, c: heartCol, isBone: true });
  pts.push({ x: -4, y: 42, z: -4, r: 28 + beat * 0.6, c: heartCol, isBone: true });

  // Дуга аорты и лёгочный ствол
  tubes.push({ x1: 6, y1: -32, z1: -6, x2: 18, y2: -76, z2: -4, r: 10, c: "#ef4444", isBone: false });
  tubes.push({ x1: 18, y1: -76, z1: -4, x2: -14, y2: -86, z2: 8, r: 9, c: "#ef4444", isBone: false });
  tubes.push({ x1: -14, y1: -86, z1: 8, x2: -24, y2: -54, z2: 18, r: 8.5, c: "#ef4444", isBone: false });
  tubes.push({ x1: -12, y1: -30, z1: -10, x2: -32, y2: -68, z2: -14, r: 8, c: "#3b82f6", isBone: false });

  // Коронарные артерии
  tubes.push({ x1: 4, y1: -24, z1: -24, x2: -24, y2: 4, z2: -36, r: 3.5, c: "#f87171", isBone: false });
  tubes.push({ x1: -24, y1: 4, z1: -36, x2: -18, y2: 46, z2: -28, r: st === 2 ? 1.8 : 3, c: st === 2 ? "#475569" : "#f87171", isBone: false });
  tubes.push({ x1: 8, y1: -22, z1: -22, x2: 34, y2: 12, z2: -28, r: 3.2, c: "#f87171", isBone: false });

  if (st === 0) {
    labels.push({ x: 18, y: -76, z: -4, t: lang === "ru" ? "Дуга аорты" : "Aortic Arch", ox: 22, oy: -16 });
    labels.push({ x: -24, y: 4, z: -36, t: lang === "ru" ? "Коронарная артерия" : "Coronary Artery", ox: -125, oy: 0 });
  } else if (st === 1) {
    pts.push({ x: -22, y: 8, z: -36, r: 6.5, c: "#facc15", isBone: false });
    labels.push({ x: -22, y: 8, z: -36, t: lang === "ru" ? "Стеноз (бляшка)" : "Coronary Plaque", ox: -120, oy: 0 });
  } else {
    pts.push({ x: -22, y: 8, z: -36, r: 7.5, c: "#f59e0b", isBone: false });
    pts.push({ x: -16, y: 34, z: -26, r: 22, c: "rgba(30, 41, 59, 0.85)", isBone: false });
    labels.push({ x: -16, y: 34, z: -26, t: lang === "ru" ? "Тромбоз и ишемия" : "Thrombosis & Ischemia", ox: -135, oy: 12 });
  }

  return { pts, tubes, polys, labels };
};
