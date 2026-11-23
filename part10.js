window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['10'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const liver = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.25, 40, 40), 0.06, 5), W.mat('muscle', stage === 1 ? '#ca8a04' : '#991b1b', isXray));
  liver.scale.set(1.48, 0.78, 0.68); liver.rotation.z = -0.22; root.add(liver);
  const gb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), W.mat('muscle', '#16a34a', false));
  gb.scale.set(0.75, 1.35, 0.75); gb.position.set(-0.35, -0.65, 0.25); root.add(gb);
  if (stage > 0) {
    const foc = new THREE.Mesh(new THREE.SphereGeometry(stage === 1 ? 0.22 : 0.42, 20, 20), W.mat('glow', stColor, false));
    foc.position.set(stage === 1 ? -0.35 : 0.45, stage === 1 ? -0.65 : 0.15, 0.35); root.add(foc);
  }
};
