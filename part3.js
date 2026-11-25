window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['1'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.1;
  const items = [];
  const P = (x, y, z) => R.project(x, y, z, cx, cy, scale);

  function add(z, fn) {
    items.push({ z, fn });
  }

  function dome(x0, y0, z0, rx, ry, rz, colBase, colHi, alpha) {
    const segs = 14;
    for (let i = 0; i < segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const px = x0 + Math.cos(a) * rx * 0.52;
      const py = y0 + Math.sin(a) * ry * 0.52;
      const pz = z0 + Math.sin(a * 2) * rz * 0.35;
      const p = P(px, py, pz);
      add(p.z || 0, () => {
        ctx.save();
        ctx.globalAlpha = alpha == null ? 0.94 : alpha;
        const rad = Math.max(2, ((rx + ry) * 0.28) * scale);
        const g = ctx.createRadialGradient(p.sx - rad * 0.25, p.sy - rad * 0.25, rad * 0.1, p.sx, p.sy, rad);
        g.addColorStop(0, colHi);
        g.addColorStop(1, colBase);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  }

  function sulcus(pts, r, col, alpha) {
    const proj = pts.map((pt) => P(pt[0], pt[1], pt[2]));
    const avgZ = proj.reduce((s, p) => s + (p.z || 0), 0) / proj.length;
    add(avgZ, () => {
      ctx.save();
      ctx.globalAlpha = alpha == null ? 0.72 : alpha;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(1.2, r * 2 * scale);
      ctx.beginPath();
      proj.forEach((p, i) => (i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy)));
      ctx.stroke();
      ctx.restore();
    });
  }

   function drawSulcus(pts3D, width, darkCol, lightCol, zBias) {
    const proj = pts3D.map((pt) => P(...pt));
    const avgZ = proj.reduce((s, p) => s + (p.z || 0), 0) / proj.length + (zBias || 0.02);
    layers.push({
      z: avgZ,
      draw() {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const trace = (dy) => {
          ctx.beginPath();
          proj.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.sx, p.sy + dy);
            else if (i < proj.length - 1) {
              const nx = (p.sx + proj[i + 1].sx) / 2;
              const ny = (p.sy + proj[i + 1].sy) / 2 + dy;
              ctx.quadraticCurveTo(p.sx, p.sy + dy, nx, ny);
            } else {
              ctx.lineTo(p.sx, p.sy + dy);
            }
          });
        };
        if (lightCol) {
          trace(1.5);
          ctx.strokeStyle = lightCol;
          ctx.lineWidth = Math.max(1.2, width * scale * 1.15);
          ctx.stroke();
        }
        trace(0);
        ctx.strokeStyle = darkCol;
        ctx.lineWidth = Math.max(1.1, width * scale);
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  // Ствол мозга (мост и продолговатый мозг)
  drawSmoothShape([
    [-0.22, -0.25, 0],
    [0.14, -0.32, 0],
    [0.16, -0.78, 0.04],
    [0.04, -1.58, 0],
    [-0.24, -1.58, 0],
    [-0.32, -0.75, -0.02]
  ], '#d6b4b8', '#a37b80', '#7a5459', 1.3);

  // Мозжечок (правая и левая доли с поперечными бороздками)
  [-0.28, 0.28].forEach((cz) => {
    drawSmoothShape([
      [-1.18, -0.35, cz],
      [-0.45, -0.32, cz * 1.1],
      [-0.38, -0.88, cz],
      [-0.85, -1.05, cz * 0.9],
      [-1.26, -0.72, cz * 0.85]
    ], '#c49399', '#8f5f66', '#6b4248', 1.2);

    [-0.48, -0.62, -0.76, -0.88].forEach((fy) => {
      drawSulcus([
        [-1.16, fy, cz * 1.18],
        [-0.82, fy - 0.04, cz * 1.32],
        [-0.46, fy + 0.02, cz * 1.18]
      ], 0.022, '#6b4248', '#dfb5ba', 0.03);
    });
  });


  // Ствол мозга (мост и продолговатый мозг)
  sulcus([[-0.18, -0.32, 0], [-0.22, -0.82, 0], [-0.26, -1.58, 0]], 0.24, '#94a3b8', 0.95);
  sulcus([[-0.16, -0.52, 0.08], [-0.18, -0.78, 0.1]], 0.28, '#cbd5e1', 0.96);

  // Очаг ишемии / опухоли / кровоизлияния внутри полушария
  if (stage > 0) {
    const p = P(0.45, 0.38, 0.42);
    add((p.z || 0) + 0.15, () => {
      ctx.save();
      const rad = Math.max(4, (stage === 1 ? 0.36 : 0.62) * pulse * scale);
      const g = ctx.createRadialGradient(p.sx, p.sy, rad * 0.1, p.sx, p.sy, rad);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.35, stColor);
      g.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  items.sort((a, b) => a.z - b.z);
  items.forEach((it) => it.fn());
};

window.AtlasScenes['2'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  // Тело нейрона (сома), ядро и ветвящиеся дендриты
  [-2.8, -2.5, -2.1, -2.7, -2.3].forEach((dx, i) => {
    const ang = (i / 5) * Math.PI * 2 + 0.4;
    R.tube(ctx, [[-2.2, 0, 0], [-2.2 + Math.cos(ang) * 0.85, Math.sin(ang) * 0.95, (i % 2 - 0.5) * 0.5], [-2.2 + Math.cos(ang + 0.3) * 1.45, Math.sin(ang - 0.2) * 1.45, (i % 2 - 0.5) * 0.9]], 0.06, '#fde047', cx, cy, scale);
  });
  R.sphere(ctx, -2.2, 0, 0, 0.68, '#eab308', true, cx, cy, scale, 0.92);
  R.sphere(ctx, -2.2, 0, 0.15, 0.28, '#fef08a', false, cx, cy, scale);
  // Аксон и миелиновые муфты с перехватами Ранвье
  R.tube(ctx, [[-2.2, 0, 0], [2.45, 0, 0]], 0.09, '#facc15', cx, cy, scale);
  [-1.05, -0.1, 0.85, 1.8].forEach((x, idx) => {
    const dmg = (stage === 1 && idx === 2) || (stage === 2 && idx >= 2);
    R.tube(ctx, [[x - 0.34, 0, 0], [x + 0.34, 0, 0]], 0.32, dmg ? stColor : '#0284c7', cx, cy, scale, 0.9);
  });
  R.sphere(ctx, 2.55, 0, 0, 0.34, stage === 2 ? stColor : '#facc15', stage === 2, cx, cy, scale);
  R.sphere(ctx, -1.95 + ((t * 0.85) % 1) * (stage === 2 ? 2.4 : 4.4), 0, 0.18, 0.18, '#38bdf8', true, cx, cy, scale);
};
