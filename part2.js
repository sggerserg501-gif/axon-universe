window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes.drawSpine = function ({ ctx, R, cx, cy, scale, t, stage, stColor }, neck) {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  const ys = neck ? [-1.15, 0, 1.15] : [-0.88, 0.88];
  const sc = neck ? 0.82 : 1.0;

  R.tube(ctx, [[0, -1.9, -0.92 * sc], [0, 1.9, -0.92 * sc]], 0.22 * sc, '#facc15', cx, cy, scale);
  [-0.55, 0.55].forEach((ry) => {
    R.tube(ctx, [[0, ry, -0.92 * sc], [-0.8 * sc, ry - 0.18, -0.75 * sc], [-1.55 * sc, ry - 0.42, -0.4 * sc]], 0.08 * sc, '#fde047', cx, cy, scale);
    R.tube(ctx, [[0, ry, -0.92 * sc], [0.8 * sc, ry - 0.18, -0.75 * sc], [1.55 * sc, ry - 0.42, -0.4 * sc]], 0.08 * sc, '#fde047', cx, cy, scale);
  });

  ys.forEach((y, i) => {
    const w = 1.1 * sc, h = 0.44 * sc, zF = 0.85 * sc, zB = -0.65 * sc;
    R.poly(ctx, [[-w, y + h, zF], [w, y + h, zF], [w * 0.88, y, zF], [w, y - h, zF], [-w, y - h, zF], [-w * 0.88, y, zF]], '#cbd5e1', '#f8fafc', '#94a3b8', cx, cy, scale, 0.95);
    R.poly(ctx, [[-w, y + h, zB], [w, y + h, zB], [w, y + h, zF], [-w, y + h, zF]], '#e2e8f0', '#ffffff', '#94a3b8', cx, cy, scale, 0.92);
    R.poly(ctx, [[-0.2 * sc, y + 0.25 * sc, zB], [-0.15 * sc, y - 0.1 * sc, -1.75 * sc], [0.15 * sc, y - 0.42 * sc, -1.75 * sc], [0.2 * sc, y - 0.25 * sc, zB]], '#94a3b8', '#e2e8f0', '#64748b', cx, cy, scale, 0.94);

    if (i < ys.length - 1) {
      const dy = (y + ys.at(i + 1)) / 2, dh = 0.2 * sc;
      R.poly(ctx, [[-w * 1.03, dy + dh, zF], [w * 1.03, dy + dh, zF], [w * 1.03, dy - dh, zF], [-w * 1.03, dy - dh, zF]], '#0369a1', '#38bdf8', '#7dd3fc', cx, cy, scale, 0.88);
      R.sphere(ctx, 0, dy, 0.1 * sc, 0.34 * sc, '#7dd3fc', false, cx, cy, scale, 0.75);
    }
  });

  if (neck) {
    R.tube(ctx, [[-1.12, -1.8, -0.55], [-1.12, 1.8, -0.55]], 0.12, '#dc2626', cx, cy, scale);
    R.tube(ctx, [[1.12, -1.8, -0.55], [1.12, 1.8, -0.55]], stage === 1 ? 0.05 : 0.12, '#dc2626', cx, cy, scale);
  }
  if (stage > 0) R.sphere(ctx, stage === 2 ? 0.22 * sc : 0.08, 0, (stage === 1 ? -0.72 : -0.88) * sc, (stage === 1 ? 0.32 : 0.54) * sc * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['0'] = (c) => window.AtlasScenes.drawSpine(c, false);
window.AtlasScenes['4'] = (c) => window.AtlasScenes.drawSpine(c, true);
