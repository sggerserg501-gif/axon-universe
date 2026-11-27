(function () {
  function initVideoOrgans() {
    const box = document.getElementById('canvas-3d');
    if (!box) return;

    const btnPause = document.getElementById('toggle-pause');
    const btnXray = document.getElementById('toggle-xray');
    const btnFs = document.getElementById('toggle-fs');
    const labelsLayer = document.getElementById('labels-layer');
    let currentSrc = '';
    let isPaused = false;
    let zoom = 1;

    // Добавляем кнопки "+" и "-" в верхнюю панель рядом с Паузой и Во весь экран
    if (btnFs && btnFs.parentElement && !document.getElementById('zoom-in-btn')) {
      const bar = btnFs.parentElement;
      const btnMinus = document.createElement('button');
      btnMinus.id = 'zoom-out-btn';
      btnMinus.className = btnFs.className;
      btnMinus.title = 'Уменьшить';
      btnMinus.textContent = '−';

      const btnPlus = document.createElement('button');
      btnPlus.id = 'zoom-in-btn';
      btnPlus.className = btnFs.className;
      btnPlus.title = 'Увеличить';
      btnPlus.textContent = '+';

      bar.insertBefore(btnMinus, btnFs);
      bar.insertBefore(btnPlus, btnFs);

      btnPlus.addEventListener('click', () => {
        if (currentSrc) {
          zoom = Math.min(2.5, +(zoom + 0.2).toFixed(2));
          video.style.transform = `scale(${zoom})`;
        } else {
          box.dispatchEvent(new WheelEvent('wheel', { deltaY: -120, bubbles: true }));
        }
      });

      btnMinus.addEventListener('click', () => {
        if (currentSrc) {
          zoom = Math.max(0.6, +(zoom - 0.2).toFixed(2));
          video.style.transform = `scale(${zoom})`;
        } else {
          box.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true }));
        }
      });
    }

    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    Object.assign(video.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      background: '#000',
      display: 'none',
      zIndex: '1',
      pointerEvents: 'none',
      transition: 'transform 0.15s ease'
    });
    box.insertBefore(video, box.firstChild);

    // Зум колесиком мыши по видео
    box.addEventListener('wheel', (e) => {
      if (!currentSrc) return;
      e.preventDefault();
      zoom = Math.max(0.6, Math.min(2.5, +(zoom + (e.deltaY < 0 ? 0.15 : -0.15)).toFixed(2)));
      video.style.transform = `scale(${zoom})`;
    }, { passive: false });

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        if (!currentSrc) return;
        isPaused = !isPaused;
        if (isPaused) video.pause();
        else video.play().catch(() => {});
      });
    }

    function getTargetVideo() {
      const items = Array.from(document.querySelectorAll('#section-list .section-item'));
      const activeIdx = items.findIndex((el) => el.classList.contains('active'));

      const stages = Array.from(document.querySelectorAll('.stage-btn'));
      const activeStage = stages.findIndex((el) => el.classList.contains('active'));
      const isXray = btnXray && btnXray.classList.contains('active');

      // Видео только на стадии "Норма" (0) и при выключенном "Рентгене"
      if (activeStage > 0 || isXray) return '';

      // Строго разделы: 0 (Позвоночник), 1 (Головной мозг), 5 (Сердце)
      if (activeIdx === 0) return 'spine.mp4';
      if (activeIdx === 1) return 'brain.mp4';
      if (activeIdx === 5) return 'heart.mp4';
      return '';
    }

    function syncVideo() {
      const target = getTargetVideo();
      const oldCanvas = box.querySelector(':scope > canvas');
      if (window.GLB && window.GLB.div) window.GLB.div.style.display = 'none';

      if (target) {
        if (oldCanvas) oldCanvas.style.display = 'none';
        if (labelsLayer) labelsLayer.style.display = 'none';
        if (currentSrc !== target) {
          currentSrc = target;
          isPaused = false;
          zoom = 1;
          video.style.transform = 'scale(1)';
          video.src = target;
          video.style.display = 'block';
          video.play().catch(() => {});
        }
      } else if (currentSrc) {
        currentSrc = '';
        video.pause();
        video.style.display = 'none';
        if (oldCanvas) oldCanvas.style.display = 'block';
        if (labelsLayer) labelsLayer.style.display = 'block';
      }
    }

    setInterval(syncVideo, 150);
  }

  if (document.readyState === 'complete') setTimeout(initVideoOrgans, 100);
  else window.addEventListener('load', () => setTimeout(initVideoOrgans, 100));
})();
