(function () {
  function hookGLB() {
    const G = window.GLB;
    if (!G || !window.THREE || !window.AtlasGLBWork) return;

    // Отменяем поиск несуществующего heart.glb
    G.models = {};

    let work = null;
    let activeHeart = false;

    function syncHeart() {
      const idx = (typeof window.cur === 'number') ? window.cur :
                  (window.state && typeof window.state.cur === 'number') ? window.state.cur : -1;
      const isHeart = (idx === 5);

      if (isHeart && !activeHeart) {
        activeHeart = true;
        G.div.style.display = 'block';
        G.resize();
        G.camera.position.set(0, 0.2, 4.3);
        work = window.AtlasGLBWork.mount({
          THREE: window.THREE,
          scene: G.scene,
          state: G
        });
      } else if (!isHeart && activeHeart) {
        activeHeart = false;
        G.div.style.display = 'none';
        if (work && work.dispose) work.dispose();
        work = null;
      }
    }

    // Вращение мышкой и колесиком прямо в окне #canvas-3d
    let px = 0, py = 0;
    G.div.addEventListener('pointerdown', e => { G.drag = true; G.paused = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('pointerup', () => { G.drag = false; });
    window.addEventListener('pointermove', e => {
      if (!G.drag || !activeHeart) return;
      G.scene.rotation.y += (e.clientX - px) * 0.008;
      G.scene.rotation.x += (e.clientY - py) * 0.008;
      px = e.clientX; py = e.clientY;
    });
    G.div.addEventListener('wheel', e => {
      if (!activeHeart) return;
      e.preventDefault();
      G.camera.position.z = Math.max(2.2, Math.min(7.5, G.camera.position.z + e.deltaY * 0.003));
    }, { passive: false });

    let last = performance.now();
    function loop(now) {
      requestAnimationFrame(loop);
      syncHeart();
      if (!activeHeart) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      G.autoRotate = !G.paused;
      if (work && work.update) work.update(dt, now / 1000);
      G.renderer.render(G.scene, G.camera);
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('load', () => setTimeout(hookGLB, 250));
})();
