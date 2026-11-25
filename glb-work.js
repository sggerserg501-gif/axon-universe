window.AtlasGLBWork = (function () {
  function buildAnatomicalHeart(THREE) {
    const heart = new THREE.Group();

    const muscleMat = new THREE.MeshStandardMaterial({
      color: 0xc92a3e,
      roughness: 0.45,
      metalness: 0.1
    });

    const auricleMat = new THREE.MeshStandardMaterial({
      color: 0xe08e84,
      roughness: 0.5,
      metalness: 0.05
    });

    const vesselRedMat = new THREE.MeshStandardMaterial({
      color: 0xd93848,
      roughness: 0.38,
      metalness: 0.1
    });

    const vesselBlueMat = new THREE.MeshStandardMaterial({
      color: 0x3b66b8,
      roughness: 0.38,
      metalness: 0.1
    });

    const bodyGeo = new THREE.SphereGeometry(1.0, 48, 48);
    const pos = bodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      const t = (y + 1) / 2;
      const taper = 0.28 + 0.78 * Math.pow(t, 0.58);
      x *= taper * 0.94;
      z *= taper * 0.78;
      y *= 1.24;
      x += (1 - t) * 0.24;
      z += (1 - t) * 0.14;
      pos.setXYZ(i, x, y, z);
    }
    bodyGeo.computeVertexNormals();
    const bodyMesh = new THREE.Mesh(bodyGeo, muscleMat);
    bodyMesh.name = 'ventricles';
    heart.add(bodyMesh);

    const rAuricle = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 32), auricleMat);
    rAuricle.scale.set(0.75, 1.25, 0.85);
    rAuricle.position.set(-0.66, 0.58, 0.18);
    rAuricle.rotation.z = 0.28;
    heart.add(rAuricle);

    const lAuricle = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), auricleMat);
    lAuricle.scale.set(0.85, 1.05, 0.8);
    lAuricle.position.set(0.62, 0.52, 0.22);
    lAuricle.rotation.z = -0.32;
    heart.add(lAuricle);

    function makeTube(pts, r, mat) {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
      const geo = new THREE.TubeGeometry(curve, 36, r, 18, false);
      return new THREE.Mesh(geo, mat);
    }
    heart.add(makeTube([
      [0.05, 0.75, -0.05],
      [-0.12, 1.28, -0.02],
      [0.18, 1.56, -0.14],
      [0.52, 1.32, -0.28],
      [0.44, 0.65, -0.36]
    ], 0.24, vesselRedMat));

    heart.add(makeTube([[-0.06, 1.44, -0.05], [-0.14, 1.88, -0.06]], 0.085, vesselRedMat));
    heart.add(makeTube([[0.12, 1.52, -0.1], [0.14, 1.94, -0.12]], 0.072, vesselRedMat));
    heart.add(makeTube([[0.3, 1.48, -0.16], [0.38, 1.9, -0.2]], 0.072, vesselRedMat));

    heart.add(makeTube([
      [-0.46, 0.85, -0.12],
      [-0.48, 1.45, -0.14],
      [-0.68, 1.84, -0.16]
    ], 0.17, vesselBlueMat));

    heart.add(makeTube([
      [-0.08, 0.65, 0.34],
      [0.08, 1.12, 0.26],
      [0.42, 1.26, 0.08],
      [0.82, 1.22, -0.04]
    ], 0.21, vesselRedMat));

    heart.add(makeTube([
      [0.14, 0.68, 0.62],
      [0.18, 0.15, 0.74],
      [0.08, -0.45, 0.62],
      [0.16, -0.98, 0.34]
    ], 0.036, vesselBlueMat));

    heart.add(makeTube([
      [0.16, 0.22, 0.73],
      [-0.22, -0.08, 0.72],
      [-0.48, -0.46, 0.56]
    ], 0.022, vesselBlueMat));

    heart.add(makeTube([
      [-0.36, 0.42, 0.58],
      [-0.44, -0.05, 0.62],
      [-0.32, -0.58, 0.52]
    ], 0.024, vesselBlueMat));

    heart.add(makeTube([
      [0.18, 0.05, 0.73],
      [0.46, -0.26, 0.62],
      [0.54, -0.68, 0.42]
    ], 0.02, vesselBlueMat));

    const lesionMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.85,
      transparent: true,
      opacity: 0.0
    });
    const lesion = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), lesionMat);
    lesion.position.set(0.14, -0.18, 0.72);
    lesion.name = 'lesionGlow';
    heart.add(lesion);

    return heart;
  }

  function mount(ctx) {
    const { THREE, scene, state } = ctx;
    const heartGroup = buildAnatomicalHeart(THREE);
    scene.add(heartGroup);

    const lesion = heartGroup.getObjectByName('lesionGlow');

    return {
      update(dt, t) {
        const beat = 1 + Math.sin(t * 4.2) * 0.025 + Math.sin(t * 8.4) * 0.01;
        heartGroup.scale.setScalar(beat);
        if (state && state.autoRotate !== false) {
          heartGroup.rotation.y += dt * 0.45;
        }
        if (lesion) {
          const st = (state && typeof state.stage === 'number') ? state.stage : 0;
          if (st === 0) {
            lesion.material.opacity = 0;
          } else {
            lesion.material.color.setHex(st === 1 ? 0xf59e0b : 0xef4444);
            lesion.material.emissive.setHex(st === 1 ? 0xd97706 : 0xdc2626);
            lesion.material.opacity = 0.6 + Math.sin(t * 6) * 0.25;
          }
        }
      },
      dispose() {
        scene.remove(heartGroup);
      }
    };
  }

  return { mount };
})();
