window.AtlasEngine = (function () {
  let canvas, ctx, isXray = false, isPaused = false, currentModule = 0, currentStage = 0;
  let rotX = 0.25, rotY = -0.45, targetRotX = 0.25, targetRotY = -0.45;
  let zoom = 1.0, targetZoom = 1.0, isDragging = false, prevX = 0, prevY = 0;

  window.AtlasScenes = window.AtlasScenes || {};

  function project(x, y, z, cx, cy, scale) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x1 = x * cosY - z * sinY, z1 = z * cosY + x * sinY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const y2 = y * cosX - z1 * sinX, z2 = z1 * cosX + y * sinX;
    const fov = 5.5 / (5.5 + z2);
    return { sx: cx + x1 * scale * fov, sy: cy - y2 * scale * fov, fov };
  }

  function sphere(x, y, z, r, color, glow, cx, cy, scale, alpha) {
    const a = alpha === undefined ? 1 : alpha;
    const p = project(x, y, z, cx, cy, scale);
    const rad = Math.max(2, r * scale * p.fov);
    ctx.save();
    ctx.globalAlpha = isXray ? a * 0.35 : a;
    const g = ctx.createRadialGradient(p.sx - rad * 0.32, p.sy - rad * 0.32, rad * 0.08, p.sx, p.sy, rad);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.28, color); g.addColorStop(1, '#090d16');
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 18; }
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function tube(pts, radius, color, cx, cy, scale, alpha) {
    const a = alpha === undefined ? 1 : alpha;
    ctx.save();
    ctx.globalAlpha = isXray ? a * 0.45 : a;
    ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 0; i < pts.length - 1; i++) {
      const a1 = pts.at(i), a2 = pts.at(i + 1);
      const p1 = project(a1.at(0), a1.at(1), a1.at(2), cx, cy, scale);
      const p2 = project(a2.at(0), a2.at(1), a2.at(2), cx, cy, scale);
      ctx.lineWidth = Math.max(2, radius * scale * ((p1.fov + p2.fov) / 2));
      ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
    }
    ctx.restore();
  }

  function init(containerId, onReady) {
    const box = document.getElementById(containerId);
    canvas = document.createElement('canvas');
    box.innerHTML = ''; box.appendChild(canvas);
    ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = box.clientWidth * dpr; canvas.height = box.clientHeight * dpr;
      canvas.style.width = box.clientWidth + 'px'; canvas.style.height = box.clientHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener('resize', resize);

    canvas.addEventListener('pointerdown', (e) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('pointerup', () => (isDragging = false));
    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevX) * 0.01;
      targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX + (e.clientY - prevY) * 0.01));
      prevX = e.clientX; prevY = e.clientY;
    });
    canvas.addEventListener('wheel', (e) => { e.preventDefault(); targetZoom = Math.max(0.55, Math.min(1.8, targetZoom - e.deltaY * 0.001)); }, { passive: false });
    requestAnimationFrame(loop);
    if (onReady) onReady();
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!ctx || !canvas) return;
    rotX += (targetRotX - rotX) * 0.12; rotY += (targetRotY - rotY) * 0.12; zoom += (targetZoom - zoom) * 0.12;
    if (!isDragging && !isPaused) targetRotY += 0.006;

    const w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, scale = Math.min(w, h) * 0.22 * zoom, t = performance.now() * 0.001;
    const stColor = currentStage === 0 ? '#38bdf8' : currentStage === 1 ? '#f59e0b' : '#ef4444';
    const drawFn = window.AtlasScenes[String(currentModule)];
    if (drawFn) drawFn({ sphere, tube, cx, cy, scale, t, stage: currentStage, stColor });

    const layer = document.getElementById('labels-layer');
    if (layer && window.ANAT_LABELS) {
      const pins = layer.querySelectorAll('.anat-pin');
      (window.ANAT_LABELS[currentModule] || []).forEach((item, idx) => {
        const pin = pins.item(idx);
        if (!pin) return;
        const p = project(item.pos.at(0), item.pos.at(1), item.pos.at(2), cx, cy, scale);
        pin.style.left = p.sx + 'px'; pin.style.top = p.sy + 'px';
      });
    }
  }

  return {
    init,
    buildScene(mod, stage) { currentModule = mod; currentStage = stage; },
    setView(v) {
      if (v === 'front') { targetRotX = 0.15; targetRotY = 0; }
      if (v === 'side') { targetRotX = 0.15; targetRotY = Math.PI / 2; }
      if (v === 'top') { targetRotX = 1.1; targetRotY = 0; }
    },
    toggleXray() { isXray = !isXray; return isXray; },
    togglePause() { isPaused = !isPaused; return isPaused; }
  };
})();
window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes.drawSpine = function ({ sphere, tube, cx, cy, scale, t, stage, stColor }, isCervical) {
  const pulse = 1 + Math.sin(t * 4) * 0.12;
  const ys = isCervical ? [-1.1, 0, 1.1] : [-0.85, 0.85];
  tube([[0, -1.8, -0.95], [0, 1.8, -0.95]], 0.24, '#facc15', cx, cy, scale);
  ys.forEach((y, i) => {
    sphere(0, y, 0, 0.92, '#cbd5e1', false, cx, cy, scale, 0.92);
    sphere(0, y - 0.1, -1.35, 0.35, '#94a3b8', false, cx, cy, scale, 0.85);
    if (i < ys.length - 1) sphere(0, (y + ys.at(i + 1)) / 2, 0, 0.82, '#0284c7', false, cx, cy, scale, 0.88);
  });
  if (isCervical) {
    tube([[-1.15, -1.8, -0.6], [-1.15, 1.8, -0.6]], 0.14, '#ef4444', cx, cy, scale);
    tube([[1.15, -1.8, -0.6], [1.15, 1.8, -0.6]], stage === 1 ? 0.06 : 0.14, '#ef4444', cx, cy, scale);
  }
  if (stage > 0) sphere(0.15, 0, -0.82, (stage === 1 ? 0.35 : 0.58) * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['0'] = (ctx) => window.AtlasScenes.drawSpine(ctx, false);

window.AtlasScenes['1'] = ({ sphere, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.12;
  sphere(-0.68, 0.25, 0, 1.35, '#94a3b8', false, cx, cy, scale, 0.45);
  sphere(0.68, 0.25, 0, 1.35, '#94a3b8', false, cx, cy, scale, 0.45);
  sphere(0, -0.95, -0.85, 0.72, '#64748b', false, cx, cy, scale, 0.65);
  if (stage > 0) sphere(0.65, 0.35, 0.25, (stage === 1 ? 0.45 : 0.72) * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['2'] = ({ sphere, tube, cx, cy, scale, t, stage, stColor }) => {
  sphere(-2.2, 0, 0, 0.72, '#facc15', true, cx, cy, scale);
  tube([[-2.2, 0, 0], [2.4, 0, 0]], 0.12, '#eab308', cx, cy, scale);
  [-1.1, -0.15, 0.8, 1.75].forEach((x, idx) => {
    const dmg = (stage === 1 && idx === 2) || (stage === 2 && idx >= 2);
    sphere(x, 0, 0, 0.32, dmg ? stColor : '#0284c7', dmg, cx, cy, scale);
  });
  const impX = -2.0 + ((t * 0.8) % 1) * (stage === 2 ? 2.5 : 4.3);
  sphere(impX, 0, 0.1, 0.2, '#38bdf8', true, cx, cy, scale);
};

window.AtlasScenes['3'] = ({ sphere, tube, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.12;
  const ring = [];
  for (let a = 0; a <= 16; a++) { const ang = (a / 16) * Math.PI * 2; ring.push([Math.cos(ang) * 1.25, 0, Math.sin(ang) * 1.25]); }
  tube(ring, 0.18, '#dc2626', cx, cy, scale);
  tube([[-2.5, 0.1, 0.2], [-1.25, 0, 0.2]], 0.15, '#dc2626', cx, cy, scale);
  tube([[1.25, 0, 0.2], [2.5, 0.1, 0.2]], 0.15, '#dc2626', cx, cy, scale);
  if (stage > 0) sphere(1.25, 0.1, 0.35, (stage === 1 ? 0.28 : 0.5) * pulse, stColor, true, cx, cy, scale);
};
window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['4'] = (ctx) => window.AtlasScenes.drawSpine(ctx, true);

window.AtlasScenes['5'] = ({ sphere, tube, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.12;
  const beat = 1 + Math.pow(Math.sin(t * 3.2), 4) * 0.08;
  sphere(0, -0.1, 0, 1.48 * beat, '#dc2626', false, cx, cy, scale, 0.88);
  tube([[-0.2, 1.1, 0], [0, 1.85, 0], [0.55, 1.45, -0.2]], 0.32, '#ef4444', cx, cy, scale);
  tube([[0.1, 1.0, 1.1], [0.65, 0.3, 1.2], [0.4, -0.9, 0.95]], 0.1, '#facc15', cx, cy, scale);
  if (stage > 0) sphere(0.64, 0.3, 1.22, (stage === 1 ? 0.22 : 0.38) * pulse, stColor, true, cx, cy, scale);
};

window.AtlasScenes['6'] = ({ sphere, tube, cx, cy, scale, t, stage, stColor }) => {
  tube([[0, -1.9, 0], [0, 1.9, 0]], stage === 2 ? 0.85 : 0.58, '#2563eb', cx, cy, scale, 0.45);
  tube([[-0.42, 0.3, 0], [0, stage === 0 ? 0.05 : 0.45, 0], [0.42, 0.3, 0]], 0.1, stColor, cx, cy, scale);
  for (let i = 0; i < 6; i++) {
    const y = -1.7 + (((t * 0.6 + i * 0.16) % 1) * 3.4);
    sphere((i % 2 - 0.5) * 0.22, y, 0.1, 0.11, '#ef4444', false, cx, cy, scale);
  }
};

window.AtlasScenes['7'] = ({ sphere, tube, cx, cy, scale, stage, stColor }) => {
  sphere(0, 1.15, 0, 0.95, '#e2e8f0', false, cx, cy, scale, 0.92);
  sphere(0, -1.15, 0, 0.92, '#e2e8f0', false, cx, cy, scale, 0.92);
  tube([[-0.85, 0, 0], [0, 0, 0.85], [0.85, 0, 0]], 0.18, stage === 1 ? stColor : '#0284c7', cx, cy, scale);
  tube([[-0.25, -0.5, 0], [0.25, 0.5, 0]], 0.14, stage === 2 ? stColor : '#facc15', cx, cy, scale);
};
