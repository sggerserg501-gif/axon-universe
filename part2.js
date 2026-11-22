window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes.drawSpine = function ({ ctx, R, cx, cy, scale, t, stage, stColor }, neck) {
  const pulse = 1 + Math.sin(t * 4) * 0.12, ys = neck ? [-1.1, 0, 1.1] : [-0.85, 0.85];
  R.tube(ctx, [[0, -1.8, -0.95], [0, 1.8, -0.95]], 0.24, '#facc15', cx, cy, scale);
  ys.forEach((y, i) => {
    R.sphere(ctx, 0, y, 0, 0.92, '#cbd5e1', false, cx, cy, scale, 0.92);
    R.sphere(ctx, 0, y - 0.1, -1.35, 0.35, '#94a3b8', false, cx, cy, scale, 0.85);
    if (i < ys.length - 1) R.sphere(ctx, 0, (y + ys.at(i + 1)) / 2, 0, 0.82, '#0284c7', false, cx, cy, scale, 0.88);
  });
  if (neck) {
    R.tube(ctx, [[-1.15, -1.8, -0.6], [-1.15, 1.8, -0.6]], 0.14, '#ef4444', cx, cy, scale);
    R.tube(ctx, [[1.15, -1.8, -0.6], [1.15, 1.8, -0.6]], stage === 1 ? 0.06 : 0.14, '#ef4444', cx, cy, scale);
  }
  if (stage > 0) R.sphere(ctx, 0.15, 0, -0.82, (stage === 1 ? 0.35 : 0.58) * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['0'] = (c) => window.AtlasScenes.drawSpine(c, false);
window.AtlasScenes['4'] = (c) => window.AtlasScenes.drawSpine(c, true);
