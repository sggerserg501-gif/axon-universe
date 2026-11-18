Object.assign(window.AtlasParts, {
  1: function (st, lang) {
    const pts = [];
    const tubes = [];
    const polys = [];
    const labels = [];
    const t = Date.now() * 0.003;
    const pulse = Math.sin(t * 2.5) * 0.5 + 0.5;

    const isTransparent = isXray || st > 0;
    const scale = 1.35;

    function getCortexPoint(side, u, v, lift) {
      const sinV = Math.sin(v * Math.PI * 0.5);
      const cosV = Math.cos(v * Math.PI * 0.5);

      let x = side * (2.5 + sinV * 46) * scale;
      let y = (-Math.sin(u) * cosV * 50 - 6) * scale;
      let z = Math.cos(u) * cosV * 72 * scale;

      if (z < 0) {
        const frontRatio = 1 + z / (72 * scale);
        x *= 0.76 + 0.24 * frontRatio;
        y *= 0.84 + 0.16 * frontRatio;
      }

      if (y > 8 * scale) {
        if (z > 4 * scale) {
          y -= (z - 4 * scale) * 0.35;
        } else {
          y *= 0.72;
        }
      }

      if (y > -4 * scale && y < 22 * scale && z > -26 * scale && z < 24 * scale && sinV > 0.62) {
        x += side * 5.5 * scale * sinV;
        y += 6 * scale;
      }

      const rBoost = 1 + (lift || 0);
      return { x: x * rBoost, y: y * rBoost, z: z * rBoost };
    }

    function buildBaseHemisphere(side) {
      const uSteps = 24;
      const vSteps = 10;
      const grid = [];

      for (let iu = 0; iu <= uSteps; iu++) {
        const u = (iu / uSteps) * Math.PI * 2;
        const row = [];
        for (let iv = 0; iv <= vSteps; iv++) {
          const v = 0.04 + (iv / vSteps) * 0.94;
          row.push(getCortexPoint(side, u, v, -0.03));
        }
        grid.push(row);
      }

      const baseCol = isTransparent ? "rgba(71, 85, 105, 0.12)" : "#475569";
      const baseStroke = isTransparent ? "rgba(56, 189, 248, 0.15)" : "#475569";

      for (let iu = 0; iu < uSteps; iu++) {
        for (let iv = 0; iv < vSteps; iv++) {
          polys.push({
            pts: [
              grid.at(iu).at(iv),
              grid.at(iu + 1).at(iv),
              grid.at(iu + 1).at(iv + 1),
              grid.at(iu).at(iv + 1)
            ],
            c: baseCol,
            stroke: baseStroke,
            isBone: true
          });
        }
      }
    }

    buildBaseHemisphere(-1);
    buildBaseHemisphere(1);

    const gyrusCol = isTransparent ? "rgba(203, 213, 225, 0.18)" : "#cbd5e1";
    const gyrusHighlightCol = isTransparent ? "rgba(226, 232, 240, 0.22)" : "#e2e8f0";

    function addGyrusCurve(side, uStart, uEnd, vBase, waveAmp, waveFreq, radius, col) {
      const steps = 14;
      let prev = null;
      for (let i = 0; i <= steps; i++) {
        const ratio = i / steps;
        const u = uStart + (uEnd - uStart) * ratio;
        const v = Math.max(0.08, Math.min(0.95, vBase + Math.sin(ratio * Math.PI * waveFreq) * waveAmp));
        const p = getCortexPoint(side, u, v, 0.015);
        if (prev) {
          tubes.push({
            x1: prev.x, y1: prev.y, z1: prev.z,
            x2: p.x, y2: p.y, z2: p.z,
            r: radius * scale,
            c: col,
            isBone: true
          });
        }
        prev = p;
      }
    }

    const sides = [-1, 1];
    for (let s = 0; s < sides.length; s++) {
      const side = sides.at(s);

      addGyrusCurve(side, Math.PI * 0.08, Math.PI * 0.92, 0.16, 0.06, 4.5, 5.2, gyrusHighlightCol);
      addGyrusCurve(side, Math.PI * 0.12, Math.PI * 0.88, 0.36, 0.08, 5.0, 5.4, gyrusCol);
      addGyrusCurve(side, Math.PI * 0.52, Math.PI * 0.96, 0.62, 0.07, 3.5, 5.0, gyrusHighlightCol);

      addGyrusCurve(side, Math.PI * 0.44, Math.PI * 0.56, 0.14, 0.04, 3.0, 5.3, gyrusHighlightCol);
      addGyrusCurve(side, Math.PI * 0.32, Math.PI * 0.43, 0.14, 0.04, 3.0, 5.1, gyrusCol);

      addGyrusCurve(side, Math.PI * 1.15, Math.PI * 1.78, 0.78, 0.06, 4.0, 5.2, gyrusHighlightCol);
      addGyrusCurve(side, Math.PI * 1.22, Math.PI * 1.72, 0.58, 0.06, 3.5, 4.8, gyrusCol);

      addGyrusCurve(side, Math.PI * 0.02, Math.PI * 0.26, 0.52, 0.08, 3.0, 4.8, gyrusCol);
    }

    const cerebBaseCol = isTransparent ? "rgba(148, 163, 184, 0.18)" : "#94a3b8";
    const cerebFoliaCol = isTransparent ? "rgba(226, 232, 240, 0.25)" : "#cbd5e1";

    for (let s = 0; s < sides.length; s++) {
      const side = sides.at(s);
      for (let row = 0; row < 5; row++) {
        const yOff = (22 + row * 6.5) * scale;
        const rWidth = (22 - Math.abs(row - 2) * 3.5) * scale;
        const zCenter = (34 - Math.abs(row - 2) * 2) * scale;

        tubes.push({
          x1: side * 4 * scale, y1: yOff, z1: zCenter + rWidth * 0.65,
          x2: side * (6 + rWidth * 0.85), y2: yOff + 1 * scale, z2: zCenter,
          r: 3.6 * scale,
          c: row % 2 === 0 ? cerebFoliaCol : cerebBaseCol,
          isBone: true
        });
        tubes.push({
          x1: side * (6 + rWidth * 0.85), y1: yOff + 1 * scale, z1: zCenter,
          x2: side * 5 * scale, y2: yOff + 2 * scale, z2: zCenter - rWidth * 0.55,
          r: 3.4 * scale,
          c: row % 2 === 0 ? cerebFoliaCol : cerebBaseCol,
          isBone: true
        });
      }
    }

    const ponsCol = isTransparent ? "rgba(226, 232, 240, 0.35)" : "#e2e8f0";
    const medullaCol = isTransparent ? "rgba(203, 213, 225, 0.35)" : "#cbd5e1";
    tubes.push({ x1: 0, y1: 12 * scale, z1: 2 * scale, x2: 0, y2: 34 * scale, z2: 8 * scale, r: 14.5 * scale, c: ponsCol, isBone: true });
    tubes.push({ x1: 0, y1: 34 * scale, z1: 8 * scale, x2: 0, y2: 76 * scale, z2: 18 * scale, r: 8.5 * scale, c: medullaCol, isBone: true });

    const artCol = st === 1 ? "#f59e0b" : "#ef4444";
    tubes.push({ x1: 0, y1: 60 * scale, z1: 6 * scale, x2: 0, y2: 10 * scale, z2: -4 * scale, r: 2.8 * scale, c: "#ef4444", isBone: false });
    tubes.push({ x1: 0, y1: 10 * scale, z1: -4 * scale, x2: -36 * scale, y2: -12 * scale, z2: -10 * scale, r: 2.4 * scale, c: "#ef4444", isBone: false });
    tubes.push({ x1: 0, y1: 10 * scale, z1: -4 * scale, x2: 36 * scale, y2: -12 * scale, z2: -10 * scale, r: (st === 1 ? 1.5 : 2.4) * scale, c: artCol, isBone: false });
    tubes.push({ x1: 0, y1: 10 * scale, z1: -4 * scale, x2: 0, y2: -30 * scale, z2: -38 * scale, r: 2.2 * scale, c: "#ef4444", isBone: false });

    if (st === 0) {
      labels.push({ x: -34 * scale, y: -44 * scale, z: -15 * scale, t: lang === "ru" ? "Извилины и доли мозга" : "Cerebral Gyri & Lobes", ox: -85, oy: -18 });
      labels.push({ x: 22 * scale, y: 34 * scale, z: 32 * scale, t: lang === "ru" ? "Мозжечок и ствол" : "Cerebellum & Brainstem", ox: 26, oy: 14 });
    } else if (st === 1) {
      pts.push({ x: 34 * scale, y: -14 * scale, z: -8 * scale, r: (15 + pulse * 3.5) * scale, c: "#f59e0b", isBone: false });
      pts.push({ x: 34 * scale, y: -14 * scale, z: -8 * scale, r: (25 + pulse * 5) * scale, c: "rgba(245, 158, 11, 0.28)", isBone: false });
      labels.push({ x: 34 * scale, y: -14 * scale, z: -8 * scale, t: lang === "ru" ? "Зона ангиоспазма СМА" : "MCA Focal Angiospasm", ox: 26, oy: -20 });
    } else {
      pts.push({ x: 32 * scale, y: -14 * scale, z: -6 * scale, r: (20 + pulse * 4) * scale, c: "#ef4444", isBone: false });
      pts.push({ x: 32 * scale, y: -14 * scale, z: -6 * scale, r: (31 + pulse * 6) * scale, c: "rgba(239, 68, 68, 0.32)", isBone: false });
      labels.push({ x: 32 * scale, y: -14 * scale, z: -6 * scale, t: lang === "ru" ? "Объёмный очаг (масс-эффект)" : "Intracerebral Mass Effect", ox: 28, oy: -22 });
    }

    return { pts, tubes, polys, labels };
  },

  2: function (st, lang) {
    const pts = [];
    const tubes = [];
    const polys = [];
    const labels = [];
    const t = Date.now() * 0.004;
    const imp = ((t * 45) % 160) - 80;

    pts.push({ x: -95, y: 0, z: 0, r: 30, c: "#38bdf8", isBone: false });
    pts.push({ x: -95, y: 0, z: 0, r: 12, c: "#e0f2fe", isBone: false });

    const dens = [
      { x: -138, y: -36, z: 14 },
      { x: -144, y: 8, z: -18 },
      { x: -132, y: 42, z: 12 },
      { x: -115, y: -48, z: -14 }
    ];
    for (let i = 0; i < dens.length; i++) {
      tubes.push({ x1: -95, y1: 0, z1: 0, x2: dens.at(i).x, y2: dens.at(i).y, z2: dens.at(i).z, r: 2.5, c: "#7dd3fc", isBone: false });
    }

    const axCol = st === 2 ? "#ef4444" : "#38bdf8";
    tubes.push({ x1: -65, y1: 0, z1: 0, x2: 88, y2: 0, z2: 0, r: 3, c: axCol, isBone: false });

    const segs = [-42, -10, 22, 54];
    for (let j = 0; j < segs.length; j++) {
      const isDamaged = (st === 1 && j === 2) || (st === 2 && j >= 2);
      const mCol = isDamaged ? (st === 1 ? "#f59e0b" : "#ef4444") : "#0284c7";
      const sx = segs.at(j);
      tubes.push({ x1: sx, y1: 0, z1: 0, x2: sx + 22, y2: 0, z2: 0, r: isDamaged ? 5 : 8, c: mCol, isBone: false });
    }

    tubes.push({ x1: 88, y1: 0, z1: 0, x2: 106, y2: -16, z2: 8, r: 2.5, c: axCol, isBone: false });
    tubes.push({ x1: 88, y1: 0, z1: 0, x2: 106, y2: 16, z2: -8, r: 2.5, c: axCol, isBone: false });
    pts.push({ x: 106, y: -16, z: 8, r: 8, c: axCol, isBone: false });
    pts.push({ x: 106, y: 16, z: -8, r: 8, c: axCol, isBone: false });

    if (st < 2) {
      const ix = (st === 1 && imp > 22) ? 22 : imp;
      pts.push({ x: ix, y: 0, z: 0, r: 6.5, c: "#fde047", isBone: false });
    }

    labels.push({ x: -95, y: -32, z: 0, t: lang === "ru" ? "Сома и дендриты" : "Soma & Dendrites", ox: -40, oy: -18 });
    if (st === 0) {
      labels.push({ x: 10, y: -10, z: 0, t: lang === "ru" ? "Миелин (Норма)" : "Healthy Myelin", ox: 0, oy: -24 });
    } else if (st === 1) {
      labels.push({ x: 32, y: -10, z: 0, t: lang === "ru" ? "Демиелинизация" : "Demyelination", ox: 10, oy: -26 });
    } else {
      labels.push({ x: 64, y: -10, z: 0, t: lang === "ru" ? "Блокада аксона" : "Axonal Block", ox: 14, oy: -28 });
    }

    return { pts, tubes, polys, labels };
  }
});
