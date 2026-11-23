window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['13'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.14, bend = stage * 0.25;
  R.tube(ctx, [[0, -1.8, -0.8], [0, 0, -0.8 - bend], [0, 1.8, -0.8]], 0.18, '#facc15', cx, cy, scale);
  [-1.2, -0.6, 0, 0.6, 1.2].forEach((y, i) => {
    const z = -0.2 - Math.cos((y / 1.4) * 1.2) * bend;
    R.poly(ctx, [[-0.65, y + 0.22, z + 0.45], [0.65, y + 0.22, z + 0.45], [0.65, y - 0.22, z + 0.45], [-0.65, y - 0.22, z + 0.45]], i === 2 && stage > 0 ? '#fde68a' : '#cbd5e1', '#f8fafc', '#94a3b8', cx, cy, scale, 0.94);
    if (i >= 1 && i <= 3) {
      R.tube(ctx, [[-0.55, y, z], [-1.55, y - 0.15, z + 0.85]], 0.11, '#cbd5e1', cx, cy, scale);
      R.tube(ctx, [[0.55, y, z], [1.55, y - 0.15, z + 0.85]], 0.11, '#cbd5e1', cx, cy, scale);
    }
  });
  if (stage > 0) R.sphere(ctx, 0.75, 0, -0.25 - bend, (stage === 1 ? 0.24 : 0.44) * pulse, stColor, true, cx, cy, scale);
};

(function () {
  if (!window.DB || !window.ANAT_LABELS) return;
  window.ANAT_LABELS = [
    { pos: [0, 0.6, 0.4], ru: 'Грудной позвонок', en: 'Thoracic Vertebra', es: 'Vértebra torácica', de: 'Brustwirbel', zh: '胸椎' },
    { pos: [1.35, 0, 0.65], ru: 'Рёберная дуга', en: 'Costal Arch (Rib)', es: 'Arco costal', de: 'Rippenbogen', zh: '肋弓' },
    { pos: [0, -1.2, -0.8], ru: 'Спинной мозг', en: 'Spinal Cord', es: 'Médula espinal', de: 'Rückenmark', zh: '脊髓' }
  ];
  const mod13 = {
    buttons: ['1. Физиологический кифоз', '2. Гиперкифоз (Сутулость)', '3. Межрёберная невралгия'],
    states: [
      { pill: 'Норма', color: '#38bdf8', title: 'Анатомическая норма грудного отдела', desc: 'Позвонки сохраняют прямоугольную форму и естественный мягкий изгиб (20–40°), межрёберные нервы свободны.', tactics: 'Укрепление мышц спины и дыхательная гимнастика.', author: 'OpenNeuroAtlas' },
      { pill: 'Нагрузка на передний край', color: '#f59e0b', title: 'Сутулость и передняя компрессия позвонков', desc: 'Нагрузка смещается на передний край позвонков, вызывая их клиновидную деформацию и мышечный спазм.', tactics: 'Разгрузка позвоночника, растяжка грудных мышц и плавание.', author: 'OpenNeuroAtlas' },
      { pill: 'Раздражение нервов', color: '#ef4444', title: 'Выраженный кифоз и межрёберная невралгия', desc: 'Снижение высоты дисков и дуга кифоза раздражают межрёберные нервы при вдохе и поворотах.', tactics: 'Очный осмотр невролога и индивидуальная ЛФК.', author: 'OpenNeuroAtlas' }
    ]
  };
  Object.keys(DB).forEach((l) => {
    DB[l].ui.tabs.push(l === 'ru' ? 'Грудной отдел' : 'Thoracic Spine');
    DB[l].modules.push(mod13);
  });
})();
