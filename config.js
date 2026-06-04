/**
 * CONFIGURACIÓN DE LA LANDING PAGE - JONATAN PONS
 * 
 * Este archivo contiene toda la información de tu página. Puedes editarlo fácilmente
 * para añadir enlaces, cambiar iconos, modificar el fondo, cambiar tu foto, etc.
 * Después de editarlo, solo tienes que volver a subir los archivos a Cloudflare Pages.
 */

const CONFIG = {
  // ==========================================
  // 1. INFORMACIÓN PERSONAL Y PERFIL
  // ==========================================
  profile: {
    name: "Jona",               // Tu nombre principal
    verified: true,             // ¿Mostrar check azul de verificado? (true/false)
    avatar: "profile.jpg",       // Archivo de tu foto o vídeo de perfil.
    avatarType: "image",       // Tipo de avatar ("image" o "video")
    avatarShape: "rounded",     // Forma del avatar ("circle", "square", "rounded", etc.)
    avatarSize: 160,         // Tamaño del avatar en px
    title: "Senior Systems & Infrastructure Engineer ☁️", // Tu cargo/título (aparecerá en negrita)
    
    // Banner/Cabecera superior personalizado (Imagen o Video)
    headerBanner: {
      show: true,
      type: "video",
      url: "https://www.pexels.com/download/video/33987219/"
    },
    
    // Tu biografía. Cada elemento en la lista es un párrafo nuevo.
    bio: [
      { text: "Apasionado de la fotografía, la montaña y el buen café 🏔️📸☕\nConectando infraestructura compleja de día y disfrutando de buenas conversaciones con una cerveza fría de noche. ✨🍻\nEmpático, curioso y siempre listo para una gran charla en excelente compañía. 👥", showBox: true },
      { text: "", showBox: false }
    ],
    
    // Datos de contacto para la tarjeta digital (.vcf / VCard)
    // Cuando alguien pulse "Añadir Contacto", se agregará esta información a su agenda.
    vCard: {
      firstName: "Jonatan",
      lastName: "Pons",
      organization: "",
      title: "Senior Systems & Infrastructure Engineer ☁️",
      phone: "+34667461868",
      email: "jonatanpons@gmail.com",
      url: "https://jonatanpons.pp.ua"
    }
  },

  // ==========================================
  // 2. CONFIGURACIÓN DEL CÓDIGO QR Y COMPARTIR
  // ==========================================
  sharing: {
    qrUrl: "https://jonatanpons.pp.ua", // URL a la que dirigirá el código QR
    shareTitle: "Contacto de Jona",
    shareText: "Echa un vistazo a la landing page de Jona",
    shareUrl: "https://jonatanpons.pp.ua"
  },

  // ==========================================
  // 3. DISEÑO Y TEMAS PREDEFINIDOS (Épicos e Interactivos)
  // ==========================================
  theme: {
    // 3.1. Tema predefinido. Cada uno tiene un efecto animado en Canvas o gradientes fluidos:
    // - "space"          -> Campo de estrellas 2D flotantes. Tecnológico e hipnótico.
    // - "luxury"         -> Lluvia elegante de polvo y purpurina de oro en ascenso. Exclusivo.
    // - "crimson"        -> Brasas de fuego y cenizas rojas ascendentes. Misterioso y atrevido.
    // - "cyberpunk"      -> Red de nodos plexus interconectados en violeta/cian. Hacker.
    // - "emerald"        -> Hojas místicas flotantes en verde bosque. Orgánico y elegante.
    // - "sunset"         -> Viento cálido con partículas de atardecer violeta/naranja.
    // - "frost"          -> Copos de nieve y cristales de hielo azul ártico cayendo.
    // - "matrix"         -> Lluvia digital de bytes (código Matrix clásico en verde).
    // - "aurora"         -> Ondas de gradientes fluidas emulando auroras polares.
    // - "neon-grid"      -> Cuadrícula wireframe Synthwave ochentera en movimiento.
    // - "rain"           -> Lluvia realista con efecto de ondas en la base de la pantalla.
    // - "hexagons"       -> Honeycomb de hexágonos flotantes desvanecibles.
    // - "fireflies"      -> Luciérnagas parpadeantes en tonos verde-amarillo.
    // - "clouds"         -> Niebla y nubes de humo interactivo fluyendo.
    // - "retro-wave"     -> Atardecer de neón ochentero con sol gigante y rejilla de perspectiva.
    // - "ocean"          -> Burbujas de agua ascendentes que rebotan en los lados de la pantalla.
    // - "abyss"          -> Luces bioluminiscentes flotantes en el abismo del océano profundo.
    // - "sakura"         -> Pétalos de flor de cerezo rosa cayendo con ráfagas de viento.
    // - "quantum"        -> Partículas caóticas de alta velocidad en órbitas atómicas.
    // - "minimal-static" -> Fondo gris pizarra estático (cero consumo de batería y CPU).
    selectedTheme: "space", 

    // 3.2. Estilo de los botones principales de la lista:
    // - "glass"           -> Vidrio translúcido con desenfoque de fondo.
    // - "solid"           -> Relleno sólido del color de acento del tema.
    // - "outline"         -> Fondo transparente con borde lineal fino de color de acento.
    // - "neon"            -> Resplandor y sombra de neón permanente en bordes y texto.
    // - "3d"              -> Botón mecánico 3D que se presiona físicamente.
    // - "pill"            -> Cápsula ovalada con bordes redondeados y estilo moderno.
    // - "shadow-fade"     -> Botón limpio que gana una sombra de color difusa enorme en hover.
    // - "gradient-border" -> Bordes finos con degradado lineal de acento.
    // - "cyber-brackets"  -> Corchetes a los lados [ Texto ] que se cierran en hover.
    // - "retro-gaming"    -> Pixelado de 8 bits con bordes en bloque y tipografía courier.
    // - "double-border"   -> Doble línea de contorno fina (exterior e interior).
    // - "vintage"         -> Papel sepia envejecido con bordes marrón retro y tipografía vintage.
    // - "glass-blur"      -> Vidrio de alto desenfoque para fondos muy complejos.
    // - "carbon"          -> Textura de fibra de carbono oscura sobre gris.
    // - "glow-line"       -> Sin bordes laterales con una línea inferior brillante que se expande.
    // - "minimal"         -> Totalmente transparente sin bordes, centrado en el texto.
    // - "brutalist"       -> Borde negro grueso de 3px, sombra dura de 4px y color de fondo plano.
    // - "split-gradient"  -> Mitad vidrio, mitad color degradado de acento.
    // - "metallic"        -> Acero cepillado metálico reflectante tipo chapa.
    // - "ghost"           -> Botón ultra-discreto semi-invisible que se ilumina en hover.
    buttonStyle: "glass",

    // 3.3. Animación / Efecto constante de los botones en la lista:
    // - "none"           -> Sin animación constante (solo reacciona al pasar el ratón).
    // - "shine"          -> Reflejo brillante que se desliza por el botón cada 4 segundos.
    // - "pulse"          -> Latido suave de tamaño y resplandor.
    // - "float"          -> Flotación vertical independiente arriba y abajo.
    // - "shake"          -> Vibración rápida de llamada de atención cada 5 segundos.
    // - "wobble"         -> Balanceo de inclinación rotacional suave.
    // - "bounce"         -> Salto elástico vertical.
    // - "heartbeat"      -> Doble pulso acelerado estilo latido de corazón.
    // - "spin-icon"      -> Rotación de 360 grados del icono del botón en hover.
    // - "blur-fade"      -> Desenfoque y enfoque de texto cíclico.
    // - "glow-pulse"     -> Pulso de resplandor trasero, manteniendo el botón quieto.
    // - "glitch"         -> Distorsión de posición digital ultra-rápida con coloración.
    // - "color-cycle"    -> Transición gradual de color del botón.
    // - "skew"           -> Inclinación lateral en hover.
    // - "expand-border"  -> El borde se expande hacia afuera en círculos en hover.
    // - "wave-text"      -> Efecto de espaciado de letras dinámico en bucle.
    // - "shrink"         -> Reducción sutil al hacer clic/hover.
    // - "slide-bg"       -> Desplazamiento de fondo degradado.
    // - "jello"          -> Efecto gelatina elástica al pasar el ratón.
    // - "radar"          -> Ondas de sombra concéntricas emitidas hacia afuera en bucle.
    // - "swing"          -> Balanceo pendular colgado de la parte superior.
    buttonAnimation: "pulse",
    accentColor: "#38bdf8",
    fontFamily: "'Outfit', sans-serif",

    // 3.4. Fondo personalizado (opcional):
    // Elige un fondo propio (estático o animado) en lugar de los temas de partículas:
    // - type: "none"   -> Usa el tema visual seleccionado arriba.
    // - type: "image"  -> Usa una imagen estática o GIF animado.
    // - type: "video"  -> Usa un archivo de vídeo MP4 en bucle.
    // - url: Ruta del archivo (ej: "mi-fondo.gif", "video.mp4") o URL de internet.
    customBackground: {
      type: "none",
      url: "https://www.pexels.com/download/video/33987219/"
    },

    // 3.5. Cajas de lectura para legibilidad de textos (opcional):
    // Permite añadir un fondo de tarjeta (glassmorphism/sólido) al perfil, secciones y/o pie de página
    // para asegurar la legibilidad del texto sobre fondos brillantes o vídeos.
    profileCard: {
      showBox: false,
      showNameTitleBox: true,
      showBioBox: true,
      showSectionBox: true,
      showFooterBox: true,
      boxColor: "#111928",
      boxOpacity: 0.65
    }
  },

  // ==========================================
  // 4. ICONOS RÁPIDOS DE CABECERA (Redes Sociales)
  // ==========================================
  socialIcons: [
    { name: "linkedin", url: "https://www.linkedin.com/in/jonatanpons/", icon: "linkedin" },
    { name: "github", url: "https://github.com/thanatos84", icon: "github" },
    { name: "whatsapp", url: "https://wa.me/+34667461868", icon: "whatsapp" },
    { name: "telegram", url: "https://t.me/thanatos", icon: "telegram" },
    { name: "instagram", url: "https://www.instagram.com/jonatanpons/", icon: "instagram" },
    { name: "youtube", url: "https://www.youtube.com/@jonatanpons5512", icon: "youtube" },
    { name: "facebook", url: "https://www.facebook.com/jona.pons", icon: "facebook" }
  ],

  // ==========================================
  // 5. BLOQUES DE ENLACES PRINCIPALES (Botones y Secciones)
  // ==========================================
  content: [
    {
      type: "section",
      title: "Capturando momentos y buenas charlas",
      icon: "📸",
      showBox: false
    },
    {
      type: "link",
      title: "Escríbeme un WhatsApp directo",
      url: "https://wa.me/+34667461868",
      icon: "whatsapp",
      highlight: true
    },
    {
      type: "link",
      title: "Instagram",
      url: "https://www.instagram.com/jonatanpons/",
      icon: "instagram",
      highlight: false
    },
    {
      type: "link",
      title: "Charlemos por Telegram",
      url: "https://t.me/thanatos",
      icon: "telegram",
      highlight: false
    },
    {
      type: "link",
      title: "Facebook",
      url: "https://www.facebook.com/jona.pons",
      icon: "facebook",
      highlight: false
    },
    {
      type: "separator",
      height: 26
    },
    {
      type: "section",
      title: "Ingeniería, Seguridad, Cloud y Sistemas",
      icon: "💻",
      showBox: false
    },
    {
      type: "link",
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/jonatanpons/",
      icon: "linkedin",
      highlight: false
    },
    {
      type: "link",
      title: "GitHub",
      url: "https://github.com/thanatos84",
      icon: "github",
      highlight: false
    },
    {
      type: "link",
      title: "YouTube",
      url: "https://www.youtube.com/@jonatanpons5512",
      icon: "youtube",
      highlight: false
    },
    {
      type: "separator",
      height: 60
    }
  ],

  // ==========================================
  // 6. ESTRUCTURA Y ORDEN DE SECCIONES (Layout)
  // ==========================================
  layout: {
    // Orden de las secciones principales de la página:
    // - "profile" -> Cabecera del perfil (Avatar, Nombre, Bio)
    // - "actions" -> Botones de Guardar/Compartir/QR
    // - "socials" -> Fila de iconos de redes sociales
    // - "content" -> Lista de enlaces verticales y secciones
    // - "footer"  -> Pie de página (Footer)
    componentOrder: ["profile", "actions", "socials", "content", "footer"],
    
    // Configuración de los botones de la barra de acciones rápidas:
    actions: {
      // Orden en el que aparecerán los botones:
      order: ["vcard", "share", "qr"],
      // Visibilidad de cada botón (true/false):
      showVCard: true,
      showShare: true,
      showQR: true
    }
  },

  // ==========================================
  // 7. PIE DE PÁGINA (Footer)
  // ==========================================
  footer: {
    show: true,                                 // ¿Mostrar el pie de página? (true/false)
    text: "© 2026",                             // Texto de copyright o secundario
    linkText: "jonatanpons.pp.ua",               // Texto del enlace
    linkUrl: "https://jonatanpons.pp.ua",       // URL a la que dirigirá el enlace
    extraText: "Hecho con ✨"                    // Texto final o créditos del pie de página
  }
};
