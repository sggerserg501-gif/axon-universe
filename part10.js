window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['11'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  // Пищевод, дно, тело, привратник желудка и луковица 12-перстной кишки
  R.tube(ctx, [[-0.45, 1.85, 0], [-0.45, 1.05, 0]], 0.18, '#f472b6', cx, cy, scale);
  R.poly(ctx, [[-0.45, 1.25, 0], [0.45, 1.35, 0], [1.15, 0.45, 0], [0.85, -0.85, 0], [-0.25, -1.15, 0], [-0.85, -0.55, 0], [-0.65, 0.45, 0]], '#be185d', '#f472b6', '#fbcfe8', cx, cy, scale, 0.82);
  R.tube(ctx, [[-0.85, -0.55, 0], [-1.55, -0.35, 0.1], [-1.75, -1.15, 0.1]], 0.16, '#fb7185', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, stage === 1 ? 0.15 : -0.75, stage === 1 ? -0.25 : -0.55, 0.25, (stage === 1 ? 0.28 : 0.42) * pulse, stColor, true, cx, cy, scale);
};
