window.AtlasGLBWork = (function () {
  function createMyocardiumTexture(THREE) {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#6e1420';
    g.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 900; i++) {
      const y = (i / 900) * 512;
      g.strokeStyle = i % 3 === 0 ? 'rgba(75, 10, 18, 0.45)' : i % 2 === 0 ? 'rgba(155, 38, 52, 0.28)' : 'rgba(210, 145, 110, 0.12)';
      g.lineWidth = 1.4;
      g.beginPath();
      for (let x = 0; x <= 512; x += 16) {
        const dy = Math.sin((x / 512) * Math.PI * 6 + i * 0.15) * 4;
        if (x === 0) g.moveTo(x, y + dy);
        else g.lineTo(x, y + dy);
      }
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function buildAnatomicalHeart(THREE) {
    const heart = new THREE.Group();
    heart.scale.setScalar(0.78);
    heart.position.y = -0.1;

    const myoTex = createMyocardiumTexture(THREE);

    const muscleMat = new THREE.MeshPhysicalMaterial({
      map: myoTex,
      bumpMap: myoTex,
      bumpScale: 0.038,
      color: 0x8f1d2c,
      roughness: 0.42,
      metalness: 0.02,
      clearcoat: 0.28,
      clearcoatRoughness: 0.35
    });

    const auricleMat = new THREE.MeshPhysicalMaterial({
      map: myoTex,
      bumpMap: myoTex,
      bumpScale: 0.025,
      color: 0x7a1c28,
      roughness: 0.46,
      clearcoat: 0.22
    });

    const fatMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9a760,
      roughness: 0.55,
      clearcoat: 0.2
    });

    const vesselRedMat = new THREE.MeshPhysicalMaterial({
      color: 0xb81d2d,
      roughness: 0.36,
      clearcoat: 0.35
    });

    const coronaryArtMat = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626,
      emissive: 0x2b0508,
      roughness: 0.32,
      clearcoat: 0.4
    });

    const vesselBlueMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e408a,
      roughness: 0.36,
      clearcoat: 0.3
    });

    const bodyGeo = new THREE.SphereGeometry(1.0, 56, 56);
    const pos = bodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      const t = (y + 1) / 2;
      const taper = 0.26 + 0.8 * Math.pow(t, 0.56);
      const groove = Math.exp(-Math.pow((x - 0.14) * 5.5, 2)) * 0.045;
      x *= taper * 0.94;
      z *= (taper * 0.78) - groove;
      y *= 1.24;
      x += (1 - t) * 0.26;
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
      const geo = new THREE.TubeGeometry(curve, 40, r, 18, false);
      return new THREE.Mesh(geo, mat);
    }

      // Дуга аорты и брахиоцефальные ветви
    heart.add(makeTube([
      [0.05, 0.75, -0.05],
      [-0.12, 1.28, -0.02],
      [0.18, 1.56, -0.14],
      [0.52, 1.32, -0.28],
      [0.44, 0.65, -0.36]
    ], 0.23, vesselRedMat));

    heart.add(makeTube([[-0.06, 1.44, -0.05], [-0.14, 1.86, -0.06]], 0.08, vesselRedMat));
    heart.add(makeTube([[0.12, 1.52, -0.1], [0.14, 1.92, -0.12]], 0.068, vesselRedMat));
    heart.add(makeTube([[0.3, 1.48, -0.16], [0.38, 1.88, -0.2]], 0.068, vesselRedMat));

    // Верхняя полая вена и лёгочный ствол
    heart.add(makeTube([
      [-0.46, 0.85, -0.12],
      [-0.48, 1.45, -0.14],
      [-0.68, 1.82, -0.16]
    ], 0.16, vesselBlueMat));

    heart.add(makeTube([
      [-0.08, 0.65, 0.34],
      [0.08, 1.12, 0.26],
      [0.42, 1.26, 0.08],
      [0.82, 1.22, -0.04]
    ], 0.2, vesselBlueMat));

    // Красные коронарные артерии и синие коронарные вены
    heart.add(makeTube([
      [0.18, 0.68, 0.63],
      [0.23, 0.14, 0.75],
      [0.13, -0.46, 0.63],
      [0.21, -0.96, 0.35]
    ], 0.032, coronaryArtMat));

    heart.add(makeTube([
      [0.21, 0.2, 0.74],
      [0.5, -0.15, 0.63],
      [0.58, -0.58, 0.43]
    ], 0.022, coronaryArtMat));

    heart.add(makeTube([
      [-0.32, 0.45, 0.59],
      [-0.42, -0.04, 0.63],
      [-0.28, -0.56, 0.53]
    ], 0.026, coronaryArtMat));

    heart.add(makeTube([
      [0.11, 0.66, 0.63],
      [0.15, 0.15, 0.75],
      [0.05, -0.45, 0.63],
      [0.13, -0.96, 0.35]
    ], 0.028, vesselBlueMat));

    heart.add(makeTube([
      [0.14, 0.22, 0.74],
      [-0.22, -0.08, 0.73],
      [-0.48, -0.46, 0.57]
    ], 0.02, vesselBlueMat));

    const lesionMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.0
    });

    const lesion = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), lesionMat);
    lesion.position.set(0.21, -0.16, 0.74);
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
        const beat = 1 + Math.sin(t * 4.2) * 0.022 + Math.sin(t * 8.4) * 0.008;
        heartGroup.scale.setScalar(0.76 * beat);
        if (state && state.autoRotate !== false) {
          heartGroup.rotation.y += dt * 0.4;
        }
        if (lesion) {
          const st = (state && typeof state.stage === 'number') ? state.stage : 0;
          if (st === 0) {
            lesion.material.opacity = 0;
          } else {
            lesion.material.color.setHex(st === 1 ? 0xf59e0b : 0xef4444);
            lesion.material.emissive.setHex(st === 1 ? 0xd97706 : 0xdc2626);
            lesion.material.opacity = 0.65 + Math.sin(t * 6) * 0.25;
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
