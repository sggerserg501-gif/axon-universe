window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['6'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const wTop = stage === 2 ? 0.68 : stage === 1 ? 0.48 : 0.38;
  R.poly(ctx, [[-wTop, 1.85, 0], [wTop, 1.85, 0], [0.38, -1.85, 0], [-0.38, -1.85, 0]], '#1e3a8a', '#3b82f6', '#93c5fd', cx, cy, scale, 0.45);
  R.tube(ctx, [[-wTop, 0.35, 0], [-0.05, stage === 0 ? 0.02 : 0.48, 0]], 0.09, stColor, cx, cy, scale);
  R.tube(ctx, [[wTop, 0.35, 0], [0.05, stage === 0 ? 0.02 : 0.48, 0]], 0.09, stColor, cx, cy, scale);
  for (let i = 0; i < 6; i++) R.sphere(ctx, (i % 2 - 0.5) * 0.25, -1.6 + (((t * 0.6 + i * 0.16) % 1) * 3.2), 0.1, 0.11, '#ef4444', false, cx, cy, scale);
};

window.AtlasScenes['7'] = ({ ctx, R, cx, cy, scale, stage, stColor }) => {
  R.poly(ctx, [[-0.55, 1.9, 0], [0.55, 1.9, 0], [0.95, 0.35, 0], [0.35, 0.18, 0], [-0.35, 0.18, 0], [-0.95, 0.35, 0]], '#cbd5e1', '#f8fafc', '#94a3b8', cx, cy, scale, 0.94);
  R.poly(ctx, [[-0.92, -0.25, 0], [0.92, -0.25, 0], [0.55, -1.9, 0], [-0.55, -1.9, 0]], '#cbd5e1', '#f8fafc', '#94a3b8', cx, cy, scale, 0.94);
  R.sphere(ctx, 0, 0.25, 0.95, 0.34, '#e2e8f0', false, cx, cy, scale, 0.9);
  R.tube(ctx, [[-0.88, -0.05, 0], [0, -0.05, 0.78], [0.88, -0.05, 0]], 0.16, stage === 1 ? stColor : '#0284c7', cx, cy, scale);
  R.tube(ctx, [[-0.25, -0.28, 0], [0.25, 0.28, 0]], 0.12, stage === 2 ? stColor : '#facc15', cx, cy, scale);
};
