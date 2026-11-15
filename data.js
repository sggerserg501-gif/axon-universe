const DB = {
  ru: {
    ui: {
      sub: "Международная образовательная платформа нейроанатомии и клинической тактики.",
      modLabel: "1. АНАТОМИЧЕСКИЙ РАЗДЕЛ",
      stateLabel: "2. КЛИНИЧЕСКАЯ СТАДИЯ",
      tabs: ["Позвоночник", "Головной мозг", "Нейрон и Аксон"],
      tacticsLabel: "Клиническая тактика:",
      editBtn: "Режим врача",
      fsBtn: "Во весь экран",
      hint: "ЛКМ — вращение • Колесико — масштаб",
      disc: "Образовательный проект с открытым исходным кодом (MIT). Визуализация предназначена для врачей, студентов и пациентов и не заменяет очную консультацию специалиста."
    },
    modules: [
      {
        buttons: ["1. Анатомическая норма", "2. Протрузия диска (Без операции)", "3. Грыжа с компрессией (Хирургия)"],
        states: [
          {
            pill: "Норма", color: "#38bdf8",
            title: "Здоровый позвоночно-двигательный сегмент",
            desc: "Межпозвонковый диск (синий) сохраняет нормальную высоту и гидрофильность. Спинной мозг и спинномозговые корешки (желтые) свободно проходят в каналах.",
            tactics: "Хирургическое вмешательство не требуется. Рекомендуется регулярная физическая активность и укрепление мышечного корсета."
          },
          {
            pill: "Консервативное лечение", color: "#f59e0b",
            title: "Начальная протрузия без разрыва кольца",
            desc: "Локальное выпячивание фиброзного кольца (оранжевая зона) без грубого сдавливания нервного корешка. Воспалительный отек носит обратимый характер.",
            tactics: "В 85–90% случаев излечивается без операции: медикаментозное снятие отека, лечебная физкультура (ЛФК) и коррекция осевых нагрузок."
          },
          {
            pill: "Требуется оценка хирурга", color: "#ef4444",
            title: "Экструзия (грыжа) с радикулярной компрессией",
            desc: "Выход пульпозного ядра (красная зона) с прямым механическим давлением на нервный корешок и нарушением его кровоснабжения.",
            tactics: "Необходима очная консультация нейрохирурга и МРТ. При стойком болевом синдроме или парезе рассматривается микродискэктомия."
          }
        ]
      },
      {
        buttons: ["1. Норма структур мозга", "2. Сосудистый спазм (Терапия)", "3. Очаговое давление (Нейрохирургия)"],
        states: [
          {
            pill: "Норма", color: "#38bdf8",
            title: "Нормальная нейроанатомия головного мозга",
            desc: "Полушария большого мозга, мозжечок и ствол мозга имеют симметричную структуру, нормальную ликвородинамику и церебральный кровоток.",
            tactics: "Вмешательство не требуется. Профилактика сосудистых факторов риска и контроль артериального давления."
          },
          {
            pill: "Консервативное лечение", color: "#f59e0b",
            title: "Локальный ангиоспазм / транзиторная ишемия",
            desc: "Полушария показаны в прозрачном режиме: внутри видна зона обратимого снижения перфузии (оранжевый очаг) без разрушения ткани.",
            tactics: "Операция не показана. Применяется сосудистая, нейропротекторная терапия, нормализация реологии крови и реабилитация."
          },
          {
            pill: "Требуется оценка хирурга", color: "#ef4444",
            title: "Объемный внутримозговой очаг (масс-эффект)",
            desc: "Локальное объемное образование или гематома (красный очаг внутри прозрачных полушарий), вызывающее компрессию соседних проводящих путей.",
            tactics: "Срочная нейровизуализация (МРТ с контрастом / КТ) и консультация нейрохирурга для определения показаний к декомпрессии или удалению."
          }
        ]
      },
      {
        buttons: ["1. Норма нейрона и аксона", "2. Сбой миелина аксона (Терапия)", "3. Блокада аксона и синапса (Врач)"],
        states: [
          {
            pill: "Норма", color: "#38bdf8",
            title: "Здоровый нейрон, дендриты и миелинизированный аксон",
            desc: "Дендриты принимают импульсы, тело нейрона (сома) интегрирует сигнал, а аксон с целой миелиновой оболочкой (синие муфты) обеспечивает быстрое проведение к синапсу.",
            tactics: "Физиологическая норма. Поддержание метаболизма нервной ткани (витамины группы B, полноценный сон)."
          },
          {
            pill: "Консервативное лечение", color: "#f59e0b",
            title: "Сегментарная демиелинизация / метаболический стресс аксона",
            desc: "Локальное истончение миелиновой оболочки аксона (оранжевый сегмент). Скорость проведения нервного импульса снижается, но осевой цилиндр сохранен.",
            tactics: "Структура способна к ремиелинизации без хирургии: назначается нейрометаболическая терапия, физиотерапия и устранение причины компрессии."
          },
          {
            pill: "Специализированная помощь", color: "#ef4444",
            title: "Аксональная дегенерация и блокада синапса",
            desc: "Грубое повреждение аксона и нарушение синаптической передачи (красные зоны). Проведение нервного импульса к органу-мишени прервано.",
            tactics: "Требуется электронейромиография (ЭНМГ) и осмотр невролога/нейрохирурга (при травматическом разрыве нерва возможна микрохирургическая пластика)."
          }
        ]
      }
    ]
  },
  en: {
    ui: {
      sub: "International open-source platform for neuroanatomy and clinical decision-making.",
      modLabel: "1. ANATOMICAL MODULE",
      stateLabel: "2. CLINICAL STAGE",
      tabs: ["Spine", "Brain", "Neuron & Axon"],
      tacticsLabel: "Clinical Strategy:",
      editBtn: "Doctor Mode",
      fsBtn: "Fullscreen",
      hint: "Left Drag — Rotate • Scroll — Zoom",
      disc: "Open-Source Educational Project (MIT). Intended for physicians, students, and patients; does not replace clinical evaluation."
    },
    modules: [
      {
        buttons: ["1. Anatomical Norm", "2. Disc Protrusion (Non-surgical)", "3. Herniation (Surgical Review)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Spinal Motion Segment", desc: "Intervertebral disc (blue) maintains normal height. Spinal cord and nerve roots (yellow) are completely free.", tactics: "No surgery required. Maintain core strength and regular physical activity." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Early Disc Protrusion", desc: "Mild annular bulge (orange) without severe root compression. Edema is reversible.", tactics: "85–90% recover without surgery via targeted physical therapy and anti-inflammatory care." },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Disc Extrusion with Root Compression", desc: "Herniated nucleus (red) compresses the nerve root directly.", tactics: "Requires MRI correlation and neurosurgical consultation." }
        ]
      },
      {
        buttons: ["1. Normal Brain", "2. Vascular Spasm (Therapy)", "3. Focal Lesion (Neurosurgery)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normal Brain Neuroanatomy", desc: "Cerebral hemispheres, cerebellum, and brainstem show healthy volume and blood flow.", tactics: "No intervention needed. Standard vascular prevention." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Focal Angiospasm / Mild Ischemia", desc: "Translucent hemispheres reveal localized reduced perfusion (orange) without tissue necrosis.", tactics: "Non-surgical management with vascular and neuroprotective therapy." },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Intracerebral Mass Effect", desc: "Focal mass or hematoma (red inside translucent hemispheres) exerting pressure on adjacent tracts.", tactics: "Urgent MRI/CT imaging and neurosurgical evaluation." }
        ]
      },
      {
        buttons: ["1. Healthy Neuron & Axon", "2. Axon Myelin Stress (Therapy)", "3. Synaptic Block (Specialist)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Neuron, Dendrites & Myelinated Axon", desc: "Dendrites receive signals, soma processes them, and intact myelin sheaths (blue) conduct impulses to the synapse.", tactics: "Physiological norm." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Segmental Myelin Thinning", desc: "Localized myelin stress (orange) slows conduction, while the axon core remains intact.", tactics: "Reversible without surgery via neurometabolic therapy and rehabilitation." },
          { pill: "Specialist Care", color: "#ef4444", title: "Axonal Blockage & Synaptic Failure", desc: "Severe axonal injury (red) interrupts signal transmission.", tactics: "Requires EMG testing and specialist neurosurgical/neurological evaluation." }
        ]
      }
    ]
  }
};
