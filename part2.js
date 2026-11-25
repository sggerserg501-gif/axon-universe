window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes.drawSpine = function (c, neck) {
  const { ctx, R, cx, cy, scale, stage, stColor } = c;
  const ys = neck ? [-1.18, 0, 1.18] : [-0.95, 0.95];
  const sc = neck ? 0.84 : 1.02;
  const items = [];

  const P = (x, y, z) => R.project(x, y, z, cx, cy, scale);

  function addItem(zOrder, drawFn) {
    items.push({ z: zOrder, draw: drawFn });
  }

  function poly3D(pts, fill, stroke, lw, alpha) {
    const proj = pts.map((pt) => P(pt[0], pt[1], pt[2]));
    const avgZ = proj.reduce((s, p) => s + (p.z || 0), 0) / proj.length;
    addItem(avgZ, () => {
      ctx.save();
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.beginPath();
      proj.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)));
      ctx.closePath();
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lw || 1.2;
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  function tube3D(pts, r, color, highlight, alpha) {
    const proj = pts.map((pt) => P(pt[0], pt[1], pt[2]));
    const avgZ = proj.reduce((s, p) => s + (p.z || 0), 0) / proj.length;
    addItem(avgZ, () => {
      ctx.save();
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      proj.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)));
      ctx.lineWidth = Math.max(1.5, r * 2 * scale);
      ctx.strokeStyle = color;
      ctx.stroke();
      if (highlight) {
        ctx.lineWidth = Math.max(0.8, r * 0.65 * scale);
        ctx.strokeStyle = highlight;
        ctx.stroke();
      }
      ctx.restore();
    });
  }

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
