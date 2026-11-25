window.AtlasScenes = window.AtlasScenes || {};
window.AtlasScenes['12'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const bone = W.mat('bone', '#e2e8f0', isXray);
  const pelvis = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.15, 40, 40), 0.04, 6), bone);
  pelvis.scale.set(1.15, 0.65, 0.75); pelvis.position.set(-0.25, 0.95, 0); root.add(pelvis);

  const cart = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), W.mat('cartilage', '#38bdf8', isXray));
  cart.scale.set(1, 0.55, 1); cart.position.set(-0.22, 0.42, 0); root.add(cart);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.54, 36, 36), bone);
  head.position.set(-0.22, -0.02 + stage * 0.08, 0); root.add(head);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.75, 24), bone);
  neck.rotation.z = 0.75; neck.position.set(0.06, -0.32, 0); root.add(neck);

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 1.65, 24), bone);
  shaft.rotation.z = 0.16; shaft.position.set(0.38, -1.05, 0); root.add(shaft);

  if (stage > 0) {
    const f = new THREE.Mesh(new THREE.SphereGeometry(stage === 1 ? 0.24 : 0.34, 24, 24), W.mat('glow', stColor, false));
    f.position.set(-0.22, 0.44, 0.16); root.add(f);
  }
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
