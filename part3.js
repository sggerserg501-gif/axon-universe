window.AtlasScenes = window.AtlasScenes || {};

window.AtlasScenes['1'] = ({ ctx, R, cx, cy, scale, t, stage, stColor }) => {
  const pulse = 1 + Math.sin(t * 4) * 0.1;
  const P = (x, y, z) => R.project(x, y, z, cx, cy, scale);
  const layers = [];

  function drawSmoothShape(pts3D, fillTop, fillBot, strokeCol, lw) {
    const proj = pts3D.map((pt) => P(...pt));
    const avgZ = proj.reduce((s, p) => s + (p.z || 0), 0) / proj.length;
    layers.push({
      z: avgZ,
      draw() {
        ctx.save();
        ctx.beginPath();
        const n = proj.length;
        for (let i = 0; i < n; i++) {
          const p0 = proj[i];
          const p1 = proj[(i + 1) % n];
          const mx = (p0.sx + p1.sx) / 2;
          const my = (p0.sy + p1.sy) / 2;
          if (i === 0) ctx.moveTo(mx, my);
          ctx.quadraticCurveTo(p1.sx, p1.sy, (p1.sx + proj[(i + 2) % n].sx) / 2, (p1.sy + proj[(i + 2) % n].sy) / 2);
        }
        ctx.closePath();

        let minY = Infinity, maxY = -Infinity;
        proj.forEach((p) => {
          if (p.sy < minY) minY = p.sy;
          if (p.sy > maxY) maxY = p.sy;
        });
        const grad = ctx.createLinearGradient(0, minY, 0, maxY);
        grad.addColorStop(0, fillTop);
        grad.addColorStop(1, fillBot);
        ctx.fillStyle = grad;
        ctx.fill();

        if (strokeCol) {
          ctx.strokeStyle = strokeCol;
          ctx.lineWidth = lw || 1.4;
          ctx.stroke();
        }
        ctx.restore();
      }
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
    // Два объёмных полушария мозга (левое и правое)
  [-0.38, 0.38].forEach((hz) => {
    const side = hz > 0 ? 1 : -1;
    [0.55, 1.0].forEach((k) => {
      const z = hz * k;
      drawSmoothShape([
        [-1.38, 0.05, z * 0.82],
        [-1.32, 0.78, z * 0.9],
        [-0.68, 1.34, z * 0.95],
        [0.18, 1.42, z * 0.95],
        [0.98, 1.08, z * 0.88],
        [1.46, 0.42, z * 0.8],
        [1.36, -0.18, z * 0.85],
        [0.65, -0.36, z * 1.05],
        [-0.18, -0.34, z * 1.02],
        [-0.88, -0.34, z * 0.9]
      ], '#e8c1c5', '#b58087', '#7d4f56', k === 1 ? 1.5 : 0.6);
    });

    const sz = side * 0.46;
    drawSulcus([[0.08, 1.32, sz * 0.82], [-0.04, 0.78, sz * 1.02], [-0.14, 0.22, sz * 1.05]], 0.036, '#7a4b52', '#f3d5d8');
    drawSulcus([[0.86, 0.14, sz * 0.95], [0.22, 0.06, sz * 1.08], [-0.52, 0.24, sz * 1.0]], 0.042, '#693c43', '#f3d5d8');
    drawSulcus([[1.08, 0.64, sz * 0.85], [0.58, 0.96, sz * 0.96], [0.16, 0.88, sz * 1.0]], 0.03, '#85535a', '#efd0d3');
    drawSulcus([[1.22, 0.34, sz * 0.86], [0.68, 0.52, sz * 0.98], [0.22, 0.44, sz * 1.02]], 0.028, '#85535a', '#efd0d3');
    drawSulcus([[-0.22, 1.08, sz * 0.92], [-0.72, 0.92, sz * 0.92], [-1.12, 0.56, sz * 0.86]], 0.03, '#85535a', '#efd0d3');
    drawSulcus([[-0.26, 0.62, sz * 0.98], [-0.78, 0.48, sz * 0.95], [-1.18, 0.18, sz * 0.86]], 0.028, '#85535a', '#efd0d3');
    drawSulcus([[0.82, -0.14, sz * 0.98], [0.24, -0.2, sz * 1.06], [-0.46, -0.12, sz * 0.98]], 0.03, '#7a4b52', '#efd0d3');
  });

  // Очаг ишемии / кровоизлияния при патологии (stage 1 и 2)
  if (stage > 0) {
    const lp = P(0.42, 0.42, 0.38);
    layers.push({
      z: (lp.z || 0) + 0.25,
      draw() {
        ctx.save();
        const rad = Math.max(6, (stage === 1 ? 0.36 : 0.6) * pulse * scale);
        const g = ctx.createRadialGradient(lp.sx, lp.sy, rad * 0.1, lp.sx, lp.sy, rad);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(0.35, stColor);
        g.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(lp.sx, lp.sy, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });
  }

  layers.sort((a, b) => a.z - b.z);
  layers.forEach((l) => l.draw());
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
