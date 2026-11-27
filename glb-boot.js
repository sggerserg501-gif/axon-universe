(function () {
  function initVideoOrgans() {
    const box = document.getElementById('canvas-3d');
    if (!box) return;

    const btnPause = document.getElementById('toggle-pause');
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
      zIndex: '6',
      pointerEvents: 'none'
    });
    box.appendChild(video);

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

      if (activeIdx === 0) return 'spine.mp4';
      if (activeIdx === 1) return 'brain.mp4';
      if (activeIdx === 5) return 'heart.mp4';

      const titleEl = document.getElementById('info-title');
      if (titleEl) {
        const t = titleEl.textContent.toLowerCase();
        if (t.includes('позвоночник') || t.includes('spine') || t.includes('l4')) return 'spine.mp4';
        if (t.includes('мозг') || t.includes('brain')) return 'brain.mp4';
        if (t.includes('сердц') || t.includes('heart') || t.includes('миокард')) return 'heart.mp4';
      }
      return '';
    }

    function syncVideo() {
      const target = getTargetVideo();
      const oldCanvas = box.querySelector(':scope > canvas');
      if (window.GLB && window.GLB.div) window.GLB.div.style.display = 'none';

      if (target) {
        if (oldCanvas) oldCanvas.style.display = 'none';
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
      }
    }

    setInterval(syncVideo, 150);
  }

  if (document.readyState === 'complete') setTimeout(initVideoOrgans, 100);
  else window.addEventListener('load', () => setTimeout(initVideoOrgans, 100));
})();
