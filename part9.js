window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['9'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const kidney = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.15, 40, 40), 0.06, 6), W.mat('muscle', '#991b1b', isXray));
  kidney.scale.set(0.75, 1.38, 0.58); root.add(kidney);
  const art = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.2, 16), W.mat('muscle', '#dc2626', false));
  art.rotation.z = Math.PI / 2; art.position.set(-1.1, 0.18, 0.1); root.add(art);
  const ureter = new THREE.Mesh(new THREE.CylinderGeometry(stage === 2 ? 0.16 : 0.09, 0.09, 1.85, 16), W.mat('glow', '#facc15', false));
  ureter.position.set(-0.55, -0.95, 0); root.add(ureter);
  if (stage > 0) {
    const stone = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(stage === 1 ? 0.22 : 0.38, 20, 20), 0.05, 10), W.mat('glow', stColor, false));
    stone.position.set(-0.25, -0.15, 0.2); root.add(stone);
  }
};
