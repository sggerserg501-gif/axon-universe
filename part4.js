window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['3'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  // Замкнутый артериальный многоугольник (Виллизиев круг) + СМА, ПМА, ЗМА и базилярная артерия
  R.tube(ctx, [[0, 0.25, 1.35], [-0.85, 0.15, 0.85], [-1.05, 0, -0.35], [0, -0.15, -1.05], [1.05, 0, -0.35], [0.85, 0.15, 0.85], [0, 0.25, 1.35]], 0.16, '#dc2626', cx, cy, scale);
  R.tube(ctx, [[-0.85, 0.15, 0.85], [-2.35, 0.35, 0.45]], 0.13, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[0.85, 0.15, 0.85], [2.35, 0.35, 0.45]], 0.13, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[0, -0.15, -1.05], [0, -1.35, -1.65]], 0.18, '#b91c1c', cx, cy, scale);
  if (stage > 0) R.sphere(ctx, 0.85, 0.15, 0.85, (stage === 1 ? 0.26 : 0.48) * pulse, stColor, true, cx, cy, scale);
};
