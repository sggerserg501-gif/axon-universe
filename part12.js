(function () {
  window.AtlasParts = window.AtlasParts || {};

  const hipModelFn = function (st, lang) {
    const pts = [];
    const tubes = [];
    const polys = [];
    const labels = [];

    // Вертлужная впадина таза
    const acetabulumPts = [
      { x: -55, y: -65, z: 0 },
      { x: -20, y: -75, z: 0 },
      { x: 18, y: -65, z: 0 },
      { x: 35, y: -35, z: 0 }
    ];
    for (let i = 0; i < acetabulumPts.length - 1; i++) {
      tubes.push({
        x1: acetabulumPts[i].x, y1: acetabulumPts[i].y, z1: 0,
        x2: acetabulumPts[i + 1].x, y2: acetabulumPts[i + 1].y, z2: 0,
        r: 16, c: "#cbd5e1", isBone: true
      });
    }
    tubes.push({ x1: -25, y1: -75, z1: 0, x2: -45, y2: -120, z2: -10, r: 18, c: "#94a3b8", isBone: true });

    // Суставной хрящ
    const cartColor = st === 0 ? "#38bdf8" : st === 1 ? "#f59e0b" : "#ef4444";
    const cartThick = st === 0 ? 7 : st === 1 ? 4 : 2;
    tubes.push({ x1: -42, y1: -52, z1: 2, x2: 18, y2: -52, z2: 2, r: cartThick, c: cartColor, isBone: false });

    // Головка и шейка бедренной кости
    const shiftY = st === 0 ? 0 : st === 1 ? -9 : -18;
    const headX = -10;
    const headY = -22 + shiftY;
    pts.push({ x: headX, y: headY, z: 0, r: 28, c: st === 2 ? "#fca5a5" : "#e2e8f0", isBone: true });

    if (st >= 1) {
      pts.push({ x: 24, y: -42, z: 4, r: st === 1 ? 6 : 11, c: "#f97316", isBone: false });
      pts.push({ x: -46, y: -42, z: 4, r: st === 1 ? 5 : 10, c: "#f97316", isBone: false });
    }

    const neckX = 28;
    const neckY = 18 + shiftY;
    tubes.push({ x1: headX, y1: headY, z1: 0, x2: neckX, y2: neckY, z2: 0, r: 15, c: "#cbd5e1", isBone: true });
    pts.push({ x: 42, y: 12 + shiftY, z: 0, r: 16, c: "#94a3b8", isBone: true });
    tubes.push({ x1: neckX, y1: neckY, z1: 0, x2: 32, y2: 115, z2: 0, r: 17, c: "#cbd5e1", isBone: true });

    if (st >= 1) {
      pts.push({
        x: -10, y: -46 + shiftY * 0.5, z: 14,
        r: st === 1 ? 10 : 15,
        c: st === 1 ? "rgba(245,158,11,0.75)" : "rgba(239,68,68,0.85)",
        isBone: false
      });
    }

    const l = lang || "ru";
    labels.push({ x: -35, y: -95, z: 0, t: l === "ru" ? "Вертлужная впадина" : "Acetabulum", ox: -95, oy: -12 });
    labels.push({ x: -12, y: -56, z: 12, t: l === "ru" ? "Суставной хрящ" : "Articular Cartilage", ox: 24, oy: -10 });
    labels.push({ x: 34, y: 65, z: 0, t: l === "ru" ? "Бедренная кость" : "Femur Bone", ox: 24, oy: 6 });

    return { pts, tubes, polys, labels };
  };

  window.AtlasParts = Object.assign(window.AtlasParts || {}, { 8: hipModelFn });

  const hipPack = {
    ru: {
      tab: "Тазобедренный сустав",
      mod: {
        buttons: ["1. Нормальный сустав", "2. Начальный износ (Коксартроз I–II)", "3. Выраженный артроз (Коксартроз III)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Анатомическая норма тазобедренного сустава", desc: "Гладкий гиалиновый хрящ равномерно покрывает головку бедра и вертлужную впадину. Суставная щель сохранена.", tactics: "Поддержание силы ягодичных мышц и мышц бедра, умеренная ходьба и плавная разминка.", author: "Биомеханика опорно-двигательного аппарата" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Сужение суставной щели и начальный коксартроз", desc: "Хрящевая прослойка истончается, суставная щель сужается. Появляются стартовые боли в паху при ходьбе.", tactics: "Очная консультация ортопеда, ЛФК в разгрузочных положениях и плавание.", author: "Реабилитационная ортопедия" },
          { pill: "Консультация ортопеда", color: "#ef4444", title: "Выраженный износ хряща и остеофиты", desc: "Хрящ практически разрушен, головка бедра плотно контактирует с костью впадины, формируются остеофиты.", tactics: "Осмотр травматолога-ортопеда, разгрузка сустава тростью и оценка показаний к эндопротезированию.", author: "Клиническая ортопедия" }
        ]
      }
    },
    en: {
      tab: "Hip Joint",
      mod: {
        buttons: ["1. Normal Hip Joint", "2. Early Wear (Coxarthrosis I–II)", "3. Severe Osteoarthritis (Stage III)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normal Anatomy of the Hip Joint", desc: "Smooth hyaline cartilage cushions the femoral head inside the acetabulum. Joint space is preserved.", tactics: "Maintain gluteal and thigh muscle strength and regular low-impact walking.", author: "Musculoskeletal Biomechanics" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Joint Space Narrowing & Early Osteoarthritis", desc: "Cartilage thins and narrows the joint space, causing stiffness and groin discomfort.", tactics: "Orthopedic evaluation, low-load physical therapy, and swimming.", author: "Rehabilitation Orthopedics" },
          { pill: "Orthopedic Review", color: "#ef4444", title: "Severe Cartilage Loss & Osteophytes", desc: "Severe cartilage loss with bone-on-bone contact and marginal osteophytes.", tactics: "Consult an orthopedic specialist and evaluate joint replacement options.", author: "Clinical Orthopedics" }
        ]
      }
    },
    es: {
      tab: "Articulación de Cadera",
      mod: {
        buttons: ["1. Cadera Normal", "2. Desgaste Inicial (I–II)", "3. Artrosis Avanzada (III)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Anatomía normal de la cadera", desc: "El cartílago hialino cubre suavemente la cabeza femoral y el acetábulo.", tactics: "Fortalecer glúteos y muslos y caminar sin impacto excesivo.", author: "Biomecánica Osteoarticular" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Estrechamiento del espacio articular", desc: "El cartílago se adelgaza y aparece rigidez inguinal.", tactics: "Consulta ortopédica, fisioterapia sin carga y natación.", author: "Ortopedia de Rehabilitación" },
          { pill: "Revisión Ortopédica", color: "#ef4444", title: "Desgaste severo y osteofitos", desc: "Pérdida casi total del cartílago con contacto óseo.", tactics: "Valoración por traumatólogo y estudio quirúrgico si procede.", author: "Ortopedia Clínica" }
        ]
      }
    },
    de: {
      tab: "Hüftgelenk",
      mod: {
        buttons: ["1. Normales Hüftgelenk", "2. Beginnender Verschleiß (I–II)", "3. Fortgeschrittene Arthrose (III)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normale Anatomie des Hüftgelenks", desc: "Glatter Gelenkknorpel polstert den Hüftkopf in der Hüftpfanne.", tactics: "Kräftigung der Gesäß- und Oberschenkelmuskulatur.", author: "Biomechanik des Bewegungsapparats" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Gelenkspaltverschmälerung", desc: "Der Knorpel wird dünner, es treten Anlaufschmerzen in der Leiste auf.", tactics: "Orthopädische Abklärung, Physiotherapie und Schwimmen.", author: "Rehabilitative Orthopädie" },
          { pill: "Orthopädische Prüfung", color: "#ef4444", title: "Schwerer Knorpelverlust & Osteophyten", desc: "Weitgehender Knorpelverlust mit Knochenkontakt.", tactics: "Fachärztliche Beratung und Prüfung eines Gelenkersatzes.", author: "Klinische Orthopädie" }
        ]
      }
    },
    zh: {
      tab: "髋关节",
      mod: {
        buttons: ["1. 正常髋关节", "2. 早期磨损（I–II期）", "3. 重度关节炎（III期）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "髋关节正常解剖结构", desc: "光滑的透明软骨均匀覆盖股骨头与髋臼，关节间隙正常。", tactics: "保持臀部及大腿肌群力量，适度步行。", author: "运动系统生物力学" },
          { pill: "保守治疗", color: "#f59e0b", title: "关节间隙变窄与早期骨关节炎", desc: "软骨变薄，久走或起身时腹股沟区域出现酸痛。", tactics: "骨科门诊评估，进行低负荷康复训练与游泳。", author: "康复骨科学" },
          { pill: "骨科评估", color: "#ef4444", title: "重度软骨磨损与骨刺形成", desc: "软骨几乎完全磨损，骨面直接摩擦并形成骨赘。", tactics: "咨询骨科专科医生，评估人工关节置换指征。", author: "临床骨科学" }
        ]
      }
    }
  };

  Object.keys(hipPack).forEach(function (lang) {
    if (typeof DB !== "undefined" && DB[lang] && DB[lang].ui && Array.isArray(DB[lang].ui.tabs)) {
      if (DB[lang].ui.tabs.length === 8) {
        DB[lang].ui.tabs.push(hipPack[lang].tab);
        DB[lang].modules.push(hipPack[lang].mod);
      }
    }
  });

  if (typeof sectionBaseZoom !== "undefined" && Array.isArray(sectionBaseZoom) && sectionBaseZoom.length === 8) {
    sectionBaseZoom.push(1.45);
  }
  if (typeof sectionBaseAngles !== "undefined" && Array.isArray(sectionBaseAngles) && sectionBaseAngles.length === 8) {
    sectionBaseAngles.push({ rx: 0.15, ry: -0.25 });
  }
  if (typeof window.updateUI === "function") {
    window.updateUI();
  }
})();
