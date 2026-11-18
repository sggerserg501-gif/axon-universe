window.AtlasParts[5] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.004;
  const pulse = Math.sin(t * 2.5) * 3.5;

  const hex2rgba = function (h, a) {
    const n = parseInt(h.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255) + ", " + a + ")";
  };
  const shell = function (h) { return isXray ? hex2rgba(h, 0.3) : h; };

  // ===== МИОКАРД: цельная оболочка-конус =====
  const rings = 10;
  const segs = 16;
  const mesh = [];

  for (let i = 0; i <= rings; i++) {
    const f = i / rings;
    const cx = -16 * f * f;
    const cy = -34 + 100 * f;
    const cz = 8 * f * f;
    const rr = (42 - 26 * f - 4 * Math.sin(f * Math.PI)) * (1 + pulse / 140 * (1 - f));
    const ring = [];
    for (let j = 0; j < segs; j++) {
      const a = (j / segs) * Math.PI * 2;
      ring.push({ x: cx + Math.cos(a) * rr, y: cy, z: cz + Math.sin(a) * rr });
    }
    mesh.push(ring);
  }

  // Стенки: правая сторона светлее, левая темнее, спереди межжелудочковая борозда
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < segs; j++) {
      const j2 = (j + 1) % segs;
      const a = ((j + 0.5) / segs) * Math.PI * 2;
      let c;
      if (Math.sin(a) < -0.75) {
        c = Math.abs(Math.cos(a)) < 0.38 ? "#7f1d1d" : "#c22626";
      } else {
        c = Math.cos(a) > 0 ? "#e04545" : "#b91c1c";
      }
      polys.push({ pts: [mesh[i][j], mesh[i][j2], mesh[i + 1][j2], mesh[i + 1][j]], c: shell(c), stroke: "#7f1d1d", isBone: true });
    }
  }
  polys.push({ pts: mesh[0], c: shell("#b91c1c"), stroke: "#7f1d1d", isBone: true });
  polys.push({ pts: mesh[rings], c: shell("#991b1b"), stroke: "#7f1d1d", isBone: true });
  // Предсердия над основанием
  pts.push({ x: 26, y: -40, z: 6, r: 16 + pulse * 0.7, c: shell("#ef4444"), isBone: true });
  pts.push({ x: -20, y: -40, z: -8, r: 15 + pulse * 0.6, c: shell("#ef4444"), isBone: true });

  // Дуга аорты и лёгочный ствол
  tubes.push({ x1: 6, y1: -30, z1: -6, x2: 18, y2: -76, z2: -4, r: 10, c: "#ef4444", isBone: false });
  tubes.push({ x1: 18, y1: -76, z1: -4, x2: -14, y2: -86, z2: 8, r: 9, c: "#ef4444", isBone: false });
  tubes.push({ x1: -14, y1: -86, z1: 8, x2: -24, y2: -54, z2: 18, r: 8.5, c: "#ef4444", isBone: false });
  tubes.push({ x1: -8, y1: -30, z1: -4, x2: -30, y2: -68, z2: -14, r: 8, c: "#3b82f6", isBone: false });

  // Коронарные артерии лежат на поверхности оболочки
  // ПНА: по межжелудочковой борозде от основания к верхушке
  const ladWay = [
    { x: 0, y: -30, z: -40 },
    { x: -2, y: -6, z: -30 },
    { x: -6, y: 22, z: -22 },
    { x: -12, y: 48, z: -13 }
  ];
  const thinAfter = st === 2;
  for (let k = 0; k < ladWay.length - 1; k++) {
    const w1 = ladWay[k];
    const w2 = ladWay[k + 1];
    const pastPlaque = k >= 1;
    tubes.push({
      x1: w1.x, y1: w1.y, z1: w1.z,
      x2: w2.x, y2: w2.y, z2: w2.z,
      r: thinAfter && pastPlaque ? 1.8 : 3.2,
      c: thinAfter && pastPlaque ? "#475569" : "#f87171",
      isBone: false
    });
  }
  // Огибающая (слева-назад)
  tubes.push({ x1: -36, y1: -28, z1: -12, x2: -46, y2: 4, z2: -4, r: 3, c: "#f87171", isBone: false });
  tubes.push({ x1: -46, y1: 4, z1: -4, x2: -42, y2: 34, z2: 6, r: 2.6, c: "#f87171", isBone: false });
  // ПКА (вправо)
  tubes.push({ x1: 34, y1: -26, z1: -14, x2: 44, y2: 2, z2: -6, r: 3, c: "#f87171", isBone: false });
  tubes.push({ x1: 44, y1: 2, z1: -6, x2: 40, y2: 30, z2: 4, r: 2.6, c: "#f87171", isBone: false });

  // ===== СТАДИИ =====
  if (st === 0) {
    labels.push({ x: 18, y: -76, z: -4, t: lang === "ru" ? "Дуга аорты" : "Aortic Arch", ox: 22, oy: -16 });
    labels.push({ x: -6, y: 22, z: -22, t: lang === "ru" ? "Коронарная артерия (ПНА)" : "Coronary Artery (LAD)", ox: -135, oy: 0 });
  } else if (st === 1) {
    pts.push({ x: -2, y: -6, z: -30, r: 6.5, c: "#facc15", isBone: false });
    labels.push({ x: -2, y: -6, z: -30, t: lang === "ru" ? "Стеноз (бляшка)" : "Coronary Plaque", ox: -130, oy: 0 });
  } else {
    pts.push({ x: -2, y: -6, z: -30, r: 7.5, c: "#f59e0b", isBone: false });
    pts.push({ x: -16, y: 52, z: -8, r: 20, c: "rgba(30, 41, 59, 0.85)", isBone: false });
    labels.push({ x: -16, y: 52, z: -8, t: lang === "ru" ? "Тромбоз и ишемия" : "Thrombosis & Ischemia", ox: -140, oy: 12 });
  }

  return { pts, tubes, polys, labels };
};
