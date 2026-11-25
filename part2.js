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

  function drawVertebra(yCenter) {
    const rx = 0.86 * sc, rz = 0.68 * sc, h = 0.42 * sc, z0 = 0.24 * sc;
    const segs = 16;

    // Замыкательные пластинки (верхняя и нижняя грани тела позвонка)
    [-1, 1].forEach((dir) => {
      const ring = [];
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        ring.push([Math.cos(a) * rx, yCenter + dir * h, z0 + Math.sin(a) * rz]);
      }
      poly3D(ring, dir > 0 ? '#f1f5f9' : '#cbd5e1', '#94a3b8', 1.1);
    });

    // Боковая стенка тела позвонка с анатомической вогнутой «талией»
    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * Math.PI * 2;
      const a2 = ((i + 1) / segs) * Math.PI * 2;
      const midA = (a1 + a2) / 2;
      const light = Math.sin(midA) * 0.5 + 0.5;
      const shade = light > 0.65 ? '#f8fafc' : light > 0.35 ? '#e2e8f0' : '#cbd5e1';
      poly3D([
        [Math.cos(a1) * rx, yCenter + h, z0 + Math.sin(a1) * rz],
        [Math.cos(a2) * rx, yCenter + h, z0 + Math.sin(a2) * rz],
        [Math.cos(a2) * rx * 0.94, yCenter, z0 + Math.sin(a2) * rz * 0.94],
        [Math.cos(a1) * rx * 0.94, yCenter, z0 + Math.sin(a1) * rz * 0.94]
      ], shade, '#94a3b8', 0.6);
      poly3D([
        [Math.cos(a1) * rx * 0.94, yCenter, z0 + Math.sin(a1) * rz * 0.94],
        [Math.cos(a2) * rx * 0.94, yCenter, z0 + Math.sin(a2) * rz * 0.94],
        [Math.cos(a2) * rx, yCenter - h, z0 + Math.sin(a2) * rz],
        [Math.cos(a1) * rx, yCenter - h, z0 + Math.sin(a1) * rz]
      ], shade, '#94a3b8', 0.6);
    }

    // Ножки дуги позвонка (образуют позвоночный канал)
    [-1, 1].forEach((side) => {
      tube3D([
        [side * 0.52 * sc, yCenter + 0.06 * sc, -0.22 * sc],
        [side * 0.56 * sc, yCenter, -0.68 * sc],
        [0, yCenter - 0.06 * sc, -0.92 * sc]
      ], 0.14 * sc, '#cbd5e1', '#f1f5f9');

      // Поперечные отростки (крылья)
      tube3D([
        [side * 0.56 * sc, yCenter + 0.04 * sc, -0.58 * sc],
        [side * 1.18 * sc, yCenter + 0.02 * sc, -0.68 * sc]
      ], 0.12 * sc, '#cbd5e1', '#f8fafc');
    });

    // Остистый отросток (направлен назад и вниз)
    tube3D([
      [0, yCenter - 0.04 * sc, -0.88 * sc],
      [0, yCenter - 0.24 * sc, -1.48 * sc]
    ], 0.13 * sc, '#cbd5e1', '#f8fafc');
  }

  function drawDisc(yCenter, damaged) {
    const rx = (damaged && stage === 2 ? 0.95 : 0.88) * sc;
    const rz = (damaged && stage === 2 ? 0.74 : 0.7) * sc;
    const h = (damaged && stage === 2 ? 0.15 : 0.21) * sc;
    const z0 = 0.24 * sc;
    const segs = 16;
    const colMain = damaged && stage === 2 ? '#0369a1' : '#0284c7';
    const colHi = damaged && stage === 2 ? '#38bdf8' : '#7dd3fc';

    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * Math.PI * 2;
      const a2 = ((i + 1) / segs) * Math.PI * 2;
      poly3D([
        [Math.cos(a1) * rx, yCenter + h, z0 + Math.sin(a1) * rz],
        [Math.cos(a2) * rx, yCenter + h, z0 + Math.sin(a2) * rz],
        [Math.cos(a2) * rx, yCenter - h, z0 + Math.sin(a2) * rz],
        [Math.cos(a1) * rx, yCenter - h, z0 + Math.sin(a1) * rz]
      ], colMain, colHi, 0.5, 0.92);
    }
  }

  // Строим позвонки и диски
  ys.forEach((y, i) => {
    drawVertebra(y);
    if (i < ys.length - 1) {
      const midY = (y + ys[i + 1]) / 2;
      drawDisc(midY, i === 0);
    }
  });

  // Спинной мозг и спинномозговые нервные корешки
  tube3D([[0, -1.85 * sc, -0.64 * sc], [0, 1.85 * sc, -0.64 * sc]], 0.19 * sc, '#eab308', '#fef08a', 0.95);
  [-0.48, 0.48].forEach((ry) => {
    [-1, 1].forEach((side) => {
      const pinched = stage > 0 && Math.abs(ry) < 0.6 && side > 0;
      tube3D([
        [side * 0.14 * sc, ry * sc, -0.64 * sc],
        [side * 0.68 * sc, (ry - 0.14) * sc, -0.52 * sc],
        [side * 1.25 * sc, (ry - 0.28) * sc, -0.35 * sc]
      ], 0.065 * sc, pinched ? stColor : '#facc15', '#fef9c3');
    });
  });

  // Позвоночные артерии (для шейного отдела)
  if (neck) {
    [-1, 1].forEach((side) => {
      const squeezed = stage > 0 && side > 0;
      tube3D([
        [side * 0.96 * sc, -1.65 * sc, -0.56 * sc],
        [side * 0.96 * sc, 0, -0.56 * sc],
        [side * 0.96 * sc, 1.65 * sc, -0.56 * sc]
      ], (squeezed && stage === 2 ? 0.06 : 0.095) * sc, squeezed ? stColor : '#dc2626', '#fca5a5');
    });
  }

  // Протрузия / грыжа диска с выпячиванием в позвоночный канал
  if (stage > 0) {
    const hy = neck ? -0.59 : 0;
    const hz = (stage === 1 ? -0.44 : -0.58) * sc;
    const hx = (stage === 1 ? 0.12 : 0.24) * sc;
    const hr = (stage === 1 ? 0.22 : 0.34) * sc;
    tube3D([[0.08 * sc, hy, -0.22 * sc], [hx, hy, hz]], hr, stColor, '#fecaca', 0.95);
  }

  // Сортировка по глубине Z (чтобы при вращении на 360° переднее всегда перекрывало заднее)
  items.sort((a, b) => (a.z || 0) - (b.z || 0));
  items.forEach((it) => it.draw());
};

window.AtlasScenes['0'] = (c) => window.AtlasScenes.drawSpine(c, false);
window.AtlasScenes['4'] = (c) => window.AtlasScenes.drawSpine(c, true);
