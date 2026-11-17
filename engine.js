const LABELS_3D = {
  ru: {
    cord: "Спинной мозг", disc: "Межпозвонковый диск", vert: "Тело позвонка", comp: "Компрессия корешка", prot: "Протрузия",
    hemi: "Полушария мозга", cereb: "Мозжечок", stem: "Ствол мозга", lesion: "Объемный очаг", spasm: "Зона ангиоспазма",
    soma: "Тело нейрона (Сома)", dend: "Дендриты", axon: "Аксон и миелин", syn: "Синапс",
    aneur: "Аневризма (Риск разрыва)", basilar: "Базилярная артерия", willis: "Виллизиев круг", mca: "Средняя мозговая артерия",
    vaspasm: "Спазм позвоночной артерии", chern: "Шейная грыжа (Миелопатия)", ccord: "Шейный отдел спинного мозга", va: "Позвоночная артерия", c4: "Позвонок C4",
    aorta: "Дуга аорты", svc: "Верхняя полая вена", isch: "Закупорка / Ишемия", cspasm: "Спазм коронара", cor: "Коронарная артерия",
    vwall: "Стенка вены голени", vnorm: "Венозный клапан (Норма)", vinsuff: "Недостаточность клапана", vnodes: "Варикозные узлы / Застой", vflow: "Венозный отток вверх"
  },
  en: {
    cord: "Spinal Cord", disc: "Intervertebral Disc", vert: "Vertebral Body", comp: "Root Compression", prot: "Protrusion",
    hemi: "Cerebral Hemispheres", cereb: "Cerebellum", stem: "Brainstem", lesion: "Focal Lesion", spasm: "Angiospasm Zone",
    soma: "Neuron Soma", dend: "Dendrites", axon: "Axon & Myelin", syn: "Synapse",
    aneur: "Aneurysm Dome", basilar: "Basilar Artery", willis: "Circle of Willis", mca: "Middle Cerebral Artery",
    vaspasm: "Vertebral Artery Spasm", chern: "Cervical Herniation", ccord: "Cervical Spinal Cord", va: "Vertebral Artery", c4: "Vertebra C4",
    aorta: "Aortic Arch", svc: "Superior Vena Cava", isch: "Occlusion / Ischemia", cspasm: "Coronary Spasm", cor: "Coronary Artery",
    vwall: "Leg Vein Wall", vnorm: "Venous Valve (Normal)", vinsuff: "Valve Insufficiency", vnodes: "Varicose Nodes / Stasis", vflow: "Upward Venous Flow"
  },
  es: {
    cord: "Médula espinal", disc: "Disco intervertebral", vert: "Cuerpo vertebral", comp: "Compresión radicular", prot: "Protusión",
    hemi: "Hemisferios cerebrales", cereb: "Cerebelo", stem: "Tronco encefálico", lesion: "Lesión focal", spasm: "Zona de angioespasmo",
    soma: "Soma neuronal", dend: "Dendritas", axon: "Axón y mielina", syn: "Sinapsis",
    aneur: "Aneurisma (Riesgo)", basilar: "Arteria basilar", willis: "Polígono de Willis", mca: "Arteria cerebral media",
    vaspasm: "Espasmo arteria vertebral", chern: "Hernia cervical", ccord: "Médula cervical", va: "Arteria vertebral", c4: "Vértebra C4",
    aorta: "Arco aórtico", svc: "Vena cava superior", isch: "Oclusión / Isquemia", cspasm: "Espasmo coronario", cor: "Arteria coronaria",
    vwall: "Pared venosa", vnorm: "Válvula venosa (Normal)", vinsuff: "Insuficiencia valvular", vnodes: "Nódulos varicosos", vflow: "Flujo venoso ascendente"
  },
  de: {
    cord: "Rückenmark", disc: "Bandscheibe", vert: "Wirbelkörper", comp: "Wurzelkompression", prot: "Protrusion",
    hemi: "Großhirnhemisphären", cereb: "Kleinhirn", stem: "Hirnstamm", lesion: "Raumforderung", spasm: "Angiospasmus-Zone",
    soma: "Neuronensoma", dend: "Dendriten", axon: "Axon & Myelin", syn: "Synapse",
    aneur: "Aneurysma-Kuppel", basilar: "Arteria basilaris", willis: "Circulus Willisii", mca: "Arteria cerebri media",
    vaspasm: "Vertebralarterien-Spasmus", chern: "Zervikaler Vorfall", ccord: "Halsrückenmark", va: "Arteria vertebralis", c4: "Halswirbel C4",
    aorta: "Aortenbogen", svc: "Obere Hohlvene", isch: "Verschluss / Ischämie", cspasm: "Koronarspasmus", cor: "Koronararterie",
    vwall: "Beinvenenwand", vnorm: "Venenklappe (Normal)", vinsuff: "Klappeninsuffizienz", vnodes: "Variköse Knoten / Stau", vflow: "Venöser Rückfluss"
  },
  zh: {
    cord: "脊髓", disc: "椎间盘", vert: "椎体", comp: "神经根受压", prot: "椎间盘膨出",
    hemi: "大脑半球", cereb: "小脑", stem: "脑干", lesion: "局灶性占位", spasm: "血管痉挛区",
    soma: "神经元胞体", dend: "树突", axon: "轴突与髓鞘", syn: "突触",
    aneur: "动脉瘤瘤顶", basilar: "基底动脉", willis: "Willis 动脉环", mca: "大脑中动脉",
    vaspasm: "椎动脉痉挛", chern: "颈椎间盘突出", ccord: "颈段脊髓", va: "椎动脉", c4: "第4颈椎 (C4)",
    aorta: "主动脉弓", svc: "上腔静脉", isch: "闭塞 / 心肌缺血", cspasm: "冠脉痉挛", cor: "冠状动脉",
    vwall: "下肢静脉壁", vnorm: "静脉瓣膜（正常）", vinsuff: "瓣膜功能不全", vnodes: "静脉曲张结节", vflow: "静脉向心回流"
  }
};

let rotX = 0.25, rotY = -0.35, zoom = 4.3, isDragging = false, lastX = 0, lastY = 0;
const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  if (canvas.width !== rect.width || canvas.height !== rect.height) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
}
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", e => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener("mouseup", () => { isDragging = false; });
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  rotY += (e.clientX - lastX) * 0.008;
  rotX = Math.max(-1.25, Math.min(1.25, rotX + (e.clientY - lastY) * 0.008));
  lastX = e.clientX; lastY = e.clientY;
});

canvas.addEventListener("wheel", e => {
  e.preventDefault();
  zoom = Math.min(6.5, Math.max(1.5, zoom - e.deltaY * 0.002));
}, { passive: false });

canvas.addEventListener("touchstart", e => {
  if (e.touches.length === 1) {
    isDragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  }
}, { passive: true });
window.addEventListener("touchend", () => { isDragging = false; });
canvas.addEventListener("touchmove", e => {
  if (!isDragging || e.touches.length !== 1) return;
  rotY += (e.touches[0].clientX - lastX) * 0.008;
  rotX = Math.max(-1.25, Math.min(1.25, rotX + (e.touches[0].clientY - lastY) * 0.008));
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
}, { passive: true });

function changeZoom(delta) {
  zoom = Math.min(6.5, Math.max(1.5, zoom + delta));
}

function project3D(x, y, z) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const baseFov = Math.min(canvas.width, canvas.height) * 0.95;

  let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
  let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
  let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);
  let scale = (baseFov * zoom) / (baseFov + z2 + 320);

  return { x: cx + x1 * scale, y: cy + y2 * scale, z: z2, sc: scale };
}
function buildScene(mod, st, lang) {
  const L = LABELS_3D[lang] || LABELS_3D.en;
  let pts = [], labels = [], tubes = [], polys = [];

  function addCylinder(cy, rX, rZ, h, col, strokeCol) {
    let segs = 20, yTop = cy - h / 2, yBot = cy + h / 2;
    let topPts = [], botPts = [];
    for (let i = 0; i < segs; i++) {
      let a1 = (i / segs) * 6.283, a2 = ((i + 1) / segs) * 6.283;
      let x1 = Math.cos(a1) * rX, z1 = Math.sin(a1) * rZ;
      let x2 = Math.cos(a2) * rX, z2 = Math.sin(a2) * rZ;
      polys.push({ pts: [{ x: x1, y: yTop, z: z1 }, { x: x2, y: yTop, z: z2 }, { x: x2, y: yBot, z: z2 }, { x: x1, y: yBot, z: z1 }], c: col, stroke: strokeCol });
      topPts.push({ x: x1, y: yTop, z: z1 });
      botPts.push({ x: x1, y: yBot, z: z1 });
    }
    polys.push({ pts: topPts, c: col, stroke: strokeCol });
    polys.push({ pts: botPts, c: col, stroke: strokeCol });
  }

  if (mod === 0) {
    [-82, 82].forEach(y => {
      addCylinder(y, 72, 62, 46, "#cbd5e1", "#94a3b8");
      tubes.push({ x1: 0, y1: y, z1: -58, x2: 0, y2: y + 8, z2: -145, r: 13, c: "#94a3b8" });
      tubes.push({ x1: -75, y1: y, z1: -45, x2: 75, y2: y, z2: -45, r: 10, c: "#94a3b8" });
    });
    addCylinder(0, 70, 60, 26, "#38bdf8", "#0284c7");
    tubes.push({ x1: 0, y1: -138, z1: -84, x2: 0, y2: 138, z2: -84, r: 15, c: "#facc15" });
    tubes.push({ x1: 0, y1: -5, z1: -84, x2: 95, y2: 22, z2: -62, r: 8, c: "#facc15" });
    tubes.push({ x1: 0, y1: -5, z1: -84, x2: -95, y2: 22, z2: -62, r: 8, c: "#facc15" });

    labels.push(
      { x: 0, y: -130, z: -84, ox: 50, oy: -35, t: L.cord },
      { x: 70, y: 0, z: 0, ox: 70, oy: 0, t: L.disc },
      { x: -72, y: -82, z: 0, ox: -210, oy: -20, t: L.vert }
    );
    if (st > 0) {
      let hz = st === 2 ? -76 : -63;
      let hr = st === 2 ? 21 : 14;
      let hc = st === 2 ? "#ef4444" : "#f59e0b";
      pts.push({ x: 18, y: 0, z: hz, r: hr, c: hc });
      labels.push({ x: 18, y: 0, z: hz, ox: 75, oy: 45, t: st === 2 ? L.comp : L.prot });
    }

   } else if (mod === 1) {
    let bCol = st > 0 ? "rgba(244, 114, 182, 0.25)" : "#f472b6";
    let bStroke = st > 0 ? "rgba(244, 114, 182, 0.35)" : "#db2777";
    [-1, 1].forEach(side => {
      let uStep = 0.314, vStep = 0.314;
      for (let u = 0; u < 3.14; u += uStep) {
        for (let v = 0; v < 3.14; v += vStep) {
          let p1 = { x: side * (6 + Math.sin(u) * Math.sin(v) * 72), y: -Math.cos(u) * 76, z: Math.sin(u) * Math.cos(v) * 96 };
          let p2 = { x: side * (6 + Math.sin(u + uStep) * Math.sin(v) * 72), y: -Math.cos(u + uStep) * 76, z: Math.sin(u + uStep) * Math.cos(v) * 96 };
          let p3 = { x: side * (6 + Math.sin(u + uStep) * Math.sin(v + vStep) * 72), y: -Math.cos(u + uStep) * 76, z: Math.sin(u + uStep) * Math.cos(v + vStep) * 96 };
          let p4 = { x: side * (6 + Math.sin(u) * Math.sin(v + vStep) * 72), y: -Math.cos(u) * 76, z: Math.sin(u) * Math.cos(v + vStep) * 96 };
          polys.push({ pts: [p1, p2, p3, p4], c: bCol, stroke: bStroke });
        }
      }
    });
    for (let u = 0; u < 6.28; u += 0.45) {
      for (let v = 0; v < 3.14; v += 0.45) {
        let px = Math.sin(v) * Math.cos(u) * 46, py = 54 + Math.cos(v) * 26, pz = -66 + Math.sin(v) * Math.sin(u) * 32;
        pts.push({ x: px, y: py, z: pz, r: 14, c: "#c084fc" });
      }
    }
    tubes.push({ x1: 0, y1: 35, z1: -18, x2: 0, y2: 122, z2: -22, r: 17, c: "#38bdf8" });
    labels.push(
      { x: 0, y: -76, z: 0, ox: 65, oy: -45, t: L.hemi },
      { x: 0, y: 62, z: -92, ox: 75, oy: 35, t: L.cereb },
      { x: 0, y: 112, z: -22, ox: -185, oy: 30, t: L.stem }
    );
    if (st > 0) {
      let lr = st === 2 ? 25 : 18;
      let lc = st === 2 ? "#ef4444" : "#f59e0b";
      pts.push({ x: 34, y: -15, z: 18, r: lr, c: lc });
      labels.push({ x: 34, y: -15, z: 18, ox: 80, oy: -10, t: st === 2 ? L.lesion : L.spasm });
    }

   } else if (mod === 2) {
    let pulse = (Date.now() * 0.003) % 1;
    pts.push({ x: -125, y: 0, z: 0, r: 34, c: "#a855f7" });
    for (let b = 0; b < 7; b++) {
      let a = b * 0.9;
      tubes.push({ x1: -125, y1: 0, z1: 0, x2: -195, y2: Math.cos(a) * 80, z2: Math.sin(a) * 80, r: 6, c: "#c084fc" });
    }
    tubes.push({ x1: -100, y1: 0, z1: 0, x2: 120, y2: 0, z2: 0, r: 7, c: "#facc15" });
    for (let sg = 0; sg < 5; sg++) {
      let cx = -72 + sg * 43;
      let cl = "#38bdf8", stCl = "#0284c7";
      if (st === 1 && sg === 2) { cl = "#f59e0b"; stCl = "#b45309"; }
      if (st === 2 && (sg === 2 || sg === 3)) { cl = "#ef4444"; stCl = "#991b1b"; }
      let segs = 16, rM = 15, x1 = cx - 15, x2 = cx + 15;
      for (let i = 0; i < segs; i++) {
        let a1 = (i / segs) * 6.283, a2 = ((i + 1) / segs) * 6.283;
        polys.push({
          pts: [
            { x: x1, y: Math.cos(a1) * rM, z: Math.sin(a1) * rM },
            { x: x2, y: Math.cos(a1) * rM, z: Math.sin(a1) * rM },
            { x: x2, y: Math.cos(a2) * rM, z: Math.sin(a2) * rM },
            { x: x1, y: Math.cos(a2) * rM, z: Math.sin(a2) * rM }
          ],
          c: cl, stroke: stCl
        });
      }
    }
    if (st < 2) {
      let px = -95 + pulse * 215;
      pts.push({ x: px, y: 0, z: 0, r: 12, c: "#fef08a" });
    }
    for (let b = -2; b <= 2; b++) {
      tubes.push({ x1: 118, y1: 0, z1: 0, x2: 168, y2: b * 32, z2: (b % 2) * 32, r: 5, c: "#facc15" });
      pts.push({ x: 168, y: b * 32, z: (b % 2) * 32, r: 14, c: st === 2 ? "#ef4444" : "#10b981" });
    }
    labels.push(
      { x: -125, y: -34, z: 0, ox: -40, oy: -70, t: L.soma },
      { x: -180, y: 45, z: 0, ox: -120, oy: 60, t: L.dend },
      { x: 10, y: -15, z: 0, ox: 20, oy: -65, t: L.axon },
      { x: 168, y: -32, z: 0, ox: 35, oy: -50, t: L.syn }
    );

  } else if (mod === 3) {
    let pulse = (Date.now() * 0.004) % 1;
    tubes.push({ x1: 0, y1: 130, z1: -30, x2: 0, y2: 35, z2: -30, r: 11, c: "#ef4444" });
    pts.push({ x: 0, y: 130 - pulse * 95, z: -30, r: 13, c: "#fef08a" });

    let segs = 24;
    for (let i = 0; i < segs; i++) {
      let a1 = (i / segs) * 6.283, a2 = ((i + 1) / segs) * 6.283;
      let isSpasm = (st === 1 && a1 > 1.0 && a1 < 2.1);
      tubes.push({
        x1: Math.sin(a1) * 58, y1: 15, z1: Math.cos(a1) * 65 - 10,
        x2: Math.sin(a2) * 58, y2: 15, z2: Math.cos(a2) * 65 - 10,
        r: isSpasm ? 5 : 9, c: isSpasm ? "#f59e0b" : "#dc2626"
      });
    }

    [-1, 1].forEach(side => {
      let isRightSpasm = (st === 1 && side === 1);
      tubes.push({ x1: side * 58, y1: 15, z1: -10, x2: side * 145, y2: -22, z2: 12, r: isRightSpasm ? 5 : 9, c: isRightSpasm ? "#f59e0b" : "#ef4444" });
      tubes.push({ x1: side * 22, y1: 15, z1: 50, x2: side * 38, y2: -62, z2: 85, r: 8, c: "#f87171" });
      if (!(st === 2 && side === 1 && pulse > 0.45)) {
        pts.push({ x: side * (58 + pulse * 87), y: 15 - pulse * 37, z: -10 + pulse * 22, r: 11, c: "#fef08a" });
      }
    });

    if (st === 2) {
      pts.push({ x: 92, y: -6, z: 4, r: 23, c: "#ef4444" });
      labels.push({ x: 95, y: -15, z: 5, ox: 55, oy: -40, t: L.aneur });
    } else if (st === 1) {
      labels.push({ x: 88, y: 0, z: 0, ox: 55, oy: -35, t: L.spasm });
    }
    labels.push(
      { x: 0, y: 115, z: -30, ox: 55, oy: 20, t: L.basilar },
      { x: -58, y: 15, z: -10, ox: -185, oy: 15, t: L.willis },
      { x: -120, y: -15, z: 5, ox: -180, oy: -40, t: L.mca }
    );

   } else if (mod === 4) {
    let pulse = (Date.now() * 0.004) % 1;
    [-95, 0, 95].forEach((y, idx) => {
      let zOff = (idx === 1) ? 8 : 0;
      addCylinder(y, 56, 48, 32, "#cbd5e1", "#94a3b8");
      tubes.push({ x1: 0, y1: y, z1: zOff - 45, x2: 0, y2: y + 6, z2: zOff - 115, r: 10, c: "#94a3b8" });
      tubes.push({ x1: -76, y1: y, z1: zOff - 18, x2: 76, y2: y, z2: zOff - 18, r: 9, c: "#94a3b8" });
    });
    [-48, 48].forEach(dy => addCylinder(dy, 54, 46, 18, "#38bdf8", "#0284c7"));
    tubes.push({ x1: 0, y1: -135, z1: -65, x2: 0, y2: 135, z2: -65, r: 13, c: "#facc15" });

    [-1, 1].forEach(side => {
      let isSpasm = (st === 1 && side === 1);
      tubes.push({ x1: side * 66, y1: 135, z1: -18, x2: side * 66, y2: -135, z2: -18, r: isSpasm ? 5 : 9, c: isSpasm ? "#f59e0b" : "#ef4444" });
      pts.push({ x: side * 66, y: 135 - pulse * 270, z: -18, r: 11, c: "#fef08a" });
    });

    if (st === 1) {
      labels.push({ x: 66, y: 0, z: -18, ox: 55, oy: -25, t: L.vaspasm });
    } else if (st === 2) {
      pts.push({ x: 0, y: -48, z: -52, r: 19, c: "#ef4444" });
      labels.push({ x: 0, y: -48, z: -52, ox: 65, oy: -35, t: L.chern });
    }
    labels.push(
      { x: 0, y: -130, z: -65, ox: 55, oy: -30, t: L.ccord },
      { x: -66, y: 40, z: -18, ox: -210, oy: 10, t: L.va },
      { x: -56, y: -95, z: 0, ox: -195, oy: -25, t: L.c4 }
    );

  } else if (mod === 5) {
    let beat = 1 + Math.sin(Date.now() * 0.007) * 0.055;
    let uStep = 0.28, vStep = 0.314;
    for (let u = 0; u < 3.14; u += uStep) {
      for (let v = 0; v < 6.28; v += vStep) {
        let pts4 = [[u, v], [u + uStep, v], [u + uStep, v + vStep], [u, v + vStep]].map(([uu, vv]) => {
          let taper = 1 - (uu / 3.14) * 0.55;
          return {
            x: Math.sin(uu) * Math.cos(vv) * 68 * taper * beat + (uu / 3.14) * 18,
            y: -Math.cos(uu) * 85 * beat + 15,
            z: Math.sin(uu) * Math.sin(vv) * 58 * taper * beat
          };
        });
        let isIschemia = (st === 2 && pts4[0].x > 8 && pts4[0].y > 18 && pts4[0].z > 8);
        polys.push({ pts: pts4, c: isIschemia ? "#475569" : "#e11d48", stroke: isIschemia ? "#334155" : "#be123c" });
      }
    }
    for (let i = 0; i < 12; i++) {
      let a1 = (i / 12) * 3.14, a2 = ((i + 1) / 12) * 3.14;
      tubes.push({ x1: -10 + Math.cos(a1) * 34, y1: -70 - Math.sin(a1) * 48, z1: -5, x2: -10 + Math.cos(a2) * 34, y2: -70 - Math.sin(a2) * 48, z2: -5, r: 14, c: "#ef4444" });
    }
    tubes.push({ x1: -38, y1: -125, z1: 10, x2: -38, y2: -55, z2: 10, r: 12, c: "#3b82f6" });
    tubes.push({ x1: 12, y1: -35, z1: 52, x2: 26, y2: 18, z2: 45, r: st === 1 ? 4.5 : 7.5, c: st === 1 ? "#f59e0b" : "#facc15" });
    tubes.push({ x1: 26, y1: 18, z1: 45, x2: 40, y2: 70, z2: 34, r: 7.5, c: st === 2 ? "#1e293b" : "#facc15" });

    labels.push(
      { x: -10, y: -118, z: -5, ox: 55, oy: -25, t: L.aorta },
      { x: -38, y: -90, z: 10, ox: -195, oy: -20, t: L.svc },
      { x: 25, y: 15, z: 45, ox: 65, oy: 10, t: st === 2 ? L.isch : (st === 1 ? L.cspasm : L.cor) }
    );

    } else {
    let flow = (Date.now() * 0.0025) % 1;
    let ySteps = 16, aSteps = 18;
    let vColor = st === 0 ? "rgba(56, 189, 248, 0.22)" : (st === 1 ? "rgba(245, 158, 11, 0.25)" : "rgba(239, 68, 68, 0.28)");
    let vStroke = st === 0 ? "rgba(56, 189, 248, 0.35)" : (st === 1 ? "rgba(245, 158, 11, 0.4)" : "rgba(239, 68, 68, 0.45)");

    for (let j = 0; j < ySteps; j++) {
      let y1 = -140 + (j / ySteps) * 280, y2 = -140 + ((j + 1) / ySteps) * 280;
      let r1 = st === 0 ? 34 : (st === 1 ? 46 : 52 + Math.sin(y1 * 0.065) * 18);
      let r2 = st === 0 ? 34 : (st === 1 ? 46 : 52 + Math.sin(y2 * 0.065) * 18);
      let b1 = st === 2 ? Math.sin(y1 * 0.05) * 24 : 0;
      let b2 = st === 2 ? Math.sin(y2 * 0.05) * 24 : 0;
      for (let i = 0; i < aSteps; i++) {
        let a1 = (i / aSteps) * 6.283, a2 = ((i + 1) / aSteps) * 6.283;
        polys.push({
          pts: [
            { x: b1 + Math.cos(a1) * r1, y: y1, z: Math.sin(a1) * r1 },
            { x: b1 + Math.cos(a2) * r1, y: y1, z: Math.sin(a2) * r1 },
            { x: b2 + Math.cos(a2) * r2, y: y2, z: Math.sin(a2) * r2 },
            { x: b2 + Math.cos(a1) * r2, y: y2, z: Math.sin(a1) * r2 }
          ],
          c: vColor, stroke: vStroke
        });
      }
    }

    [-55, 55].forEach(vy => {
      let gap = st === 0 ? 4 : (st === 1 ? 18 : 30);
      tubes.push({ x1: -34, y1: vy, z1: 0, x2: -gap * 0.4, y2: vy - 18, z2: 0, r: 6, c: "#facc15" });
      tubes.push({ x1: 34, y1: vy, z1: 0, x2: gap * 0.4, y2: vy - 18, z2: 0, r: 6, c: "#facc15" });
    });

    for (let i = 0; i < 6; i++) {
      let p = (flow + i / 6) % 1;
      let fy = st === 2 ? (110 - Math.sin(p * 6.28) * 20) : (130 - p * 260);
      pts.push({ x: 0, y: fy, z: 0, r: 11, c: "#60a5fa" });
      if (st > 0 && i % 2 === 0) {
        let ry = -55 + p * 95;
        pts.push({ x: 14, y: ry, z: 8, r: 10, c: "#ef4444" });
      }
    }
    labels.push(
      { x: 34, y: -105, z: 0, ox: 55, oy: -20, t: L.vwall },
      { x: -16, y: -65, z: 0, ox: -215, oy: -15, t: st === 0 ? L.vnorm : L.vinsuff },
      { x: 0, y: 85, z: 0, ox: 55, oy: 25, t: st === 2 ? L.vnodes : L.vflow }
    );
  }
  return { pts, tubes, polys, labels };
}

