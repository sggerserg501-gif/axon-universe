const DB = {
  ru: {
    ui: {
      sub: "Международная образовательная платформа нейроанатомии, кардиологии, флебологии и клинической тактики.",
      modLabel: "1. АНАТОМИЧЕСКИЙ РАЗДЕЛ",
      stateLabel: "2. КЛИНИЧЕСКАЯ СТАДИЯ",
      tabs: ["Позвоночник", "Головной мозг", "Нейрон и Аксон", "Сосуды мозга", "Шейный отдел", "Сердце и сосуды", "Вены ног и варикоз", "Коленный сустав"],
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
      },
      {
        buttons: ["1. Норма вен и клапанов", "2. Начальный варикоз / Рефлюкс (Терапия)", "3. Варикозные узлы / Тромбоз (Флеболог)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Здоровый венозный отток и клапаны голени", desc: "Стенки глубоких и подкожных вен (синие) эластичны, створки венозных клапанов плотно смыкаются и направляют кровь строго вверх к сердцу.", tactics: "Операция не требуется. Полезна ходьба, плавание и разминка мышц голени при сидячей работе.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Недостаточность клапанов и рефлюкс", desc: "Умеренное расширение просвета вены (оранжевая зона), створки клапана смыкаются не до конца, возникает обратный ток крови и вечерние отеки.", tactics: "Лечится без операции: компрессионный трикотаж, флеботоники, контрастный душ и лечебная ходьба.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консультация флеболога", color: "#ef4444", title: "Варикозная трансформация и риск тромбоза", desc: "Выраженное узловое расширение и извитость вены (красные узлы) с застоем крови и высоким риском тромбофлебита.", tactics: "Необходимо УЗДС вен нижних конечностей и осмотр сосудистого хирурга (решается вопрос о лазерной коагуляции ЭВЛК).", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Норма сустава и менисков", "2. Надрыв мениска / Артроз (Терапия)", "3. Разрыв ПКС / Гонартроз (Артроскопия)"],
        states: [
          { pill: "Норма", color: "#38bdf8", title: "Здоровый коленный сустав, мениски и связки", desc: "Суставной хрящ (синий) гладкий, оба мениска амортизируют нагрузку, а крестообразные связки (жёлтые) стабильно удерживают сустав.", tactics: "Операция не требуется. Рекомендуется укрепление мышц бедра и умеренная активность.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консервативное лечение", color: "#f59e0b", title: "Дегенеративный надрыв мениска / Артроз I–II ст.", desc: "Локальное истончение хряща и повреждение мениска (оранжевая зона) без блокирования сустава.", tactics: "Лечится без операции: ЛФК для стабилизации колена, физиотерапия, хондропротекторы и контроль веса.", author: "Базовая редакция OpenNeuroAtlas" },
          { pill: "Консультация ортопеда", color: "#ef4444", title: "Полный разрыв ПКС / Выраженный гонартроз", desc: "Нарушение целостности передней крестообразной связки или грубый дефект хряща (красная зона) с нестабильностью.", tactics: "Требуется МРТ коленного сустава и осмотр травматолога-ортопеда (решается вопрос об артроскопии).", author: "Базовая редакция OpenNeuroAtlas" }
        ]
      }
    ]
  },
  en: {
    ui: {
      sub: "International open-source platform for neuroanatomy, cardiology, phlebology, and clinical decision-making.",
      modLabel: "1. ANATOMICAL MODULE",
      stateLabel: "2. CLINICAL STAGE",
      tabs: ["Spine", "Brain", "Neuron & Axon", "Brain Vessels", "Cervical Spine", "Heart & Vessels", "Leg Veins & Varicose", "Knee Joint"],
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
      },
      {
        buttons: ["1. Healthy Veins & Valves", "2. Early Varicose / Reflux (Therapy)", "3. Varicose Nodes / Thrombosis (Surgery)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Venous Return & Leg Valves", desc: "Deep and superficial vein walls (blue) are elastic, and venous valve cusps close tightly to guide blood upward to the heart.", tactics: "No surgery required. Regular walking and calf muscle activity support healthy circulation.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Valve Insufficiency & Venous Reflux", desc: "Mild vein dilation (orange) prevents full valve closure, causing backward blood flow and evening leg heaviness.", tactics: "Managed without surgery via compression stockings, venotonics, and walking.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Vascular Review", color: "#ef4444", title: "Varicose Tortuosity & Thrombosis Risk", desc: "Severe nodular vein dilation (red nodes) leads to blood stasis and thrombophlebitis risk.", tactics: "Requires duplex ultrasound (DUS) and vascular surgeon evaluation (EVLT laser ablation).", author: "Base Edition OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Healthy Knee & Menisci", "2. Meniscus Tear / Osteoarthritis (Therapy)", "3. ACL Rupture / Severe Arthrosis (Surgery)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Healthy Knee Joint, Menisci & Ligaments", desc: "Articular cartilage (blue) is smooth, both menisci cushion load, and cruciate ligaments (yellow) stabilize the joint.", tactics: "No surgery required. Quadriceps strengthening and balanced activity are recommended.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Conservative Care", color: "#f59e0b", title: "Degenerative Meniscus Tear / Grade I–II Arthrosis", desc: "Localized cartilage thinning and meniscus wear (orange) without mechanical joint locking.", tactics: "Managed non-surgically via targeted physical therapy, physiotherapy, and load management.", author: "Base Edition OpenNeuroAtlas" },
          { pill: "Orthopedic Review", color: "#ef4444", title: "Complete ACL Tear / Advanced Gonarthrosis", desc: "Cruciate ligament rupture or severe cartilage defect (red) causing joint instability.", tactics: "Requires knee MRI and orthopedic surgeon evaluation (arthroscopic reconstruction).", author: "Base Edition OpenNeuroAtlas" }
        ]
      }
    ]
  },
  es: {
    ui: {
      sub: "Plataforma internacional de código abierto para neuroanatomía, cardiología, flebología y estrategia clínica.",
      modLabel: "1. MÓDULO ANATÓMICO",
      stateLabel: "2. ETAPA CLÍNICA",
      tabs: ["Columna", "Cerebro", "Neurona y Axón", "Vasos Cerebrales", "Columna Cervical", "Corazón y Vasos", "Venas y Varices", "Articulación de Rodilla"],
      tacticsLabel: "Estrategia Clínica:",
      authorLabel: "Editor / Consultor: ",
      editBtn: "Modo Médico",
      fsBtn: "Pantalla completa",
      hint: "Clic izq. — Rotar • Rueda — Zoom",
      disc: "Proyecto educativo de código abierto (MIT). Destinado a médicos, estudiantes y pacientes; no sustituye la consulta médica."
    },
    modules: [
      {
        buttons: ["1. Norma Anatómica", "2. Protusión Discal (Sin cirugía)", "3. Hernia con Compresión (Cirugía)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Segmento Vertebral Sano", desc: "El disco intervertebral (azul) mantiene su altura. La médula espinal y las raíces (amarillo) están libres.", tactics: "No requiere cirugía. Se recomienda fortalecimiento muscular.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Protusión Discal Temprana", desc: "Leve abombamiento del anillo (naranja) sin compresión radicular grave.", tactics: "El 85–90% mejora sin cirugía mediante fisioterapia dirigida.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Evaluación Quirúrgica", color: "#ef4444", title: "Extrusión Discal con Compresión", desc: "El núcleo herniado (rojo) comprime directamente la raíz nerviosa.", tactics: "Requiere resonancia magnética (RM) y valoración neuroquirúrgica.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Cerebro Normal", "2. Espasmo Vascular (Terapia)", "3. Lesión Focal (Neurocirugía)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Neuroanatomía Cerebral Normal", desc: "Los hemisferios, el cerebelo y el tronco encefálico muestran volumen y flujo normales.", tactics: "No se requiere intervención.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Angioespasmo Focal / Isquemia Leve", desc: "Los hemisferios translúcidos revelan reducción reversible del flujo (naranja).", tactics: "Manejo no quirúrgico con terapia vascular y neuroprotectora.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Evaluación Quirúrgica", color: "#ef4444", title: "Efecto de Masa Intracerebral", desc: "Lesión focal o hematoma (rojo) que presiona el tejido cerebral.", tactics: "Diagnóstico urgente por RM/TC y evaluación neuroquirúrgica.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Neurona y Axón Sanos", "2. Estrés de Mielina (Terapia)", "3. Bloqueo Sináptico (Especialista)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Neurona, Dendritas y Axón Sanos", desc: "Las dendritas reciben señales y la mielina intacta (azul) conduce impulsos hacia la sinapsis.", tactics: "Norma fisiológica.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Desmielinización Segmentaria", desc: "Adelgazamiento local de la mielina (naranja); el axón central sigue intacto.", tactics: "Reversible sin cirugía con terapia neurometabólica.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Atención Especializada", color: "#ef4444", title: "Bloqueo Axonal y Fallo Sináptico", desc: "Daño axonal severo (rojo) que interrumpe la transmisión.", tactics: "Requiere electromiografía (EMG) y revisión neurológica.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Polígono de Willis Sano", "2. Angioespasmo Funcional (Terapia)", "3. Aneurisma / Oclusión (Cirugía)"],
        states: [
          { pill: "Flujo Normal", color: "#38bdf8", title: "Polígono de Willis Intacto", desc: "Las arterias carótidas y cerebrales forman un anillo cerrado con flujo pulsátil uniforme.", tactics: "No requiere cirugía.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Angioespasmo o Estenosis Leve", desc: "Estrechamiento local de la arteria cerebral media (naranja) compensado por colaterales.", tactics: "Tratamiento conservador sin cirugía con antiespasmódicos.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Neurocirugía Urgente", color: "#ef4444", title: "Aneurisma Sacular / Oclusión Crítica", desc: "Dilatación de la pared arterial (cúpula roja) con alto riesgo de ruptura.", tactics: "Requiere angio-TC y evaluación neuroquirúrgica urgente.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Columna Cervical Sana (C4–C6)", "2. Espasmo Arteria Vertebral (Terapia)", "3. Mielopatía Cervical (Cirugía)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Columna Cervical y Arterias Vertebrales Sanas", desc: "Las vértebras C4–C6 mantienen su curvatura natural y las arterias vertebrales (rojo) irrigan el cerebro.", tactics: "No requiere cirugía.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Espasmo Cervical y Compresión Arterial", desc: "El espasmo muscular (naranja) estrecha la arteria vertebral derecha causando mareos.", tactics: "Manejo sin cirugía con fisioterapia y relajantes musculares.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Evaluación Quirúrgica", color: "#ef4444", title: "Hernia Cervical y Compresión Medular", desc: "Extrusión discal (rojo) que presiona directamente la médula espinal cervical.", tactics: "Requiere RM cervical urgente y valoración neuroquirúrgica.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Ritmo y Coronarias Sanos", "2. Espasmo Coronario / Angina (Terapia)", "3. Oclusión Arterial / Isquemia (Stent)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Miocardio y Flujo Coronario Sanos", desc: "El corazón late rítmicamente bombeando sangre a la aorta mientras las coronarias nutren el músculo.", tactics: "No requiere cirugía.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Espasmo Coronario / Angina Estable", desc: "Estrechamiento moderado de la arteria coronaria izquierda (naranja) durante el esfuerzo.", tactics: "Controlado sin cirugía con nitratos, betabloqueantes y estatinas.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Cardiología Urgente", color: "#ef4444", title: "Oclusión Coronaria Crítica", desc: "Bloqueo completo del vaso coronario (rojo) con isquemia miocárdica aguda.", tactics: "Requiere coronariografía urgente y colocación de stent.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Venas y Válvulas Sanas", "2. Varices Iniciales / Reflujo (Terapia)", "3. Nódulos Varicosos / Trombosis (Cirugía)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Retorno Venoso y Válvulas Sanas", desc: "Las paredes venosas (azul) son elásticas y las válvulas cierran bien impulsando la sangre hacia arriba.", tactics: "No requiere cirugía. Caminar regularmente favorece la circulación.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Insuficiencia Valvular y Reflujo", desc: "Dilatación venosa leve (naranja) con cierre incompleto de válvulas y pesadez vespertina.", tactics: "Manejo sin cirugía con medias de compresión y flebotónicos.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Revisión Vascular", color: "#ef4444", title: "Tortuosidad Varicosa y Riesgo de Trombosis", desc: "Dilatación nodular severa (nódulos rojos) con estasis sanguínea y riesgo de tromboflebitis.", tactics: "Requiere ecografía Doppler (DUS) y valoración por cirujano vascular.", author: "Edición Base OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Rodilla y Meniscos Sanos", "2. Desgarro Meniscal / Artrosis (Terapia)", "3. Rotura LCA / Gonartrosis (Cirugía)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Articulación de Rodilla y Meniscos Sanos", desc: "El cartílago articular (azul) es liso y los ligamentos cruzados (amarillo) mantienen la estabilidad.", tactics: "No requiere cirugía. Se recomienda fortalecimiento muscular.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Tratamiento Conservador", color: "#f59e0b", title: "Lesión Meniscal Degenerativa / Artrosis I–II", desc: "Adelgazamiento local del cartílago (naranja) sin bloqueo articular.", tactics: "Tratamiento sin cirugía mediante fisioterapia y control de carga.", author: "Edición Base OpenNeuroAtlas" },
          { pill: "Revisión Ortopédica", color: "#ef4444", title: "Rotura Completa de LCA / Gonartrosis Severa", desc: "Ruptura del ligamento cruzado o defecto grave del cartílago (rojo).", tactics: "Requiere RM de rodilla y valoración por traumatólogo (artroscopia).", author: "Edición Base OpenNeuroAtlas" }
        ]
      }
    ]
  },
  de: {
    ui: {
      sub: "Internationale Open-Source-Plattform für Neuroanatomie, Kardiologie, Phlebologie und klinische Taktik.",
      modLabel: "1. ANATOMISCHES MODUL",
      stateLabel: "2. KLINISCHES STADIUM",
      tabs: ["Wirbelsäule", "Gehirn", "Neuron & Axon", "Hirngefäße", "Halswirbelsäule", "Herz & Gefäße", "Beinvenen & Varizen", "Kniegelenk"],
      tacticsLabel: "Klinische Strategie:",
      authorLabel: "Redakteur / Berater: ",
      editBtn: "Arztmodus",
      fsBtn: "Vollbild",
      hint: "Linksklick — Drehen • Mausrad — Zoom",
      disc: "Open-Source-Bildungsprojekt (MIT). Für Ärzte, Studenten und Patienten; ersetzt keine ärztliche Untersuchung."
    },
    modules: [
      {
        buttons: ["1. Anatomische Norm", "2. Bandscheibenprotrusion (Konservativ)", "3. Bandscheibenvorfall (Chirurgie)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Gesundes Bewegungssegment", desc: "Die Bandscheibe (blau) behält ihre Höhe. Rückenmark und Nervenwurzeln (gelb) sind frei.", tactics: "Keine Operation erforderlich. Muskelaufbau empfohlen.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Frühe Bandscheibenvorwölbung", desc: "Leichte Vorwölbung (orange) ohne schwere Nervenwurzelkompression.", tactics: "85–90% heilen ohne Operation durch gezielte Physiotherapie.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Chirurgische Prüfung", color: "#ef4444", title: "Bandscheibenextrusion mit Kompression", desc: "Ausgetretener Gallertkern (rot) drückt direkt auf die Nervenwurzel.", tactics: "MRT-Diagnostik und neurochirurgische Konsultation erforderlich.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Normales Gehirn", "2. Gefäßspasmus (Therapie)", "3. Raumforderung (Neurochirurgie)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normale Hirnanatomie", desc: "Großhirn, Kleinhirn und Hirnstamm zeigen normales Volumen und gute Durchblutung.", tactics: "Kein Eingriff notwendig.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Lokaler Angiospasmus / Leichte Ischämie", desc: "Transparente Hemisphären zeigen eine reversible Minderdurchblutung (orange).", tactics: "Nicht-operative Behandlung mit gefäßaktiver Therapie.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Chirurgische Prüfung", color: "#ef4444", title: "Intrazerebraler Raumforderungsprozess", desc: "Lokaler Herd oder Hämatom (rot) mit Druck auf umliegendes Hirngewebe.", tactics: "Dringende MRT/CT-Bildgebung und neurochirurgische Abklärung.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Gesundes Neuron & Axon", "2. Myelin-Schwäche (Therapie)", "3. Synaptische Blockade (Facharzt)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Gesundes Neuron, Dendriten & Axon", desc: "Dendriten empfangen Signale und intaktes Myelin (blau) leitet Impulse schnell zur Synapse.", tactics: "Physiologische Norm.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Segmentale Demyelinisierung", desc: "Lokale Ausdünnung des Myelins (orange); der innere Axonzylinder bleibt intakt.", tactics: "Ohne Operation reversibel durch neurometabolische Therapie.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Fachärztliche Hilfe", color: "#ef4444", title: "Axonale Blockade & Synapsenausfall", desc: "Schwere Axonschädigung (rot) unterbricht die Reizweiterleitung.", tactics: "EMG-Diagnostik und neurologische Untersuchung erforderlich.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Gesunder Circulus Willisii", "2. Funktioneller Spasmus (Therapie)", "3. Aneurysma / Verschluss (Chirurgie)"],
        states: [
          { pill: "Normaler Fluss", color: "#38bdf8", title: "Intakter Circulus arteriosus Willisii", desc: "Hirnarterien bilden einen geschlossenen Ring mit gleichmäßigem pulsierendem Blutfluss.", tactics: "Keine Operation erforderlich.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Angiospasmus oder leichte Stenose", desc: "Lokale Verengung der mittleren Hirnarterie (orange), durch Kollateralen kompensiert.", tactics: "Konservative Behandlung ohne Operation mit Spasmolytika.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Dringende Neurochirurgie", color: "#ef4444", title: "Sakkuläres Aneurysma / Kritischer Verschluss", desc: "Aussackung der Arterienwand (rote Kuppel) mit hohem Rupturrisiko.", tactics: "CT-Angiographie und sofortige neurochirurgische Vorstellung.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Gesunde HWS (C4–C6)", "2. Arteria-vertebralis-Spasmus (Therapie)", "3. Zervikale Myelopathie (Chirurgie)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Normale Halswirbelsäule & Vertebralarterien", desc: "Die Wirbel C4–C6 bewahren ihre natürliche Lordose und die Arterien (rot) versorgen das Gehirn frei.", tactics: "Keine Operation erforderlich.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Zervikaler Spasmus & Gefäßkompression", desc: "Muskelverspannung (orange) verengt die rechte Vertebralarterie und verursacht Schwindel.", tactics: "Behandlung ohne Operation mittels Physiotherapie und Muskelrelaxantien.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Chirurgische Prüfung", color: "#ef4444", title: "Großer HWS-Vorfall mit Rückenmarkdruck", desc: "Bandscheibenvorfall (rot) engt den Spinalkanal ein und drückt auf das Rückenmark.", tactics: "Dringendes HWS-MRT und neurochirurgische Abklärung erforderlich.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Normaler Rhythmus & Koronarien", "2. Koronarspasmus / Angina (Therapie)", "3. Arterienverschluss / Ischämie (Stent)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Gesundes Myokard & Koronardurchblutung", desc: "Das Herz schlägt rhythmisch in die Aorta, während die Herzkranzgefäße den Muskel versorgen.", tactics: "Keine Operation erforderlich.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Koronarspasmus / Stabile Angina pectoris", desc: "Mäßige Verengung der linken Koronararterie (orange) bei körperlicher Belastung.", tactics: "Ohne Operation kontrollierbar mit Nitraten, Betablockern und Statinen.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Dringende Kardiologie", color: "#ef4444", title: "Kritischer Koronararterienverschluss", desc: "Vollständige Blockade des Kranzgefäßes (rot) mit akuter Myokardischämie.", tactics: "Notfall-Koronarangiographie und Stent-Implantation erforderlich.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Gesunde Venen & Klappen", "2. Frühe Varikose / Reflux (Therapie)", "3. Krampfadern / Thrombose (Phlebologe)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Gesunder venöser Rückfluss & Venenklappen", desc: "Die Venenwände (blau) sind elastisch und die Venenklappen schließen dicht zum Herzen hin.", tactics: "Keine Operation erforderlich. Regelmäßiges Gehen fördert den Rückfluss.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Klappeninsuffizienz & Venöser Reflux", desc: "Leichte Venenerweiterung (orange) verhindert vollständigen Klappenschluss.", tactics: "Behandlung ohne Operation durch Kompressionsstrümpfe und Venentonika.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Gefäßchirurgische Prüfung", color: "#ef4444", title: "Variköse Knotenbildung & Thromboserisiko", desc: "Starke knotige Erweiterung (rote Knoten) mit Blutstau und Thrombophlebitis-Risiko.", tactics: "Duplexsonographie (DUS) und gefäßchirurgische Untersuchung (EVLT-Laser).", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      },
      {
        buttons: ["1. Gesundes Knie & Menisken", "2. Meniskusriss / Arthrose (Therapie)", "3. Kreuzbandriss / Gonarthrose (Chirurgie)"],
        states: [
          { pill: "Normal", color: "#38bdf8", title: "Gesundes Kniegelenk, Menisken & Bänder", desc: "Der Gelenkknorpel (blau) ist glatt und die Kreuzbänder (gelb) stabilisieren das Gelenk.", tactics: "Keine Operation erforderlich. Kräftigung der Oberschenkelmuskulatur empfohlen.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Konservative Therapie", color: "#f59e0b", title: "Degenerativer Meniskusschaden / Arthrose I–II", desc: "Lokale Knorpelausdünnung (orange) ohne mechanische Gelenkblockade.", tactics: "Konservative Behandlung mit Physiotherapie und gezieltem Muskelaufbau.", author: "Basisausgabe OpenNeuroAtlas" },
          { pill: "Orthopädische Prüfung", color: "#ef4444", title: "Kompletter Kreuzbandriss / Schwere Gonarthrose", desc: "Riss des vorderen Kreuzbandes oder schwerer Knorpeldefekt (rot).", tactics: "Knie-MRT und orthopädisch-chirurgische Untersuchung (Arthroskopie) erforderlich.", author: "Basisausgabe OpenNeuroAtlas" }
        ]
      }
    ]
  },
  zh: {
    ui: {
      sub: "面向神经解剖学、心脏病学、静脉学与临床决策的国际开源3D医学平台。",
      modLabel: "1. 解剖学模块",
      stateLabel: "2. 临床分期",
      tabs: ["脊柱", "大脑", "神经元与轴突", "脑血管", "颈椎", "心脏与血管", "下肢静脉曲张", "膝关节与半月板"],
      tacticsLabel: "临床策略：",
      authorLabel: "编辑 / 医学顾问：",
      editBtn: "医生模式",
      fsBtn: "全屏显示",
      hint: "左键拖动 — 旋转 • 滚轮 — 缩放",
      disc: "开源医学教育项目 (MIT)。仅供医生、医学生及患者参考，不能替代临床面诊。"
    },
    modules: [
      {
        buttons: ["1. 解剖正常", "2. 椎间盘膨出（保守治疗）", "3. 椎间盘突出压迫（手术评估）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "健康脊柱运动节段", desc: "椎间盘（蓝色）保持正常高度，脊髓和神经根（黄色）无受压。", tactics: "无需手术，建议加强腰背肌功能锻炼。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "早期椎间盘膨出", desc: "纤维环轻度膨出（橙色区域），尚未造成严重神经根受压。", tactics: "85–90% 可通过物理治疗与康复锻炼非手术恢复。", author: "OpenNeuroAtlas 基础版" },
          { pill: "外科评估", color: "#ef4444", title: "椎间盘脱出伴神经根受压", desc: "髓核突出（红色区域）直接压迫神经根。", tactics: "需行核磁共振（MRI）检查并由神经外科医生评估。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 脑部结构正常", "2. 脑血管痉挛（药物治疗）", "3. 局灶性占位（神经外科）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "正常脑部神经解剖", desc: "大脑半球、小脑及脑干体积正常，脑血流灌注良好。", tactics: "无需干预，注意控制脑血管危险因素。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "局灶性血管痉挛 / 轻度缺血", desc: "半透明大脑半球显示可逆性局部血流减少区（橙色）。", tactics: "无需手术，采用改善微循环及神经保护治疗。", author: "OpenNeuroAtlas 基础版" },
          { pill: "外科评估", color: "#ef4444", title: "颅内占位效应", desc: "局部病灶或血肿（红色）压迫周围正常脑组织。", tactics: "需紧急行头颅 MRI/CT 检查及神经外科会诊。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 神经元与轴突正常", "2. 髓鞘受损（营养神经）", "3. 轴突与突触阻滞（专科）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "健康神经元、树突与轴突", desc: "树突接收信号，胞体整合信息，完整髓鞘（蓝色）快速传导冲动至突触。", tactics: "生理正常状态。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "节段性脱髓鞘改变", desc: "局部髓鞘变薄（橙色节段），传导速度减慢但轴突核心完整。", tactics: "无需手术，通过神经营养药物及理疗可逆转。", author: "OpenNeuroAtlas 基础版" },
          { pill: "专科诊疗", color: "#ef4444", title: "轴突阻滞与突触传导中断", desc: "严重轴突损伤（红色区域）导致神经信号中断。", tactics: "需行肌电图（EMG）检查及神经科专科评估。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 脑底动脉环正常", "2. 功能性痉挛（保守治疗）", "3. 动脉瘤 / 闭塞（手术）"],
        states: [
          { pill: "血流正常", color: "#38bdf8", title: "完整的 Willis 脑底动脉环", desc: "颈内动脉、基底动脉与大脑动脉形成闭合环路，搏动性血流平稳。", tactics: "无需手术，保持正常血压即可。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "局灶性脑血管痉挛 / 轻度狭窄", desc: "大脑中动脉局部管腔变窄（橙色），侧支循环代偿供血。", tactics: "采用解痉及抗血小板药物保守治疗，无需手术。", author: "OpenNeuroAtlas 基础版" },
          { pill: "紧急神外", color: "#ef4444", title: "囊状动脉瘤 / 严重血栓闭塞", desc: "动脉壁薄弱膨出（红色瘤顶），存在破裂或脑卒中高风险。", tactics: "需紧急行脑血管 CTA 造影及神经外科介入评估。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 颈椎与椎动脉正常 (C4–C6)", "2. 椎动脉痉挛（理疗药物）", "3. 颈椎病伴脊髓受压（手术）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "正常颈椎生理曲度与椎动脉", desc: "C4–C6 颈椎保持自然前凸，椎间盘（蓝色）完整，双侧椎动脉（红色）供血顺畅。", tactics: "无需手术，建议进行颈深屈肌锻炼。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "颈源性痉挛与椎动脉受压", desc: "肌肉痉挛（橙色）导致右侧椎动脉管腔变窄，可引起头晕或耳鸣。", tactics: "通过理疗、肌松药及改善循环药物非手术治疗。", author: "OpenNeuroAtlas 基础版" },
          { pill: "外科评估", color: "#ef4444", title: "巨大型颈椎间盘突出压迫脊髓", desc: "突出髓核（红色）直接压迫颈段脊髓，存在脊髓型颈椎病风险。", tactics: "需紧急行颈椎 MRI 检查并由脊柱外科医生评估。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 心律与冠脉正常", "2. 冠脉痉挛 / 心绞痛（药物）", "3. 冠脉闭塞 / 心肌缺血（支架）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "健康心肌与冠状动脉血流", desc: "心脏规律搏动将血液泵入主动脉弓，冠状动脉均匀滋养心肌。", tactics: "无需手术，建议规律有氧运动并控制血脂。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "冠状动脉痉挛 / 稳定性心绞痛", desc: "左冠状动脉中度狭窄（橙色区域），劳累时心肌供氧暂时不足。", tactics: "通过硝酸酯类、β受体阻滞剂及他汀类药物规范治疗。", author: "OpenNeuroAtlas 基础版" },
          { pill: "紧急心内", color: "#ef4444", title: "冠状动脉严重闭塞", desc: "冠状动脉完全阻塞（红色阻断区）并形成急性心肌缺血灶。", tactics: "需紧急行冠状动脉造影及支架植入或搭桥手术。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 下肢静脉与瓣膜正常", "2. 早期静脉曲张 / 反流（保守）", "3. 静脉曲张结节 / 血栓（血管外科）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "健康下肢静脉回流与静脉瓣膜", desc: "静脉管壁（蓝色）富有弹性，静脉瓣膜闭合严密，引导血液自下而上回流心脏。", tactics: "无需手术，日常步行和小腿肌肉活动有助于静脉回流。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "静脉瓣膜功能不全与血液反流", desc: "静脉轻度扩张（橙色）导致瓣膜闭合不全，出现血液反流及傍晚下肢酸胀。", tactics: "穿戴医用弹力袜、口服静脉活性药物及步行锻炼。", author: "OpenNeuroAtlas 基础版" },
          { pill: "血管外科", color: "#ef4444", title: "迂曲静脉曲张结节与血栓风险", desc: "静脉严重结节状扩张迂曲（红色结节），血流淤滞且易发血栓性静脉炎。", tactics: "需行下肢静脉彩超（DUS）并由血管外科评估激光闭合术（EVLT）。", author: "OpenNeuroAtlas 基础版" }
        ]
      },
      {
        buttons: ["1. 膝关节与半月板正常", "2. 半月板损伤 / 骨关节炎（保守）", "3. 前交叉韧带断裂 / 重度关节炎（手术）"],
        states: [
          { pill: "正常", color: "#38bdf8", title: "健康膝关节、半月板与交叉韧带", desc: "关节软骨（蓝色）光滑，半月板缓冲负荷，交叉韧带（黄色）稳定关节。", tactics: "无需手术，建议加强股四头肌力量锻炼。", author: "OpenNeuroAtlas 基础版" },
          { pill: "保守治疗", color: "#f59e0b", title: "半月板退变性撕裂 / I–II期骨关节炎", desc: "局部软骨变薄与半月板磨损（橙色区域），无关节交锁。", tactics: "通过康复理疗、肌力训练及体重控制非手术治疗。", author: "OpenNeuroAtlas 基础版" },
          { pill: "骨科评估", color: "#ef4444", title: "前交叉韧带完全断裂 / 重度膝关节炎", desc: "交叉韧带断裂或严重软骨缺损（红色区域）导致关节不稳。", tactics: "需行膝关节 MRI 检查并由骨科医生评估关节镜手术。", author: "OpenNeuroAtlas 基础版" }
        ]
      }
    ]
  }
};
(function () {
  const extra = [
    {
      tabs: { ru: 'Почки и мочеточник', en: 'Kidneys & Ureter', es: 'Riñones y uréter', de: 'Nieren & Harnleiter', zh: '肾脏与输尿管' },
      mod: {
        buttons: ['1. Норма почки', '2. Микролит / Песок (Терапия)', '3. Камень лоханки / Колика (Уролог)'],
        states: [
          { pill: 'Норма', color: '#38bdf8', title: 'Анатомическая норма почки и оттока мочи', desc: 'Паренхима почки, лоханка и мочеточник (жёлтый) свободны, кровоток по почечной артерии и вене не нарушен.', tactics: 'Поддержание питьевого режима и контроль артериального давления.', author: 'OpenNeuroAtlas' },
          { pill: 'Консервативное лечение', color: '#f59e0b', title: 'Микролит лоханки / Мочекислый диатез', desc: 'Мелкий конкремент (оранжевый очаг) в почечной лоханке без полной закупорки мочеточника.', tactics: 'УЗИ почек, спазмолитики, коррекция диеты и питьевого режима.', author: 'OpenNeuroAtlas' },
          { pill: 'Урологическая помощь', color: '#ef4444', title: 'Крупный камень и обструкция мочеточника', desc: 'Конкремент (красный очаг) перекрывает выход в мочеточник, вызывая расширение и почечную колику.', tactics: 'Срочный осмотр уролога, УЗИ/КТ почек для выбора литотрипсии.', author: 'OpenNeuroAtlas' }
        ]
      }
    },
    {
      tabs: { ru: 'Печень и желчный пузырь', en: 'Liver & Gallbladder', es: 'Hígado y vesícula', de: 'Leber & Gallenblase', zh: '肝脏与胆囊' },
      mod: {
        buttons: ['1. Норма печени и протоков', '2. Застой желчи / Стеатоз (Диета)', '3. Камень пузыря / Гепатит (Врач)'],
        states: [
          { pill: 'Норма', color: '#38bdf8', title: 'Здоровая паренхима печени и желчеотток', desc: 'Правая и левая доли печени однородны, желчный пузырь и общий желчный проток (зелёный) свободно отводят желчь.', tactics: 'Сбалансированное питание и умеренная физическая активность.', author: 'OpenNeuroAtlas' },
          { pill: 'Консервативное лечение', color: '#f59e0b', title: 'Дискинезия и густая желчь (сладж)', desc: 'Замедление оттока желчи в пузыре (оранжевая зона) и начальная жировая нагрузка на печёночную ткань.', tactics: 'Дробное питание (стол №5), УЗИ брюшной полости и консультация гастроэнтеролога.', author: 'OpenNeuroAtlas' },
          { pill: 'Оценка хирурга / врача', color: '#ef4444', title: 'Конкремент желчного пузыря / Очаг поражения', desc: 'Крупный камень в шейке пузыря или выраженный очаг воспаления печени (красная зона).', tactics: 'Необходимо УЗИ органов брюшной полости и очная консультация хирурга или гепатолога.', author: 'OpenNeuroAtlas' }
        ]
      }
    },
    {
      tabs: { ru: 'Желудок и ДПК', en: 'Stomach & Duodenum', es: 'Estómago y duodeno', de: 'Magen & Zwölffingerdarm', zh: '胃与十二指肠' },
      mod: {
        buttons: ['1. Норма слизистой', '2. Гастрит / Эрозия (Терапия)', '3. Язва желудка / ДПК (Гастроэнтеролог)'],
        states: [
          { pill: 'Норма', color: '#38bdf8', title: 'Здоровая слизистая желудка и ДПК', desc: 'Пищевод, дно, тело желудка и луковица двенадцатиперстной кишки имеют защитный слизистый барьер.', tactics: 'Регулярное питание без длительных перерывов и раздражающей пищи.', author: 'OpenNeuroAtlas' },
          { pill: 'Консервативное лечение', color: '#f59e0b', title: 'Поверхностный гастрит / Эрозия слизистой', desc: 'Локальное воспаление и истончение защитного слоя (оранжевый очаг) на стенке желудка.', tactics: 'Гастроскопия (ФГДС), щадящая диета и гастропротекторная терапия по назначению врача.', author: 'OpenNeuroAtlas' },
          { pill: 'Срочная гастроскопия', color: '#ef4444', title: 'Язвенный дефект желудка или луковицы ДПК', desc: 'Глубокий дефект стенки (красный очаг) с риском кровотечения или перфорации.', tactics: 'Срочное проведение ФГДС, тест на H. pylori и лечение у гастроэнтеролога.', author: 'OpenNeuroAtlas' }
        ]
      }
    }
  ];
  Object.keys(DB).forEach((l) => {
    extra.forEach((item) => {
      DB[l].ui.tabs.push(item.tabs[l] || item.tabs.en);
      DB[l].modules.push(item.mod);
    });
  });
})();
(function () {
  const extra = [
    {
      tabs: { ru: 'Почки и мочеточник', en: 'Kidneys & Ureter', es: 'Riñones y uréter', de: 'Nieren & Harnleiter', zh: '肾脏与输尿管' },
      mod: {
        buttons: ['1. Норма почки', '2. Микролит / Песок (Терапия)', '3. Камень лоханки / Колика (Уролог)'],
        states: [
          { pill: 'Норма', color: '#38bdf8', title: 'Анатомическая норма почки и оттока мочи', desc: 'Паренхима почки, лоханка и мочеточник (жёлтый) свободны, кровоток по почечной артерии и вене не нарушен.', tactics: 'Поддержание питьевого режима и контроль артериального давления.', author: 'OpenNeuroAtlas' },
          { pill: 'Консервативное лечение', color: '#f59e0b', title: 'Микролит лоханки / Мочекислый диатез', desc: 'Мелкий конкремент (оранжевый очаг) в почечной лоханке без полной закупорки мочеточника.', tactics: 'УЗИ почек, спазмолитики, коррекция диеты и питьевого режима.', author: 'OpenNeuroAtlas' },
          { pill: 'Урологическая помощь', color: '#ef4444', title: 'Крупный камень и обструкция мочеточника', desc: 'Конкремент (красный очаг) перекрывает выход в мочеточник, вызывая расширение и почечную колику.', tactics: 'Срочный осмотр уролога, УЗИ/КТ почек для выбора литотрипсии.', author: 'OpenNeuroAtlas' }
        ]
      }
    },
    {
      tabs: { ru: 'Печень и желчный пузырь', en: 'Liver & Gallbladder', es: 'Hígado y vesícula', de: 'Leber & Gallenblase', zh: '肝脏与胆囊' },
      mod: {
        buttons: ['1. Норма печени и протоков', '2. Застой желчи / Стеатоз (Диета)', '3. Камень пузыря / Гепатит (Врач)'],
        states: [
          { pill: 'Норма', color: '#38bdf8', title: 'Здоровая паренхима печени и желчеотток', desc: 'Правая и левая доли печени однородны, желчный пузырь и общий желчный проток (зелёный) свободно отводят желчь.', tactics: 'Сбалансированное питание и умеренная физическая активность.', author: 'OpenNeuroAtlas' },
          { pill: 'Консервативное лечение', color: '#f59e0b', title: 'Дискинезия и густая желчь (сладж)', desc: 'Замедление оттока желчи в пузыре (оранжевая зона) и начальная жировая нагрузка на печёночную ткань.', tactics: 'Дробное питание (стол №5), УЗИ брюшной полости и консультация гастроэнтеролога.', author: 'OpenNeuroAtlas' },
          { pill: 'Оценка хирурга / врача', color: '#ef4444', title: 'Конкремент желчного пузыря / Очаг поражения', desc: 'Крупный камень в шейке пузыря или выраженный очаг воспаления печени (красная зона).', tactics: 'Необходимо УЗИ органов брюшной полости и очная консультация хирурга или гепатолога.', author: 'OpenNeuroAtlas' }
        ]
      }
    },
    {
      tabs: { ru: 'Желудок и ДПК', en: 'Stomach & Duodenum', es: 'Estómago y duodeno', de: 'Magen & Zwölffingerdarm', zh: '胃与十二指肠' },
      mod: {
        buttons: ['1. Норма слизистой', '2. Гастрит / Эрозия (Терапия)', '3. Язва желудка / ДПК (Гастроэнтеролог)'],
        states: [
          { pill: 'Норма', color: '#38bdf8', title: 'Здоровая слизистая желудка и ДПК', desc: 'Пищевод, дно, тело желудка и луковица двенадцатиперстной кишки имеют защитный слизистый барьер.', tactics: 'Регулярное питание без длительных перерывов и раздражающей пищи.', author: 'OpenNeuroAtlas' },
          { pill: 'Консервативное лечение', color: '#f59e0b', title: 'Поверхностный гастрит / Эрозия слизистой', desc: 'Локальное воспаление и истончение защитного слоя (оранжевый очаг) на стенке желудка.', tactics: 'Гастроскопия (ФГДС), щадящая диета и гастропротекторная терапия по назначению врача.', author: 'OpenNeuroAtlas' },
          { pill: 'Срочная гастроскопия', color: '#ef4444', title: 'Язвенный дефект желудка или луковицы ДПК', desc: 'Глубокий дефект стенки (красный очаг) с риском кровотечения или перфорации.', tactics: 'Срочное проведение ФГДС, тест на H. pylori и лечение у гастроэнтеролога.', author: 'OpenNeuroAtlas' }
        ]
      }
    }
  ];
  Object.keys(DB).forEach((l) => {
    extra.forEach((item) => {
      DB[l].ui.tabs.push(item.tabs[l] || item.tabs.en);
      DB[l].modules.push(item.mod);
    });
  });
})();
