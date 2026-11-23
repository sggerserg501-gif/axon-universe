window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['12'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14, shift = stage * 0.12;
  // Вертлужная впадина таза и суставной хрящ
  R.poly(ctx, [[-1.35, 1.35, 0], [-0.25, 1.55, 0], [0.75, 0.95, 0], [0.55, 0.15, 0], [-0.45, 0.45, 0], [-1.15, 0.25, 0]], '#94a3b8', '#e2e8f0', '#64748b', cx, cy, scale, 0.92);
  R.tube(ctx, [[-0.95, 0.28, 0.1], [-0.25, 0.52, 0.1], [0.45, 0.22, 0.1]], stage === 0 ? 0.14 : 0.06, stColor, cx, cy, scale);
  // Головка, шейка и тело бедренной кости
  R.sphere(ctx, -0.22, -0.08 + shift, 0, 0.62, '#e2e8f0', false, cx, cy, scale, 0.95);
  R.poly(ctx, [[-0.05, -0.15 + shift, 0], [0.65, -0.55 + shift, 0], [0.85, -1.85, 0], [0.25, -1.85, 0], [0.15, -0.75 + shift, 0], [-0.35, -0.35 + shift, 0]], '#cbd5e1', '#f8fafc', '#94a3b8', cx, cy, scale, 0.95);
  if (stage > 0) R.sphere(ctx, -0.22, 0.48, 0.2, (stage === 1 ? 0.22 : 0.42) * pulse, stColor, true, cx, cy, scale);
};

(function () {
  if (!window.DB || !window.ANAT_LABELS) return;
  window.ANAT_LABELS[12] = [
    { pos: [-0.45, 1.15, 0], ru: 'Вертлужная впадина', en: 'Acetabulum', es: 'Acetábulo', de: 'Hüftpfanne', zh: '髋臼' },
    { pos: [-0.25, 0.45, 0.15], ru: 'Суставной хрящ', en: 'Articular Cartilage', es: 'Cartílago articular', de: 'Gelenkknorpel', zh: '关节软骨' },
    { pos: [0.45, -1.15, 0], ru: 'Бедренная кость', en: 'Femur', es: 'Fémur', de: 'Oberschenkelknochen', zh: '股骨' }
  ];
  const mod12 = {
    buttons: ['1. Норма сустава', '2. Коксартроз I–II', '3. Коксартроз III'],
    states: [
      { pill: 'Норма', color: '#38bdf8', title: 'Анатомическая норма тазобедренного сустава', desc: 'Гладкий гиалиновый хрящ равномерно покрывает головку бедра и вертлужную впадину, суставная щель сохранена.', tactics: 'Поддержание силы мышц бедра и ягодиц, умеренная ходьба.', author: 'OpenNeuroAtlas' },
      { pill: 'Начальный износ', color: '#f59e0b', title: 'Сужение суставной щели (Коксартроз I–II)', desc: 'Хрящевая прослойка истончается, появляется стартовая скованность в паху при ходьбе.', tactics: 'Консультация ортопеда, ЛФК без ударной нагрузки и плавание.', author: 'OpenNeuroAtlas' },
      { pill: 'Выраженный артроз', color: '#ef4444', title: 'Выраженный износ хряща и остеофиты (III ст.)', desc: 'Критическое истончение хряща с костным контактом и краевыми разрастаниями.', tactics: 'Очный осмотр травматолога-ортопеда для подбора тактики лечения.', author: 'OpenNeuroAtlas' }
    ]
  };
  Object.keys(DB).forEach((l) => {
    DB[l].ui.tabs.push(l === 'ru' ? 'Тазобедренный сустав' : 'Hip Joint');
    DB[l].modules.push(mod12);
  });
})();
