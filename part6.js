window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['6'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const bulge = stage === 2 ? 0.34 : stage === 1 ? 0.16 : 0;
  const open = stage === 2 ? 0.32 : stage === 1 ? 0.16 : 0.03;

  // Объёмные стенки вены с варикозным расширением при патологии
  R.tube(ctx, [[-0.42, -1.9, 0], [-0.44 - bulge * 0.5, -0.5, 0], [-0.48 - bulge, 0.35, 0], [-0.46 - bulge * 0.8, 1.15, 0], [-0.42, 1.9, 0]], 0.14, '#1e40af', cx, cy, scale, 0.9);
  R.tube(ctx, [[0.42, -1.9, 0], [0.44 + bulge * 0.5, -0.5, 0], [0.48 + bulge, 0.35, 0], [0.46 + bulge * 0.8, 1.15, 0], [0.42, 1.9, 0]], 0.14, '#1e40af', cx, cy, scale, 0.9);
  if (stage > 0) {
    R.sphere(ctx, -0.52 - bulge, 0.45, 0.12, 0.22 + bulge * 0.5, '#1d4ed8', false, cx, cy, scale, 0.65);
    R.sphere(ctx, 0.52 + bulge, 0.95, -0.1, 0.2 + bulge * 0.5, '#1d4ed8', false, cx, cy, scale, 0.65);
  }

  // Изогнутые створки венозного клапана
  R.tube(ctx, [[-0.44 - bulge * 0.8, 0.35, 0], [-0.24 - bulge * 0.3, 0.12, 0.06], [-open, 0.38, 0.08]], 0.08, stColor, cx, cy, scale);
  R.tube(ctx, [[0.44 + bulge * 0.8, 0.35, 0], [0.24 + bulge * 0.3, 0.12, 0.06], [open, 0.38, 0.08]], 0.08, stColor, cx, cy, scale);

  // Поток эритроцитов (при стадии 2 часть клеток проваливается вниз через несомкнутый клапан)
  for (let i = 0; i < 8; i++) {
    const dir = (stage === 2 && i % 3 === 0) ? -1 : 1;
    const phase = ((t * 0.55 * dir + i * 0.125) % 1 + 1) % 1;
    const y = -1.75 + phase * 3.5;
    const x = Math.sin(i * 2.1 + y) * (0.22 + bulge * 0.4);
    R.sphere(ctx, x, y, 0.08, 0.1, '#ef4444', false, cx, cy, scale, 0.92);
  }
};

window.AtlasScenes['7'] = ({ ctx, R, cx, cy, scale, stage, stColor }) => {
  // Бедренная кость и объёмные мыщелки (медиальный и латеральный)
  R.tube(ctx, [[0, 1.95, -0.05], [0, 0.72, 0]], 0.42, '#e2e8f0', cx, cy, scale, 0.96);
  R.sphere(ctx, -0.46, 0.38, 0.05, 0.46, '#f1f5f9', false, cx, cy, scale, 0.96);
  R.sphere(ctx, 0.46, 0.38, 0.05, 0.46, '#f1f5f9', false, cx, cy, scale, 0.96);

  // Большеберцовая кость (плато и диафиз) + малоберцовая кость сбоку
  R.sphere(ctx, -0.44, -0.34, 0.04, 0.44, '#e2e8f0', false, cx, cy, scale, 0.96);
  R.sphere(ctx, 0.44, -0.34, 0.04, 0.44, '#e2e8f0', false, cx, cy, scale, 0.96);
  R.tube(ctx, [[0, -0.45, 0], [0, -1.95, -0.05]], 0.38, '#cbd5e1', cx, cy, scale, 0.96);
  R.tube(ctx, [[0.78, -0.55, -0.18], [0.72, -1.95, -0.22]], 0.14, '#cbd5e1', cx, cy, scale, 0.92);

  // Мениски (внутренний и наружный хрящевые полумесяцы)
  R.tube(ctx, [[-0.86, -0.04, -0.1], [-0.48, -0.04, 0.48], [-0.08, -0.04, 0.15]], 0.13, stage === 1 ? stColor : '#0284c7', cx, cy, scale);
  R.tube(ctx, [[0.08, -0.04, 0.15], [0.48, -0.04, 0.48], [0.86, -0.04, -0.1]], 0.13, '#0284c7', cx, cy, scale);

  // Передняя и задняя крестообразные связки (ПКС и ЗКС) + боковые связки
  R.tube(ctx, [[-0.16, -0.24, 0.16], [0.18, 0.26, -0.12]], 0.09, stage === 2 ? stColor : '#facc15', cx, cy, scale);
  R.tube(ctx, [[0.16, -0.24, -0.16], [-0.18, 0.26, 0.12]], 0.09, '#eab308', cx, cy, scale);
  R.tube(ctx, [[-0.88, 0.42, 0], [-0.88, -0.42, 0]], 0.08, '#fde047', cx, cy, scale);
  R.tube(ctx, [[0.88, 0.42, 0], [0.88, -0.42, 0]], 0.08, '#fde047', cx, cy, scale);

  // Надколенник (коленная чашечка) спереди
  R.sphere(ctx, 0, 0.22, 0.68, 0.32, '#f8fafc', false, cx, cy, scale, 0.88);
};
