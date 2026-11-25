window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['11'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  // Пищевод, входящий сверху в кардиальный отдел желудка
  const esoph = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.95, 20), W.mat('muscle', '#9a3412', isXray));
  esoph.position.set(-0.55, 1.32, 0); esoph.rotation.z = -0.15; root.add(esoph);

  // Тело и дно (свод) желудка
  const stomach = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.05, 44, 44), 0.05, 7), W.mat('muscle', '#c2410c', isXray));
  stomach.scale.set(1.42, 0.92, 0.74); stomach.rotation.z = 0.35; root.add(stomach);

  const fundus = new THREE.Mesh(new THREE.SphereGeometry(0.46, 28, 28), W.mat('muscle', '#ea580c', isXray));
  fundus.position.set(-0.92, 0.72, 0.04); root.add(fundus);

  // Привратник и луковица двенадцатиперстной кишки (ДПК)
  const pyl = new THREE.Mesh(W.sculpt(new THREE.CylinderGeometry(0.24, 0.34, 1.25, 24), 0.03, 4), W.mat('muscle', '#ea580c', isXray));
  pyl.rotation.z = -1.05; pyl.position.set(0.92, -0.62, 0.08); root.add(pyl);

  const duo = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.75, 20), W.mat('muscle', '#fb923c', isXray));
  duo.position.set(1.52, -0.45, 0.08); duo.rotation.z = -0.25; root.add(duo);

  // Очаг эрозии / язвы желудка или ДПК при патологии
  if (stage > 0) {
    const ulcer = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(stage === 1 ? 0.18 : 0.34, 24, 24), 0.04, 8), W.mat('glow', stColor, false));
    ulcer.position.set(stage === 1 ? 0.35 : 0.95, stage === 1 ? 0.05 : -0.55, 0.58); root.add(ulcer);
  }
};
