window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['5'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  const beat = 1 + Math.pow(Math.sin(t * 3.2), 4) * 0.05;

  // Верхняя полая вена и лёгочный ствол
  R.tube(ctx, [[-0.48, 0.72, -0.15], [-0.52, 1.55, -0.15]], 0.2 * beat, '#1d4ed8', cx, cy, scale, 0.9);
  R.tube(ctx, [[0.18, 0.65, 0.35], [-0.45, 1.28, 0.3]], 0.21 * beat, '#2563eb', cx, cy, scale, 0.9);

  // Дуга аорты с брахиоцефальными ветвями
  R.tube(ctx, [[-0.08, 0.75, 0.05], [-0.05, 1.55, 0.05], [0.38, 1.72, -0.1], [0.68, 1.32, -0.25], [0.65, 0.65, -0.35]], 0.25 * beat, '#dc2626', cx, cy, scale, 0.95);
  R.tube(ctx, [[0.02, 1.62, 0.02], [-0.05, 2.02, 0.02]], 0.08, '#ef4444', cx, cy, scale);
  R.tube(ctx, [[0.24, 1.72, -0.05], [0.22, 2.08, -0.05]], 0.07, '#ef4444', cx, cy, scale);

  // Гладкий анатомический миокард (предсердия и желудочки без углов)
  R.sphere(ctx, -0.45, 0.42, 0.05, 0.56 * beat, '#991b1b', false, cx, cy, scale, 0.95);
  R.sphere(ctx, 0.42, 0.48, -0.05, 0.54 * beat, '#b91c1c', false, cx, cy, scale, 0.95);
  R.sphere(ctx, -0.18, -0.15, 0.12, 0.86 * beat, '#b91c1c', false, cx, cy, scale, 0.96);
  R.sphere(ctx, 0.28, -0.25, 0.05, 0.84 * beat, '#dc2626', false, cx, cy, scale, 0.96);
  R.sphere(ctx, 0.15, -0.82, 0.08, 0.66 * beat, '#dc2626', false, cx, cy, scale, 0.96);
  R.sphere(ctx, 0.08, -1.28, 0.1, 0.44 * beat, '#ef4444', false, cx, cy, scale, 0.96);

  // Правая и левая коронарные артерии с ветвлением по передней стенке
  R.tube(ctx, [[-0.12, 0.55, 0.52], [-0.48, 0.15, 0.62], [-0.55, -0.45, 0.52]], 0.07, '#facc15', cx, cy, scale);
  R.tube(ctx, [[0.12, 0.55, 0.52], [0.42, 0.12, 0.68], [0.32, -0.58, 0.62], [0.14, -1.15, 0.45]], 0.08, '#facc15', cx, cy, scale);
  R.tube(ctx, [[0.38, -0.05, 0.68], [0.75, -0.42, 0.48]], 0.06, '#fde047', cx, cy, scale);
  R.tube(ctx, [[0.32, -0.45, 0.64], [0.62, -0.85, 0.42]], 0.05, '#fde047', cx, cy, scale);

  // Очаг ишемии / инфаркта при патологии (stage 1 и 2)
  if (stage > 0) R.sphere(ctx, 0.42, 0.12, 0.7, (stage === 1 ? 0.22 : 0.42) * pulse, stColor, true, cx, cy, scale);
};
