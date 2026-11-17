window.AtlasParts[6] = function (st, lang) {

  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.003;
  const flow = (t * 0.7) % 1;

  // Стенка вены (в режиме Рентген становится полупрозрачной)
  const vRad = st === 0 ? 11 : (st === 1 ? 15 : 17);
  const vCol = isXray ? "rgba(59, 130, 246, 0.25)" : (st === 2 ? "#7f1d1d" : "#2563eb");
  tubes.push({ x1: 0, y1: 95, z1: 0, x2: 0, y2: -95, z2: 0, r: vRad, c: vCol, isBone: true });

  // Варикозный изгиб на Стадии I и II
  if (st > 0) {
    tubes.push({ x1: 8, y1: 20, z1: 8, x2: 24, y2: -15, z2: 14, r: 8, c: "#3b82f6", isBone: false });
    tubes.push({ x1: 24, y1: -15, z1: 14, x2: 6, y2: -45, z2: 6, r: 8, c: "#3b82f6", isBone: false });
  }

  // Створки венозных клапанов
  const valveY = [-30, 30];
  for (let i = 0; i < valveY.length; i++) {
    const vy = valveY[i];
    const open = st === 0 ? Math.sin(t * 2.5) * 4 : -6;
    tubes.push({ x1: -vRad + 2, y1: vy + 4, z1: 0, x2: -2 + open, y2: vy - 8, z2: 0, r: 2.5, c: "#93c5fd", isBone: false });
    tubes.push({ x1: vRad - 2, y1: vy + 4, z1: 0, x2: 2 - open, y2: vy - 8, z2: 0, r: 2.5, c: "#93c5fd", isBone: false });
  }

  // Движение крови (вверх в норме, вниз при рефлюксе)
  if (st === 0) {
    pts.push({ x: 0, y: 80 - flow * 160, z: 0, r: 4.5, c: "#60a5fa", isBone: false });
    labels.push({ x: 0, y: -30, z: 0, t: lang === "ru" ? "Венозные клапаны (Норма)" : "Healthy Venous Valves", ox: 22, oy: -12 });
  } else if (st === 1) {
    pts.push({ x: 0, y: -60 + flow * 120, z: 0, r: 4.5, c: "#f59e0b", isBone: false });
    labels.push({ x: 0, y: -30, z: 0, t: lang === "ru" ? "Несостоятельность и рефлюкс" : "Valve Reflux", ox: 24, oy: -12 });
  } else {
    pts.push({ x: 0, y: 6, z: 0, r: 13, c: "#991b1b", isBone: false });
    pts.push({ x: 0, y: 6, z: 0, r: 19, c: "rgba(239, 68, 68, 0.35)", isBone: false });
    labels.push({ x: 0, y: 6, z: 0, t: lang === "ru" ? "Тромбоз и флебит" : "Venous Thrombosis", ox: 24, oy: 8 });
  }

  return { pts, tubes, polys, labels };
};
