(function () {
  function hookGLB() {
    const G = window.GLB;
    if (!G || !window.THREE || !window.AtlasGLBWork) return;

    let work = null;
    let activeHeart = false;
    let clickedHeart = false;
    const box = document.getElementById('canvas-3d');
    const list = document.getElementById('section-list');

    if (list) {
      list.addEventListener('click', (e) => {
        const item = e.target.closest('button, a, li, div');
        if (!item || !list.contains(item)) return;
        const items = Array.from(list.children);
        const idx = items.findIndex(el => el === item || el.contains(item));
        if (idx !== -1) {
          clickedHeart = (idx === 5);
          if (clickedHeart) G.stage = 0;
        }
      });
    }

    // Синхронизация кнопок клинических стадий (1, 2, 3)
    document.querySelectorAll('.stage-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        G.stage = Number(btn.dataset.stage) || 0;
      });
    });

    // Синхронизация кнопок камеры и паузы
    const camFront = document.getElementById('cam-front');
    const camSide = document.getElementById('cam-side');
    const camTop = document.getElementById('cam-top');
    const btnPause = document.getElementById('toggle-pause');

    if (camFront) camFront.addEventListener('click', () => { if (activeHeart) G.scene.rotation.set(0.1, 0, 0); });
    if (camSide) camSide.addEventListener('click', () => { if (activeHeart) G.scene.rotation.set(0.1, Math.PI / 2, 0); });
    if (camTop) camTop.addEventListener('click', () => { if (activeHeart) G.scene.rotation.set(1.3, 0, 0); });
    if (btnPause) btnPause.addEventListener('click', () => { G.paused = !G.paused; });

    function isHeartSelected() {
      if (clickedHeart) return true;
      const titleEl = document.getElementById('info-title');
      if (titleEl) {
        const t = titleEl.textContent.toLowerCase();
        if (t.includes('сердц') || t.includes('heart') || t.includes('coraz') || t.includes('herz') || t.includes('心') || t.includes('миокард') || t.includes('коронар')) {
          return true;
        }
      }
      return false;
    }

    function syncHeart() {
      const isHeart = isHeartSelected();
      const oldCanvas = box ? box.querySelector(':scope > canvas') : null;

      if (isHeart && !activeHeart) {
        activeHeart = true;
        if (oldCanvas) oldCanvas.style.display = 'none';
        G.div.style.display = 'block';
        G.resize();
        G.camera.position.set(0, 0.2, 3.6);
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
    G.div.addEventListener('pointerdown', e => {
      G.drag = true;
      px = e.clientX;
      py = e.clientY;
    });
    window.addEventListener('pointerup', () => { G.drag = false; });
    window.addEventListener('pointermove', e => {
      if (!G.drag || !activeHeart) return;
      G.scene.rotation.y += (e.clientX - px) * 0.008;
      G.scene.rotation.x += (e.clientY - py) * 0.008;
      px = e.clientX;
      py = e.clientY;
    });
    G.div.addEventListener('wheel', e => {
      if (!activeHeart) return;
      e.preventDefault();
      G.camera.position.z = Math.max(2.0, Math.min(7.5, G.camera.position.z + e.deltaY * 0.003));
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
