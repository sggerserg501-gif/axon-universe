window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['6'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  R.tube(ctx, [[0, -1.9, 0], [0, 1.9, 0]], stage === 2 ? 0.85 : 0.58, '#2563eb', cx, cy, scale, 0.45);
  R.tube(ctx, [[-0.42, 0.3, 0], [0, stage === 0 ? 0.05 : 0.45, 0], [0.42, 0.3, 0]], 0.1, stColor, cx, cy, scale);
  for (let i = 0; i < 6; i++) {
    R.sphere(ctx, (i % 2 - 0.5) * 0.22, -1.7 + (((t * 0.6 + i * 0.16) % 1) * 3.4), 0.1, 0.11, '#ef4444', false, cx, cy, scale);
  }
};

window.AtlasScenes['7'] = ({ ctx, R, cx, cy, scale, stage, stColor }) => {
  R.sphere(ctx, 0, 1.15, 0, 0.95, '#e2e8f0', false, cx, cy, scale, 0.92);
  R.sphere(ctx, 0, -1.15, 0, 0.92, '#e2e8f0', false, cx, cy, scale, 0.92);
  R.tube(ctx, [[-0.85, 0, 0], [0, 0, 0.85], [0.85, 0, 0]], 0.18, stage === 1 ? stColor : '#0284c7', cx, cy, scale);
  R.tube(ctx, [[-0.25, -0.5, 0], [0.25, 0.5, 0]], 0.14, stage === 2 ? stColor : '#facc15', cx, cy, scale);
};
