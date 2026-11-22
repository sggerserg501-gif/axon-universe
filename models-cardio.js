window.AtlasBuilders = window.AtlasBuilders || {};

window.AtlasBuilders['4'] = (ctx) => window.AtlasBuilders.buildSpine(ctx, true);

window.AtlasBuilders['5'] = ({ root, stage, color, mat, anim }) => {
  const hg = new THREE.Group();
  const myo = new THREE.Mesh(new THREE.SphereGeometry(1.55, 36, 36), mat('artery'));
  myo.scale.set(0.84, 1.18, 0.78);
  const aorta = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.24, 16, 32, Math.PI), mat('artery'));
  aorta.position.set(-0.1, 1.55, 0);
  hg.add(myo, aorta);

  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0.1, 1.15, 1.05), new THREE.Vector3(0.68, 0.35, 1.18), new THREE.Vector3(0.42, -0.95, 0.92)]);
  hg.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.08, 12, false), mat('nerve')));

  if (stage > 0) {
    const plaque = new THREE.Mesh(new THREE.SphereGeometry(stage === 1 ? 0.18 : 0.34, 20, 20), mat('lesion', color));
    plaque.position.set(0.66, 0.32, 1.18); hg.add(plaque);
  }
  root.add(hg); anim.push({ mesh: hg, type: 'heartbeat' });
};

window.AtlasBuilders['6'] = ({ root, stage, color, mat, anim }) => {
  const rTop = stage === 2 ? 0.68 : stage === 1 ? 0.48 : 0.36;
  root.add(new THREE.Mesh(new THREE.CylinderGeometry(rTop, 0.36, 4.4, 32, 1, true), mat('vein')));

  const vMat = mat('lesion', stage === 0 ? 0x38bdf8 : color);
  [-1, 1].forEach((side) => {
    const cusp = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.07, 0.42), vMat);
    cusp.position.set(side * 0.22, 0.15, 0);
    cusp.rotation.z = stage === 0 ? (side > 0 ? -0.55 : 0.55) : (side > 0 ? 0.45 : -0.45);
    root.add(cusp);
  });

  const cellMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x7f1d1d });
  for (let i = 0; i < 8; i++) {
    const cell = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), cellMat);
    cell.position.set((Math.random() - 0.5) * 0.3, -2 + i * 0.55, (Math.random() - 0.5) * 0.3);
    root.add(cell); anim.push({ mesh: cell, type: 'bloodflow', reverse: stage === 2 && i % 2 === 0 });
  }
};

window.AtlasBuilders['7'] = ({ root, stage, color, mat }) => {
  const boneMat = mat('bone');
  const femur = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 1.18, 1.85, 32), boneMat); femur.position.y = 1.18;
  const tibia = new THREE.Mesh(new THREE.CylinderGeometry(1.14, 0.78, 1.85, 32), boneMat); tibia.position.y = -1.18;
  const pat = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 20), boneMat);
  pat.scale.set(0.95, 1.15, 0.45); pat.position.set(0, 0.15, 1.18);
  root.add(femur, tibia, pat);

  const meniscus = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.16, 16, 36), stage === 1 ? mat('lesion', color) : mat('cartilage'));
  meniscus.rotation.x = Math.PI / 2; root.add(meniscus);

  const acl = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.35, 16), stage === 2 ? mat('lesion', color) : mat('nerve'));
  acl.rotation.z = 0.45; if (stage === 2) acl.scale.set(1, 0.42, 1);
  root.add(acl);
};
