window.AtlasEngine = (function () {
  let scene, camera, renderer, rootGroup;
  let isXray = false, isPaused = false, currentModule = 0;
  let animatedObjects = [], translucentMaterials = [];
  let rotX = 0.22, rotY = -0.4, targetRotX = 0.22, targetRotY = -0.4;
  let zoom = 9.2, targetZoom = 9.2, isDragging = false, prevX = 0, prevY = 0;

  window.AtlasBuilders = window.AtlasBuilders || {};

  function loadThreeJS(cb) {
    if (window.THREE) return cb();
    const s = document.createElement('script');
    s.src = 'three.min.js';
    s.onload = cb;
    s.onerror = () => {
      const fb = document.createElement('script');
      fb.src = ['https:/', 'unpkg.com', 'three@0.128.0', 'build', 'three.min.js'].join('/');
      fb.onload = cb;
      document.head.appendChild(fb);
    };
    document.head.appendChild(s);
  }

  function matTissue(type, color) {
    if (type === 'bone') {
      const m = new THREE.MeshPhysicalMaterial({ color: 0xe2e8f0, roughness: 0.42, clearcoat: 0.25, transparent: true, opacity: isXray ? 0.2 : 0.96 });
      translucentMaterials.push({ mat: m, normal: 0.96, xray: 0.2 });
      return m;
    }
    if (type === 'glass') {
      const m = new THREE.MeshPhysicalMaterial({ color: color || 0x94a3b8, roughness: 0.25, clearcoat: 0.4, transparent: true, opacity: isXray ? 0.14 : 0.42 });
      translucentMaterials.push({ mat: m, normal: 0.42, xray: 0.14 });
      return m;
    }
    if (type === 'cartilage') return new THREE.MeshPhysicalMaterial({ color: 0x0284c7, roughness: 0.25, clearcoat: 0.65, transparent: true, opacity: 0.9 });
    if (type === 'nerve') return new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0x854d0e, emissiveIntensity: 0.35, roughness: 0.35 });
    if (type === 'artery') return new THREE.MeshPhysicalMaterial({ color: 0xdc2626, emissive: 0x7f1d1d, emissiveIntensity: 0.25, roughness: 0.22, clearcoat: 0.6 });
    if (type === 'vein') return new THREE.MeshPhysicalMaterial({ color: 0x2563eb, emissive: 0x1e3a8a, emissiveIntensity: 0.2, roughness: 0.25, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    if (type === 'lesion') return new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.6, roughness: 0.28 });
  }

  function init(containerId, onReady) {
    loadThreeJS(() => {
      const box = document.getElementById(containerId);
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x090d14, 0.028);
      camera = new THREE.PerspectiveCamera(40, box.clientWidth / box.clientHeight, 0.1, 100);
      camera.position.set(0, 1.4, zoom);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(box.clientWidth, box.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      box.innerHTML = '';
      box.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xdbeafe, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.15); key.position.set(6, 10, 8); scene.add(key);
      const rim = new THREE.DirectionalLight(0x38bdf8, 0.85); rim.position.set(-7, 5, -7); scene.add(rim);

      const grid = new THREE.GridHelper(14, 28, 0x1e293b, 0x0f172a);
      grid.position.y = -3.3;
      scene.add(grid);

      rootGroup = new THREE.Group();
      scene.add(rootGroup);

      const dom = renderer.domElement;
      dom.addEventListener('pointerdown', (e) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
      window.addEventListener('pointerup', () => (isDragging = false));
      window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        targetRotY += (e.clientX - prevX) * 0.008;
        targetRotX = Math.max(-1.25, Math.min(1.25, targetRotX + (e.clientY - prevY) * 0.008));
        prevX = e.clientX; prevY = e.clientY;
      });
      dom.addEventListener('wheel', (e) => { e.preventDefault(); targetZoom = Math.max(4.5, Math.min(16, targetZoom + e.deltaY * 0.005)); }, { passive: false });
      window.addEventListener('resize', () => {
        camera.aspect = box.clientWidth / box.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(box.clientWidth, box.clientHeight);
      });

      animate();
      if (onReady) onReady();
    });
  }

  function buildScene(modIdx, stageIdx) {
    currentModule = modIdx;
    if (!rootGroup) return;
    while (rootGroup.children.length > 0) rootGroup.remove(rootGroup.children);
    animatedObjects = [];
    translucentMaterials = [];
    const stageColor = stageIdx === 0 ? 0x38bdf8 : stageIdx === 1 ? 0xf59e0b : 0xef4444;
    const builder = window.AtlasBuilders[modIdx];
    if (builder) builder({ root: rootGroup, stage: stageIdx, color: stageColor, mat: matTissue, anim: animatedObjects });
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!renderer) return;
    rotX += (targetRotX - rotX) * 0.1; rotY += (targetRotY - rotY) * 0.1; zoom += (targetZoom - zoom) * 0.1;
    if (rootGroup) {
      rootGroup.rotation.x = rotX; rootGroup.rotation.y = rotY;
      if (!isDragging && !isPaused) targetRotY += 0.0022;
    }
    camera.position.z = zoom;

    if (!isPaused) {
      const t = performance.now() * 0.003;
      animatedObjects.forEach((o) => {
        if (o.type === 'pulse') { const s = 1 + Math.sin(t * 2.2) * 0.12; o.mesh.scale.set(s, s, s); }
        if (o.type === 'heartbeat') { const b = 1 + Math.pow(Math.sin(t * 2.5), 4) * 0.08; o.mesh.scale.set(b, b, b); }
        if (o.type === 'impulse') { o.mesh.position.x = -2.4 + ((t * 0.7) % 1) * (o.limit + 2.4); }
        if (o.type === 'bloodflow') {
          o.mesh.position.y += o.reverse ? -0.025 : 0.025;
          if (o.mesh.position.y > 2.1) o.mesh.position.y = -2.1;
          if (o.mesh.position.y < -2.1) o.mesh.position.y = 2.1;
        }
      });
    }

    const layer = document.getElementById('labels-layer');
    if (layer && window.ANAT_LABELS && rootGroup) {
      const pins = layer.querySelectorAll('.anat-pin');
      const items = window.ANAT_LABELS[currentModule] || [];
      const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight;
      items.forEach((item, idx) => {
        if (!pins[idx]) return;
        const v = new THREE.Vector3(item.pos[0], item.pos[1], item.pos[2]).applyMatrix4(rootGroup.matrixWorld).project(camera);
        pins[idx].style.left = ((v.x * 0.5 + 0.5) * w) + 'px';
        pins[idx].style.top = (-(v.y * 0.5 - 0.5) * h) + 'px';
      });
    }
    renderer.render(scene, camera);
  }

  return {
    init, buildScene,
    setView(v) {
      if (v === 'front') { targetRotX = 0.1; targetRotY = 0; }
      if (v === 'side') { targetRotX = 0.1; targetRotY = Math.PI / 2; }
      if (v === 'top') { targetRotX = 1.15; targetRotY = 0; }
    },
    toggleXray() { isXray = !isXray; translucentMaterials.forEach((i) => (i.mat.opacity = isXray ? i.xray : i.normal)); return isXray; },
    togglePause() { isPaused = !isPaused; return isPaused; }
  };
})();
window.AtlasBuilders = window.AtlasBuilders || {};

window.AtlasBuilders.buildSpine = function ({ root, stage, color, mat, anim }, isCervical) {
  const count = isCervical ? 3 : 2, scale = isCervical ? 0.85 : 1.05, step = isCervical ? 1.22 : 1.52;
  const boneMat = mat('bone'), discMat = mat('cartilage'), nerveMat = mat('nerve');

  for (let i = 0; i < count; i++) {
    const y = (i - (count - 1) / 2) * step;
    const g = new THREE.Group();
    const pts = [new THREE.Vector2(0, -0.42), new THREE.Vector2(1.15, -0.42), new THREE.Vector2(1.02, 0), new THREE.Vector2(1.15, 0.42), new THREE.Vector2(0, 0.42)];
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), boneMat);
    body.scale.set(1.05, 1, 0.88);
    const spinous = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.48, 0.95), boneMat);
    spinous.position.set(0, -0.08, -1.65); spinous.rotation.x = 0.22;
    g.add(body, spinous);
    [-1.25, 1.25].forEach((x) => {
      const tr = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 0.24), boneMat);
      tr.position.set(x, 0.05, -0.95); g.add(tr);
    });
    g.position.y = y; g.scale.setScalar(scale); root.add(g);

    if (i < count - 1) {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.08 * scale, 1.08 * scale, 0.36 * scale, 32), discMat);
      disc.scale.set(1.05, 1, 0.88); disc.position.y = y + step / 2; root.add(disc);
    }
  }

  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * scale, 0.22 * scale, 4.2, 20), nerveMat);
  cord.position.set(0, 0, -0.92 * scale); root.add(cord);

  if (isCervical) {
    const artMat = mat('artery');
    [-1.12, 1.12].forEach((x, idx) => {
      const r = (stage === 1 && idx === 1) ? 0.055 : 0.11;
      const art = new THREE.Mesh(new THREE.CylinderGeometry(r, 0.11, 4.0, 16), artMat);
      art.position.set(x, 0, -0.78); root.add(art);
    });
  }

  if (stage > 0) {
    const hernia = new THREE.Mesh(new THREE.SphereGeometry((stage === 1 ? 0.32 : 0.56) * scale, 24, 24), mat('lesion', color));
    hernia.position.set(stage === 2 ? 0.28 * scale : 0.1, 0, (stage === 1 ? -0.76 : -0.92) * scale);
    root.add(hernia); anim.push({ mesh: hernia, type: 'pulse' });
  }
};

window.AtlasBuilders[0] = (ctx) => window.AtlasBuilders.buildSpine(ctx, false);

window.AtlasBuilders[1] = ({ root, stage, color, mat, anim }) => {
  const brainMat = mat('glass', 0xcbd5e1);
  [-0.78, 0.78].forEach((x) => {
    const hemi = new THREE.Mesh(new THREE.SphereGeometry(1.62, 36, 36), brainMat);
    hemi.scale.set(0.74, 0.92, 1.28); hemi.position.set(x, 0.35, 0); root.add(hemi);
  });
  const cer = new THREE.Mesh(new THREE.SphereGeometry(0.88, 24, 24), brainMat);
  cer.scale.set(1.25, 0.65, 0.82); cer.position.set(0, -0.85, -0.98);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 1.4, 16), brainMat);
  stem.position.set(0, -1.25, -0.25); stem.rotation.x = -0.25;
  root.add(cer, stem);

  if (stage > 0) {
    const focus = new THREE.Mesh(new THREE.SphereGeometry(stage === 1 ? 0.46 : 0.74, 28, 28), mat('lesion', color));
    focus.position.set(0.68, 0.42, 0.28); root.add(focus); anim.push({ mesh: focus, type: 'pulse' });
  }
};

window.AtlasBuilders[2] = ({ root, stage, color, mat, anim }) => {
  const nerveMat = mat('nerve');
  const soma = new THREE.Mesh(new THREE.SphereGeometry(0.78, 32, 32), nerveMat);
  soma.position.set(-2.6, 0, 0); root.add(soma);

  const axon = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.9, 16), nerveMat);
  axon.rotation.z = Math.PI / 2; axon.position.set(0.1, 0, 0); root.add(axon);

  for (let i = 0; i < 4; i++) {
    const dmg = (stage === 1 && i === 2) || (stage === 2 && i >= 2);
    const sheath = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.86, 24), dmg ? mat('lesion', color) : mat('cartilage'));
    sheath.rotation.z = Math.PI / 2; sheath.position.set(-1.15 + i * 1.05, 0, 0);
    if (stage === 2 && i === 3) sheath.scale.set(0.45, 0.45, 0.45);
    root.add(sheath);
  }
  const syn = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 20), stage === 2 ? mat('lesion', color) : nerveMat);
  syn.scale.set(1.2, 0.85, 0.85); syn.position.set(2.65, 0, 0); root.add(syn);

  const imp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  root.add(imp); anim.push({ mesh: imp, type: 'impulse', limit: stage === 2 ? 0.7 : 2.55 });
};

window.AtlasBuilders[3] = ({ root, stage, color, mat, anim }) => {
  const artMat = mat('artery');
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.14, 20, 48), artMat);
  ring.rotation.x = Math.PI / 2;
  const bas = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 2.2, 16), artMat);
  bas.position.set(0, -0.85, -1.45); bas.rotation.x = 0.55;
  root.add(ring, bas);

  [-1, 1].forEach((d) => {
    const mca = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 1.85, 16), artMat);
    mca.rotation.z = Math.PI / 2; mca.position.set(d * 2.1, 0.1, 0.15); root.add(mca);
  });
  if (stage > 0) {
    const an = new THREE.Mesh(new THREE.SphereGeometry(stage === 1 ? 0.25 : 0.48, 24, 24), mat('lesion', color));
    an.position.set(1.25, 0.12, 0.35); root.add(an); anim.push({ mesh: an, type: 'pulse' });
  }
};
window.AtlasBuilders = window.AtlasBuilders || {};

window.AtlasBuilders[4] = (ctx) => window.AtlasBuilders.buildSpine(ctx, true);

window.AtlasBuilders[5] = ({ root, stage, color, mat, anim }) => {
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

window.AtlasBuilders[6] = ({ root, stage, color, mat, anim }) => {
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

window.AtlasBuilders[7] = ({ root, stage, color, mat }) => {
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
