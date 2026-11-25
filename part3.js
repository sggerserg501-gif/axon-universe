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

  // Объёмные полушария мозга (левое и правое, с лобной, теменной, височной и затылочной долями)
  [-0.46, 0.46].forEach((hz) => {
    dome(0.05, 0.42, hz, 1.48, 1.02, 0.44, '#94a3b8', '#e2e8f0', 0.95);
    dome(0.18, -0.08, hz * 1.08, 0.95, 0.48, 0.36, '#78889c', '#cbd5e1', 0.94);

    // Борозды коры (центральная, сильвиева и извилины)
    const side = hz > 0 ? 1 : -1;
    sulcus([[0.05, 1.28, hz * 0.7], [-0.08, 0.65, hz * 1.38], [-0.15, 0.12, hz * 1.42]], 0.045, '#475569');
    sulcus([[0.82, 0.15, hz * 1.25], [0.15, 0.08, hz * 1.45], [-0.58, 0.28, hz * 1.32]], 0.05, '#334155');
    sulcus([[1.05, 0.58, hz * 0.95], [0.45, 0.98, hz * 1.22], [-0.35, 1.05, hz * 1.18], [-1.02, 0.65, hz * 0.92]], 0.038, '#64748b');
    sulcus([[0.85, -0.22, hz * 1.18], [0.15, -0.28, hz * 1.32], [-0.55, -0.18, hz * 1.15]], 0.036, '#64748b');
    sulcus([[0.55, 0.55, side * 0.86], [0.1, 0.72, side * 0.88], [-0.45, 0.58, side * 0.84]], 0.032, '#475569');
  });

  // Объёмный мозжечок с поперечными листками (folia)
  [-0.36, 0.36].forEach((cz) => {
    dome(-0.88, -0.64, cz, 0.58, 0.42, 0.34, '#64748b', '#94a3b8', 0.96);
    [-0.52, -0.64, -0.76].forEach((fy) => {
      sulcus([[-1.28, fy, cz * 0.85], [-0.88, fy - 0.04, cz * 1.35], [-0.48, fy, cz * 0.95]], 0.024, '#334155', 0.8);
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
