window.AtlasParts[3] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];
  const t = Date.now() * 0.003;
  const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;
  const flow = (t * 0.8) % 1;

  // Базилярная и внутренние сонные артерии
  tubes.push({ x1: 0, y1: 95, z1: 12, x2: 0, y2: 24, z2: 8, r: 5.5, c: "#ef4444", isBone: false });
  tubes.push({ x1: -56, y1: 88, z1: -16, x2: -36, y2: 6, z2: -10, r: 5, c: "#ef4444", isBone: false });
  tubes.push({ x1: 56, y1: 88, z1: -16, x2: 36, y2: 6, z2: -10, r: 5, c: "#ef4444", isBone: false });

  // Замкнутое кольцо Виллизиева круга
  const ring = [
    { x: 0, y: 24, z: 8 },
    { x: -34, y: 12, z: -2 },
    { x: -36, y: -16, z: -18 },
    { x: 0, y: -32, z: -28 },
    { x: 36, y: -16, z: -18 },
    { x: 34, y: 12, z: -2 }
  ];

  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const isSpasm = st === 1 && (i === 3 || i === 4);
    tubes.push({
      x1: a.x, y1: a.y, z1: a.z,
      x2: b.x, y2: b.y, z2: b.z,
      r: isSpasm ? 2.2 : 4.5,
      c: isSpasm ? "#f59e0b" : "#ef4444",
      isBone: false
    });
  }

  // Средние и передние мозговые артерии
  tubes.push({ x1: -36, y1: -16, z1: -18, x2: -88, y2: -32, z2: -12, r: 3.5, c: "#ef4444", isBone: false });
  tubes.push({ x1: 36, y1: -16, z1: -18, x2: 88, y2: -32, z2: -12, r: st === 1 ? 2.0 : 3.5, c: st === 1 ? "#f59e0b" : "#ef4444", isBone: false });
  tubes.push({ x1: -16, y1: -28, z1: -24, x2: -22, y2: -78, z2: -34, r: 3, c: "#ef4444", isBone: false });
  tubes.push({ x1: 16, y1: -28, z1: -24, x2: 22, y2: -78, z2: -34, r: 3, c: "#ef4444", isBone: false });

  // Эритроциты кровотока
  pts.push({ x: 0, y: 95 - flow * 70, z: 12 - flow * 4, r: 4, c: "#fecaca", isBone: false });
  pts.push({ x: -36 - flow * 48, y: -16 - flow * 14, z: -18 + flow * 5, r: 3.5, c: "#fecaca", isBone: false });

  if (st === 0) {
    labels.push({ x: 0, y: -32, z: -28, t: lang === "ru" ? "Виллизиев круг (Норма)" : "Circle of Willis", ox: -20, oy: -28 });
    labels.push({ x: 0, y: 74, z: 10, t: lang === "ru" ? "Базилярная артерия" : "Basilar Artery", ox: 22, oy: 12 });
  } else if (st === 1) {
    labels.push({ x: 46, y: -24, z: -16, t: lang === "ru" ? "Ангиоспазм СМА" : "MCA Angiospasm", ox: 20, oy: -22 });
  } else {
    pts.push({ x: 24, y: -26, z: -24, r: 13 + pulse * 4, c: "#dc2626", isBone: false });
    pts.push({ x: 30, y: -32, z: -20, r: 22 + pulse * 5, c: "rgba(239, 68, 68, 0.35)", isBone: false });
    labels.push({ x: 26, y: -28, z: -24, t: lang === "ru" ? "Аневризма и разрыв" : "Aneurysm Rupture", ox: 24, oy: -24 });
  }

  return { pts, tubes, polys, labels };
};
