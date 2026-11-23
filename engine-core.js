window.AtlasRender = {
  rotX: 0.25, rotY: -0.45, isXray: false,
  project(x, y, z, cx, cy, scale) {
    const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
    const x1 = x * cosY - z * sinY, z1 = z * cosY + x * sinY;
    const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
    const y2 = y * cosX - z1 * sinX, z2 = z1 * cosX + y * sinX;
    const near = 5.5 + z2;
    if (near < 0.1) return { sx: NaN, sy: NaN, fov: 0, z2 }; // точка за камерой — отбрасываем
    const fov = 5.5 / near;
    return { sx: cx + x1 * scale * fov, sy: cy - y2 * scale * fov, fov, z2 };
  },
  sphere(ctx, x, y, z, r, color, glow, cx, cy, scale, alpha) {
    const a = alpha === undefined ? 1 : alpha;
    const p = this.project(x, y, z, cx, cy, scale);
    if (Number.isNaN(p.sx)) return;
    const rad = Math.max(2, r * scale * p.fov);
    ctx.save(); ctx.globalAlpha = this.isXray ? a * 0.35 : a;
    const g = ctx.createRadialGradient(p.sx - rad * 0.32, p.sy - rad * 0.32, rad * 0.08, p.sx, p.sy, rad);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.28, color); g.addColorStop(1, '#090d16');
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 18; }
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  },
  tube(ctx, pts, radius, color, cx, cy, scale, alpha) {
    const a = alpha === undefined ? 1 : alpha;
    ctx.save(); ctx.globalAlpha = this.isXray ? a * 0.45 : a;
    ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 0; i < pts.length - 1; i++) {
      const a1 = pts[i], a2 = pts[i + 1];
      const p1 = this.project(a1[0], a1[1], a1[2], cx, cy, scale);
      const p2 = this.project(a2[0], a2[1], a2[2], cx, cy, scale);
      if (Number.isNaN(p1.sx) || Number.isNaN(p2.sx)) continue;
      ctx.lineWidth = Math.max(2, radius * scale * ((p1.fov + p2.fov) / 2));
      ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
    }
    ctx.restore();
  },
  grid(ctx, w, h) {
    ctx.save(); ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)'; ctx.lineWidth = 1;
    for (let x = (w / 2) % 36; x < w; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = (h / 2) % 36; y < h; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
    ctx.beginPath(); ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.36, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  },
  poly(ctx, pts3d, fillDark, fillLight, stroke, cx, cy, scale, alpha) {
    const a = alpha === undefined ? 1 : alpha;
    const proj = pts3d.map((pt) => this.project(pt[0], pt[1], pt[2], cx, cy, scale))
                      .filter((p) => !Number.isNaN(p.sx));
    if (proj.length < 3) return; // почти весь полигон за камерой — не рисуем
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    proj.forEach((p) => { if (p.sx < minX) minX = p.sx; if (p.sx > maxX) maxX = p.sx; if (p.sy < minY) minY = p.sy; if (p.sy > maxY) maxY = p.sy; });
    ctx.save(); ctx.globalAlpha = this.isXray ? a * 0.3 : a;
    const g = ctx.createLinearGradient(minX, minY, maxX, maxY);
    g.addColorStop(0, fillLight); g.addColorStop(0.55, fillDark); g.addColorStop(1, '#0b172a');
    ctx.fillStyle = g; ctx.strokeStyle = stroke || 'rgba(255,255,255,0.28)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); proj.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)));
    ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  }
};
// ===== AtlasEngine: контейнер, взаимодействие, цикл отрисовки =====
window.AtlasEngine = (function () {
  // --- утилиты для построения сцен ---
  function ringPts(x, y, z, r, n, axis) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      if (axis === 'y') pts.push([x + r * Math.cos(a), y, z + r * Math.sin(a)]);
      else pts.push([x + r * Math.cos(a), y + r * Math.sin(a), z]);
    }
    return pts;
  }
  function sphere(col, glow) {
    return (x, y, z, r) => ({ z: [x, y, z], draw: (ctx, cx, cy, s) =>
      AtlasRender.sphere(ctx, x, y, z, r, col, glow, cx, cy, s, 1) });
  }
  function tube(col, radius) {
    return (pts) => ({ z: pts[Math.floor(pts.length / 2)], draw: (ctx, cx, cy, s) =>
      AtlasRender.tube(ctx, pts, radius, col, cx, cy, s, 1) });
  }
  function polyFill(dark, light) {
    return (pts) => ({ z: pts[Math.floor(pts.length / 2)], draw: (ctx, cx, cy, s) =>
      AtlasRender.poly(ctx, pts, dark, light, undefined, cx, cy, s, 1) });
  }

  // --- 12 сцен-заглушек (по модулю), stage 0 — норма, 1-2 — с патологией ---
  const SCENES = [
    // 0: поясничный отдел
    (st) => {
      const o = [];
      o.push(polyFill('#1e3a5f', '#3b82f6')(ringPts(0, 0.9, 0, 0.75, 10, 'y')));
      if (st > 0) o.push(sphere('#ef4444', true)(0, 0.45, 1.05, 0.22));
      else o.push(sphere('#38bdf8', true)(0, 0.45, 1.05, 0.2));
      o.push(tube('#f472b6', 0.06)([[0, -0.2, -0.3], [0, -0.9, -0.5], [0, -1.6, -0.55]]));
      return o;
    },
    // 1: головной мозг
    (st) => {
      const o = [];
      o.push(sphere('#818cf8', true)(-0.55, 1.35, 0, 0.7));
      o.push(sphere('#818cf8', true)(0.55, 1.35, 0, 0.7));
      o.push(sphere('#a78bfa', true)(0, -0.85, -1.05, 0.45));
      o.push(tube('#c084fc', 0.14)([[0, -0.5, -0.9], [0, -1.0, -0.5], [0, -1.5, -0.3]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0.35, 1.1, 0.3, 0.18));
      return o;
    },
    // 2: нейрон
    (st) => {
      const o = [];
      o.push(sphere('#34d399', true)(-2.6, 0.85, 0, 0.4));
      o.push(tube('#22d3ee', 0.1)([[-2.2, 0.8, 0], [-0.6, 0.4, 0], [0.9, 0.4, 0], [2.3, 0.45, 0]]));
      o.push(sphere('#f472b6', true)(2.65, 0.45, 0, 0.3));
      if (st > 0) o.push(sphere('#ef4444', true)(-0.6, 0.4, 0, 0.22));
      return o;
    },
    // 3: артерии мозга
    () => {
      const o = [];
      o.push(tube('#f87171', 0.09)(ringPts(0, 0.3, -0.3, 0.9, 14, 'y').concat(ringPts(0, 0.3, -0.3, 0.9, 14, 'y').slice(0, 1))));
      o.push(tube('#f87171', 0.08)([[0, 0.3, -0.3], [0, 0.25, 1.2]]));
      o.push(tube('#fb923c', 0.07)([[0.6, 0.3, 0], [2.1, 0.25, 0.15]]));
      o.push(tube('#fb923c', 0.07)([[-0.6, 0.3, 0], [-2.1, 0.25, 0.15]]));
      o.push(tube('#f87171', 0.08)([[0, 0.1, -0.4], [0, -0.85, -1.4]]));
      return o;
    },
    // 4: шейный позвонок C5
    (st) => {
      const o = [];
      o.push(polyFill('#1e3a5f', '#3b82f6')(ringPts(0, 0.6, 0, 0.7, 10, 'y')));
      o.push(polyFill('#1e3a5f', '#3b82f6')(ringPts(0, -0.3, 0, 0.55, 10, 'y')));
      o.push(tube('#60a5fa', 0.07)([[1.0, 0.4, -0.6], [1.2, -0.1, -0.7], [1.1, -0.7, -0.7]]));
      o.push(tube('#60a5fa', 0.07)([[-1.0, 0.4, -0.6], [-1.2, -0.1, -0.7], [-1.1, -0.7, -0.7]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0, 0.15, 0.6, 0.2));
      return o;
    },
    // 5: сердце
    (st) => {
      const o = [];
      o.push(sphere('#f87171', true)(-0.35, 0.2, 0, 0.75));
      o.push(sphere('#ef4444', true)(0.35, 0.2, 0, 0.7));
      o.push(tube('#fb923c', 0.13)([[0, 0.75, 0], [0.2, 1.5, -0.2], [-0.4, 1.95, 0], [-1.0, 1.7, 0.1]]));
      o.push(tube('#fca5a5', 0.05)([[0.4, 0.35, 0.6], [0.68, 0.35, 1.2]]));
      o.push(tube('#fca5a5', 0.05)([[-0.3, 0.3, 0.6], [-0.55, 0.3, 1.1]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0.35, 0.2, 0.5, 0.18));
      return o;
    },
    // 6: вена с клапаном
    (st) => {
      const o = [];
      o.push(tube('#60a5fa', 0.18)([[0, 1.3, 0], [0.05, 0.8, 0], [0.45, 0.15, 0], [0.4, -0.6, 0]]));
      o.push(polyFill('#1d4ed8', '#3b82f6')(ringPts(0.47, 0.12, 0, 0.2, 8, 'x')));
      if (st > 0) o.push(sphere('#ef4444', true)(0.2, 0.6, 0, 0.16));
      return o;
    },
    // 7: коленный сустав
    (st) => {
      const o = [];
      o.push(tube('#fbbf24', 0.22)([[0, 1.35, 0], [0, 0.7, 0.05]]));
      o.push(tube('#fbbf24', 0.2)([[0, -0.9, 0], [0, -0.2, 0.05]]));
      o.push(sphere('#a3e635', true)(0.85, 0.05, 0.3, 0.22));
      o.push(tube('#f472b6', 0.06)([[0.2, 0.5, 0.2], [0.05, 0.05, 0.2], [0.25, -0.5, 0.15]]));
      o.push(tube('#f472b6', 0.06)([[-0.2, 0.5, -0.2], [-0.05, 0.05, -0.2], [-0.25, -0.5, -0.15]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0.5, 0.05, 0.15, 0.15));
      return o;
    },
    // 8: глаз
    (st) => {
      const o = [];
      o.push(polyFill('#0e7490', '#22d3ee')(ringPts(0, 0, 0.3, 0.8, 16, 'y')));
      o.push(sphere('#e0f2fe', true)(0, 0, 1.05, 0.28));
      o.push(sphere('#f43f5e', true)(0, 0, -0.5, 0.5));
      o.push(tube('#fbbf24', 0.1)([[-0.3, -0.2, -0.7], [-0.45, -0.25, -1.3], [-0.45, -0.25, -1.9]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0.2, 0.1, -0.4, 0.15));
      return o;
    },
    // 9: почка
    (st) => {
      const o = [];
      o.push(polyFill('#4c1d95', '#8b5cf6')(ringPts(0.2, 0.2, 0, 0.75, 12, 'z')));
      o.push(sphere('#fde68a', true)(-0.35, 0, 0, 0.25));
      o.push(tube('#a78bfa', 0.08)([[-0.55, -0.3, 0], [-0.6, -0.9, 0], [-0.6, -1.5, 0]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0.35, -0.3, 0.2, 0.2));
      return o;
    },
    // 10: печень и желчный пузырь
    (st) => {
      const o = [];
      o.push(polyFill('#7c2d12', '#b45309')(ringPts(-0.3, 0.4, 0, 0.9, 12, 'y')));
      o.push(polyFill('#7c2d12', '#b45309')(ringPts(-0.3, -0.4, 0.2, 0.7, 12, 'y')));
      o.push(sphere('#4ade80', true)(-0.35, -0.68, 0.25, 0.24));
      o.push(tube('#facc15', 0.06)([[-0.35, -0.8, 0.25], [-0.15, -1.1, 0.1], [-0.15, -1.35, 0.1]]));
      if (st > 0) o.push(sphere('#ef4444', true)(-0.2, -0.5, 0.2, 0.16));
      return o;
    },
    // 11: желудок
    (st) => {
      const o = [];
      o.push(tube('#fda4af', 0.12)([[-0.45, 1.55, 0], [-0.2, 1.1, 0], [0, 0.8, 0]]));
      o.push(polyFill('#9a3412', '#fb7185')(ringPts(0.35, 0.15, 0, 0.8, 14, 'y')));
      o.push(tube('#fda4af', 0.09)([[-0.5, -0.2, 0], [-1.0, -0.45, 0.1], [-1.35, -0.45, 0.1]]));
      if (st > 0) o.push(sphere('#ef4444', true)(0.35, 0.3, 0.4, 0.18));
      return o;
    }
  ];

  const engine = {
    canvas: null, ctx: null, W: 0, H: 0, cx: 0, cy: 0, scale: 160,
    objects: [], paused: false, dragging: false,
    lastX: 0, lastY: 0, autoSpeed: 0.004, t: 0,

    init(containerId, onReady) {
      const host = document.getElementById(containerId);
      if (!host) { console.warn('AtlasEngine: контейнер "' + containerId + '" не найден'); return; }
      this.canvas = document.createElement('canvas');
      host.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      const resize = () => {
        const r = host.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const dpr = window.devicePixelRatio || 1;
        this.W = r.width; this.H = r.height;
        this.canvas.width = r.width * dpr; this.canvas.height = r.height * dpr;
        this.canvas.style.width = r.width + 'px'; this.canvas.style.height = r.height + 'px';
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.cx = this.W / 2; this.cy = this.H / 2;
      };
      resize();
      window.addEventListener('resize', resize);

      this.canvas.style.cursor = 'grab';
      this.canvas.addEventListener('mousedown', (e) => {
        this.dragging = true; this.lastX = e.clientX; this.lastY = e.clientY;
        this.canvas.style.cursor = 'grabbing';
      });
      window.addEventListener('mouseup', () => { this.dragging = false; this.canvas.style.cursor = 'grab'; });
      window.addEventListener('mousemove', (e) => {
        if (!this.dragging) return;
        AtlasRender.rotY += (e.clientX - this.lastX) * 0.006;
        AtlasRender.rotX = Math.max(-1.2, Math.min(1.2, AtlasRender.rotX + (e.clientY - this.lastY) * 0.006));
        this.lastX = e.clientX; this.lastY = e.clientY;
      });
      this.canvas.addEventListener('touchstart', (e) => {
        const t = e.touches[0]; this.dragging = true; this.lastX = t.clientX; this.lastY = t.clientY;
      }, { passive: true });
      this.canvas.addEventListener('touchmove', (e) => {
        if (!this.dragging) return;
        const t = e.touches[0];
        AtlasRender.rotY += (t.clientX - this.lastX) * 0.006;
        AtlasRender.rotX = Math.max(-1.2, Math.min(1.2, AtlasRender.rotX + (t.clientY - this.lastY) * 0.006));
        this.lastX = t.clientX; this.lastY = t.clientY;
      }, { passive: true });
      this.canvas.addEventListener('touchend', () => { this.dragging = false; });
      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.scale = Math.max(40, Math.min(500, this.scale * (e.deltaY < 0 ? 1.1 : 0.9)));
      }, { passive: false });

      if (onReady) onReady();
      this.loop();
    },

    loop() {
      const step = () => {
        if (!this.paused && !this.dragging) AtlasRender.rotY += this.autoSpeed;
        this.draw();
        if (typeof window._onEngineFrame === 'function') window._onEngineFrame();
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);
      AtlasRender.grid(ctx, this.W, this.H);
      const items = this.objects
        .map((o) => ({ o, p: AtlasRender.project(o.z[0], o.z[1], o.z[2], this.cx, this.cy, this.scale) }))
        .filter((i) => !Number.isNaN(i.p.sx))
        .sort((a, b) => a.p.z2 - b.p.z2); // дальние раньше, ближние поверх
      items.forEach((i) => i.o.draw(ctx, this.cx, this.cy, this.scale, this.t));
      this.t += 0.016;
    },

    buildScene(mod, stage) {
      this.objects = SCENES[mod] ? SCENES[mod](stage) : [];
    },

    setView(v) {
      const views = { front: { rx: 0.25, ry: 0 }, side: { rx: 0.25, ry: Math.PI / 2 }, top: { rx: 1.35, ry: 0 } };
      const t = views[v] || views.front;
      AtlasRender.rotX = t.rx; AtlasRender.rotY = t.ry;
    },

    toggleXray() { AtlasRender.isXray = !AtlasRender.isXray; return AtlasRender.isXray; },
    togglePause() { this.paused = !this.paused; return this.paused; },
    getView() { return { cx: this.cx, cy: this.cy, scale: this.scale }; }
  };
  return engine;
})();


