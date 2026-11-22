window.AtlasScenes = window.AtlasScenes || {};
window.AtlasEngine = (function () {
  let canvas, ctx, isPaused = false, mod = 0, stage = 0;
  let tRotX = 0.25, tRotY = -0.45, zoom = 1.0, tZoom = 1.0, drag = false, px = 0, py = 0;

  function init(id, cb) {
    const box = document.getElementById(id);
    canvas = document.createElement('canvas');
    box.innerHTML = ''; box.appendChild(canvas); ctx = canvas.getContext('2d');
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = box.clientWidth * dpr; canvas.height = box.clientHeight * dpr;
      canvas.style.width = box.clientWidth + 'px'; canvas.style.height = box.clientHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener('resize', resize);
    canvas.addEventListener('pointerdown', (e) => { drag = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('pointerup', () => (drag = false));
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      tRotY += (e.clientX - px) * 0.01;
      tRotX = Math.max(-1.2, Math.min(1.2, tRotX + (e.clientY - py) * 0.01));
      px = e.clientX; py = e.clientY;
    });
    canvas.addEventListener('wheel', (e) => { e.preventDefault(); tZoom = Math.max(0.55, Math.min(1.8, tZoom - e.deltaY * 0.001)); }, { passive: false });
    requestAnimationFrame(loop);
    if (cb) cb();
  }

  function loop() {
    requestAnimationFrame(loop);
    const R = window.AtlasRender;
    if (!ctx || !canvas || !R) return;
    R.rotX += (tRotX - R.rotX) * 0.12; R.rotY += (tRotY - R.rotY) * 0.12; zoom += (tZoom - zoom) * 0.12;
    if (!drag && !isPaused) tRotY += 0.006;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, scale = Math.min(w, h) * 0.22 * zoom, t = performance.now() * 0.001;
    const stColor = stage === 0 ? '#38bdf8' : stage === 1 ? '#f59e0b' : '#ef4444';
    const fn = window.AtlasScenes[String(mod)];
    if (fn) fn({ ctx, R, cx, cy, scale, t, stage, stColor });
    const layer = document.getElementById('labels-layer');
    if (layer && window.ANAT_LABELS) {
      const pins = layer.querySelectorAll('.anat-pin');
      (window.ANAT_LABELS[mod] || []).forEach((item, i) => {
        const pin = pins.item(i);
        if (!pin) return;
        const p = R.project(item.pos.at(0), item.pos.at(1), item.pos.at(2), cx, cy, scale);
        pin.style.left = p.sx + 'px'; pin.style.top = p.sy + 'px';
      });
    }
  }

  return {
    init, buildScene(m, s) { mod = m; stage = s; },
    setView(v) {
      if (v === 'front') { tRotX = 0.15; tRotY = 0; }
      if (v === 'side') { tRotX = 0.15; tRotY = Math.PI / 2; }
      if (v === 'top') { tRotX = 1.1; tRotY = 0; }
    },
    toggleXray() { window.AtlasRender.isXray = !window.AtlasRender.isXray; return window.AtlasRender.isXray; },
    togglePause() { isPaused = !isPaused; return isPaused; }
  };
})();
