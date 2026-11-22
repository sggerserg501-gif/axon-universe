window.AtlasEngine = (function () {
  let scene, camera, renderer, rootGroup;
  let isXray = false, isPaused = false, currentModule = 0;
  let animatedObjects = [], translucentMaterials = [];
  let rotX = 0.22, rotY = -0.4, targetRotX = 0.22, targetRotY = -0.4;
  let zoom = 9.2, targetZoom = 9.2, isDragging = false, prevX = 0, prevY = 0;

  window.AtlasBuilders = window.AtlasBuilders || {};
  function loadThreeJS(cb) {
    if (window.THREE) return cb();
    const sources = [
      'three.min.js',
      ['https:/', 'cdn.jsdelivr.net', 'npm', 'three@0.128.0', 'build', 'three.min.js'].join('/'),
      ['https:/', 'cdn.bootcdn.net', 'ajax', 'libs', 'three.js', 'r128', 'three.min.js'].join('/')
    ];
    let idx = 0;
    function tryNext() {
      if (idx >= sources.length) return;
      const s = document.createElement('script');
      s.src = sources[idx++];
      s.onload = cb;
      s.onerror = tryNext;
      document.head.appendChild(s);
    }
    tryNext();
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
