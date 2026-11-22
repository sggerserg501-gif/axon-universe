window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['1'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.12;
  R.sphere(ctx, -0.68, 0.25, 0, 1.35, '#94a3b8', false, cx, cy, scale, 0.45);
  R.sphere(ctx, 0.68, 0.25, 0, 1.35, '#94a3b8', false, cx, cy, scale, 0.45);
  R.sphere(ctx, 0, -0.95, -0.85, 0.72, '#64748b', false, cx, cy, scale, 0.65);
  if (stage > 0) R.sphere(ctx, 0.65, 0.35, 0.25, (stage === 1 ? 0.45 : 0.72) * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['2'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  R.sphere(ctx, -2.2, 0, 0, 0.72, '#facc15', true, cx, cy, scale);
  R.tube(ctx, [[-2.2, 0, 0], [2.4, 0, 0]], 0.12, '#eab308', cx, cy, scale);
  [-1.1, -0.15, 0.8, 1.75].forEach((x, idx) => {
    const dmg = (stage === 1 && idx === 2) || (stage === 2 && idx >= 2);
    R.sphere(ctx, x, 0, 0, 0.32, dmg ? stColor : '#0284c7', dmg, cx, cy, scale);
  });
  R.sphere(ctx, -2.0 + ((t * 0.8) % 1) * (stage === 2 ? 2.5 : 4.3), 0, 0.1, 0.2, '#38bdf8', true, cx, cy, scale);
};
