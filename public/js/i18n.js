/* ========================================
   ELATEVE — Lightweight EN / ES switch
   English lives in the HTML (source of truth); this file only carries
   the Spanish overrides. Elements opt in with:
     data-i18n="key"              -> sets textContent
     data-i18n-html="key"         -> sets innerHTML (for <br>, <strong>)
     data-i18n-placeholder="key"  -> sets the input placeholder
   The journal (rendered from data) is translated from /i18n/blog-es.json by app.js.
   ======================================== */
(function () {
  var STORAGE = 'elateve_lang';

  var ES = {
    // nav + shared CTA
    'nav.home': 'Inicio',
    'nav.machinery': 'La maquinaria',
    'nav.whyus': 'Por qué nosotras',
    'nav.journal': 'Diario',
    'nav.about': 'Quiénes somos',
    'cta.book': 'Reservar 30 minutos',

    // hero
    'hero.eyebrow': 'Una alianza de longevidad · Barcelona',
    'strip.label': 'Instalado y funcionando en',
    'hero.title': 'La propuesta integral de <span class="gold-text">bienestar y longevidad</span> <br>para la hostelería, de principio a fin.',
    'hero.m4': 'Más gasto por viaje de los viajeros de bienestar',
    'hero.sub': 'ELATEVE powered by Kloodos convierte el espacio de bienestar infrautilizado en una propuesta de recuperación medible, para spas de hotel, clubes deportivos, espacios de coworking y centros de bienestar. Los huéspedes buscan renovación real, no relajación pasiva. Ofrecemos protocolos, tecnología y formación de un solo socio, en exclusiva para España y Europa.',
    'hero.cta2': 'Ver qué entregamos',
    'hero.m1': 'Tecnologías de grado médico',
    'hero.m2': 'Años de diseño de protocolos',
    'hero.m3': 'Socio, de la instalación al resultado',

    // the system / what we deliver
    'sys.eyebrow': 'Qué entregamos',
    'sys.title': 'Un espacio de longevidad llave en mano. <br>Un contrato, un socio.',
    'sys.lead': 'No un catálogo de máquinas. Una propuesta de longevidad completa, diseñada para su edificio, que instalamos, dotamos de personal y comercializamos por usted.',
    'sys.s1t': 'Concepto y viabilidad',
    'sys.s1d': 'Recorremos el espacio, dibujamos el plano y trazamos el recorrido del huésped antes de encargar nada.',
    'sys.s2t': 'Suministro e instalación de tecnología',
    'sys.s2d': 'Más de 15 modalidades de grado médico de un único proveedor: crioterapia de cuerpo entero, oxígeno hiperbárico (HBOT), terapia de luz roja, sueroterapia y NAD+, compresión con aprobación de la FDA, electroestimulación (EMS), flotación en seco y más.',
    'sys.s3t': 'Protocolos integrados',
    'sys.s3d': 'Tratamientos secuenciados para funcionar juntos, para que los huéspedes se queden más tiempo, gasten más y vuelvan.',
    'sys.s4t': 'Formación y certificación del equipo',
    'sys.s4d': 'Su personal formado en cada modalidad — el qué, el cómo, el cuándo y el porqué — con formación continua y soporte de protocolos.',
    'sys.s5t': 'Lanzamiento y soporte comercial',
    'sys.s5d': 'Posicionamiento, nombre comercial, diseño de la carta, materiales de lanzamiento y orientación de precios, para que el espacio se llene desde la primera semana.',
    'sys.s6t': 'Servicio, mantenimiento y un único interlocutor',
    'sys.s6d': 'Un solo número para tecnología, repuestos, mantenimiento y soporte, durante toda la vida de la instalación.',
    'sys.line': 'Desde el primer plano hasta el resultado que sienten sus huéspedes — de principio a fin, bajo un mismo techo.',

    // track record
    'rec.eyebrow': 'Trayectoria',
    'rec.title': 'Ya presente en los espacios <br>que no aceptan menos.',
    'rec.lead': 'La tecnología y los protocolos de ELATEVE powered by Kloodos están instalados y en funcionamiento en el deporte de élite, la hostelería de lujo y el bienestar médico privado — desde salas de recuperación de la Premier League hasta spas de cinco estrellas.',
    'rec.standard': 'Especificamos únicamente equipos de grado médico y clínicamente validados — nunca dispositivos de consumo, nunca materiales de segunda. Ese estándar es la razón por la que estos nombres lo dejan entrar en sus edificios.',
    'rec.rolllabel': 'Algunos de los espacios donde ya funciona',
    'rec.rollmore': 'Y más, que compartimos bajo petición',

    // the market
    'mkt.eyebrow': 'El mercado',
    'mkt.title': 'La demanda ya está aquí. <br>La oferta, no.',
    'mkt.n2': '7,8% → 18%',
    'mkt.n3': '$1,4 bill.',
    'mkt.n4': '$9,8 bill.',
    'mkt.s1l': 'Lo que gasta por viaje un turista de bienestar internacional frente al turista medio',
    'mkt.s2l': 'Los viajes de bienestar son el 7,8% de todos los viajes — pero casi una quinta parte de lo que gastan los viajeros',
    'mkt.s3l': 'Tamaño previsto del turismo de bienestar en 2027, desde 1 billón de dólares en 2024',
    'mkt.s4l': 'Economía global del bienestar prevista para 2029 — la longevidad es su segmento de más rápido crecimiento',
    'mkt.fomo1': 'Las personas que impulsan ese gasto — huéspedes de alto poder adquisitivo, viajeros centrados en la longevidad, presupuestos de salud ejecutiva y deporte de élite — <strong>buscan activamente un lugar creíble donde destinarlo</strong>, y la mayoría de los establecimientos no pueden ofrecérselo.',
    'mkt.fomo2': 'Hay espacio para aproximadamente <strong>un destino de longevidad serio por ciudad</strong>. Quien instala primero suele conservar esa posición. Sus competidores ya están teniendo esta conversación con nosotras.',
    'mkt.src': 'Fuentes: Global Wellness Institute, 2023–2024.',
    'exp.eyebrow': 'Profundice',
    'exp.title': 'Vea el caso, y vea las máquinas.',

    // the opportunity
    'opp.eyebrow': 'La oportunidad',
    'opp.title': 'Su planta de bienestar es el espacio <br>menos aprovechado del edificio.',
    'opp.lead': 'Los clientes que más gastan — y una ola creciente de viajeros centrados en la longevidad — buscan activamente dónde destinar ese gasto. Una propuesta de longevidad seria y con respaldo científico es, cada vez más, la razón por la que eligen un establecimiento, o un club, frente a otro.',
    'opp.p2': 'La mayoría de los establecimientos no pueden atender esa demanda, porque la propuesta hay que ensamblarla con piezas que nunca se diseñaron para funcionar juntas. No solo suministramos la tecnología: recorremos el espacio, dibujamos el plano y asesoramos sobre dónde encaja cada modalidad.',
    'opp.p3': 'Su spa se diseñó para otro huésped, en otra década de demanda. Evaluamos lo que ya tiene y proponemos los cambios que atraen al cliente que entra hoy.',
    'opp.sub': 'Y no solo spas. Planificamos el espacio y asesoramos en toda la hostelería:',
    'opp.t1': 'Hoteles y resorts',
    'opp.t2': 'Clubes privados',
    'opp.t3': 'Espacios de coworking',
    'opp.t4': 'Gimnasios y clubes fitness',
    'opp.t5': 'Clubes deportivos y atléticos',
    'opp.t6': 'Residencias',
    'opp.t7': 'Clínicas de longevidad',

    // ROI
    'roi.eyebrow': 'El retorno',
    'roi.title': 'Lo que devuelve el espacio.',
    'roi.lead': 'Tres ejemplos ilustrativos. Las cifras reales dependen de su superficie, ubicación y tarifa — las modelamos con rigor en la propuesta.',
    'roi.c1k': 'Camilla HBOT',
    'roi.c1fig': 'El mayor ingreso por m²',
    'roi.c1d': 'Con sesiones diarias desde una superficie compacta, una camilla hiperbárica reclinable es uno de los activos con mayor ingreso del espacio.',
    'roi.c2k': 'Reconfiguración del spa',
    'roi.c2fig': 'Categoría de mayor margen',
    'roi.c2d': 'Reconvertir una sala de tratamiento infrautilizada en una suite de recuperación con crioterapia y compresión suele elevar la ocupación de la sala y añade una categoría de servicio premium por encima de los tratamientos estándar.',
    'roi.c3k': 'Membresía y fidelización',
    'roi.c3fig': 'Ingresos recurrentes',
    'roi.c3d': 'Los operadores citan una propuesta de longevidad creíble como una de las principales razones por las que los clientes se asocian y se quedan, lo que protege los ingresos recurrentes, no solo los de tratamiento.',
    'roi.note': 'Los ejemplos mostrados son ilustrativos, no presupuestos ni garantías.',

    // who we are
    'who.eyebrow': 'Quiénes somos',
    'who.title': 'Dos especialistas. <br>Una propuesta de longevidad.',
    'who.p1': 'ELATEVE es la curadora de longevidad: la experiencia, los protocolos y la marca de cara al huésped. Kloodos es la curadora de tecnología de bienestar para el deporte de élite, la hostelería de lujo y la salud médica privada, y fabricante de las principales tecnologías de bienestar del mundo desde 2014.',
    'who.p2': 'Juntas somos la <strong>alianza exclusiva de tecnología de longevidad para España y Europa</strong>, con sede en Barcelona. Un establecimiento nunca tiene que ensamblar una propuesta de bienestar con piezas que no se diseñaron para funcionar juntas.',
    'who.p3': 'Solo especificamos equipos de grado médico, somos su único punto de contacto desde antes de la instalación hasta el servicio continuo, y mantenemos los protocolos y la formación siempre actualizados. Todo centralizado con un único socio.',
    'who.t1': 'Exclusiva · España y Europa',
    'who.t2': 'Con sede en Barcelona',
    'who.t3': 'Solo grado médico',
    'who.t4': 'Un único interlocutor',

    // why us
    'why.eyebrow': 'Por qué ELATEVE powered by Kloodos',
    'why.title': 'El único socio que asume <br>todo el proyecto, de principio a fin.',
    'why.lead': 'La mayoría de los proveedores de bienestar le venden una máquina y se marchan. Nosotras diseñamos el concepto, suministramos toda la tecnología, creamos los protocolos que la hacen funcionar en conjunto, formamos a su equipo y permanecemos durante toda la vida de la instalación.',
    'why.i1t': 'Una agenda de contactos que no se compra',
    'why.i1d': 'Una red sin igual de expertos del deporte profesional de élite y la salud médica privada, disponible para su proyecto.',
    'why.i2t': 'Llave en mano, no a base de prueba y error',
    'why.i2d': 'Planos esquemáticos, orientación sobre el flujo lógico y la ubicación de cada tecnología, y soluciones llave en mano para un bienestar completo y real.',
    'why.i3t': 'Protocolos, no solo productos',
    'why.i3d': 'Protocolos integrados que secuencian todas las tecnologías para que los huéspedes se queden más tiempo y vuelvan una y otra vez.',
    'why.i4t': 'Formación en profundidad',
    'why.i4d': 'Formación exhaustiva en cada tecnología — el qué, el cómo, el cuándo y el porqué — más formación y soporte continuos de los protocolos.',
    'why.i5t': 'Más de 70 años de diseño de protocolos',
    'why.i5d': 'Un equipo con más de 70 años de experiencia combinada desarrollando protocolos de tratamiento galardonados para spas premium de todo el mundo.',
    'why.i6t': 'Probado en los dispositivos que ya llevan los huéspedes',
    'why.i6d': 'Protocolos que han demostrado resultados inmediatos y acumulativos en los dispositivos de diagnóstico cotidianos: Whoop, Oura y el resto.',
    'why.motto': 'Relevante · Coherente · Lógico · Fiable · Cautivador · Integrado · Completo',
    'why.cta': 'Ver por qué nosotras y quién ya confía',

    // why us page
    'wu.eyebrow': 'Confianza',
    'wu.title': 'Por qué nosotras y quién ya confía',
    'wu.sub': 'El argumento de un solo socio, y los nombres que ya lo respaldan.',
    'wu.asl': 'Visto en',
    'wu.ast': 'Manchester United FC',
    'wu.asd': 'La cápsula Kokoon para el sistema nervioso de nuestro stack es la misma tecnología creada para la suite de Recuperación y Rendimiento del primer equipo del Manchester United, la «K-Suite», que secuencia sonido, vibración y luz en la recuperación de sus jugadores.',

    // 360 approach
    'app.eyebrow': 'Nuestro enfoque 360°',
    'app.title': 'Regular. Depurar. Regenerar.',
    'app.lead': 'La salud verdadera no consiste en tratar síntomas uno a uno — es restaurar la propia capacidad del cuerpo de regularse, adaptarse, repararse y prosperar. En el centro de todo lo que construimos está la <strong>regulación del sistema nervioso</strong>: el sistema que gobierna el rendimiento cerebral, la resiliencia emocional, las hormonas, la inmunidad, la salud cardiovascular, la digestión, la recuperación y la reparación celular.',
    'app.s1t': 'Regular',
    'app.s1d': 'Sacar al cuerpo del estrés crónico y el predominio simpático hacia un estado equilibrado donde la curación, la recuperación y la adaptación puedan ocurrir de verdad — la base que hace que cada terapia posterior funcione mejor.',
    'app.s2t': 'Depurar',
    'app.s2d': 'Apoyar las vías naturales de detoxificación del cuerpo, optimizar la circulación y el aporte de oxígeno, mejorar la función linfática y el rendimiento mitocondrial — restaurando la homeostasis fisiológica en múltiples sistemas.',
    'app.s3t': 'Regenerar',
    'app.s3d': 'Aumentar la producción de energía celular, mejorar la oxigenación de los tejidos, reducir la inflamación y apoyar la reparación intrínseca del cuerpo — construyendo resiliencia, vitalidad y envejecimiento saludable a largo plazo.',
    'app.note': 'No son tratamientos aislados — un ecosistema integrado de tecnologías clínicamente probadas, secuenciadas de forma intencionada para que cada modalidad prepare el cuerpo para la siguiente. El resultado es mayor que la suma de las partes.',

    // what we install (short teaser; full detail lives on /machinery, English for now)
    'inst.cta': 'Véalo con sus propios ojos',

    // the machinery page (device cards stay English for now)
    'mach.eyebrow': 'Véalo con sus propios ojos',
    'mach.title': 'La maquinaria',
    'mach.sub': 'Nueve tecnologías. Fotos reales, explicadas de forma sencilla.',
    'mach.note': 'Además, terapia de NAD y vitaminas, electroestimulación y más, dentro de su protocolo. Todo lo mostrado aquí es de grado médico y clínicamente validado.',
    'mach.soon': 'También estamos preparando una lista y fotos de lo que cada uno de nuestros socios tiene instalado en su propio espacio. Próximamente.',

    // the people

    // barcelona
    'place.eyebrow': 'Nuestra base',
    'place.line': 'Con sede en Barcelona. <br>Trabajando en toda España y Europa.',

    // the ask
    'ask.eyebrow': 'La propuesta',
    'ask.title': 'Denos 30 minutos en su espacio.',
    'ask.lead': 'Sea cual sea el establecimiento — hotel, resort, club privado, gimnasio o coworking — al terminar sabrá la superficie, el stack tecnológico y los protocolos que encajan.',
    'ask.s1t': 'Llamada de descubrimiento',
    'ask.s1d': 'Su establecimiento, su cliente, su espacio actual — 30 minutos.',
    'ask.s2t': 'Visita in situ',
    'ask.s2d': 'Recorremos el espacio, medimos la superficie y trazamos el flujo del huésped.',
    'ask.s3t': 'Propuesta a medida',
    'ask.s3d': 'Stack tecnológico, protocolos, personal y retorno modelado, adaptados a su establecimiento.',

    // closer + newsletter
    'news.title': 'Únase a la elevación',
    'news.p': 'Pensamiento sobre longevidad, hallazgos seleccionados y notas de la alianza. Ocasional, nunca ruidoso.',
    'news.ph': 'Su correo electrónico',
    'news.btn': 'Suscribirse',

    // blog hero
    'blog.eyebrow': 'El diario',
    'blog.title': 'Apuntes del equipo',
    'blog.sub': 'Nuestras propias notas sobre la tecnología de longevidad que probamos, utilizamos y sobre la que nos preguntan — lo que funciona, lo que es exageración y lo que acaba de llegar al mercado.',
    'blog.back': '← Volver al diario',

    // the machinery cards
    'mc.t1': 'Crioterapia de cuerpo entero',
    'mc.d1': 'Una cámara de frío eléctrica, sin nitrógeno, que alcanza los −110 °C. De grado médico y adaptada a cada cliente.',
    'mc.t2': 'Oxígeno hiperbárico',
    'mc.d2': 'Una cámara de presión certificada y de grado médico para una o dos personas. Automatización completa y monitorización en tiempo real.',
    'mc.t3': 'Fotobiomodulación',
    'mc.b3': 'Cell Stack · Terapia de luz roja',
    'mc.d3': 'Una cama de luz roja e infrarroja cercana para todo el cuerpo. Reduce la inflamación y acelera la recuperación, sin tiempo de inactividad.',
    'mc.t4': 'IHHT',
    'mc.d4': 'Un entrenamiento para las células con mascarilla. Los niveles de oxígeno alternos entrenan las mitocondrias en veinticinco a cuarenta minutos.',
    'mc.t5': 'Sauna de infrarrojos',
    'mc.d5': 'Infrarrojos de espectro completo con cero EMF y cero ELF. Alivio del dolor, mejor sueño y mayor concentración.',
    'mc.t6': 'Terapia de compresión',
    'mc.d6': 'Compresión neumática médica basada en el drenaje linfático. Con aprobación de la FDA y más de treinta y cinco años de uso clínico.',
    'mc.t7': 'Flotación en seco',
    'mc.d7': 'Una experiencia de flotación ingrávida sin contacto con el agua. Sonido, luz y masaje combinados en una sola sesión.',
    'mc.t8': 'Inmersión en frío',
    'mc.d8': 'Bañeras de acero inoxidable hechas a mano en el Reino Unido. Temperatura seleccionable de 0 °C a 10 °C, filtradas y autolimpiables.',
    'mc.t9': 'Cápsulas para el sistema nervioso',
    'mc.d9': 'Una cápsula inmersiva que combina sonido, vibración y luz. La misma tecnología creada para la suite de recuperación del primer equipo del Manchester United.',

    // image descriptions
    'mc.a1': 'Cámara de crioterapia de cuerpo entero Powercab',
    'mc.a2': 'Cámara de oxígeno hiperbárico Oxy Stack',
    'mc.a3': 'Cama de terapia de luz roja Cell Stack',
    'mc.a4': 'Entrenamiento celular IHHT con mascarilla',
    'mc.a5': 'Sauna de infrarrojos Clearlight',
    'mc.a6': 'Terapia de compresión Ballancer Gold',
    'mc.a7': 'Camilla de flotación en seco K Float',
    'mc.a8': 'Bañeras de inmersión en frío Kooled',
    'mc.a9': 'Cápsula de recuperación del sistema nervioso Kokoon',
    'alt.float': 'Camilla de flotación en seco K Float',
    'alt.kokoon': 'Cápsula de recuperación del sistema nervioso Kokoon',
    'alt.pbm': 'Cama de terapia de luz roja Cell Stack',
    'alt.lounge': 'Una piscina de spa y una zona de descanso de lujo, en calma',
    'alt.mu1': 'Concepto de cápsula de recuperación con la marca del Manchester United',
    'alt.mu2': 'Interior de la cápsula de recuperación de la K-Suite del Manchester United',
    'alt.bcn': 'Casa Batlló, Barcelona, al anochecer',

    // footer
    'foot.tagline': 'Longevidad, de principio a fin.',
    'foot.company': 'Empresa',
    'foot.about': 'Quiénes somos',
    'foot.partnership': 'Alianza',
    'foot.track': 'Trayectoria',
    'foot.contact': 'Contacto',
    'foot.rights': '© 2026 ELATEVE powered by Kloodos. Todos los derechos reservados.',
    'foot.excl': 'Alianza exclusiva de tecnología de longevidad · España y Europa',

    // contact modal
    'modal.title': 'Hablemos de longevidad.',
    'modal.text': 'Sáltese el formulario. Contacte directamente con una persona y organizaremos sus 30 minutos — una llamada de descubrimiento, una visita in situ y después una propuesta adaptada a su establecimiento.',
    'modal.wa': 'Escríbanos por WhatsApp',
    'modal.email': 'Escríbanos un correo',

    // about page
    'about.eyebrow': 'Nuestro equipo · Barcelona × Reino Unido',
    'about.title': 'Las personas detrás de <br>su planta de longevidad.',
    'about.sub': 'Gente de la hostelería que entiende la ciencia, y científicas que entienden la hostelería.',
    'about.pill1label': 'Elateve',
    'about.pill1text': 'Mujeres de 30, 40, 50 y 60 años, de la hostelería, el bienestar y el sector inmobiliario de lujo en Barcelona, París y Londres. Aportamos el concepto, el caso de negocio y un único partner que lidera su proyecto desde el plano hasta la apertura.',
    'about.pill2label': 'Kloodos',
    'about.pill2text': 'Una empresa familiar liderada por mujeres que lleva tecnología de recuperación del deporte profesional a los spas desde 2014. Aporta equipamiento de grado médico de primer nivel, protocolos desarrollados por médicos y formación interna.',
    'ppl.g1label': 'ELATEVE · Barcelona',
    'ppl.g1sub': 'Su equipo sobre el terreno',
    'ppl.g2label': 'KLOODOS · Reino Unido',
    'ppl.g2sub': 'Tecnología, protocolos y formación',
    'ppl.karen.role': 'Cofundadora y CEO',
    'ppl.karen.quote': '«Una planta de longevidad tiene que ganarse su lugar en el edificio. Nosotras nos aseguramos de que lo haga.»',
    'ppl.karen.bio': 'Líder nata con un fuerte instinto comercial, Karen convierte conceptos ambiciosos en negocios sólidos. La estrategia, las alianzas y el rigor financiero dan forma a cada proyecto que dirige.',
    'ppl.melissa.role': 'Cofundadora y COO',
    'ppl.melissa.quote': '«Una sala de spa es un activo inmobiliario. Las propiedades que planifiquen para el huésped de bienestar de mañana sacarán el mayor partido de ella.»',
    'ppl.melissa.bio': 'Meli lee un spa como un activo. Combina una visión clara de los ingresos por metro cuadrado con un fuerte sentido de hacia dónde va el bienestar, ayudando a los propietarios a invertir en lo que los huéspedes querrán después.',
    'ppl.lourdes.role': 'Estrategia',
    'ppl.lourdes.quote': '«La confianza se gana después del día de apertura. Construimos alianzas que duran tanto como la instalación.»',
    'ppl.lourdes.bio': 'La claridad estratégica es la fortaleza de Lourdes. Anticipa hacia dónde va un mercado y posiciona la oferta de cada propiedad para una ventaja duradera, apoyándose en una sólida red en el mundo empresarial y hotelero español.',
    'ppl.anneclaire.role': 'Directora de Desarrollo de Negocio',
    'ppl.anneclaire.quote': '«Un gran concepto solo cuenta cuando abre a tiempo y se llena desde la primera semana.»',
    'ppl.anneclaire.bio': 'Desde la primera visita al espacio hasta la semana de apertura, Anne Claire mantiene los proyectos en marcha. Su experiencia en gestión de propiedades y bienestar le ayuda a alinear a propietarios, operadores y proveedores en un único plan y calendario.',
    'ppl.julie.role': 'Fundadora y Directora',
    'ppl.julie.bio': 'Con más de 30 años en spas premium y diseño de protocolos galardonados, Julie traduce la tecnología del deporte de élite en tratamientos que encantan a los huéspedes, combinando credibilidad clínica con un raro sentido de lo que el mercado necesitará después.',
    'ppl.harriet.role': 'Directora',
    'ppl.harriet.bio': 'El foco de Harriet está en el rendimiento tras la apertura: instalaciones precisas, formación práctica del personal y optimización continua, para que cada tecnología dé resultados a los huéspedes e ingresos a la propiedad.'
  };

  var original = {};
  var SEL = '[data-i18n],[data-i18n-html],[data-i18n-placeholder],[data-i18n-alt]';

  // Browser-tab titles per page (English mirrors routes/pages.js)
  var TITLES = {
    home: { en: 'ELATEVE powered by Kloodos: Wellness & Longevity for Hospitality, End to End', es: 'ELATEVE powered by Kloodos: bienestar y longevidad para la hostelería, de principio a fin' },
    machinery: { en: 'The Machinery — ELATEVE powered by Kloodos', es: 'La maquinaria — ELATEVE powered by Kloodos' },
    whyus: { en: 'Why Us & Who Trusts Us Already — ELATEVE powered by Kloodos', es: 'Por qué nosotras y quién ya confía en nosotras — ELATEVE powered by Kloodos' },
    blog: { en: 'The Journal — ELATEVE powered by Kloodos', es: 'El diario — ELATEVE powered by Kloodos' },
    about: { en: 'Our Team — ELATEVE powered by Kloodos', es: 'Nuestro equipo — ELATEVE powered by Kloodos' }
  };
  var PATHS = { '/': 'home', '/machinery': 'machinery', '/why-us': 'whyus', '/blog': 'blog', '/about': 'about' };

  function setTitle(page) {
    if (page) window.__elatevePage = page;
    var p = window.__elatevePage || PATHS[location.pathname.replace(/\/$/, '') || '/'] || 'home';
    var t = TITLES[p];
    if (t) document.title = t[window.__elateveLang === 'es' ? 'es' : 'en'];
  }

  function capture() {
    document.querySelectorAll(SEL).forEach(function (el) {
      var hk = el.getAttribute('data-i18n-html');
      var tk = el.getAttribute('data-i18n');
      var pk = el.getAttribute('data-i18n-placeholder');
      var ak = el.getAttribute('data-i18n-alt');
      if (hk && !('h:' + hk in original)) original['h:' + hk] = el.innerHTML;
      if (tk && !('t:' + tk in original)) original['t:' + tk] = el.textContent;
      if (pk && !('p:' + pk in original)) original['p:' + pk] = el.getAttribute('placeholder') || '';
      if (ak && !('a:' + ak in original)) original['a:' + ak] = el.getAttribute('alt') || '';
    });
  }

  function apply(lang) {
    var es = lang === 'es';
    document.querySelectorAll(SEL).forEach(function (el) {
      var hk = el.getAttribute('data-i18n-html');
      var tk = el.getAttribute('data-i18n');
      var pk = el.getAttribute('data-i18n-placeholder');
      var ak = el.getAttribute('data-i18n-alt');
      if (hk) el.innerHTML = (es && ES[hk] != null) ? ES[hk] : original['h:' + hk];
      else if (tk) el.textContent = (es && ES[tk] != null) ? ES[tk] : original['t:' + tk];
      if (pk) el.setAttribute('placeholder', (es && ES[pk] != null) ? ES[pk] : original['p:' + pk]);
      if (ak) el.setAttribute('alt', (es && ES[ak] != null) ? ES[ak] : original['a:' + ak]);
    });
    document.documentElement.lang = es ? 'es' : 'en';
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = es ? 'EN' : 'ES';
      btn.setAttribute('aria-label', es ? 'Switch to English' : 'Cambiar a español');
    }
    try { localStorage.setItem(STORAGE, es ? 'es' : 'en'); } catch (e) {}
    window.__elateveLang = es ? 'es' : 'en';
    setTitle();
    // Lets the journal (rendered from data, not markup) switch language too
    document.dispatchEvent(new CustomEvent('elateve:lang', { detail: { lang: window.__elateveLang } }));
  }

  function init() {
    capture();
    var saved = 'en';
    try { saved = localStorage.getItem(STORAGE) || 'en'; } catch (e) {}
    apply(saved);
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        apply(window.__elateveLang === 'es' ? 'en' : 'es');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ELATEVE_applyLang = apply;
  window.ELATEVE_setTitle = setTitle;
})();
