const DB = {
  ru: {
    ui: {
      sub: "Международная образовательная платформа нейроанатомии и клинической тактики.",
      modLabel: "1. АНАТОМИЧЕСКИЙ РАЗДЕЛ",
      stateLabel: "2. КЛИНИЧЕСКАЯ СТАДИЯ",
      tabs: ["Позвоночник", "Головной мозг", "Нейрон и Аксон", "Сосуды мозга"],
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
          { pill: "Норма", color: "#38bdf8", title: "Здоровый позвоночно-двигательный сегмент", desc: "Межпозвонковый диск (синий) сохраняет высоту. Спинной мозг и корешки (желтые) свободны.", tactics: "Операция не требуется. Рекомендуется укрепление мышечного корсета и ЛФК." },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Начальная протрузия без разрыва кольца", desc: "Небольшое выпячивание кольца (оранжевая зона) без грубого сдавливания корешка.", tactics: "В 85–90% случаев излечивается без операции: снятие отека, ЛФК и коррекция нагрузок." },
          { pill: "Требуется оценка хирурга", color: "#ef4444", title: "Экструзия (грыжа) с компрессией корешка", desc: "Выход ядра диска (красная зона) с прямым давлением на нервный корешок.", tactics: "Необходима МРТ и консультация нейрохирурга для решения вопроса о микродискэктомии." }
        ]
      },
      {
        buttons: ["1. Норма структур мозга", "2. Сосудистый спазм (Терапия)", "3. Очаговое давление (Нейрохирургия)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Нормальная нейроанатомия головного мозга", desc: "Полушария, мозжечок и ствол мозга имеют нормальный объем и ликвородинамику.", tactics: "Вмешательство не требуется. Профилактика сосудистых факторов риска." },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Локальный ангиоспазм / ишемия", desc: "Прозрачные полушария показывают зону обратимого снижения кровотока (оранжевый очаг).", tactics: "Операция не показана. Применяется сосудистая, нейропротекторная терапия и реабилитация." },
          { pill: "Требуется оценка хирурга", color: "#ef4444", title: "Объемный внутримозговой очаг (масс-эффект)", desc: "Локальное образование или гематома (красный очаг), сдавливающая ткани мозга.", tactics: "Срочная МРТ/КТ-диагностика и консультация нейрохирурга." }
        ]
      },
      {
        buttons: ["1. Норма нейрона и аксона", "2. Сбой миелина аксона (Терапия)", "3. Блокада аксона и синапса (Врач)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Здоровый нейрон, дендриты и аксон", desc: "Дендриты принимают сигнал, сома обрабатывает, а аксон в синем миелине быстро передает импульс в синапс.", tactics: "Физиологическая норма. Поддержание метаболизма нервной ткани." },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Сегментарная демиелинизация аксона", desc: "Локальное истончение миелина (оранжевый сегмент). Скорость импульса снижена, но осевой цилиндр цел.", tactics: "Обратимо без хирургии: нейрометаболическая терапия, витамины группы B и физиотерапия." },
          { pill: "Специализированная помощь", color: "#ef4444", title: "Аксональная блокада и разрыв синапса", desc: "Грубое повреждение аксона и синаптической передачи (красные зоны).", tactics: "Требуется ЭНМГ-диагностика и осмотр невролога или микрохирурга." }
        ]
      },
      {
        buttons: ["1. Норма Виллизиева круга", "2. Функциональный спазм (Без операции)", "3. Аневризма / Окклюзия (Хирургия)"],
        states: [
          { pill: "Норма кровотока", color: "#38bdf8", title: "Замкнутый Виллизиев круг основания мозга", desc: "Внутренние сонные, базилярная и мозговые артерии образуют единое кольцо, обеспечивая равномерный пульсирующий кровоток (белые импульсы).", tactics: "Хирургия не требуется. Поддержание нормального артериального давления и липидного профиля." },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Ангиоспазм или начальный стеноз артерии", desc: "Локальное сужение просвета средней мозговой артерии (оранжевая зона). Коллатеральный кровоток по Виллизиеву кругу компенсирует питание мозга.", tactics: "Лечится консервативно без операции: спазмолитики, антиагреганты, контроль АД и дозированные нагрузки." },
          { pill: "Срочная нейрохирургия", color: "#ef4444", title: "Мешотчатая аневризма / Критический тромбоз", desc: "Выпячивание истонченной стенки артерии (красный купол) с высоким риском разрыва или полной закупорки сосуда.", tactics: "Требуется КТ-ангиография и срочная консультация эндоваскулярного нейрохирурга (клипирование или эмболизация)." }
        ]
      }
    ]
  },
  en: {
    ui: {
      sub: "International open-source platform for neuroanatomy and clinical decision-making.",
      modLabel: "1. ANATOMICAL MODULE",
      stateLabel: "2. CLINICAL STAGE",
      tabs: ["Spine", "Brain", "Neuron & Axon", "Brain Vessels"],
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
          { pill: "Normal", color: "#38bdf8", title: "Healthy Spinal Motion Segment", desc: "Intervertebral disc (blue) maintains height. Spinal cord and roots (yellow) are free.", tactics: "No surgery required. Maintain core strength." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Early Disc Protrusion", desc: "Mild annular bulge (orange) without severe root compression.", tactics: "85–90% recover without surgery via targeted physical therapy." },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Disc Extrusion with Root Compression", desc: "Herniated nucleus (red) compresses the nerve root directly.", tactics: "Requires MRI correlation and neurosurgical consultation." }
        ]
      },
      {
        buttons: ["1. Normal Brain", "2. Vascular Spasm (Therapy)", "3. Focal Lesion (Neurosurgery)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normal Brain Neuroanatomy", desc: "Hemispheres, cerebellum, and brainstem show healthy volume and blood flow.", tactics: "No intervention needed." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Focal Angiospasm / Mild Ischemia", desc: "Translucent hemispheres reveal localized reduced perfusion (orange).", tactics: "Non-surgical management with vascular and neuroprotective therapy." },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Intracerebral Mass Effect", desc: "Focal mass or hematoma (red) exerting pressure on adjacent tracts.", tactics: "Urgent MRI/CT imaging and neurosurgical evaluation." }
        ]
      },
      {
        buttons: ["1. Healthy Neuron & Axon", "2. Axon Myelin Stress (Therapy)", "3. Synaptic Block (Specialist)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Neuron, Dendrites & Axon", desc: "Dendrites receive signals, soma processes them, and intact myelin (blue) conducts impulses to the synapse.", tactics: "Physiological norm." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Segmental Myelin Thinning", desc: "Localized myelin stress (orange) slows conduction, while the axon core remains intact.", tactics: "Reversible without surgery via neurometabolic therapy." },
          { pill: "Specialist Care", color: "#ef4444", title: "Axonal Blockage & Synaptic Failure", desc: "Severe axonal injury (red) interrupts signal transmission.", tactics: "Requires EMG testing and specialist evaluation." }
        ]
      },
      {
        buttons: ["1. Healthy Circle of Willis", "2. Functional Angiospasm (Therapy)", "3. Aneurysm / Occlusion (Surgery)"],
        states: [
          { pill: "Normal Flow", color: "#38bdf8", title: "Intact Circle of Willis", desc: "Internal carotid, basilar, and cerebral arteries form a closed ring ensuring steady pulsatile blood flow.", tactics: "No surgery required. Maintain healthy blood pressure." },
          { pill: "Conservative Care", color: "#f59e0b", title: "Focal Angiospasm / Mild Stenosis", desc: "Localized narrowing of the middle cerebral artery (orange). Collateral flow compensates perfusion.", tactics: "Managed conservatively without surgery using antispasmodics and medical therapy." },
          { pill: "Urgent Neurosurgery", color: "#ef4444", title: "Saccular Aneurysm / Critical Occlusion", desc: "Bulging weakened arterial wall (red dome) with high rupture or stroke risk.", tactics: "Requires CT angiography and urgent endovascular/neurosurgical evaluation." }
        ]
      }
    ]
  }
};
