/**
 * CÓDIGO DE LÓGICA PRINCIPAL - APLICACIÓN LANDING PAGE
 * 
 * Este archivo se encarga de:
 * 1. Cargar la configuración de `config.js` y renderizar los elementos dinámicamente.
 * 2. Aplicar el tema seleccionado, estilo de botones y animaciones de botones.
 * 3. Generar el fondo animado en Canvas interactivo adecuado para el tema seleccionado (20 fondos).
 * 4. Manejar los eventos de compartir, descargar tarjeta de contacto (vCard) y modal QR.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización general
  applyDynamicStyles();
  setupFavicon();
  setupPWA();
  renderProfile();
  renderSocialIcons();
  renderContent();
  renderFooter();
  renderActionBar();
  applyLayoutOrder();
  initBackgroundAnimation();
  initActionHandlers();

});

/**
 * 1. Mapeo de marcas a clases de FontAwesome
 */
const ICON_MAP = {
  whatsapp: 'fab fa-whatsapp',
  telegram: 'fab fa-telegram',
  instagram: 'fab fa-instagram',
  linkedin: 'fab fa-linkedin-in',
  github: 'fab fa-github',
  youtube: 'fab fa-youtube',
  facebook: 'fab fa-facebook-f',
  twitter: 'fab fa-twitter',
  mail: 'far fa-envelope',
  email: 'far fa-envelope',
  phone: 'fas fa-phone-alt',
  website: 'fas fa-globe',
  default: 'fas fa-link'
};

/**
 * Valores por defecto de cajas de lectura (color Hex y opacidad) para cada tema
 */
const THEME_BOX_DEFAULTS = {
  "space": { boxColor: "#111928", boxOpacity: 0.65 },
  "luxury": { boxColor: "#141414", boxOpacity: 0.85 },
  "crimson": { boxColor: "#160808", boxOpacity: 0.8 },
  "cyberpunk": { boxColor: "#12091e", boxOpacity: 0.78 },
  "emerald": { boxColor: "#061912", boxOpacity: 0.75 },
  "sunset": { boxColor: "#190c1c", boxOpacity: 0.8 },
  "frost": { boxColor: "#0f1a30", boxOpacity: 0.7 },
  "matrix": { boxColor: "#000a00", boxOpacity: 0.85 },
  "aurora": { boxColor: "#05141a", boxOpacity: 0.75 },
  "neon-grid": { boxColor: "#14051e", boxOpacity: 0.8 },
  "rain": { boxColor: "#101826", boxOpacity: 0.7 },
  "hexagons": { boxColor: "#1f2833", boxOpacity: 0.65 },
  "fireflies": { boxColor: "#0f170a", boxOpacity: 0.75 },
  "clouds": { boxColor: "#1f2937", boxOpacity: 0.7 },
  "retro-wave": { boxColor: "#230a3a", boxOpacity: 0.85 },
  "ocean": { boxColor: "#022432", boxOpacity: 0.7 },
  "abyss": { boxColor: "#050a1e", boxOpacity: 0.85 },
  "sakura": { boxColor: "#1e0f17", boxOpacity: 0.75 },
  "quantum": { boxColor: "#14141e", boxOpacity: 0.8 },
  "minimal-static": { boxColor: "#1e293b", boxOpacity: 0.9 }
};

/**
 * Escapa caracteres especiales HTML para renderizar texto seguro
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escapa HTML pero PERMITE etiquetas <i> de FontAwesome.
 * Uso: textos de biografía donde el usuario puede escribir iconos FA directamente.
 * Ejemplo: "Visítame <i class="fa-brands fa-whatsapp"></i> aquí" → renderiza el icono.
 */
function escapeHtmlWithIcons(str) {
  if (!str) return '';
  // Detectar etiquetas <i class="..."> con clases FA y preservarlas
  const FA_TAG = /<i\s+class="[^"]*fa[^"]*"[^>]*>\s*<\/i>/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  FA_TAG.lastIndex = 0;
  while ((match = FA_TAG.exec(str)) !== null) {
    parts.push(escapeHtml(str.slice(lastIndex, match.index)));
    parts.push(match[0]); // etiqueta FA intacta
    lastIndex = FA_TAG.lastIndex;
  }
  parts.push(escapeHtml(str.slice(lastIndex)));
  return parts.join('');
}

/**
 * Genera el elemento HTML del icono de forma flexible e inteligente
 */
function getIconHtml(iconName, isWhite = false) {
  if (!iconName) return '';
  const iconStr = iconName.trim();

  if (iconStr.startsWith("http://") || iconStr.startsWith("https://") || iconStr.startsWith("./")) {
    return `<img src="${iconStr}" class="link-icon-img" alt="Icono" />`;
  }
  
  if (iconStr.includes("fa-") || iconStr.startsWith("fab ") || iconStr.startsWith("fas ") || iconStr.startsWith("far ") || iconStr.startsWith("fa ")) {
    return `<i class="${iconStr} link-icon-fa" style="${isWhite ? 'color: var(--text-color);' : ''}"></i>`;
  }
  
  const faClass = ICON_MAP[iconStr.toLowerCase()];
  if (faClass) {
    return `<i class="${faClass} link-icon-fa" style="${isWhite ? 'color: var(--text-color);' : ''}"></i>`;
  }
  
  return `<i class="fas fa-${iconStr.toLowerCase()} link-icon-fa" style="${isWhite ? 'color: var(--text-color);' : ''}"></i>`;
}

/**
 * 2. Aplica estilos personalizados y clases de tema basados en CONFIG
 */
function applyDynamicStyles() {
  if (typeof CONFIG === "undefined") return;

  const root = document.documentElement;
  if (CONFIG.profile.pageTitle && CONFIG.profile.pageTitle.trim() !== "") {
    document.title = CONFIG.profile.pageTitle;
  } else {
    document.title = `${CONFIG.profile.name} | ${CONFIG.profile.title}`;
  }

  // Obtener y aplicar el tema seleccionado a body
  const theme = CONFIG.theme.selectedTheme || "space";
  document.body.classList.add(`theme-${theme}`);

  // Aplicar variables CSS personalizadas en body si se definieron en config
  if (CONFIG.theme.accentColor) {
    document.body.style.setProperty('--accent-color', CONFIG.theme.accentColor);
    document.body.style.setProperty('--accent-glow', convertHexToRgba(CONFIG.theme.accentColor, 0.45));
  }
  if (CONFIG.theme.glassColor) {
    document.body.style.setProperty('--glass-bg', CONFIG.theme.glassColor);
  }
  if (CONFIG.theme.glassBorder) {
    document.body.style.setProperty('--glass-border', CONFIG.theme.glassBorder);
  }
  if (CONFIG.theme.fontFamily) {
    document.body.style.setProperty('--font-family', CONFIG.theme.fontFamily);
  }
}

/**
 * Configura dinámicamente el favicon de la página basado en CONFIG.theme.favicon
 */
function setupFavicon() {
  if (typeof CONFIG === "undefined" || !CONFIG.theme || !CONFIG.theme.favicon) return;

  const faviconConf = CONFIG.theme.favicon;
  const type = faviconConf.type || "avatar";
  const value = faviconConf.value;

  const setFaviconUrl = (url) => {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url;
  };

  if (type === "avatar") {
    // Usar la foto del perfil
    let avatarUrl = CONFIG.profile.avatar || "profile.jpg";
    // Si es la ruta por defecto del avatar de ejemplo que no existe físicamente, usar el fallback de Unsplash
    if (avatarUrl === "assets/avatar.jpg") {
      avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80";
    }
    setFaviconUrl(avatarUrl);
  } else if (type === "custom" && value) {
    // Usar imagen personalizada
    setFaviconUrl(value);
  } else if (type === "icon" && value) {
    // Renderizar icono de FontAwesome en canvas
    renderFontAwesomeFavicon(value);
  }
}

/**
 * Helper para resolver rutas relativas a URLs absolutas (necesario para el manifiesto de PWA)
 */
function getAbsoluteUrl(relativeUrl) {
  const a = document.createElement('a');
  a.href = relativeUrl;
  return a.href;
}

/**
 * Renderiza un glifo de FontAwesome sobre un fondo circular de color de acento y lo aplica como favicon
 */
function renderFontAwesomeFavicon(iconClass, retryCount = 0) {
  // Crear un elemento i invisible temporal para obtener el unicode del icono
  const i = document.createElement('i');
  i.className = iconClass;
  i.style.position = 'absolute';
  i.style.left = '-9999px';
  i.style.visibility = 'hidden';
  document.body.appendChild(i);

  // Determinar familia de fuentes de FontAwesome 6
  let fontFamily = 'Font Awesome 6 Free';
  let fontWeight = '900'; // Default Solid

  if (iconClass.includes('fa-brands') || iconClass.includes('fab ')) {
    fontFamily = 'Font Awesome 6 Brands';
    fontWeight = '400';
  } else if (iconClass.includes('fa-regular') || iconClass.includes('far ')) {
    fontFamily = 'Font Awesome 6 Free';
    fontWeight = '400';
  } else if (iconClass.includes('fa-solid') || iconClass.includes('fas ')) {
    fontFamily = 'Font Awesome 6 Free';
    fontWeight = '900';
  }

  const checkAndDraw = () => {
    const style = window.getComputedStyle(i, '::before');
    const content = style.getPropertyValue('content');

    let char = '';
    if (content && content !== 'none' && content !== 'normal') {
      char = content.replace(/['"]/g, ''); // Eliminar comillas
    }

    // Si la fuente no se ha cargado todavía, document.fonts.check puede fallar.
    // Comprobamos si el glifo está disponible y si la fuente está lista.
    const fontSpec = `${fontWeight} 12px "${fontFamily}"`;
    const isFontLoaded = document.fonts.check(fontSpec);

    if ((!char || !isFontLoaded) && retryCount < 20) {
      document.body.removeChild(i);
      setTimeout(() => {
        renderFontAwesomeFavicon(iconClass, retryCount + 1);
      }, 100);
      return;
    }

    if (!char) {
      document.body.removeChild(i);
      console.warn("No se pudo obtener el glifo de FontAwesome para el favicon:", iconClass);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Dibujar fondo circular con el color de acento
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.theme.accentColor || '#38bdf8';
    ctx.fill();

    // Dibujar el icono en blanco en el centro
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontWeight} 32px "${fontFamily}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, 32, 32);

    // Aplicar como favicon
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = canvas.toDataURL('image/png');
    
    document.body.removeChild(i);
  };

  if (document.fonts.status === 'loaded') {
    checkAndDraw();
  } else {
    document.fonts.ready.then(checkAndDraw);
  }
}

/**
 * Genera el manifest de PWA de forma dinámica y registra/desregistra el Service Worker
 */
function setupPWA() {
  if (typeof CONFIG === "undefined" || !CONFIG.pwa || !CONFIG.pwa.enable) {
    // Si PWA está deshabilitado, intentar desregistrar el Service Worker activo
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
    return;
  }

  // Obtener URL absoluta para avatar y start_url
  const rawAvatar = CONFIG.profile.avatar || "assets/avatar.jpg";
  const absoluteAvatarUrl = getAbsoluteUrl(rawAvatar);
  const absoluteStartUrl = getAbsoluteUrl(".");

  // Generar objeto manifest con URLs absolutas para evitar fallos de resolución en Data URLs
  const manifest = {
    "name": CONFIG.pwa.appName || CONFIG.profile.name || "Mi Biolink",
    "short_name": CONFIG.pwa.appShortName || CONFIG.profile.name || "Biolink",
    "start_url": absoluteStartUrl,
    "display": "standalone",
    "background_color": (CONFIG.theme.profileCard && CONFIG.theme.profileCard.boxColor) ? CONFIG.theme.profileCard.boxColor : "#111928",
    "theme_color": CONFIG.theme.accentColor || "#38bdf8",
    "description": CONFIG.profile.title || "Mi Landing Page de Enlaces",
    "icons": [
      {
        "src": absoluteAvatarUrl,
        "sizes": "192x192",
        "type": "image/jpeg"
      },
      {
        "src": absoluteAvatarUrl,
        "sizes": "512x512",
        "type": "image/jpeg"
      }
    ]
  };

  // Ajustar el tipo de imagen del avatar en el manifest basándose en la extensión
  let imgType = "image/jpeg";
  if (rawAvatar.toLowerCase().endsWith(".png")) imgType = "image/png";
  else if (rawAvatar.toLowerCase().endsWith(".webp")) imgType = "image/webp";
  else if (rawAvatar.toLowerCase().endsWith(".svg")) imgType = "image/svg+xml";

  manifest.icons[0].type = imgType;
  manifest.icons[1].type = imgType;

  // Convertir a JSON y luego a base64 para el Data URL de manifest
  try {
    const manifestString = JSON.stringify(manifest);
    const base64Manifest = btoa(unescape(encodeURIComponent(manifestString)));
    const manifestURL = `data:application/json;base64,${base64Manifest}`;

    let link = document.querySelector('link[rel="manifest"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'manifest';
      document.head.appendChild(link);
    }
    link.href = manifestURL;
  } catch (e) {
    console.error("Error al generar el manifest dinámico:", e);
  }

  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
          console.log('PWA Service Worker registrado con éxito:', registration.scope);
        })
        .catch((error) => {
          console.error('Error al registrar el PWA Service Worker:', error);
        });
    });
  }
}


/**
 * Helper para convertir HEX a RGBA
 */
function convertHexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 2.1. Ordena las secciones del DOM según CONFIG.layout.componentOrder
 */
function applyLayoutOrder() {
  const container = document.querySelector("main.container");
  if (!container || typeof CONFIG === "undefined" || !CONFIG.layout || !CONFIG.layout.componentOrder) return;

  const order = CONFIG.layout.componentOrder;
  const idMap = {
    profile: document.getElementById("layout-profile"),
    actions: document.getElementById("layout-actions"),
    socials: document.getElementById("social-icons"),
    content: document.getElementById("content-list"),
    footer: document.getElementById("page-footer")
  };

  order.forEach(key => {
    const el = idMap[key];
    if (el) {
      container.appendChild(el);
    }
  });
}

/**
 * 2.2. Muestra/oculta y ordena los botones de acción según CONFIG.layout.actions
 */
function renderActionBar() {
  const actionBar = document.getElementById("layout-actions");
  if (!actionBar) return;

  const layoutActions = (typeof CONFIG !== "undefined" && CONFIG.layout && CONFIG.layout.actions) || {
    order: ["vcard", "share", "qr"],
    showVCard: true,
    showShare: true,
    showQR: true
  };

  const btnContact = document.getElementById("btn-add-contact");
  const btnShare = document.getElementById("btn-share");
  const btnQr = document.getElementById("btn-qr");

  const buttonMap = {
    vcard: btnContact,
    share: btnShare,
    qr: btnQr
  };

  const showMap = {
    vcard: layoutActions.showVCard !== false,
    share: layoutActions.showShare !== false,
    qr: layoutActions.showQR !== false
  };

  // Ocultar todos
  if (btnContact) btnContact.style.display = "none";
  if (btnShare) btnShare.style.display = "none";
  if (btnQr) btnQr.style.display = "none";

  let visibleCount = 0;
  layoutActions.order.forEach(key => {
    const btn = buttonMap[key];
    const shouldShow = showMap[key];
    if (btn) {
      if (shouldShow) {
        btn.style.display = "inline-flex";
        actionBar.appendChild(btn);
        visibleCount++;
      }
    }
  });

  // Ocultar contenedor si no hay botones visibles
  actionBar.style.display = visibleCount === 0 ? "none" : "flex";
}

/**
 * 3. Renderiza la sección del Perfil (Avatar, Nombre, Bio)
 */
function isVideoAvatar(url) {
  if (!url) return false;
  return url.toLowerCase().endsWith(".mp4") || url.toLowerCase().endsWith(".webm") || url.toLowerCase().endsWith(".mov");
}

function renderBanner() {
  const bannerContainer = document.getElementById("profile-banner");
  if (!bannerContainer) return;

  const p = CONFIG.profile;
  const banner = p.headerBanner;
  
  const showBanner = banner && banner.show && banner.url && banner.url.trim() !== "";
  
  if (showBanner) {
    document.body.classList.add("has-banner");
    bannerContainer.style.display = "block";
    
    const isVideo = banner.type === "video" || banner.url.toLowerCase().endsWith(".mp4") || banner.url.toLowerCase().endsWith(".webm");
    const currentUrl = banner.url;
    
    if (window.currentBannerUrl !== currentUrl || window.currentBannerType !== banner.type) {
      if (isVideo) {
        bannerContainer.innerHTML = `
          <video autoplay loop muted playsinline>
            <source src="${currentUrl}" type="video/mp4">
          </video>
        `;
      } else {
        bannerContainer.innerHTML = `<img src="${currentUrl}" alt="Banner de cabecera" onerror="this.parentNode.style.display='none'; document.body.classList.remove('has-banner');">`;
      }
      window.currentBannerUrl = currentUrl;
      window.currentBannerType = banner.type;
    }
  } else {
    document.body.classList.remove("has-banner");
    bannerContainer.style.display = "none";
    bannerContainer.innerHTML = "";
    window.currentBannerUrl = "";
    window.currentBannerType = "";
  }
}

function renderProfile() {
  if (typeof CONFIG === "undefined") return;

  const p = CONFIG.profile;
  
  // Renderizar banner primero
  renderBanner();

  const avatarContainer = document.getElementById("profile-avatar-container");
  if (avatarContainer) {
    const avatarUrl = p.avatar || "profile.jpg";
    const isVideo = p.avatarType === "video" || isVideoAvatar(avatarUrl);
    
    if (isVideo) {
      avatarContainer.innerHTML = `
        <video id="profile-avatar-video" class="avatar-img" autoplay loop muted playsinline>
          <source src="${avatarUrl}" type="video/mp4">
        </video>
      `;
    } else {
      avatarContainer.innerHTML = `
        <img id="profile-avatar" src="${avatarUrl}" alt="Foto de perfil de ${p.name}" class="avatar-img" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'">
      `;
    }

    // Aplicar tamaño y forma
    const size = p.avatarSize || 100;
    avatarContainer.style.setProperty("--avatar-size", `${size}px`);

    // Limpiar clases de forma antiguas
    avatarContainer.className = "avatar-wrapper";
    const shape = p.avatarShape || "circle";
    avatarContainer.classList.add(`avatar-shape-${shape}`);
  }

  const nameEl = document.getElementById("profile-name");
  if (nameEl) nameEl.textContent = p.name;

  const verifiedBadge = document.getElementById("profile-verified");
  if (verifiedBadge) verifiedBadge.style.display = p.verified ? "inline-flex" : "none";

  const titleEl = document.getElementById("profile-title");
  if (titleEl) titleEl.innerHTML = p.title;

  const card = CONFIG.theme && CONFIG.theme.profileCard;
  const selectedTheme = CONFIG.theme.selectedTheme || "space";
  const defaults = THEME_BOX_DEFAULTS[selectedTheme] || { boxColor: "#111928", boxOpacity: 0.65 };
  const boxColor = (card && card.boxColor) || defaults.boxColor;
  const boxOpacity = (card && card.boxOpacity !== undefined) ? card.boxOpacity : defaults.boxOpacity;
  const rgbaBg = convertHexToRgba(boxColor, boxOpacity);

  const showBox = !!(card && card.showBox);
  const showNameTitleBox = !!(card && card.showNameTitleBox);
  const showBioBox = !!(card && card.showBioBox);

  const bioEl = document.getElementById("profile-bio");
  if (bioEl) {
    if (p.bio && p.bio.length > 0) {
      bioEl.innerHTML = p.bio.map(para => {
        const text = typeof para === "string" ? para : (para.text || "");
        const showParaBox = typeof para === "string" ? false : !!para.showBox;
        
        // Párrafo individual solo lleva caja si no está en cabecera completa y tampoco en bio completa
        const shouldApplyParaBox = !showBox && !showBioBox && showParaBox;
        const classes = shouldApplyParaBox ? 'class="card-mode"' : '';
        const styles = shouldApplyParaBox ? `style="--profile-box-bg: ${rgbaBg}; --profile-box-border: rgba(255, 255, 255, 0.08);"` : '';
        
        return `<p ${classes} ${styles}>${text}</p>`;
      }).join('');
      bioEl.style.display = "block";
    } else {
      bioEl.innerHTML = "";
      bioEl.style.display = "none";
    }
  }

  // Helper para aplicar estilos de tarjeta de lectura
  const applyCardMode = (element, shouldApply) => {
    if (!element) return;
    if (shouldApply) {
      element.classList.add("card-mode");
      element.style.setProperty('--profile-box-bg', rgbaBg);
      element.style.setProperty('--profile-box-border', 'rgba(255, 255, 255, 0.08)');
    } else {
      element.classList.remove("card-mode");
      element.style.removeProperty('--profile-box-bg');
      element.style.removeProperty('--profile-box-border');
    }
  };

  const headerEl = document.getElementById("layout-profile");
  const nameTitleEl = document.getElementById("profile-name-title-container");

  applyCardMode(headerEl, showBox);
  applyCardMode(nameTitleEl, !showBox && showNameTitleBox);
  applyCardMode(bioEl, !showBox && showBioBox);
}

/**
 * 4. Renderiza los iconos sociales rápidos superiores
 */
function renderSocialIcons() {
  if (typeof CONFIG === "undefined" || !CONFIG.socialIcons) return;

  const container = document.getElementById("social-icons");
  if (!container) return;

  if (CONFIG.socialIcons.length === 0) {
    container.style.display = "none";
    container.innerHTML = "";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = "";

  CONFIG.socialIcons.forEach(item => {
    const a = document.createElement("a");
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "social-icon-item";
    a.setAttribute("aria-label", item.name);
    a.innerHTML = getIconHtml(item.icon, true);
    container.appendChild(a);
  });
}

/**
 * 5. Renderiza la lista principal de enlaces y secciones con estilos
 */
function renderContent() {
  if (typeof CONFIG === "undefined" || !CONFIG.content) return;

  const container = document.getElementById("content-list");
  if (!container) return;

  if (CONFIG.content.length === 0) {
    container.style.display = "none";
    container.innerHTML = "";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = "";

  const btnStyleClass = `btn-style-${CONFIG.theme.buttonStyle || 'glass'}`;
  const btnAnimClass = `btn-anim-${CONFIG.theme.buttonAnimation || 'none'}`;

  CONFIG.content.forEach((item, index) => {
    const animationDelay = `${0.2 + index * 0.08}s`;

    if (item.type === "section") {
      const secDiv = document.createElement("div");
      secDiv.className = "content-section-title";
      secDiv.style.animation = `pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
      secDiv.style.animationDelay = animationDelay;
      secDiv.style.opacity = 0;
      secDiv.innerHTML = `<span>${item.icon ? item.icon + ' ' : ''}${item.title}</span>`;
      
      // Aplicar caja de lectura si está activada
      const card = CONFIG.theme && CONFIG.theme.profileCard;
      const showSectionBox = !!(card && card.showSectionBox);
      const showIndividualBox = !showSectionBox && !!item.showBox;

      if (showSectionBox || showIndividualBox) {
        secDiv.classList.add("card-mode");
        const selectedTheme = CONFIG.theme.selectedTheme || "space";
        const defaults = THEME_BOX_DEFAULTS[selectedTheme] || { boxColor: "#111928", boxOpacity: 0.65 };
        const boxColor = card.boxColor || defaults.boxColor;
        const boxOpacity = card.boxOpacity !== undefined ? card.boxOpacity : defaults.boxOpacity;
        const rgbaBg = convertHexToRgba(boxColor, boxOpacity);
        secDiv.style.setProperty('--profile-box-bg', rgbaBg);
        secDiv.style.setProperty('--profile-box-border', 'rgba(255, 255, 255, 0.08)');
      }

      secDiv.addEventListener("animationend", (e) => {
        if (e.animationName === "pageEnter") {
          secDiv.style.animation = "";
          secDiv.style.opacity = "";
        }
      });
      
      container.appendChild(secDiv);
    } else if (item.type === "separator") {
      const sepDiv = document.createElement("div");
      sepDiv.className = "content-separator";
      sepDiv.style.height = `${item.height !== undefined ? item.height : 24}px`;
      sepDiv.style.animation = `pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
      sepDiv.style.animationDelay = animationDelay;
      sepDiv.style.opacity = 0;

      sepDiv.addEventListener("animationend", (e) => {
        if (e.animationName === "pageEnter") {
          sepDiv.style.animation = "";
          sepDiv.style.opacity = "";
        }
      });
      container.appendChild(sepDiv);
    } else if (item.type === "link") {
      const a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = `link-item ${btnStyleClass} ${btnAnimClass} ${item.highlight ? 'link-highlight' : ''}`;
      a.style.animation = `pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
      a.style.animationDelay = animationDelay;
      a.style.opacity = 0;

      if (item.highlight && btnAnimClass === 'btn-anim-none') {
        a.classList.add('btn-anim-shine');
      }

      a.innerHTML = `
        <div class="link-icon-container">${getIconHtml(item.icon)}</div>
        <div class="link-title">${item.title}</div>
        <i class="fas fa-chevron-right link-arrow"></i>
      `;

      a.addEventListener("animationend", (e) => {
        if (e.animationName === "pageEnter") {
          a.style.animation = "";
          a.style.opacity = "";
        }
      });

      container.appendChild(a);
    }
  });
}

/**
 * 5.1. Renderiza el Pie de Página dinámico
 */
function renderFooter() {
  if (typeof CONFIG === "undefined" || !CONFIG.footer) return;

  const footerEl = document.getElementById("page-footer");
  if (!footerEl) return;

  if (CONFIG.footer.show === false) {
    footerEl.style.display = "none";
    return;
  }

  footerEl.style.display = "block";
  
  let html = `<p>${CONFIG.footer.text || ""} `;
  if (CONFIG.footer.linkText && CONFIG.footer.linkUrl) {
    html += `<a href="${CONFIG.footer.linkUrl}" target="_blank" rel="noopener noreferrer">${CONFIG.footer.linkText}</a>`;
  }
  if (CONFIG.footer.extraText) {
    html += ` | ${CONFIG.footer.extraText}`;
  }
  html += `</p>`;
  
  footerEl.innerHTML = html;

  // Aplicar caja de lectura al pie de página si está activada
  if (CONFIG.theme && CONFIG.theme.profileCard) {
    const card = CONFIG.theme.profileCard;
    if (card.showFooterBox) {
      footerEl.classList.add("card-mode");
      const selectedTheme = CONFIG.theme.selectedTheme || "space";
      const defaults = THEME_BOX_DEFAULTS[selectedTheme] || { boxColor: "#111928", boxOpacity: 0.65 };
      const boxColor = card.boxColor || defaults.boxColor;
      const boxOpacity = card.boxOpacity !== undefined ? card.boxOpacity : defaults.boxOpacity;
      const rgbaBg = convertHexToRgba(boxColor, boxOpacity);
      footerEl.style.setProperty('--profile-box-bg', rgbaBg);
      footerEl.style.setProperty('--profile-box-border', 'rgba(255, 255, 255, 0.08)');
    } else {
      footerEl.classList.remove("card-mode");
      footerEl.style.removeProperty('--profile-box-bg');
      footerEl.style.removeProperty('--profile-box-border');
    }
  }
}

/**
 * 6. Lógica de Fondos Animados Interactivos en Canvas (Soporte para los 20 Temas)
 */
function initBackgroundAnimation() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  // Limpiar estilos de fondo personalizado previos
  const videoBgContainer = document.getElementById("video-bg-container");
  if (videoBgContainer) {
    videoBgContainer.style.display = "none";
    videoBgContainer.innerHTML = "";
  }
  document.body.style.backgroundImage = "";
  document.body.style.backgroundSize = "";
  document.body.style.backgroundPosition = "";
  document.body.style.backgroundAttachment = "";
  canvas.style.display = "block";

  // Comprobar si hay un fondo personalizado activo
  const customBg = typeof CONFIG !== "undefined" && CONFIG.theme.customBackground;
  const hasCustomBg = customBg && customBg.type !== "none" && customBg.url && customBg.url.trim() !== "";

  if (hasCustomBg) {
    // Ocultar canvas
    canvas.style.display = "none";

    if (customBg.type === "image") {
      document.body.style.backgroundImage = `url('${customBg.url}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";
    } else if (customBg.type === "video") {
      if (videoBgContainer) {
        videoBgContainer.style.display = "block";
        videoBgContainer.innerHTML = `
          <video autoplay loop muted playsinline class="custom-video-bg">
            <source src="${customBg.url}" type="video/mp4">
          </video>
        `;
      }
    }
    // Retornamos inmediatamente para no iniciar el canvas ni consumir recursos de GPU/CPU
    return;
  }

  const theme = (typeof CONFIG !== "undefined" && CONFIG.theme.selectedTheme) || "space";

  // Si es minimal-static, remover el canvas del HTML para rendimiento absoluto
  if (theme === "minimal-static") {
    canvas.remove();
    return;
  }

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  let numParticles = 80;
  
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX - width / 2) * 0.08;
    targetMouseY = (e.clientY - height / 2) * 0.08;
  });

  window.addEventListener("deviceorientation", (e) => {
    if (e.beta && e.gamma) {
      targetMouseX = e.gamma * 0.8;
      targetMouseY = e.beta * 0.8;
    }
  });

  window.addEventListener("resize", () => {
    const oldWidth = width;
    const oldHeight = height;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    const scaleX = oldWidth > 0 ? width / oldWidth : 1;
    const scaleY = oldHeight > 0 ? height / oldHeight : 1;
    
    particles.forEach(p => {
      if (p.x !== undefined) p.x = p.x * scaleX;
      if (p.y !== undefined) p.y = p.y * scaleY;
    });
  });

  // --- PARÁMETROS ESPECÍFICOS POR TEMA ---
  
  if (theme === "space") {
    numParticles = 120;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.7 + 0.3,
        alphaSpeed: Math.random() * 0.015 + 0.005
      });
    }
  } 
  else if (theme === "luxury") {
    numParticles = 75;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height * 0.1,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.4 + 0.1),
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        color: `rgba(${Math.floor(Math.random() * 40 + 215)}, ${Math.floor(Math.random() * 30 + 170)}, ${Math.floor(Math.random() * 20 + 50)}, `
      });
    }
  } 
  else if (theme === "crimson") {
    numParticles = 60;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height * 0.2,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -(Math.random() * 0.6 + 0.2),
        angle: Math.random() * Math.PI * 2,
        waveSpeed: Math.random() * 0.015 + 0.005,
        waveAmp: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(255, 51, 51, ' : 'rgba(255, 120, 50, '
      });
    }
  } 
  else if (theme === "cyberpunk") {
    numParticles = 65;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? '#a855f7' : '#06b6d4'
      });
    }
  }
  else if (theme === "emerald") {
    numParticles = 50;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -(Math.random() * 0.35 + 0.1),
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.01 + 0.005,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }
  else if (theme === "sunset") {
    numParticles = 80;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: -(Math.random() * 0.8 + 0.2), // Vuelan lateralmente
        speedY: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.5 ? 'rgba(249, 115, 22, ' : 'rgba(236, 72, 153, ' // Rosa y naranja
      });
    }
  }
  else if (theme === "frost") {
    numParticles = 80;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: Math.random() * 0.4 + 0.1, // Caen hacia abajo
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }
  else if (theme === "matrix") {
    // Columnas de bytes Matrix
    numParticles = Math.floor(width / 16);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: i * 16,
        y: Math.random() * height - height,
        speed: Math.random() * 3 + 1,
        chars: "10ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&",
        val: ""
      });
    }
  }
  else if (theme === "rain") {
    numParticles = 90;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 4 + 3,
        length: Math.random() * 10 + 5
      });
    }
  }
  else if (theme === "fireflies") {
    numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random(),
        alphaSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }
  else if (theme === "hexagons") {
    numParticles = 25;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 25 + 10,
        alpha: 0,
        maxAlpha: Math.random() * 0.4 + 0.1,
        alphaSpeed: Math.random() * 0.005 + 0.002,
        state: 1 // 1=creciendo, -1=desvaneciendo
      });
    }
  }
  else if (theme === "clouds") {
    numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.25 + 0.05
      });
    }
  }
  else if (theme === "ocean") {
    numParticles = 45;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height * 0.1,
        radius: Math.random() * 4 + 1,
        speedY: -(Math.random() * 0.5 + 0.15),
        speedX: (Math.random() - 0.5) * 0.1,
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }
  else if (theme === "abyss") {
    numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        alpha: Math.random() * Math.PI,
        color: `rgba(29, 78, 216, `
      });
    }
  }
  else if (theme === "sakura") {
    numParticles = 45;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2,
        speedX: -(Math.random() * 0.5 + 0.2),
        speedY: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.02 + 0.005,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }
  else if (theme === "quantum") {
    numParticles = 20;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        radius: Math.random() * 50 + 20,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
      });
    }
  }

  // --- MOTORES DE DIBUJADO COMPLETO ---
  
  // Variables auxiliares para temas como neon-grid, retro-wave y aurora
  let gridY = 0;
  let timeVal = 0;

  function draw() {
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    timeVal += 0.005;

    // Pintar fondo del Canvas
    if (theme === "space") {
      ctx.fillStyle = "rgba(8, 11, 19, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "luxury") {
      ctx.fillStyle = "rgba(6, 6, 6, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "crimson") {
      ctx.fillStyle = "rgba(7, 1, 1, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "cyberpunk") {
      ctx.fillStyle = "rgba(7, 4, 15, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "emerald") {
      ctx.fillStyle = "rgba(3, 12, 8, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "sunset") {
      ctx.fillStyle = "rgba(13, 6, 15, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "frost") {
      ctx.fillStyle = "rgba(10, 15, 29, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "matrix") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Rastro largo de código
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "aurora") {
      ctx.fillStyle = "rgba(3, 8, 12, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "neon-grid" || theme === "retro-wave") {
      ctx.fillStyle = theme === "retro-wave" ? "rgba(26, 5, 46, 0.28)" : "rgba(10, 3, 20, 0.28)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "rain") {
      ctx.fillStyle = "rgba(9, 14, 20, 0.22)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "hexagons") {
      ctx.fillStyle = "rgba(11, 12, 16, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "fireflies") {
      ctx.fillStyle = "rgba(5, 7, 2, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "clouds") {
      ctx.fillStyle = "rgba(17, 24, 39, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "ocean") {
      ctx.fillStyle = "rgba(2, 26, 36, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "abyss") {
      ctx.fillStyle = "rgba(2, 4, 10, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "sakura") {
      ctx.fillStyle = "rgba(18, 9, 14, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } else if (theme === "quantum") {
      ctx.fillStyle = "rgba(10, 10, 15, 0.3)";
      ctx.fillRect(0, 0, width, height);
    }

    // --- PROCEDIMIENTO DE DIBUJADO DE CADA FANDO ---
    
    if (theme === "space") {
      particles.forEach((star) => {
        let renderX = star.x + mouseX * star.size * 0.4;
        let renderY = star.y + mouseY * star.size * 0.4;
        star.x += star.speedX; star.y += star.speedY;
        star.alpha += star.alphaSpeed;
        if (star.alpha <= 0.2 || star.alpha >= 1) star.alphaSpeed = -star.alphaSpeed;
        if (star.x < 0) star.x = width; if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height; if (star.y > height) star.y = 0;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
    }
    else if (theme === "luxury") {
      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        let renderX = p.x + Math.sin(p.wobble) * 10 + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.y += p.speedY; p.x += p.speedX;
        p.alpha += p.twinkleSpeed;
        if (p.alpha <= 0.15 || p.alpha >= 0.85) p.twinkleSpeed = -p.twinkleSpeed;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        if (p.x < -20) p.x = width + 20; if (p.x > width + 20) p.x = -20;
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });
    }
    else if (theme === "crimson") {
      particles.forEach((p) => {
        p.angle += p.waveSpeed;
        let renderX = p.x + Math.cos(p.angle) * (p.waveAmp * 8) + mouseX * p.size * 0.25;
        let renderY = p.y + mouseY * p.size * 0.25;
        p.y += p.speedY; p.x += p.speedX;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; p.alpha = Math.random() * 0.8 + 0.2; }
        let currentAlpha = p.alpha * (renderY / height);
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      });
    }
    else if (theme === "cyberpunk") {
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
        let dx = (mouseX * 4) + (width / 2) - p.x;
        let dy = (mouseY * 4) + (height / 2) - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) { p.x += dx * 0.005; p.y += dy * 0.005; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.lineWidth = 0.5;
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          let p1 = particles[i]; let p2 = particles[j];
          let dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (dist < 90) {
            let alpha = (1 - dist / 90) * 0.28;
            ctx.strokeStyle = p1.color === '#06b6d4' ? `rgba(6, 182, 212, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
    }
    else if (theme === "emerald") {
      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        let renderX = p.x + Math.sin(p.wobble) * 6 + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.y += p.speedY; p.x += p.speedX;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        ctx.beginPath();
        ctx.ellipse(renderX, renderY, p.size, p.size * 1.8, p.wobble, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();
      });
    }
    else if (theme === "sunset") {
      particles.forEach((p) => {
        let renderX = p.x + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < -20) { p.x = width + 20; p.y = Math.random() * height; }
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });
    }
    else if (theme === "frost") {
      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        let renderX = p.x + Math.sin(p.wobble) * 8 + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.y += p.speedY; p.x += p.speedX;
        if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
    }
    else if (theme === "matrix") {
      ctx.font = "14px Courier New";
      ctx.fillStyle = "rgba(0, 255, 0, 0.6)";
      particles.forEach((col) => {
        const char = col.chars[Math.floor(Math.random() * col.chars.length)];
        ctx.fillText(char, col.x, col.y);
        col.y += col.speed * 8;
        if (col.y > height) {
          col.y = -50;
          col.speed = Math.random() * 2 + 1;
        }
      });
    }
    else if (theme === "aurora") {
      // Dibujar cintas de auroras fluidas ondulantes
      ctx.lineWidth = 40;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        let grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, "rgba(45, 212, 191, 0)");
        grad.addColorStop(0.5, i === 1 ? "rgba(16, 185, 129, 0.08)" : "rgba(45, 212, 191, 0.12)");
        grad.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.strokeStyle = grad;
        ctx.moveTo(0, height * 0.3 + i * 80);
        for (let x = 0; x < width; x += 10) {
          let y = height * 0.3 + i * 80 + Math.sin(x * 0.003 + timeVal + i) * 60;
          ctx.lineTo(x, y + mouseY * 1.5);
        }
        ctx.stroke();
      }
    }
    else if (theme === "neon-grid" || theme === "retro-wave") {
      // Rejilla de perspectiva
      ctx.strokeStyle = theme === "retro-wave" ? "rgba(244, 63, 94, 0.25)" : "rgba(255, 0, 127, 0.25)";
      ctx.lineWidth = 1;
      gridY += 1.5;
      if (gridY >= 40) gridY = 0;
      const gridOffset = gridY;

      // Líneas horizontales
      for (let y = height * 0.55; y < height; y += 40) {
        let actualY = y + gridOffset;
        if (actualY > height) continue;
        ctx.beginPath();
        ctx.moveTo(0, actualY + mouseY * 0.5);
        ctx.lineTo(width, actualY + mouseY * 0.5);
        ctx.stroke();
      }
      // Líneas verticales convergentes (perspectiva)
      const horizonY = height * 0.55;
      for (let x = -width * 0.5; x < width * 1.5; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x + mouseX * 2, height);
        ctx.lineTo(width / 2 + mouseX * 0.3, horizonY + mouseY * 0.5);
        ctx.stroke();
      }

      // Si es retro-wave, pintar sol ochentero en el centro
      if (theme === "retro-wave") {
        let grad = ctx.createLinearGradient(width / 2, horizonY - 100, width / 2, horizonY);
        grad.addColorStop(0, "#f43f5e");
        grad.addColorStop(1, "#facc15");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(width / 2 + mouseX * 0.5, horizonY - 10, 80, Math.PI, 0);
        ctx.fill();
      }
    }
    else if (theme === "rain") {
      ctx.strokeStyle = "rgba(96, 165, 250, 0.4)";
      ctx.lineWidth = 1;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + mouseX * 0.1, p.y + p.length);
        ctx.stroke();
        p.y += p.speedY;
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });
    }
    else if (theme === "fireflies") {
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.05 || p.alpha >= 0.95) p.alphaSpeed = -p.alphaSpeed;
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
        ctx.beginPath();
        ctx.arc(p.x + mouseX * 0.2, p.y + mouseY * 0.2, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 230, 53, ${Math.max(0, p.alpha)})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = "#a3e635";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
    else if (theme === "hexagons") {
      ctx.lineWidth = 1;
      particles.forEach((p) => {
        p.alpha += p.alphaSpeed * p.state;
        if (p.alpha >= p.maxAlpha) { p.alpha = p.maxAlpha; p.state = -1; }
        if (p.alpha <= 0) {
          p.state = 1;
          p.alpha = 0;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
        ctx.strokeStyle = `rgba(102, 252, 241, ${p.alpha})`;
        ctx.beginPath();
        // Dibujado de hexágono
        for (let i = 0; i < 6; i++) {
          let angle = (i * Math.PI) / 3;
          let hx = p.x + p.size * Math.cos(angle) + mouseX * 0.15;
          let hy = p.y + p.size * Math.sin(angle) + mouseY * 0.15;
          if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
      });
    }
    else if (theme === "clouds") {
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -100) p.x = width + 100; if (p.x > width + 100) p.x = -100;
        if (p.y < -100) p.y = height + 100; if (p.y > height + 100) p.y = -100;
        let grad = ctx.createRadialGradient(p.x + mouseX * 0.3, p.y + mouseY * 0.3, 0, p.x + mouseX * 0.3, p.y + mouseY * 0.3, p.radius);
        grad.addColorStop(0, `rgba(147, 197, 253, ${p.alpha})`);
        grad.addColorStop(1, "rgba(147, 197, 253, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x + mouseX * 0.3, p.y + mouseY * 0.3, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    else if (theme === "ocean") {
      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.y += p.speedY; p.x += p.speedX;
        let renderX = p.x + Math.sin(p.wobble) * 6 + mouseX * p.radius * 0.3;
        let renderY = p.y + mouseY * p.radius * 0.3;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        ctx.strokeStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
    else if (theme === "abyss") {
      particles.forEach((p) => {
        p.alpha += p.pulseSpeed;
        let actualAlpha = Math.max(0.1, (Math.sin(p.alpha) + 1) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x + mouseX * 0.3, p.y + mouseY * 0.3, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${actualAlpha})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = "#1d4ed8";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
    else if (theme === "sakura") {
      particles.forEach((p) => {
        p.angle += p.rotSpeed;
        p.x += p.speedX; p.y += p.speedY;
        let renderX = p.x + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        if (p.x < -20 || p.y > height + 20) {
          p.x = Math.random() * width + 20;
          p.y = -20;
        }
        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`;
        ctx.fill();
        ctx.restore();
      });
    }
    else if (theme === "quantum") {
      particles.forEach((p) => {
        p.angle += p.speed;
        let cx = p.x + mouseX * p.size * 0.3;
        let cy = p.y + mouseY * p.size * 0.3;
        let px = cx + Math.cos(p.angle) * p.radius;
        let py = cy + Math.sin(p.angle) * p.radius;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 113, 133, 0.8)";
        ctx.fill();
        // Dibujar rastro
        ctx.strokeStyle = "rgba(251, 113, 133, 0.08)";
        ctx.beginPath();
        ctx.arc(cx, cy, p.radius, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/**
 * 7. Lógica de Botones: Compartir, Guardar Contacto y Código QR
 */
function initActionHandlers() {
  const btnContact = document.getElementById("btn-add-contact");
  const btnShare = document.getElementById("btn-share");
  const btnQr = document.getElementById("btn-qr");

  const modalOverlay = document.getElementById("modal-qr");
  const modalClose = document.getElementById("modal-close");
  const btnCopyQrLink = document.getElementById("btn-copy-qr-link");

  if (btnContact) btnContact.addEventListener("click", generateAndDownloadVCard);

  if (btnShare) {
    btnShare.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: CONFIG.sharing.shareTitle,
          text: CONFIG.sharing.shareText,
          url: CONFIG.sharing.shareUrl
        }).catch((err) => console.log("Error al compartir", err));
      } else {
        copyToClipboard(CONFIG.sharing.shareUrl, "¡Enlace copiado al portapapeles!");
      }
    });
  }

  let qrInitialized = false;
  if (btnQr && modalOverlay) {
    btnQr.addEventListener("click", () => {
      modalOverlay.classList.add("active");
      if (!qrInitialized && typeof QRious !== "undefined") {
        new QRious({
          element: document.getElementById("qr-canvas"),
          value: CONFIG.sharing.qrUrl,
          size: 250,
          background: '#ffffff',
          foreground: '#0f172a',
          level: 'H'
        });
        const sub = document.getElementById("qr-subtitle");
        if (sub) sub.textContent = CONFIG.sharing.qrUrl;
        qrInitialized = true;
      }
    });
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", () => modalOverlay.classList.remove("active"));
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove("active");
    });
  }

  if (btnCopyQrLink) {
    btnCopyQrLink.addEventListener("click", () => {
      copyToClipboard(CONFIG.sharing.qrUrl, "¡Enlace copiado al portapapeles!");
      modalOverlay.classList.remove("active");
    });
  }
}

function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    if (toast && toastText) {
      toastText.textContent = successMessage;
      toast.classList.add("active");
      setTimeout(() => toast.classList.remove("active"), 2500);
    }
  }).catch(err => console.error("Error al copiar enlace", err));
}

function generateAndDownloadVCard() {
  if (typeof CONFIG === "undefined" || !CONFIG.profile.vCard) return;
  const card = CONFIG.profile.vCard;
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${card.lastName || ""};${card.firstName || ""};;;`,
    `FN:${card.firstName || ""} ${card.lastName || ""}`.trim(),
    `ORG:${card.organization || ""}`,
    `TITLE:${card.title || ""}`,
    `TEL;TYPE=CELL:${card.phone || ""}`,
    `EMAIL;TYPE=PREF,INTERNET:${card.email || ""}`,
    `URL:${card.url || ""}`,
    "REV:" + new Date().toISOString(),
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${card.firstName}_${card.lastName}.vcf`;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
