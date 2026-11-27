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
      background: 'transparent',
      mixBlendMode: 'lighten',
      display: 'none',
      zIndex: '1',
      pointerEvents: 'none',
      transition: 'transform 0.15s ease'
    });
    box.insertBefore(video, box.firstChild);

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
      const items = Array.from(document.querySelectorAll('#section-list .section-item, #section-list button, .tab-btn'));
      const activeEl = items.find((el) => el.classList.contains('active'));
      const activeIdx = items.indexOf(activeEl);
      const title = activeEl ? activeEl.textContent.toLowerCase() : '';

      const stages = Array.from(document.querySelectorAll('.stage-btn'));
      const activeStage = stages.findIndex((el) => el.classList.contains('active'));
      const isXray = btnXray && btnXray.classList.contains('active');

      // 1. Позвоночник (все 3 стадии в 3D)
      if ((activeIdx === 0 || title.includes('позвоночник') || title.includes('spine') || title.includes('columna') || title.includes('wirbelsäule') || title.includes('脊柱')) && !isXray) {
        if (activeStage === 1) return 'spine_stage2.mp4';
        if (activeStage === 2) return 'spine_stage3.mp4';
        return 'spine.mp4';
      }

      // 9. Почки, 10. Печень, 11. Желудок — на всех стадиях
      if (activeIdx === 8 || title.includes('почк') || title.includes('kidney') || title.includes('riñon') || title.includes('nieren') || title.includes('肾')) return 'kidney.mp4';
      if (activeIdx === 9 || title.includes('печен') || title.includes('liver') || title.includes('hígado') || title.includes('leber') || title.includes('肝')) return 'liver.mp4';
      if (activeIdx === 10 || title.includes('желуд') || title.includes('stomach') || title.includes('estómago') || title.includes('magen') || title.includes('胃')) return 'stomach.mp4';

      // Остальные разделы — на стадии "Норма" без рентгена
      if (activeStage > 0 || isXray) return '';
      if (activeIdx === 1 || title.includes('головн') || title.includes('brain')) return 'brain.mp4';
      if (activeIdx === 2 || title.includes('нейрон') || title.includes('neuron')) return 'neuron.mp4';
      if (activeIdx === 3 || title.includes('сосуды мозга') || title.includes('vessels')) return 'vessels.mp4';
      if (activeIdx === 4 || title.includes('шейн') || title.includes('cervical')) return 'cervical.mp4';
      if (activeIdx === 5 || title.includes('сердц') || title.includes('heart')) return 'heart.mp4';
      if (activeIdx === 6 || title.includes('вен') || title.includes('veins')) return 'veins.mp4';
      if (activeIdx === 7 || title.includes('колен') || title.includes('knee') || title.includes('rodilla') || title.includes('knie') || title.includes('膝')) return 'knee.mp4';
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
