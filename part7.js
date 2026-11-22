window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['8'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  // Зрительный нерв сзади и склера глазного яблока
  R.tube(ctx, [[0, 0, -1.25], [-0.45, -0.25, -2.35]], 0.22, '#facc15', cx, cy, scale);
  R.sphere(ctx, 0, 0, 0, 1.32, '#cbd5e1', false, cx, cy, scale, 0.42);
  // Сетчатка (внутренняя оболочка) и хрусталик спереди
  R.sphere(ctx, 0, 0, -0.15, 1.15, stage === 2 ? stColor : '#f97316', stage === 2, cx, cy, scale, 0.35);
  R.sphere(ctx, 0, 0, 1.05, 0.46, stage === 1 ? '#fde047' : '#38bdf8', stage === 1, cx, cy, scale, stage === 1 ? 0.92 : 0.65);
  R.sphere(ctx, 0, 0, 1.28, 0.24, '#0284c7', false, cx, cy, scale, 0.75);
  if (stage === 2) R.sphere(ctx, 0.35, -0.35, -0.85, 0.32 * pulse, stColor, true, cx, cy, scale);
};
