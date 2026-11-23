(function () {
  if (!window.THREE) return;
  const box = document.getElementById('canvas-3d');
  const div = document.createElement('div');
  div.style.cssText = 'position:absolute;inset:0;display:none;z-index:2;';
  box.style.position = 'relative';
  box.appendChild(div);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  div.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const l1 = new THREE.DirectionalLight(0xffffff, 1.1); l1.position.set(3, 5, 4);
  const l2 = new THREE.DirectionalLight(0x38bdf8, 0.5); l2.position.set(-4, -2, -3);
  scene.add(l1, l2);

  function resize() {
    const w = box.clientWidth || 600, h = box.clientHeight || 400;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
  }
  window.addEventListener('resize', resize);
  window.GLB = {
    models: { 5: 'heart.glb' },
    div, scene, camera, renderer, resize,
    model: null, xray: false, stage: 0, paused: false, rx: 0.15, ry: -0.35, zoom: 2.6, drag: false
  };
})();
