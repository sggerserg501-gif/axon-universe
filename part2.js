window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes.drawSpine = function (c, neck) {
  const { ctx, R, cx, cy, scale, stage, stColor } = c;
  const ys = neck ? [-1.15, 0, 1.15] : [-0.88, 0.88];
  const sc = neck ? 0.82 : 1.0;

  const P = (x, y, z) => R.project(x, y, z, cx, cy, scale);

  function ball(x, y, z, r, color, a) {
    const p = P(x, y, z);
    ctx.globalAlpha = a == null ? 1 : a;
    ctx.beginPath();
    ctx.arc(p.sx, p.sy, Math.max(1, r * scale), 0, Math.PI * 2);
    ctx.fillStyle = color;
    // Тень для объёма
ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
ctx.shadowBlur = 8;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;

// Аккуратная обводка — сразу похоже на кольца
ctx.strokeStyle = '#64748b';
ctx.lineWidth = 1.8;
ctx.stroke();

// Сбрасываем тень, чтобы не размазывалась по всему холсту
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;
ctx.fill();
    ctx.globalAlpha = 1;
  }

  function tube(x1, y1, z1, x2, y2, z2, w, color, a) {
    const p1 = P(x1, y1, z1), p2 = P(x2, y2, z2);
    ctx.globalAlpha = a == null ? 1 : a;
    ctx.beginPath();
    ctx.moveTo(p1.sx, p1.sy);
    ctx.lineTo(p2.sx, p2.sy);
    ctx.lineWidth = Math.max(1, w * scale);
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  const bone = '#e2e8f0';

  // остистые отростки (сзади)
  ys.forEach((y) => ball(0, y - 0.08, -1.18 * sc, 0.45 * sc, bone));

  // спинной мозг
  tube(0, -1.9 * sc, -0.88 * sc, 0, 1.9 * sc, -0.88 * sc, 0.36 * sc, '#facc15');

  // фасеточные суставы (только шейный отдел)
  if (neck) [-1.12, 1.12].forEach((x) =>
    tube(x, -1.1, -0.55, x, 1.1, -0.55, 0.22, '#dc2626', 0.85));

  // тела позвонков и диски (спереди)
  ys.forEach((y, i) => {
    ball(0, y, 0.1 * sc, 1.05 * sc, bone);
    if (i < ys.length - 1) {
      ball(0, (y + ys[i + 1]) / 2, 0.1 * sc, 1.06 * sc, '#0284c7', 0.95);
    }
  });

  // протрузия / грыжа
  if (stage > 0) {
    const hz = stage === 1 ? -0.68 : -0.84;
    ball(stage === 2 ? 0.2 : 0.05, 0, hz, stage === 1 ? 0.3 : 0.48, stColor, 0.9);
  }
};

window.AtlasScenes['0'] = (c) => window.AtlasScenes.drawSpine(c, false);
window.AtlasScenes['4'] = (c) => window.AtlasScenes.drawSpine(c, true);
