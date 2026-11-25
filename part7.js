window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['9'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;

  // Гладкий бобовидный контур почки (верхний полюс, наружный край, нижний полюс)
  R.sphere(ctx, 0.25, 0.85, 0, 0.68, '#991b1b', false, cx, cy, scale, 0.95);
  R.sphere(ctx, 0.58, 0.32, 0, 0.72, '#b91c1c', false, cx, cy, scale, 0.95);
  R.sphere(ctx, 0.58, -0.32, 0, 0.72, '#b91c1c', false, cx, cy, scale, 0.95);
  R.sphere(ctx, 0.25, -0.85, 0, 0.68, '#991b1b', false, cx, cy, scale, 0.95);

  // Почечная лоханка и большие чашечки в области ворот почки
  R.sphere(ctx, -0.18, 0, 0.12, 0.36, '#fde68a', false, cx, cy, scale, 0.9);
  R.tube(ctx, [[-0.18, 0, 0.12], [0.22, 0.45, 0.12]], 0.12, '#fef08a', cx, cy, scale, 0.9);
  R.tube(ctx, [[-0.18, 0, 0.12], [0.28, 0, 0.12]], 0.12, '#fef08a', cx, cy, scale, 0.9);
  R.tube(ctx, [[-0.18, 0, 0.12], [0.22, -0.45, 0.12]], 0.12, '#fef08a', cx, cy, scale, 0.9);

  // Почечная артерия, почечная вена и мочеточник
  R.tube(ctx, [[-0.25, 0.22, 0.15], [-1.35, 0.32, 0.1]], 0.13, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[-0.25, 0.02, -0.1], [-1.35, 0.05, -0.12]], 0.15, '#2563eb', cx, cy, scale, 0.9);
  R.tube(ctx, [[-0.22, -0.12, 0.12], [-0.58, -0.85, 0.05], [-0.65, -1.85, 0]], 0.1, '#facc15', cx, cy, scale);

  // Очаг патологии (конкремент в лоханке / пиелонефрит)
  if (stage > 0) R.sphere(ctx, -0.18, -0.08, 0.28, (stage === 1 ? 0.18 : 0.34) * pulse, stColor, true, cx, cy, scale);
};
