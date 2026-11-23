(function () {
  const G = window.GLB;
  if (!G || !window.AtlasEngine) return;
  let curFile = null, px = 0, py = 0;

  G.div.addEventListener('pointerdown', (e) => { G.drag = true; px = e.clientX; py = e.clientY; });
  window.addEventListener('pointerup', () => (G.drag = false));
  window.addEventListener('pointermove', (e) => {
    if (!G.drag || G.div.style.display === 'none') return;
    G.ry += (e.clientX - px) * 0.01;
    G.rx = Math.max(-1.3, Math.min(1.3, G.rx + (e.clientY - py) * 0.01));
    px = e.clientX; py = e.clientY;
  });
  G.div.addEventListener('wheel', (e) => {
    if (G.div.style.display === 'none') return;
    e.preventDefault(); G.zoom = Math.max(1.2, Math.min(5.5, G.zoom + e.deltaY * 0.002));
  }, { passive: false });

  function style() {
    if (!G.model) return;
    G.model.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.material.transparent = true; o.material.opacity = G.xray ? 0.38 : 1.0;
      if (o.material.emissive) o.material.emissive.setHex(G.stage === 0 ? 0x000000 : G.stage === 1 ? 0x451a03 : 0x550505);
    });
  }

  function load(file) {
    if (curFile === file && G.model) { style(); return; }
    curFile = file; if (G.model) { G.scene.remove(G.model); G.model = null; }
    new THREE.GLTFLoader().load(file, (gltf) => {
      G.model = gltf.scene;
      const b = new THREE.Box3().setFromObject(G.model);
      const maxDim = Math.max(...b.getSize(new THREE.Vector3()).toArray()) || 1;
      G.model.position.sub(b.getCenter(new THREE.Vector3()));
      G.model.scale.setScalar(1.65 / maxDim);
      G.scene.add(G.model); style();
    });
  }

  const origBuild = window.AtlasEngine.buildScene;
  window.AtlasEngine.buildScene = function (m, s) {
    G.stage = s; origBuild.call(this, m, s);
    const file = G.models[m];
    G.div.style.display = file ? 'block' : 'none';
    if (file) { G.resize(); load(file); }
  };

  const origView = window.AtlasEngine.setView;
  window.AtlasEngine.setView = function (v) {
    origView.call(this, v);
    if (v === 'front') { G.rx = 0.1; G.ry = 0; }
    if (v === 'side') { G.rx = 0.1; G.ry = Math.PI / 2; }
    if (v === 'top') { G.rx = 1.15; G.ry = 0; }
  };

  const origXray = window.AtlasEngine.toggleXray;
  window.AtlasEngine.toggleXray = function () { G.xray = origXray.call(this); style(); return G.xray; };

  const origPause = window.AtlasEngine.togglePause;
  window.AtlasEngine.togglePause = function () { G.paused = origPause.call(this); return G.paused; };

  (function loop() {
    requestAnimationFrame(loop);
    if (G.div.style.display === 'none') return;
    if (!G.drag && !G.paused) G.ry += 0.005;
    if (G.model) { G.model.rotation.x = G.rx; G.model.rotation.y = G.ry; }
    G.camera.position.set(0, 0, G.zoom); G.renderer.render(G.scene, G.camera);
  })();
})();
