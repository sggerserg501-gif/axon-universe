window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['9'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  // Бобовидный контур паренхимы почки и почечная лоханка
  R.poly(ctx, [[-0.35, 1.55, 0], [0.75, 1.35, 0], [1.15, 0, 0], [0.75, -1.35, 0], [-0.35, -1.55, 0], [-0.65, -0.55, 0], [-0.35, 0, 0], [-0.65, 0.55, 0]], '#7f1d1d', '#dc2626', '#fca5a5', cx, cy, scale, 0.85);
  // Почечная артерия, вена и мочеточник
  R.tube(ctx, [[-1.75, 0.25, 0.1], [-0.45, 0.15, 0.1]], 0.14, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[-1.75, -0.1, 0.2], [-0.45, -0.1, 0.2]], 0.15, '#2563eb', cx, cy, scale);
  R.tube(ctx, [[-0.45, -0.25, 0], [-0.65, -1.85, 0]], stage === 2 ? 0.22 : 0.11, '#facc15', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, 0.15, -0.15, 0.15, (stage === 1 ? 0.24 : 0.45) * pulse, stColor, true, cx, cy, scale);
};
