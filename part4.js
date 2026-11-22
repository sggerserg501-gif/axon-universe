window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['3'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.12, ring = [];
  for (let a = 0; a <= 16; a++) { const ang = (a / 16) * Math.PI * 2; ring.push([Math.cos(ang) * 1.25, 0, Math.sin(ang) * 1.25]); }
  R.tube(ctx, ring, 0.18, '#dc2626', cx, cy, scale);
  R.tube(ctx, [[-2.5, 0.1, 0.2], [-1.25, 0, 0.2]], 0.15, '#dc2626', cx, cy, scale);
  R.tube(ctx, [[1.25, 0, 0.2], [2.5, 0.1, 0.2]], 0.15, '#dc2626', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, 1.25, 0.1, 0.35, (stage === 1 ? 0.28 : 0.5) * pulse, stColor, true, cx, cy, scale);
};
