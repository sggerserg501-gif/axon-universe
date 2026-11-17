window.AtlasParts[7] = function (st, lang) {
  const pts = [];
  const tubes = [];
  const polys = [];
  const labels = [];

  // Бедренная кость и мыщелки (сверху)
  tubes.push({ x1: 0, y1: -115, z1: 0, x2: 0, y2: -38, z2: 0, r: 22, c: "#e2e8f0", isBone: true });
  pts.push({ x: -24, y: -32, z: 2, r: 24, c: "#cbd5e1", isBone: true });
  pts.push({ x: 24, y: -32, z: 2, r: 24, c: "#cbd5e1", isBone: true });

  // Большеберцовая кость и плато (снизу)
  tubes.push({ x1: 0, y1: 36, z1: 0, x2: 0, y2: 115, z2: 0, r: 20, c: "#e2e8f0", isBone: true });
  pts.push({ x: -24, y: 32, z: 2, r: 22, c: "#cbd5e1", isBone: true });
  pts.push({ x: 24, y: 32, z: 2, r: 22, c: "#cbd5e1", isBone: true });

  // Надколенник (спереди по оси -Z)
  pts.push({ x: 0, y: -12, z: -38, r: 15, c: "#f8fafc", isBone: true });
  tubes.push({ x1: 0, y1: -12, z1: -38, x2: 0, y2: 34, z2: -26, r: 4, c: "#94a3b8", isBone: true });

  // Суставной хрящ и мениски
  const cartCol = st === 1 ? "#f59e0b" : "#38bdf8";
  tubes.push({ x1: -42, y1: 2, z1: -12, x2: -10, y2: 2, z2: 14, r: 5, c: cartCol, isBone: false });
  tubes.push({ x1: 42, y1: 2, z1: -12, x2: 10, y2: 2, z2: 14, r: 5, c: "#38bdf8", isBone: false });

  // Задняя и передняя крестообразные связки (ПКС и ЗКС)
  tubes.push({ x1: -6, y1: -22, z1: -8, x2: 6, y2: 22, z2: 14, r: 4, c: "#fde047", isBone: false });
  if (st < 2) {
    tubes.push({ x1: 8, y1: -22, z1: 12, x2: -8, y2: 22, z2: -12, r: 4, c: "#facc15", isBone: false });
  } else {
    // Разрыв передней крестообразной связки (ПКС) на Стадии II
    tubes.push({ x1: 8, y1: -22, z1: 12, x2: 3, y2: -3, z2: 4, r: 4, c: "#ef4444", isBone: false });
    tubes.push({ x1: -3, y1: 6, z1: -4, x2: -8, y2: 22, z2: -12, r: 4, c: "#ef4444", isBone: false });
    pts.push({ x: 0, y: 1, z: 0, r: 8, c: "#ef4444", isBone: false });
  }

  if (st === 0) {
    labels.push({ x: 0, y: -12, z: -38, t: lang === "ru" ? "Надколенник" : "Patella", ox: -95, oy: -12 });
    labels.push({ x: 8, y: -10, z: 6, t: lang === "ru" ? "ПКС и мениски (Норма)" : "ACL & Menisci", ox: 26, oy: -14 });
  } else if (st === 1) {
    labels.push({ x: -28, y: 2, z: 0, t: lang === "ru" ? "Износ хряща и мениска" : "Meniscus & Cartilage Wear", ox: -135, oy: 0 });
  } else {
    labels.push({ x: 0, y: 1, z: 0, t: lang === "ru" ? "Разрыв ПКС и гемартроз" : "ACL Rupture", ox: 26, oy: 8 });
  }

  return { pts, tubes, polys, labels };
};
