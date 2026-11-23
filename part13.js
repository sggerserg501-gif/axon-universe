window.AtlasScenes = window.AtlasScenes || {};
window.AtlasScenes['13'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const bone = W.mat('bone', '#e2e8f0', isXray), bend = stage * 0.22;
  [-1.1, -0.55, 0, 0.55, 1.1].forEach((y, i) => {
    const z = -Math.cos(y) * bend;
    const v = new THREE.Mesh(W.sculpt(new THREE.CylinderGeometry(0.58, 0.6, 0.42, 24), 0.03, 6), bone);
    v.position.set(0, y, z); root.add(v);
    if (i >= 1 && i <= 3) [-1, 1].forEach(s => {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.08, 12, 24, Math.PI * 0.65), bone);
      rib.rotation.x = Math.PI / 2; rib.rotation.z = s > 0 ? -0.4 : 1.5; rib.position.set(0, y, z + 0.55); root.add(rib);
    });
  });
};
(function () {
  if (!window.DB || !window.ANAT_LABELS) return;
   window.ANAT_LABELS[13] = [
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
