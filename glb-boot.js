(function () {
  function bootCustom3D() {
    if (!window.THREE || !window.AtlasGLBWork) return;
    const host = document.getElementById('viewport') || document.querySelector('main') || document.body;
    // Убираем старый канвас со стекляшкой, если он создался
    const oldCanvas = host.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0.25, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(host.clientWidth || window.innerWidth, host.clientHeight || window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    host.appendChild(renderer.domElement);

    // Студийное освещение
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    const keyLight = new THREE.DirectionalLight(0xfff5f5, 1.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.7);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const state = { autoRotate: true, stage: 0 };
    const work = window.AtlasGLBWork.mount({ THREE, scene, state });

    // Вращение мышкой и пальцем
    let dragging = false, prevX = 0, prevY = 0;
    renderer.domElement.addEventListener('pointerdown', e => {
      dragging = true; state.autoRotate = false; prevX = e.clientX; prevY = e.clientY;
    });
    window.addEventListener('pointerup', () => { dragging = false; });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      scene.rotation.y += (e.clientX - prevX) * 0.008;
      scene.rotation.x += (e.clientY - prevY) * 0.008;
      prevX = e.clientX; prevY = e.clientY;
    });

    window.addEventListener('resize', () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    let last = performance.now();
    function animate(now) {
      requestAnimationFrame(animate);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (work && work.update) work.update(dt, now / 1000);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', () => setTimeout(bootCustom3D, 350));
})();
