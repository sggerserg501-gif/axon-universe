window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['9'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const kidney = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.15, 48, 48), 0.04, 6), W.mat('muscle', '#991b1b', isXray));
  kidney.scale.set(0.75, 1.38, 0.56); root.add(kidney);

  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), W.mat('cartilage', '#fde68a', isXray));
  pelvis.scale.set(0.8, 1.2, 0.7); pelvis.position.set(-0.42, -0.05, 0); root.add(pelvis);

  const art = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.15, 20), W.mat('muscle', '#dc2626', false));
  art.rotation.z = Math.PI / 2; art.position.set(-1.05, 0.2, 0.1); root.add(art);

  const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.15, 20), W.mat('muscle', '#2563eb', false));
  vein.rotation.z = Math.PI / 2; vein.position.set(-1.05, -0.02, -0.1); root.add(vein);

  const ureter = new THREE.Mesh(new THREE.CylinderGeometry(stage === 2 ? 0.15 : 0.08, 0.08, 1.85, 20), W.mat('glow', '#facc15', false));
  ureter.rotation.z = -0.18; ureter.position.set(-0.58, -0.98, 0.05); root.add(ureter);

  if (stage > 0) {
    const stone = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(stage === 1 ? 0.2 : 0.36, 24, 24), 0.04, 10), W.mat('glow', stColor, false));
    stone.position.set(-0.35, -0.12, 0.18); root.add(stone);
  }
};
