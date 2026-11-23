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
