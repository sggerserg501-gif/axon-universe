window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['5'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14, beat = 1 + Math.pow(Math.sin(t * 3.2), 4) * 0.06;
  R.poly(ctx, [[-0.95, 0.85, 0], [0.15, 1.15, 0], [1.15, 0.55, 0], [0.95, -0.65, 0], [0.15, -1.65, 0], [-0.85, -0.55, 0]], '#991b1b', '#ef4444', '#fca5a5', cx, cy, scale, 0.92);
  R.tube(ctx, [[-0.15, 0.95, 0], [-0.1, 1.85, 0], [0.55, 1.75, -0.15], [0.75, 1.05, -0.25]], 0.28 * beat, '#dc2626', cx, cy, scale);
  R.tube(ctx, [[0.2, 0.85, 0.35], [-0.65, 1.45, 0.25]], 0.22 * beat, '#2563eb', cx, cy, scale, 0.85);
  R.tube(ctx, [[0.05, 0.85, 0.4], [0.55, 0.15, 0.5], [0.35, -1.15, 0.3]], 0.08, '#facc15', cx, cy, scale);
  R.tube(ctx, [[0.55, 0.15, 0.5], [0.85, -0.45, 0.35]], 0.06, '#fde047', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, 0.55, 0.15, 0.52, (stage === 1 ? 0.2 : 0.36) * pulse, stColor, true, cx, cy, scale);
};
