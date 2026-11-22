window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['10'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  const liverCol = stage === 1 ? '#ca8a04' : '#991b1b';
  // Правая и левая доли печени
  R.poly(ctx, [[-1.65, 0.85, 0], [0.35, 1.15, 0], [1.75, 0.45, 0], [1.45, -0.35, 0], [-0.25, -0.65, 0], [-1.55, -0.95, 0]], liverCol, '#ef4444', '#fca5a5', cx, cy, scale, 0.88);
  // Желчный пузырь и общий желчный проток
  R.sphere(ctx, -0.35, -0.68, 0.25, 0.34, '#16a34a', false, cx, cy, scale, 0.9);
  R.tube(ctx, [[-0.35, -0.5, 0.2], [-0.15, -1.55, 0.1]], 0.08, '#22c55e', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, stage === 1 ? -0.35 : 0.45, stage === 1 ? -0.68 : 0.25, 0.3, (stage === 1 ? 0.22 : 0.48) * pulse, stColor, true, cx, cy, scale);
};
