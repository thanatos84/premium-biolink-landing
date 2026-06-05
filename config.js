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
    pageTitle: "",                         // Título personalizado de la pestaña del navegador (vacío para usar "Nombre | Cargo")
    
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
    selectedTheme: "space", 
    buttonStyle: "glass",
    buttonAnimation: "shine",
    accentColor: "#38bdf8",
    fontFamily: "'Outfit', sans-serif",

    // Configuración del Favicon dinámico (Icono de la pestaña del navegador)
    favicon: {
      type: "avatar",                      // "avatar" (foto perfil), "icon" (FontAwesome), o "custom" (imagen)
      value: "fa-solid fa-code"            // Clase de FontAwesome o URL de la imagen si corresponde
    },

    // 3.4. Fondo personalizado (opcional):
    customBackground: {
      type: "none",
      url: ""
    },

    // 3.5. Cajas de lectura para legibilidad de textos (opcional):
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
  // 3.6. CONFIGURACIÓN DE APLICACIÓN INSTALABLE (PWA)
  // ==========================================
  pwa: {
    enable: false,                              // ¿Habilitar la instalación como aplicación en móviles y PCs? (true/false)
    appName: "Mi Biolink",                      // Nombre completo de la aplicación al instalarse
    appShortName: "Biolink"                     // Nombre corto de la aplicación en la pantalla de inicio
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
  // 6. ESTRUCTURA Y ORDEN DE SECCIONES (Layout)
  // ==========================================
  layout: {
    componentOrder: ["profile", "actions", "socials", "content", "footer"],
    actions: {
      order: ["vcard", "share", "qr"],
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
    text: "© 2026 Nombre Apellido",            // Texto de copyright o secundario
    linkText: "Hecho con Landing Page",         // Texto del enlace de créditos
    linkUrl: "https://tu-usuario.pages.dev",    // URL a la que dirigirá el enlace
    extraText: "Hecho con ✨"                   // Texto final o créditos del pie de página
  }
};
