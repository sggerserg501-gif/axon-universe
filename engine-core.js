window.AtlasRender = {
  rotX: 0.25, rotY: -0.45, isXray: false,
  project(x, y, z, cx, cy, scale) {
    const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
    const x1 = x * cosY - z * sinY, z1 = z * cosY + x * sinY;
    const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
    const y2 = y * cosX - z1 * sinX, z2 = z1 * cosX + y * sinX;
    const fov = 5.5 / (5.5 + z2);
    return { sx: cx + x1 * scale * fov, sy: cy - y2 * scale * fov, fov };
  },
  sphere(ctx, x, y, z, r, color, glow, cx, cy, scale, alpha) {
    const a = alpha === undefined ? 1 : alpha;
    const p = this.project(x, y, z, cx, cy, scale);
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
      const a1 = pts.at(i), a2 = pts.at(i + 1);
      const p1 = this.project(a1.at(0), a1.at(1), a1.at(2), cx, cy, scale);
      const p2 = this.project(a2.at(0), a2.at(1), a2.at(2), cx, cy, scale);
      ctx.lineWidth = Math.max(2, radius * scale * ((p1.fov + p2.fov) / 2));
      ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
    }
    ctx.restore();
  }
};
