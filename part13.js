(function () {
  window.AtlasParts = window.AtlasParts || {};

  const thoracicModelFn = function (st, lang) {
    const pts = [];
    const tubes = [];
    const polys = [];
    const labels = [];

    const kyphosisBend = st === 0 ? 0 : st === 1 ? 12 : 26;
    const vertebrae = [
      { y: -85, z: -6 },
      { y: -42, z: -12 - kyphosisBend * 0.4 },
      { y: 0,   z: -16 - kyphosisBend },
      { y: 42,  z: -12 - kyphosisBend * 0.5 },
      { y: 85,  z: -4 }
    ];

    for (let i = 0; i < vertebrae.length; i++) {
      const v = vertebrae[i];
      const isWedge = (i === 2 && st >= 1);
      const bodyColor = isWedge ? (st === 2 ? "#fca5a5" : "#fde68a") : "#e2e8f0";

      pts.push({ x: 0, y: v.y, z: v.z, r: isWedge ? 19 : 21, c: bodyColor, isBone: true });
      tubes.push({ x1: 0, y1: v.y, z1: v.z - 12, x2: 0, y2: v.y + 8, z2: v.z - 38, r: 6, c: "#94a3b8", isBone: true });

      if (i >= 1 && i <= 3) {
        tubes.push({ x1: -14, y1: v.y, z1: v.z - 6, x2: -62, y2: v.y + 14, z2: v.z + 24, r: 5, c: "#cbd5e1", isBone: true });
        tubes.push({ x1: 14,  y1: v.y, z1: v.z - 6, x2: 62,  y2: v.y + 14, z2: v.z + 24, r: 5, c: "#cbd5e1", isBone: true });
      }

      if (i < vertebrae.length - 1) {
        const nextV = vertebrae[i + 1];
        const midY = (v.y + nextV.y) / 2;
        const midZ = (v.z + nextV.z) / 2;
        const isDamaged = (i === 1 || i === 2) && st >= 1;
        const discColor = isDamaged ? (st === 2 ? "#ef4444" : "#f59e0b") : "#38bdf8";
        pts.push({ x: 0, y: midY, z: midZ, r: isDamaged ? 14 : 16, c: discColor, isBone: false });
      }
    }

    tubes.push({ x1: 0, y1: -98, z1: -22, x2: 0, y2: 98, z2: -22, r: 5, c: "#facc15", isBone: false });
    if (st >= 1) {
      pts.push({
        x: 22, y: 12, z: -18 - kyphosisBend * 0.6,
        r: st === 1 ? 9 : 14,
        c: st === 1 ? "rgba(245,158,11,0.8)" : "rgba(239,68,68,0.88)",
        isBone: false
      });
    }

    const l = lang || "ru";
    labels.push({ x: 0, y: -62, z: 12, t: l === "ru" ? "Грудной позвонок" : "Thoracic Vertebra", ox: -95, oy: -10 });
    labels.push({ x: 52, y: 14, z: 18, t: l === "ru" ? "Рёберная дуга" : "Costal Arch (Rib)", ox: 22, oy: 0 });
    labels.push({ x: 0, y: 92, z: -26, t: l === "ru" ? "Спинной мозг и корешки" : "Spinal Cord & Roots", ox: -105, oy: 12 });

    return { pts, tubes, polys, labels };
  };

  window.AtlasParts = Object.assign(window.AtlasParts || {}, { 9: thoracicModelFn });

  const thoracicPack = {
    ru: {
      tab: "Грудной отдел",
      mod: {
        buttons: ["1. Физиологический кифоз (Норма)", "2. Сутулость и клиновидный износ", "3. Выраженный кифоз и невралгия"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Анатомическая норма грудного отдела", desc: "Позвонки сохраняют прямоугольную форму и естественный мягкий изгиб (20–40°), межрёберные нервы свободны.", tactics: "Укрепление разгибателей спины, дыхательная гимнастика и контроль осанки.", author: "Биомеханика грудной клетки" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Гиперкифоз и передняя компрессия позвонков", desc: "Нагрузка смещается на передний край позвонков, вызывая их клиновидную деформацию и спазм мышц.", tactics: "Декомпрессия позвоночника, растяжка грудных мышц и плавание.", author: "Вертебрология и реабилитация" },
          { pill: "Консультация невролога", color: "#ef4444", title: "Выраженный кифоз и межрёберная невралгия", desc: "Сильная дуга кифоза и снижение высоты дисков раздражают межрёберные нервы при вдохе и поворотах.", tactics: "Очный осмотр невролога и кардиолога, индивидуальная ЛФК.", author: "Клиническая неврология" }
        ]
      }
    },
    en: {
      tab: "Thoracic Spine",
      mod: {
        buttons: ["1. Normal Thoracic Kyphosis", "2. Hyperkyphosis & Anterior Wear", "3. Severe Kyphosis & Neuralgia"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normal Anatomy of the Thoracic Spine", desc: "Vertebrae maintain uniform height and a gentle natural curve (20–40°) without nerve irritation.", tactics: "Strengthen upper back extensors and practice rib-cage breathing.", author: "Thoracic Biomechanics" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Postural Hyperkyphosis & Wedge Stress", desc: "Slouching concentrates load on the anterior vertebral edge, causing wedge stress.", tactics: "Spinal unloading exercises, pectoral stretching, and swimming.", author: "Spine Rehabilitation" },
          { pill: "Neurology Review", color: "#ef4444", title: "Severe Kyphosis & Intercostal Neuralgia", desc: "Pronounced curvature and disc narrowing irritate intercostal nerve roots.", tactics: "In-person neurological and cardiac evaluation plus supervised therapy.", author: "Clinical Neurology" }
        ]
      }
    },
    es: {
      tab: "Columna Torácica",
      mod: {
        buttons: ["1. Cifosis Normal", "2. Hipercifosis y Sobrecarga", "3. Cifosis Severa y Neuralgia"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Anatomía normal de la columna torácica", desc: "Las vértebras conservan su altura uniforme y una curvatura suave (20–40°).", tactics: "Fortalecer extensores dorsales y ejercicios respiratorios.", author: "Biomecánica Torácica" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Hipercifosis y estrés anterior", desc: "La postura encorvada concentra presión en el borde anterior vertebral.", tactics: "Descompresión suave, estiramiento pectoral y natación.", author: "Rehabilitación Vertebral" },
          { pill: "Revisión Neurológica", color: "#ef4444", title: "Cifosis marcada e irritación intercostal", desc: "La deformidad irrita los nervios intercostales al respirar.", tactics: "Evaluación médica presencial y fisioterapia supervisada.", author: "Neurología Clínica" }
        ]
      }
    },
    de: {
      tab: "Brustwirbelsäule",
      mod: {
        buttons: ["1. Physiologische Kyphose", "2. Rundrücken & Keilbelastung", "3. Ausgeprägte Kyphose & Neuralgie"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normale Anatomie der Brustwirbelsäule", desc: "Die Wirbelkörper behalten ihre gleichmäßige Höhe und natürliche Krümmung (20–40°).", tactics: "Kräftigung der Rückenstrecker und Atemgymnastik.", author: "Thorakale Biomechanik" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Hyperkyphose und vordere Belastung", desc: "Dauerhaftes Vorbeugen verlagert den Druck auf die Vorderkante der Wirbel.", tactics: "Entlastungsübungen, Dehnung der Brustmuskulatur und Schwimmen.", author: "Wirbelsäulenrehabilitation" },
          { pill: "Neurologische Prüfung", color: "#ef4444", title: "Starke Kyphose und Interkostalneuralgie", desc: "Deutliche Krümmung reizt die Zwischenrippennerven beim Atmen.", tactics: "Ärztliche Abklärung und angeleitete Physiotherapie.", author: "Klinische Neurologie" }
        ]
      }
    },
    zh: {
      tab: "胸椎段",
      mod: {
        buttons: ["1. 生理性后凸（正常）", "2. 驼背与前缘楔形负荷", "3. 重度后凸与肋间神经痛"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "胸椎正常解剖结构", desc: "椎体保持完整高度与自然柔和后凸（20–40°），肋间神经无受压。", tactics: "强化上背部伸肌群与呼吸训练。", author: "胸廓生物力学" },
          { pill: "保守治疗", color: "#f59e0b", title: "胸椎后凸加重与前缘负荷", desc: "长期含胸前倾使压力集中于椎体前缘。", tactics: "脊柱减压练习、胸肌拉伸与游泳。", author: "脊柱康复医学" },
          { pill: "神经科评估", color: "#ef4444", title: "明显后凸畸形与肋间神经痛", desc: "曲度明显增大刺激肋间神经，深呼吸时胸壁疼痛。", tactics: "及时前往神经科与心内科面诊。", author: "临床神经病学" }
        ]
      }
    }
  };

  Object.keys(thoracicPack).forEach(function (lang) {
    if (typeof DB !== "undefined" && DB[lang] && DB[lang].ui && Array.isArray(DB[lang].ui.tabs)) {
      if (DB[lang].ui.tabs.length === 9) {
        DB[lang].ui.tabs.push(thoracicPack[lang].tab);
        DB[lang].modules.push(thoracicPack[lang].mod);
      }
    }
  });

  if (typeof sectionBaseZoom !== "undefined" && Array.isArray(sectionBaseZoom) && sectionBaseZoom.length === 9) {
    sectionBaseZoom.push(1.38);
  }
  if (typeof sectionBaseAngles !== "undefined" && Array.isArray(sectionBaseAngles) && sectionBaseAngles.length === 9) {
    sectionBaseAngles.push({ rx: 0.12, ry: -0.75 });
  }
  if (typeof window.updateUI === "function") {
    window.updateUI();
  }
})();
