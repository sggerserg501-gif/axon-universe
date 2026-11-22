window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['1'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14;
  // Анатомический контур коры головного мозга, височной доли, мозжечка и ствола
  R.poly(ctx, [[-1.5, 0.1, 0], [-1.35, 1.05, 0], [-0.45, 1.55, 0], [0.65, 1.48, 0], [1.45, 0.85, 0], [1.55, -0.1, 0], [0.75, -0.45, 0], [-0.35, -0.35, 0], [-1.15, -0.45, 0]], '#64748b', '#cbd5e1', '#94a3b8', cx, cy, scale, 0.55);
  // Рельефные корковые извилины и борозды (gyri & sulci)
  R.tube(ctx, [[-1.1, 0.45, 0.25], [-0.55, 1.15, 0.3], [0.25, 1.25, 0.3], [1.05, 0.75, 0.25]], 0.14, '#cbd5e1', cx, cy, scale, 0.5);
  R.tube(ctx, [[-0.95, 0.05, 0.35], [-0.15, 0.65, 0.4], [0.75, 0.45, 0.35], [1.2, -0.05, 0.25]], 0.13, '#94a3b8', cx, cy, scale, 0.5);
  // Мозжечок и ствол мозга
  R.poly(ctx, [[-1.35, -0.45, 0], [-0.55, -0.42, 0], [-0.45, -1.15, 0], [-1.15, -1.05, 0]], '#475569', '#94a3b8', '#64748b', cx, cy, scale, 0.78);
  R.poly(ctx, [[-0.35, -0.35, 0], [0.15, -0.35, 0], [0.05, -1.65, 0], [-0.38, -1.65, 0]], '#64748b', '#cbd5e1', '#94a3b8', cx, cy, scale, 0.82);

  if (stage > 0) R.sphere(ctx, 0.58, 0.42, 0.25, (stage === 1 ? 0.42 : 0.72) * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['2'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  // Тело нейрона (сома), ядро и ветвящиеся дендриты
  [-2.8, -2.5, -2.1, -2.7, -2.3].forEach((dx, i) => {
    const ang = (i / 5) * Math.PI * 2 + 0.4;
    R.tube(ctx, [[-2.2, 0, 0], [-2.2 + Math.cos(ang) * 0.85, Math.sin(ang) * 0.95, (i % 2 - 0.5) * 0.5], [-2.2 + Math.cos(ang + 0.3) * 1.45, Math.sin(ang - 0.2) * 1.45, (i % 2 - 0.5) * 0.9]], 0.06, '#fde047', cx, cy, scale);
  });
  R.sphere(ctx, -2.2, 0, 0, 0.68, '#eab308', true, cx, cy, scale, 0.92);
  R.sphere(ctx, -2.2, 0, 0.15, 0.28, '#fef08a', false, cx, cy, scale);
  // Аксон и миелиновые муфты с перехватами Ранвье
  R.tube(ctx, [[-2.2, 0, 0], [2.45, 0, 0]], 0.09, '#facc15', cx, cy, scale);
  [-1.05, -0.1, 0.85, 1.8].forEach((x, idx) => {
    const dmg = (stage === 1 && idx === 2) || (stage === 2 && idx >= 2);
    R.tube(ctx, [[x - 0.34, 0, 0], [x + 0.34, 0, 0]], 0.32, dmg ? stColor : '#0284c7', cx, cy, scale, 0.9);
  });
  R.sphere(ctx, 2.55, 0, 0, 0.34, stage === 2 ? stColor : '#facc15', stage === 2, cx, cy, scale);
  R.sphere(ctx, -1.95 + ((t * 0.85) % 1) * (stage === 2 ? 2.4 : 4.4), 0, 0.18, 0.18, '#38bdf8', true, cx, cy, scale);
};
