/**
 * CONFIGURACIÓN DE LA LANDING PAGE - PLANTILLA DE EJEMPLO
 * 
 * Este archivo contiene toda la información de tu página. Puedes editarlo fácilmente
 * para añadir enlaces, cambiar iconos, modificar el fondo, cambiar tu foto, etc.
 * Después de editarlo, solo tienes que volver a subir los archivos a tu hosting.
 */

const CONFIG = {
  // ==========================================
  // 1. INFORMACIÓN PERSONAL Y PERFIL
  // ==========================================
  profile: {
    name: "Nombre Apellido",               // Tu nombre principal
    verified: true,                       // ¿Mostrar check de verificado? (true/false)
    avatar: "assets/avatar.jpg",          // Archivo de tu foto o vídeo de perfil (guardado en la carpeta del proyecto)
    avatarType: "image",                  // Tipo de avatar ("image" o "video")
    avatarShape: "circle",                // Forma del avatar ("circle", "square", "rounded")
    avatarSize: 110,                      // Tamaño del avatar en píxeles (px)
    title: "Tu Cargo, Profesión o Especialidad 🚀", // Tu cargo/título (aparecerá debajo del nombre)
    
    // Banner/Cabecera superior personalizado (Imagen o Video de fondo superior)
    headerBanner: {
      show: false,
      type: "image",
      url: "assets/banner.jpg"
    },
    
    // Tu biografía. Cada elemento en la lista es un párrafo nuevo en la landing.
    bio: [
      { text: "¡Hola! Escribe aquí una breve descripción sobre ti, tus pasiones o lo que haces de forma profesional. Puedes añadir emoticonos para hacerlo más llamativo y personal. ✨💻", showBox: true }
    ],
    
    // Datos de contacto para la tarjeta digital (.vcf / VCard)
    // Cuando alguien pulse "Añadir Contacto", se agregará esta información a su agenda móvil.
    vCard: {
      firstName: "Nombre",
      lastName: "Apellido",
      organization: "Mi Empresa",
      title: "Mi Cargo",
      phone: "+34123456789",
      email: "tu-correo@email.com",
      url: "https://tu-usuario.pages.dev"
    }
  },

  // ==========================================
  // 2. CONFIGURACIÓN DEL CÓDIGO QR Y COMPARTIR
  // ==========================================
  sharing: {
    qrUrl: "https://tu-usuario.pages.dev", // URL a la que dirigirá el código QR escaneable
    shareTitle: "Contacto de Nombre",
    shareText: "Echa un vistazo a la landing page de Nombre",
    shareUrl: "https://tu-usuario.pages.dev"
  },

  // ==========================================
  // 3. DISEÑO Y TEMAS PREDEFINIDOS (Épicos e Interactivos)
  // ==========================================
  theme: {
    // 3.1. Tema predefinido. Cada uno tiene un efecto animado en Canvas o gradientes fluidos:
    // - "space"          -> Campo de estrellas 2D flotantes. Tecnológico e hipnótico.
    // - "luxury"         -> Lluvia elegante de polvo y purpurina de oro en ascenso. Exclusivo.
    // - "crimson"        -> Brasas de fuego y cenizas rojas ascendentes. Misterioso y atrevido.
    // - "cyberpunk"      -> Red de nodos plexus en violeta/cian. Hacker/Estilo tech.
    // - "emerald"        -> Hojas místicas flotantes en verde bosque. Orgánico y elegante.
    // - "sunset"         -> Viento cálido con partículas de atardecer violeta/naranja.
    // - "frost"          -> Copos de nieve y cristales de hielo azul cayendo.
    // - "matrix"         -> Lluvia digital de bytes (código Matrix clásico en verde).
    // - "aurora"         -> Ondas de gradientes fluidas emulando auroras polares.
    // - "neon-grid"      -> Cuadrícula wireframe Synthwave ochentera en movimiento.
    // - "rain"           -> Lluvia realista con efecto de ondas en la base de la pantalla.
    // - "hexagons"       -> Honeycomb de hexágonos flotantes desvanecibles.
    // - "fireflies"      -> Luciérnagas parpadeantes en tonos verde-amarillo.
    // - "clouds"         -> Niebla y nubes de humo interactivo fluyendo.
    // - "retro-wave"     -> Atardecer de neón ochentero con sol gigante y rejilla de perspectiva.
    // - "ocean"          -> Burbujas de agua ascendentes que rebotan en los lados.
    // - "abyss"          -> Luces bioluminiscentes flotantes en el abismo del océano profundo.
    // - "sakura"         -> Pétalos de flor de cerezo rosa cayendo con viento.
    // - "quantum"        -> Partículas caóticas de alta velocidad en órbitas atómicas.
    // - "minimal-static" -> Fondo gris pizarra estático (cero consumo de batería y CPU).
    selectedTheme: "space", 

    // 3.2. Estilo de los botones principales de la lista:
    // - "glass"           -> Vidrio translúcido con desenfoque de fondo (Glassmorphism).
    // - "solid"           -> Relleno sólido del color de acento del tema.
    // - "outline"         -> Fondo transparente con borde lineal fino.
    // - "neon"            -> Resplandor y sombra de neón permanente en bordes y texto.
    // - "3d"              -> Botón mecánico 3D que se presiona físicamente al pulsar.
    // - "pill"            -> Cápsula ovalada con bordes redondeados y estilo moderno.
    // - "shadow-fade"     -> Botón limpio que gana una sombra de color difusa enorme en hover.
    // - "gradient-border" -> Bordes finos con degradado lineal de acento.
    // - "cyber-brackets"  -> Corchetes a los lados [ Texto ] que se cierran en hover.
    // - "retro-gaming"    -> Pixelado de 8 bits con bordes en bloque y tipografía courier.
    // - "double-border"   -> Doble línea de contorno fina (exterior e interior).
    // - "vintage"         -> Papel sepia envejecido con bordes marrón y tipografía clásica.
    // - "glass-blur"      -> Vidrio de alto desenfoque para fondos muy complejos.
    // - "carbon"          -> Textura de fibra de carbono oscura sobre gris.
    // - "glow-line"       -> Sin bordes laterales con una línea inferior brillante que se expande.
    // - "minimal"         -> Totalmente transparente sin bordes, centrado en el texto.
    // - "brutalist"       -> Borde negro grueso de 3px, sombra dura de 4px y color plano.
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
    buttonAnimation: "shine",
    accentColor: "#38bdf8",
    fontFamily: "'Outfit', sans-serif",

    // 3.4. Fondo personalizado (opcional):
    // Elige un fondo propio (estático o animado) en lugar de los temas de partículas de Canvas:
    // - type: "none"   -> Usa el tema animado seleccionado arriba.
    // - type: "image"  -> Usa una imagen estática (ej: "assets/mi-fondo.jpg") o GIF animado.
    // - type: "video"  -> Usa un archivo de vídeo MP4 en bucle (ej: "assets/mi-video.mp4").
    customBackground: {
      type: "none",
      url: ""
    },

    // 3.5. Cajas de lectura para legibilidad de textos (opcional):
    // Permite añadir un fondo de tarjeta (glassmorphism/sólido) al perfil, secciones y/o pie de página
    // para asegurar la legibilidad del texto sobre fondos brillantes, imágenes o vídeos complejos.
    profileCard: {
      showBox: true,
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
    { name: "linkedin", url: "https://www.linkedin.com/in/tu-usuario/", icon: "linkedin" },
    { name: "github", url: "https://github.com/tu-usuario", icon: "github" },
    { name: "instagram", url: "https://www.instagram.com/tu-usuario/", icon: "instagram" },
    { name: "email", url: "mailto:tu-correo@email.com", icon: "envelope" }
  ],

  // ==========================================
  // 5. BLOQUES DE ENLACES PRINCIPALES (Botones y Secciones)
  // ==========================================
  content: [
    {
      type: "section",
      title: "Mis Enlaces Profesionales",
      icon: "💼",
      showBox: false
    },
    {
      type: "link",
      title: "Visita mi Portafolio Web",
      url: "https://tu-usuario.pages.dev",
      icon: "globe",
      highlight: true
    },
    {
      type: "link",
      title: "Escríbeme por Telegram",
      url: "https://t.me/tu-usuario",
      icon: "telegram",
      highlight: false
    },
    {
      type: "section",
      title: "Proyectos y Contenido",
      icon: "🚀",
      showBox: false
    },
    {
      type: "link",
      title: "Ver mi canal de YouTube",
      url: "https://www.youtube.com/@tu-usuario",
      icon: "youtube",
      highlight: false
    }
  ],

  // ==========================================
  // 6. PIE DE PÁGINA (Footer)
  // ==========================================
  footer: {
    show: true,                                 // ¿Mostrar el pie de página? (true/false)
    text: "© 2026 Nombre Apellido",            // Texto de copyright o secundario
    linkText: "Hecho con Landing Page",         // Texto del enlace de créditos
    linkUrl: "https://tu-usuario.pages.dev",    // URL a la que dirigirá el enlace
    extraText: "Hecho con ✨"                   // Texto final o créditos del pie de página
  }
};
