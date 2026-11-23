window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['11'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const stomach = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.05, 40, 40), 0.07, 7), W.mat('muscle', '#c2410c', isXray));
  stomach.scale.set(1.45, 0.95, 0.75); stomach.rotation.z = 0.35; root.add(stomach);
  const fundus = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), W.mat('muscle', '#ea580c', isXray));
  fundus.position.set(-0.95, 0.75, 0.05); root.add(fundus);
  const pyl = new THREE.Mesh(W.sculpt(new THREE.CylinderGeometry(0.26, 0.34, 1.3, 24), 0.03, 4), W.mat('muscle', '#ea580c', isXray));
  pyl.rotation.z = -1.05; pyl.position.set(0.95, -0.65, 0.1); root.add(pyl);
  if (stage > 0) {
    const ulcer = new THREE.Mesh(new THREE.SphereGeometry(stage === 1 ? 0.18 : 0.34, 20, 20), W.mat('glow', stColor, false));
    ulcer.position.set(0.35, 0.05, 0.62); root.add(ulcer);
  }
};
