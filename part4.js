window.AtlasParts[1] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.003;
  const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;

  // Полушария мозга (прозрачные при Рентгене или патологии)
  const hemiCol = (isXray || st > 0) ? "rgba(148, 163, 184, 0.25)" : "#94a3b8";
  pts.push({ x: -32, y: -16, z: 0, r: 56, c: hemiCol, isBone: true });
  pts.push({ x: 32, y: -16, z: 0, r: 56, c: hemiCol, isBone: true });

  // Мозжечок и ствол мозга
  pts.push({ x: -22, y: 34, z: 34, r: 28, c: "#cbd5e1", isBone: true });
  pts.push({ x: 22, y: 34, z: 34, r: 28, c: "#cbd5e1", isBone: true });
  tubes.push({ x1: 0, y1: 14, z1: 8, x2: 0, y2: 78, z2: 18, r: 10, c: "#e2e8f0", isBone: true });

  // Сосуды внутри полушарий
  tubes.push({ x1: 0, y1: 44, z1: -8, x2: 0, y2: -18, z2: -12, r: 3, c: "#38bdf8", isBone: false });
  tubes.push({ x1: 0, y1: -18, z1: -12, x2: 38, y2: -24, z2: 6, r: 2.5, c: st === 1 ? "#f59e0b" : "#38bdf8", isBone: false });

  if (st === 0) {
    labels.push({ x: -42, y: -62, z: 0, t: lang === "ru" ? "Полушария мозга" : "Cerebral Hemispheres", ox: -60, oy: -12 });
    labels.push({ x: 22, y: 40, z: 34, t: lang === "ru" ? "Мозжечок и ствол" : "Cerebellum & Brainstem", ox: 20, oy: 12 });
  } else if (st === 1) {
    pts.push({ x: 36, y: -22, z: 4, r: 18 + pulse * 4, c: "#f59e0b", isBone: false });
    labels.push({ x: 36, y: -22, z: 4, t: lang === "ru" ? "Зона ангиоспазма" : "Focal Angiospasm", ox: 24, oy: -18 });
  } else {
    pts.push({ x: 34, y: -20, z: 4, r: 24 + pulse * 5, c: "#ef4444", isBone: false });
    labels.push({ x: 34, y: -20, z: 4, t: lang === "ru" ? "Объёмный очаг" : "Mass Effect Lesion", ox: 26, oy: -20 });
  }

  return { pts, tubes, polys, labels };
};

window.AtlasParts[2] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.004;
  const imp = ((t * 45) % 160) - 80;

  // Тело нейрона (сома) и ядро
  pts.push({ x: -95, y: 0, z: 0, r: 30, c: "#38bdf8", isBone: false });
  pts.push({ x: -95, y: 0, z: 0, r: 12, c: "#e0f2fe", isBone: false });

  // Дендриты
  const dens = [[-138, -36, 14], [-144, 8, -18], [-132, 42, 12], [-115, -48, -14]];
  for (let i = 0; i < dens.length; i++) {
    tubes.push({ x1: -95, y1: 0, z1: 0, x2: dens[i][0], y2: dens[i][1], z2: dens[i][2], r: 2.5, c: "#7dd3fc", isBone: false });
  }

  // Осевой цилиндр аксона
  const axCol = st === 2 ? "#ef4444" : "#38bdf8";
  tubes.push({ x1: -65, y1: 0, z1: 0, x2: 88, y2: 0, z2: 0, r: 3, c: axCol, isBone: false });

  // Миелиновые муфты
  const segs = [-42, -10, 22, 54];
  for (let j = 0; j < segs.length; j++) {
    const isDamaged = (st === 1 && j === 2) || (st === 2 && j >= 2);
    const mCol = isDamaged ? (st === 1 ? "#f59e0b" : "#ef4444") : "#0284c7";
    tubes.push({ x1: segs[j], y1: 0, z1: 0, x2: segs[j] + 22, y2: 0, z2: 0, r: isDamaged ? 5 : 8, c: mCol, isBone: false });
  }

  // Синапс и бегущий импульс
  tubes.push({ x1: 88, y1: 0, z1: 0, x2: 106, y2: -16, z2: 8, r: 2.5, c: axCol, isBone: false });
  tubes.push({ x1: 88, y1: 0, z1: 0, x2: 106, y2: 16, z2: -8, r: 2.5, c: axCol, isBone: false });
  pts.push({ x: 106, y: -16, z: 8, r: 8, c: axCol, isBone: false });
  pts.push({ x: 106, y: 16, z: -8, r: 8, c: axCol, isBone: false });

  if (st < 2) {
    const ix = (st === 1 && imp > 22) ? 22 : imp;
    pts.push({ x: ix, y: 0, z: 0, r: 6.5, c: "#fde047", isBone: false });
  }

  labels.push({ x: -95, y: -32, z: 0, t: lang === "ru" ? "Сома и дендриты" : "Soma & Dendrites", ox: -40, oy: -18 });
  if (st === 0) {
    labels.push({ x: 10, y: -10, z: 0, t: lang === "ru" ? "Миелин (Норма)" : "Healthy Myelin", ox: 0, oy: -24 });
  } else if (st === 1) {
    labels.push({ x: 32, y: -10, z: 0, t: lang === "ru" ? "Демиелинизация" : "Demyelination", ox: 10, oy: -26 });
  } else {
    labels.push({ x: 64, y: -10, z: 0, t: lang === "ru" ? "Блокада аксона" : "Axonal Block", ox: 14, oy: -28 });
  }

  return { pts, tubes, polys, labels };
};
