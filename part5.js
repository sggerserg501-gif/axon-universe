window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['5'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.12, beat = 1 + Math.pow(Math.sin(t * 3.2), 4) * 0.08;
  R.sphere(ctx, 0, -0.1, 0, 1.48 * beat, '#dc2626', false, cx, cy, scale, 0.88);
  R.tube(ctx, [[-0.2, 1.1, 0], [0, 1.85, 0], [0.55, 1.45, -0.2]], 0.32, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[0.1, 1.0, 1.1], [0.65, 0.3, 1.2], [0.4, -0.9, 0.95]], 0.1, '#facc15', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, 0.64, 0.3, 1.22, (stage === 1 ? 0.22 : 0.38) * pulse, stColor, true, cx, cy, scale);
};
