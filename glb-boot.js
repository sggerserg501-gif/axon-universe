(function () {
  function hookGLB() {
    const G = window.GLB;
    if (!G || !window.THREE || !window.AtlasGLBWork) return;

    let work = null;
    let activeHeart = false;
    const box = document.getElementById('canvas-3d');

    document.querySelectorAll('.stage-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        G.stage = Number(btn.dataset.stage) || 0;
      });
    });

    const camFront = document.getElementById('cam-front');
    const camSide = document.getElementById('cam-side');
    const camTop = document.getElementById('cam-top');
    const btnPause = document.getElementById('toggle-pause');

    if (camFront) camFront.addEventListener('click', () => { if (activeHeart) G.scene.rotation.set(0.1, 0, 0); });
    if (camSide) camSide.addEventListener('click', () => { if (activeHeart) G.scene.rotation.set(0.1, Math.PI / 2, 0); });
    if (camTop) camTop.addEventListener('click', () => { if (activeHeart) G.scene.rotation.set(1.3, 0, 0); });
    if (btnPause) btnPause.addEventListener('click', () => { G.paused = !G.paused; });

    function isHeartSelected() {
      const items = Array.from(document.querySelectorAll('#section-list .section-item'));
      const activeIdx = items.findIndex((el) => el.classList.contains('active'));
      if (activeIdx === 5) return true;

      const titleEl = document.getElementById('info-title');
      if (titleEl) {
        const t = titleEl.textContent.toLowerCase();
        if (t.includes('сердц') || t.includes('heart') || t.includes('миокард') || t.includes('коронар')) {
          return true;
        }
      }
      return false;
    }

    function forceResize() {
      if (!box || !G.renderer || !G.camera) return;
      const w = box.clientWidth || box.parentElement.clientWidth || 640;
      const h = box.clientHeight || box.parentElement.clientHeight || 480;
      G.div.style.width = w + 'px';
      G.div.style.height = h + 'px';
      G.renderer.domElement.style.width = '100%';
      G.renderer.domElement.style.height = '100%';
      G.renderer.domElement.style.display = 'block';
      G.camera.aspect = w / h;
      G.camera.updateProjectionMatrix();
      G.renderer.setSize(w, h, false);
    }

    window.addEventListener('resize', () => {
      if (activeHeart) forceResize();
    });
    function syncHeart() {
      const isHeart = isHeartSelected();
      const oldCanvas = box ? box.querySelector(':scope > canvas') : null;

      if (isHeart && !activeHeart) {
        activeHeart = true;
        G.stage = 0;
        if (oldCanvas) oldCanvas.style.display = 'none';
                if (oldCanvas) oldCanvas.style.display = 'none';
        if (box && G.div.parentElement !== box) box.appendChild(G.div);
      
        G.div.style.display = 'block';
        G.div.style.zIndex = '4';
        forceResize();
        G.camera.position.set(0, 0.2, 4.2);
        G.camera.lookAt(0, 0.15, 0);
        G.scene.rotation.set(0, 0, 0);
        work = window.AtlasGLBWork.mount({
          THREE: window.THREE,
          scene: G.scene,
          state: G
        });
      } else if (!isHeart && activeHeart) {
        activeHeart = false;
        G.div.style.display = 'none';
        if (oldCanvas) oldCanvas.style.display = 'block';
        if (work && work.dispose) work.dispose();
        work = null;
      }
    }

    let px = 0, py = 0;
    G.div.addEventListener('pointerdown', (e) => {
      G.drag = true;
      px = e.clientX;
      py = e.clientY;
    });
    window.addEventListener('pointerup', () => { G.drag = false; });
    window.addEventListener('pointermove', (e) => {
      if (!G.drag || !activeHeart) return;
      G.scene.rotation.y += (e.clientX - px) * 0.008;
      G.scene.rotation.x += (e.clientY - py) * 0.008;
      px = e.clientX;
      py = e.clientY;
    });
    G.div.addEventListener('wheel', (e) => {
      if (!activeHeart) return;
      e.preventDefault();
      G.camera.position.z = Math.max(2.0, Math.min(8.0, G.camera.position.z + e.deltaY * 0.003));
    }, { passive: false });

    let last = performance.now();
    function loop(now) {
      requestAnimationFrame(loop);
      syncHeart();
      if (!activeHeart) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      G.autoRotate = !G.paused && !G.drag;
      if (work && work.update) work.update(dt, now / 1000);
      G.renderer.render(G.scene, G.camera);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'complete') setTimeout(hookGLB, 100);
  else window.addEventListener('load', () => setTimeout(hookGLB, 100));
})();
