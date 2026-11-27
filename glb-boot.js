(function () {
  function initVideoOrgans() {
    const box = document.getElementById('canvas-3d');
    if (!box) return;

    const btnPause = document.getElementById('toggle-pause');
    const btnXray = document.getElementById('toggle-xray');
    const labelsLayer = document.getElementById('labels-layer');
    let currentSrc = '';
    let isPaused = false;

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
      pointerEvents: 'none'
    });
    box.insertBefore(video, box.firstChild);

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

      // Строго только разделы: 0 (Позвоночник), 1 (Головной мозг), 5 (Сердце)
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
