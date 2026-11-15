const DB = {
  ru: {
    ui: {
      sub: "Международная образовательная платформа нейроанатомии, кардиологии и клинической тактики.",
      modLabel: "1. АНАТОМИЧЕСКИЙ РАЗДЕЛ",
      stateLabel: "2. КЛИНИЧЕСКАЯ СТАДИЯ",
      tabs: ["Позвоночник", "Головной мозг", "Нейрон и Аксон", "Сосуды мозга", "Шейный отдел", "Сердце и сосуды"],
      tacticsLabel: "Клиническая тактика:",
      authorLabel: "Редактор / Консультант: ",
      editBtn: "Режим врача",
      fsBtn: "Во весь экран",
      hint: "ЛКМ — вращение • Колесико — масштаб",
      disc: "Образовательный проект с открытым исходным кодом (MIT). Визуализация предназначена для врачей, студентов и пациентов и не заменяет очную консультацию специалиста."
    },
    modules: [
      {
        buttons: ["1. Анатомическая норма", "2. Протрузия диска (Без операции)", "3. Грыжа с компрессией (Хирургия)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Здоровый позвоночно-двигательный сегмент", desc: "Межпозвонковый диск (синий) сохраняет высоту. Спинной мозг и корешки (желтые) свободны.", tactics: "Операция не требуется. Рекомендуется укрепление мышечного корсета и ЛФК.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Начальная протрузия без разрыва кольца", desc: "Небольшое выпячивание кольца (оранжевая зона) без грубого сдавливания корешка.", tactics: "В 85–90% случаев излечивается без операции: снятие отека, ЛФК и коррекция нагрузок.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Требуется оценка хирурга", color: "#ef4444", title: "Экструзия (грыжа) с компрессией корешка", desc: "Выход ядра диска (красная зона) с прямым давлением на нервный корешок.", tactics: "Необходима МРТ и консультация нейрохирурга для решения вопроса о микродискэктомии.", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Норма структур мозга", "2. Сосудистый спазм (Терапия)", "3. Очаговое давление (Нейрохирургия)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Нормальная нейроанатомия головного мозга", desc: "Полушария, мозжечок и ствол мозга имеют нормальный объем и ликвородинамику.", tactics: "Вмешательство не требуется. Профилактика сосудистых факторов риска.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Локальный ангиоспазм / ишемия", desc: "Прозрачные полушария показывают зону обратимого снижения кровотока (оранжевый очаг).", tactics: "Операция не показана. Применяется сосудистая, нейропротекторная терапия и реабилитация.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Требуется оценка хирурга", color: "#ef4444", title: "Объемный внутримозговой очаг (масс-эффект)", desc: "Локальное образование или гематома (красный очаг), сдавливающая ткани мозга.", tactics: "Срочная МРТ/КТ-диагностика и консультация нейрохирурга.", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Норма нейрона и аксона", "2. Сбой миелина аксона (Терапия)", "3. Блокада аксона и синапса (Врач)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Здоровый нейрон, дендриты и аксон", desc: "Дендриты принимают сигнал, сома обрабатывает, а аксон в синем миелине быстро передает импульс в синапс.", tactics: "Физиологическая норма. Поддержание метаболизма нервной ткани.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Сегментарная демиелинизация аксона", desc: "Локальное истончение миелина (оранжевый сегмент). Скорость импульса снижена, но осевой цилиндр цел.", tactics: "Обратимо без хирургии: нейрометаболическая терапия, витамины группы B и физиотерапия.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Специализированная помощь", color: "#ef4444", title: "Аксональная блокада и разрыв синапса", desc: "Грубое повреждение аксона и синаптической передачи (красные зоны).", tactics: "Требуется ЭНМГ-диагностика и осмотр невролога или микрохирурга.", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Норма Виллизиева круга", "2. Функциональный спазм (Без операции)", "3. Аневризма / Окклюзия (Хирургия)"],
        states: [
          { pill: "Норма кровотока", color: "#38bdf8", title: "Замкнутый Виллизиев круг основания мозга", desc: "Внутренние сонные, базилярная и мозговые артерии образуют единое кольцо с равномерным пульсирующим кровотоком.", tactics: "Хирургия не требуется. Поддержание нормального артериального давления.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Ангиоспазм или начальный стеноз артерии", desc: "Локальное сужение просвета средней мозговой артерии (оранжевая зона). Коллатерали компенсируют кровоток.", tactics: "Лечится консервативно без операции: спазмолитики, антиагреганты и контроль АД.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Срочная нейрохирургия", color: "#ef4444", title: "Мешотчатая аневризма / Критический тромбоз", desc: "Выпячивание истонченной стенки артерии (красный купол) с высоким риском разрыва или окклюзии.", tactics: "Требуется КТ-ангиография и срочная консультация эндоваскулярного нейрохирурга.", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Норма шеи и артерий (C4–C6)", "2. Синдром позвоночной артерии (Терапия)", "3. Шейная грыжа с миелопатией (Хирургия)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Анатомическая норма шейного отдела (C4–C6)", desc: "Три шейных позвонка сохраняют естественный изгиб, диски (синие) не сдавливают спинной мозг, а обе позвоночные артерии (красные) свободно несут кровь к мозгу.", tactics: "Операция не нужна. Рекомендуется гимнастика для глубоких сгибателей шеи и эргономика рабочего места.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Вертеброгенный спазм и поджатие артерии", desc: "Умеренное смещение и спазм (оранжевая зона) вызывают локальное сужение правой позвоночной артерии, что может давать головокружение или шум в ушах.", tactics: "В большинстве случаев лечится без операции: мягкая мануальная терапия, миорелаксанты, сосудистая терапия и ЛФК.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консультация нейрохирурга", color: "#ef4444", title: "Крупная шейная грыжа со сдавливанием спинного мозга", desc: "Выпадение фрагмента диска (красный очаг) в узкий шейный канал с прямой компрессией спинного мозга (риск цервикальной миелопатии).", tactics: "Требуется срочное МРТ шейного отдела и очный осмотр нейрохирурга (решается вопрос о передней декомпрессии и стабилизации).", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Норма ритма и коронаров", "2. Спазм / Стенокардия (Терапия)", "3. Закупорка артерии / Ишемия (Стент)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Здоровый миокард и коронарный кровоток", desc: "Сердце ритмично сокращается, выталкивая кровь в дугу аорты. Коронарные артерии (желто-красные) равномерно питают сердечную мышцу.", tactics: "Операция не требуется. Рекомендуются регулярные кардионагрузки и контроль холестерина.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Коронарный спазм / Стабильная стенокардия", desc: "Умеренное сужение просвета левой коронарной артерии (оранжевый участок). При нагрузке возникает временный дефицит кислорода.", tactics: "Успешно контролируется без операции: нитраты, бета-блокаторы, статины и коррекция образа жизни.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Срочная кардиохирургия", color: "#ef4444", title: "Критическая окклюзия коронарной артерии", desc: "Полная закупорка венечной артерии (красный блок) с формированием очага острой ишемии миокарда.", tactics: "Необходима экстренная коронарография и рентгенэндоваскулярное стентирование или шунтирование.", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      }
    ]
  },
  en: {
    ui: {
      sub: "International open-source platform for neuroanatomy, cardiology, and clinical decision-making.",
      modLabel: "1. ANATOMICAL MODULE",
      stateLabel: "2. CLINICAL STAGE",
      tabs: ["Spine", "Brain", "Neuron & Axon", "Brain Vessels", "Cervical Spine", "Heart & Vessels"],
      tacticsLabel: "Clinical Strategy:",
      authorLabel: "Editor / Consultant: ",
      editBtn: "Doctor Mode",
      fsBtn: "Fullscreen",
      hint: "Left Drag — Rotate • Scroll — Zoom",
      disc: "Open-Source Educational Project (MIT). Intended for physicians, students, and patients; does not replace clinical evaluation."
    },
    modules: [
      {
        buttons: ["1. Anatomical Norm", "2. Disc Protrusion (Non-surgical)", "3. Herniation (Surgical Review)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Spinal Motion Segment", desc: "Intervertebral disc (blue) maintains height. Spinal cord and roots (yellow) are free.", tactics: "No surgery required.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Early Disc Protrusion", desc: "Mild annular bulge (orange) without severe root compression.", tactics: "85–90% recover without surgery via targeted physical therapy.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Disc Extrusion with Root Compression", desc: "Herniated nucleus (red) compresses the nerve root directly.", tactics: "Requires MRI correlation and neurosurgical consultation.", author: "Base Edition OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Normal Brain", "2. Vascular Spasm (Therapy)", "3. Focal Lesion (Neurosurgery)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normal Brain Neuroanatomy", desc: "Hemispheres, cerebellum, and brainstem show healthy volume and blood flow.", tactics: "No intervention needed.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Focal Angiospasm / Mild Ischemia", desc: "Translucent hemispheres reveal localized reduced perfusion (orange).", tactics: "Non-surgical management with vascular and neuroprotective therapy.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Intracerebral Mass Effect", desc: "Focal mass or hematoma (red) exerting pressure on adjacent tracts.", tactics: "Urgent MRI/CT imaging and neurosurgical evaluation.", author: "Base Edition OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Healthy Neuron & Axon", "2. Axon Myelin Stress (Therapy)", "3. Synaptic Block (Specialist)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Neuron, Dendrites & Axon", desc: "Dendrites receive signals, soma processes them, and intact myelin (blue) conducts impulses to the synapse.", tactics: "Physiological norm.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Segmental Myelin Thinning", desc: "Localized myelin stress (orange) slows conduction, while the axon core remains intact.", tactics: "Reversible without surgery via neurometabolic therapy.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Specialist Care", color: "#ef4444", title: "Axonal Blockage & Synaptic Failure", desc: "Severe axonal injury (red) interrupts signal transmission.", tactics: "Requires EMG testing and specialist evaluation.", author: "Base Edition OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Healthy Circle of Willis", "2. Functional Angiospasm (Therapy)", "3. Aneurysm / Occlusion (Surgery)"],
        states: [
          { pill: "Normal Flow", color: "#38bdf8", title: "Intact Circle of Willis", desc: "Internal carotid, basilar, and cerebral arteries form a closed ring ensuring steady pulsatile blood flow.", tactics: "No surgery required.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Focal Angiospasm / Mild Stenosis", desc: "Localized narrowing of the middle cerebral artery (orange). Collateral flow compensates perfusion.", tactics: "Managed conservatively without surgery using antispasmodics.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Urgent Neurosurgery", color: "#ef4444", title: "Saccular Aneurysm / Critical Occlusion", desc: "Bulging weakened arterial wall (red dome) with high rupture or stroke risk.", tactics: "Requires CT angiography and urgent neurosurgical evaluation.", author: "Base Edition OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Healthy Cervical Spine (C4–C6)", "2. Vertebral Artery Spasm (Therapy)", "3. Cervical Myelopathy (Surgery)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normal Cervical Spine & Vertebral Arteries", desc: "Cervical vertebrae (C4–C6) maintain natural lordosis, discs (blue) are intact, and both vertebral arteries (red) carry steady blood flow.", tactics: "No surgery required.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Cervical Spasm & Vertebral Artery Compression", desc: "Muscle spasm and mild instability (orange) narrow the right vertebral artery lumen, causing dizziness.", tactics: "Managed without surgery via physical therapy and muscle relaxants.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Surgical Evaluation", color: "#ef4444", title: "Large Cervical Herniation & Cord Compression", desc: "Disc extrusion (red) narrows the cervical canal and presses directly on the spinal cord.", tactics: "Requires urgent cervical MRI and neurosurgical evaluation.", author: "Base Edition OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Normal Rhythm & Coronaries", "2. Coronary Spasm / Angina (Therapy)", "3. Artery Occlusion / Ischemia (Stent)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Myocardium & Coronary Flow", desc: "The heart beats rhythmically, pumping blood into the aortic arch while coronary arteries nourish the muscle.", tactics: "No surgery required.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Coronary Spasm / Stable Angina", desc: "Moderate narrowing of the left coronary artery (orange) limits oxygen supply during exertion.", tactics: "Managed without surgery using nitrates, beta-blockers, and statins.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Urgent Cardiology", color: "#ef4444", title: "Critical Coronary Artery Occlusion", desc: "Complete blockage of the coronary vessel (red) causing acute myocardial ischemia.", tactics: "Requires emergency coronary angiography and stenting or bypass surgery.", author: "Base Edition OpenNeuroAtlas" }
        ]
      }
    ]
  }
};
