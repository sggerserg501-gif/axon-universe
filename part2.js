window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes.drawSpine = function ({ THREE, root, W, stage, stColor, isXray }, neck) {
  const ys = neck ? [-1.15, 0, 1.15] : [-0.88, 0.88], sc = neck ? 0.82 : 1.0;
  const boneMat = W.mat('bone', '#e2e8f0', isXray), nerveMat = W.mat('glow', '#facc15', false);
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * sc, 0.18 * sc, 3.8, 24), nerveMat);
  cord.position.set(0, 0, -0.88 * sc); root.add(cord);

  ys.forEach((y, i) => {
    const body = new THREE.Mesh(W.sculpt(new THREE.CylinderGeometry(1.05 * sc, 1.08 * sc, 0.82 * sc, 36, 8), 0.04, 6), boneMat);
    body.position.set(0, y, 0.1 * sc); root.add(body);
    const proc = new THREE.Mesh(W.sculpt(new THREE.BoxGeometry(0.28 * sc, 0.48 * sc, 1.25 * sc, 6, 6, 8), 0.03, 5), boneMat);
    proc.position.set(0, y - 0.08, -1.18 * sc); root.add(proc);
    if (i < ys.length - 1) {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.06 * sc, 1.06 * sc, 0.34 * sc, 36), W.mat('muscle', '#0284c7', isXray));
      disc.position.set(0, (y + ys.at(i + 1)) / 2, 0.1 * sc); root.add(disc);
    }
  });
  if (neck) [-1.12, 1.12].forEach((x, idx) => {
    const art = new THREE.Mesh(new THREE.CylinderGeometry(idx === 1 && stage === 1 ? 0.05 : 0.11, 0.11, 3.6, 16), W.mat('muscle', '#dc2626', false));
    art.position.set(x, 0, -0.55); root.add(art);
  });
  if (stage > 0) {
    const hernia = new THREE.Mesh(W.sculpt(new THREE.SphereGeometry(stage === 1 ? 0.3 : 0.48, 24, 24), 0.04, 8), W.mat('glow', stColor, false));
    hernia.position.set(stage === 2 ? 0.2 : 0.05, 0, (stage === 1 ? -0.68 : -0.84) * sc); root.add(hernia);
  }
};
window.AtlasScenes['0'] = (c) => window.AtlasScenes.drawSpine(c, false);
window.AtlasScenes['4'] = (c) => window.AtlasScenes.drawSpine(c, true);
