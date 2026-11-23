window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['9'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  R.poly(ctx, [[-0.2, 1.35, 0], [0.75, 1.05, 0], [1.05, 0, 0], [0.75, -1.05, 0], [-0.2, -1.35, 0], [-0.55, -0.45, 0], [-0.35, 0, 0], [-0.55, 0.45, 0]], '#7f1d1d', '#dc2626', '#fca5a5', cx, cy, scale, 0.92);
  R.sphere(ctx, -0.35, 0, 0.1, 0.35, '#fde68a', false, cx, cy, scale, 0.85);
  R.tube(ctx, [[-0.45, 0.18, 0.1], [-1.35, 0.25, 0.1]], 0.14, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[-0.45, -0.1, 0.1], [-0.75, -0.85, 0], [-0.75, -1.75, 0]], 0.1, '#facc15', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, -0.35, -0.15, 0.2, (stage === 1 ? 0.18 : 0.32) * pulse, stColor, true, cx, cy, scale);
};
