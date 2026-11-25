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

       function sculptOrgan(geo, amp, freq) {
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const n = Math.sin(x * freq + y * freq) * Math.cos(z * freq - y * (freq * 0.8)) * amp;
        p.setXYZ(i, x * (1 + n), y * (1 + n), z * (1 + n));
      }
      geo.computeVertexNormals();
      return geo;
    }

    const bodyGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const pos = bodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);
      const t = (y + 1) / 2;
      const taper = 0.25 + 0.82 * Math.pow(t, 0.55);
      const interVentricle = Math.exp(-Math.pow((x - 0.12 + y * 0.08) * 6.0, 2)) * 0.065;
      const coronarySulcus = Math.exp(-Math.pow((y - 0.42) * 8.0, 2)) * 0.055;
      const fold = Math.sin(x * 11 + y * 9) * Math.cos(z * 10) * 0.014;
      x *= taper * 0.94 + fold;
      z *= (taper * 0.78) - interVentricle - coronarySulcus + fold;
      y *= 1.24;
      x += (1 - t) * 0.28;
      z += (1 - t) * 0.15;
      pos.setXYZ(i, x, y, z);
    }
    bodyGeo.computeVertexNormals();
    const bodyMesh = new THREE.Mesh(bodyGeo, muscleMat);
    bodyMesh.name = 'ventricles';
    heart.add(bodyMesh);

    // Рельефные ушки предсердий (вместо гладких шаров)
    const rAurGeo = sculptOrgan(new THREE.SphereGeometry(0.38, 36, 36), 0.09, 8);
    const rAuricle = new THREE.Mesh(rAurGeo, auricleMat);
    rAuricle.scale.set(0.68, 1.15, 0.78);
    rAuricle.position.set(-0.56, 0.56, 0.12);
    rAuricle.rotation.set(0.15, 0.3, 0.34);
    heart.add(rAuricle);

    const lAurGeo = sculptOrgan(new THREE.SphereGeometry(0.33, 36, 36), 0.09, 9);
    const lAuricle = new THREE.Mesh(lAurGeo, auricleMat);
    lAuricle.scale.set(0.75, 0.98, 0.72);
    lAuricle.position.set(0.54, 0.5, 0.14);
    lAuricle.rotation.set(0.1, -0.35, -0.38);
    heart.add(lAuricle);

    function makeTube(pts, r, mat) {
      const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
      const geo = new THREE.TubeGeometry(curve, 44, r, 18, false);
      return new THREE.Mesh(geo, mat);
    }

    // Эпикардиальный жир в венечной и межжелудочковой бороздах
    heart.add(makeTube([
      [-0.58, 0.44, 0.32],
      [-0.1, 0.46, 0.62],
      [0.32, 0.42, 0.56],
      [0.58, 0.38, 0.25]
    ], 0.045, fatMat));

    heart.add(makeTube([
      [0.14, 0.46, 0.64],
      [0.18, 0.05, 0.72],
      [0.12, -0.45, 0.59]
    ], 0.036, fatMat));

    // Дуга аорты и брахиоцефальные ветви
    heart.add(makeTube([
      [0.05, 0.75, -0.05],
      [-0.12, 1.28, -0.02],
      [0.18, 1.56, -0.14],
      [0.52, 1.32, -0.28],
      [0.44, 0.65, -0.36]
    ], 0.22, vesselRedMat));

    heart.add(makeTube([[-0.06, 1.44, -0.05], [-0.14, 1.84, -0.06]], 0.078, vesselRedMat));
    heart.add(makeTube([[0.12, 1.52, -0.1], [0.14, 1.9, -0.12]], 0.065, vesselRedMat));
    heart.add(makeTube([[0.3, 1.48, -0.16], [0.38, 1.86, -0.2]], 0.065, vesselRedMat));

    // Верхняя полая вена и лёгочный ствол
    heart.add(makeTube([
      [-0.46, 0.85, -0.12],
      [-0.48, 1.42, -0.14],
      [-0.66, 1.78, -0.16]
    ], 0.15, vesselBlueMat));

    heart.add(makeTube([
      [-0.08, 0.65, 0.34],
      [0.08, 1.12, 0.26],
      [0.42, 1.26, 0.08],
      [0.8, 1.22, -0.04]
    ], 0.19, vesselBlueMat));

    // Ветвящиеся красные коронарные артерии (ПМЖВ, диагональные, правая)
    heart.add(makeTube([
      [0.15, 0.56, 0.62],
      [0.19, 0.12, 0.73],
      [0.11, -0.45, 0.61],
      [0.2, -0.96, 0.34]
    ], 0.026, coronaryArtMat));

    heart.add(makeTube([
      [0.18, 0.22, 0.72],
      [0.46, -0.12, 0.61],
      [0.56, -0.55, 0.41]
    ], 0.018, coronaryArtMat));

    heart.add(makeTube([
      [0.15, -0.12, 0.69],
      [0.38, -0.46, 0.55],
      [0.44, -0.82, 0.35]
    ], 0.015, coronaryArtMat));

    heart.add(makeTube([
      [-0.32, 0.44, 0.56],
      [-0.4, -0.04, 0.6],
      [-0.26, -0.55, 0.5]
    ], 0.022, coronaryArtMat));

    // Синие коронарные вены
    heart.add(makeTube([
      [0.09, 0.54, 0.62],
      [0.12, 0.12, 0.73],
      [0.04, -0.45, 0.61],
      [0.12, -0.96, 0.34]
    ], 0.022, vesselBlueMat));

    heart.add(makeTube([
      [0.12, 0.18, 0.72],
      [-0.22, -0.1, 0.7],
      [-0.44, -0.46, 0.54]
    ], 0.016, vesselBlueMat));

    // Очаг ишемии в толще стенки левого желудочка (без торчащего шарика)
    const lesionMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.95,
      transparent: true,
      opacity: 0.0
    });

    const lesion = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), lesionMat);
    lesion.scale.set(1.15, 1.35, 0.45);
    lesion.position.set(0.26, -0.16, 0.56);
    lesion.rotation.y = 0.35;
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
        const beat = 1 + Math.sin(t * 4.2) * 0.02 + Math.sin(t * 8.4) * 0.008;
        heartGroup.scale.setScalar(0.78 * beat);
        if (state && state.autoRotate !== false) {
          heartGroup.rotation.y += dt * 0.38;
        }
        if (lesion) {
          const st = (state && typeof state.stage === 'number') ? state.stage : 0;
          if (st === 0) {
            lesion.material.opacity = 0;
          } else {
            lesion.material.color.setHex(st === 1 ? 0xf59e0b : 0xef4444);
            lesion.material.emissive.setHex(st === 1 ? 0xd97706 : 0x991b1b);
            lesion.material.opacity = 0.58 + Math.sin(t * 6) * 0.22;
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
