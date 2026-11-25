window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['10'] = ({ THREE, root, W, stage, stColor, isXray }) => {
  const liverCol = stage === 1 ? '#ca8a04' : '#991b1b';

  // Правая (массивная) и левая доли печени
  const rightLobe = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(1.15, 44, 44), 0.04, 5), W.mat('muscle', liverCol, isXray));
  rightLobe.scale.set(1.18, 0.85, 0.72); rightLobe.position.set(-0.32, 0.05, 0); rightLobe.rotation.z = -0.18; root.add(rightLobe);

  const leftLobe = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(0.88, 40, 40), 0.04, 5), W.mat('muscle', liverCol, isXray));
  leftLobe.scale.set(1.15, 0.58, 0.52); leftLobe.position.set(0.75, 0.28, 0.04); leftLobe.rotation.z = -0.25; root.add(leftLobe);

  // Желчный пузырь и общий желчный проток
  const gb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), W.mat('muscle', '#16a34a', false));
  gb.scale.set(0.75, 1.38, 0.75); gb.position.set(-0.42, -0.58, 0.24); root.add(gb);

  const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 1.05, 16), W.mat('glow', '#22c55e', false));
  duct.position.set(-0.32, -1.08, 0.16); duct.rotation.z = -0.18; root.add(duct);

  // Воротная вена и печёночная артерия в воротах печени
  const pVein = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.95, 16), W.mat('muscle', '#2563eb', false));
  pVein.position.set(0.05, -0.78, -0.08); pVein.rotation.z = 0.15; root.add(pVein);

  const hArt = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.9, 16), W.mat('muscle', '#dc2626', false));
  hArt.position.set(0.22, -0.72, 0.04); hArt.rotation.z = 0.2; root.add(hArt);

  if (stage > 0) {
    const foc = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(stage === 1 ? 0.2 : 0.4, 24, 24), 0.04, 8), W.mat('glow', stColor, false));
    foc.position.set(stage === 1 ? -0.42 : -0.35, stage === 1 ? -0.58 : 0.12, 0.34); root.add(foc);
  }
};
