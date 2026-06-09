/**
 * CÓDIGO DE CONTROL DEL CREADOR DE TEMAS - SOPORTE DE 20 ELEMENTOS
 * 
 * Se encarga de la interactividad del panel, sincronizar los datos
 * con la previsualización del smartphone en tiempo real, renderizar los
 * 20 efectos animados de fondo en el canvas simulado y exportar el
 * archivo config.js completamente comentado.
 */

// Estado global
let socialIcons = [
  { name: "linkedin", url: "https://www.linkedin.com/in/tu-usuario/", icon: "linkedin" },
  { name: "github", url: "https://github.com/tu-usuario", icon: "github" },
  { name: "whatsapp", url: "https://wa.me/34600000000", icon: "whatsapp" },
  { name: "telegram", url: "https://t.me/tu-usuario", icon: "telegram" },
  { name: "instagram", url: "https://www.instagram.com/tu-usuario/", icon: "instagram" },
  { name: "youtube", url: "https://www.youtube.com/@tu-usuario", icon: "youtube" },
  { name: "facebook", url: "https://www.facebook.com/tu-usuario", icon: "facebook" }
];

let contentList = [
  { type: "section", title: "Sección de ejemplo", icon: "📸" },
  { type: "link", title: "Escríbeme por WhatsApp", url: "https://wa.me/34600000000", icon: "whatsapp", highlight: true },
  { type: "link", title: "Instagram", url: "https://www.instagram.com/tu-usuario/", icon: "instagram", highlight: false },
  { type: "link", title: "Charlemos por Telegram", url: "https://t.me/tu-usuario", icon: "telegram", highlight: false },
  { type: "link", title: "Facebook", url: "https://www.facebook.com/tu-usuario", icon: "facebook", highlight: false },
  { type: "section", title: "Enlaces de interés", icon: "💻" },
  { type: "link", title: "LinkedIn", url: "https://www.linkedin.com/in/tu-usuario/", icon: "linkedin", highlight: false },
  { type: "link", title: "GitHub", url: "https://github.com/tu-usuario", icon: "github", highlight: false },
  { type: "link", title: "YouTube", url: "https://www.youtube.com/@tu-usuario", icon: "youtube", highlight: false }
];

// Estado del diseño y estructura
let layoutComponentOrder = ["profile", "actions", "socials", "content", "footer"];
let layoutActionsOrder = ["vcard", "share", "qr"];
let layoutActionsShow = { vcard: true, share: true, qr: true };

let profileBio = [];
let profileCardBoxShow = false;
let profileCardBoxShowNameTitle = false;
let profileCardBoxShowBio = false;
let profileCardBoxShowSection = false;
let profileCardBoxShowFooter = false;
let profileCardBoxColor = "#111928";
let profileCardBoxOpacity = 0.65;

// Estado de sincronización inteligente de SEO
let isSeoTitleCustom = false;
let isSeoDescCustom = false;

// Mapeo FontAwesome por defecto
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

// Paleta de colores de acento por defecto para los 20 temas
const THEME_DEFAULTS = {
  "space": "#38bdf8",
  "luxury": "#d4af37",
  "crimson": "#ff3333",
  "cyberpunk": "#a855f7",
  "emerald": "#10b981",
  "sunset": "#f97316",
  "frost": "#38bdf8",
  "matrix": "#00ff00",
  "aurora": "#2dd4bf",
  "neon-grid": "#ff007f",
  "rain": "#60a5fa",
  "hexagons": "#66fcf1",
  "fireflies": "#a3e635",
  "clouds": "#93c5fd",
  "retro-wave": "#f43f5e",
  "ocean": "#06b6d4",
  "abyss": "#1d4ed8",
  "sakura": "#f472b6",
  "quantum": "#fb7185",
  "minimal-static": "#64748b"
};

// Valores por defecto de cajas de lectura (color Hex y opacidad) para cada tema
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

document.addEventListener("DOMContentLoaded", () => {
  loadConfigValues();
  initFormBindings();
  
  // Renderizar editores de estructura y orden
  renderLayoutOrderEditor();
  renderActionsOrderEditor();
  
  renderSocialListEditor();
  renderContentListEditor();
  renderBioListEditor();
  
  // Registrar Drag & Drop en los contenedores
  setupDragAndDrop("layout-order-container", layoutComponentOrder, () => {
    renderLayoutOrderEditor();
    updateLivePreview();
  });
  setupDragAndDrop("actions-order-container", layoutActionsOrder, () => {
    renderActionsOrderEditor();
    updateLivePreview();
  });
  setupDragAndDrop("social-list-container", socialIcons, () => {
    renderSocialListEditor();
    updateLivePreview();
  });
  setupDragAndDrop("content-list-container", contentList, () => {
    renderContentListEditor();
    updateLivePreview();
  });
  setupDragAndDrop("bio-list-container", profileBio, () => {
    renderBioListEditor();
    updateLivePreview();
  });
  
  initPreviewAnimation();
  initDeviceToolbar();
  updateLivePreview();
});

function loadConfigValues() {
  if (typeof CONFIG === "undefined") return;

  // Cargar redes sociales y contenido vertical
  if (CONFIG.socialIcons && CONFIG.socialIcons.length > 0) {
    socialIcons = JSON.parse(JSON.stringify(CONFIG.socialIcons));
  }
  if (CONFIG.content && CONFIG.content.length > 0) {
    contentList = JSON.parse(JSON.stringify(CONFIG.content));
  }

  // Cargar perfil
  const p = CONFIG.profile;
  if (p) {
    if (p.name) document.getElementById("input-name").value = p.name;
    document.getElementById("input-verified").checked = p.verified !== false;
    if (p.avatar) document.getElementById("input-avatar").value = p.avatar;
    if (p.title) document.getElementById("input-title").value = p.title;
    
    // Cargar nuevas configuraciones de avatar
    const avatarType = p.avatarType || "image";
    const avatarShape = p.avatarShape || "circle";
    const avatarSize = p.avatarSize || 100;
    
    document.getElementById("select-profile-avatar-type").value = avatarType;
    document.getElementById("select-profile-avatar-shape").value = avatarShape;
    document.getElementById("input-profile-avatar-size").value = avatarSize;
    document.getElementById("val-profile-avatar-size").textContent = `${avatarSize}px`;

    // Cargar banner
    const banner = p.headerBanner || { show: false, type: "image", url: "" };
    document.getElementById("input-profile-banner-show").checked = !!banner.show;
    document.getElementById("select-profile-banner-type").value = banner.type || "image";
    document.getElementById("input-profile-banner-url").value = banner.url || "";
    document.getElementById("group-profile-banner-details").style.display = banner.show ? "flex" : "none";
    
    // Cargar biografía dinámica
    if (p.bio && Array.isArray(p.bio)) {
      profileBio = p.bio.map(para => {
        if (typeof para === "string") {
          return { text: para, showBox: false };
        } else {
          return { text: para.text || "", showBox: !!para.showBox };
        }
      });
    } else {
      profileBio = [];
    }
    
    if (p.vCard) {
      document.getElementById("input-vcard-name").value = p.vCard.firstName !== undefined ? p.vCard.firstName : "";
      document.getElementById("input-vcard-lname").value = p.vCard.lastName !== undefined ? p.vCard.lastName : "";
      document.getElementById("input-vcard-phone").value = p.vCard.phone !== undefined ? p.vCard.phone : "";
      document.getElementById("input-vcard-email").value = p.vCard.email !== undefined ? p.vCard.email : "";
      document.getElementById("input-vcard-url").value = p.vCard.url !== undefined ? p.vCard.url : "";
    }
    
    // Cargar título personalizado de la pestaña
    if (p.pageTitle !== undefined) {
      document.getElementById("input-web-title").value = p.pageTitle;
    } else {
      document.getElementById("input-web-title").value = "";
    }
  }

  // Cargar tema y fondo personalizado
  const t = CONFIG.theme;
  if (t) {
    if (t.selectedTheme) document.getElementById("select-theme").value = t.selectedTheme;
    if (t.buttonStyle) document.getElementById("select-button-style").value = t.buttonStyle;
    if (t.buttonAnimation) document.getElementById("select-button-anim").value = t.buttonAnimation;
    if (t.accentColor) {
      document.getElementById("input-accent-color").value = t.accentColor;
      document.getElementById("input-accent-color-hex").value = t.accentColor;
    }
    
    // Cargar fondo personalizado
    if (t.customBackground) {
      const bgType = t.customBackground.type || "none";
      const bgUrl = t.customBackground.url || "";
      document.getElementById("select-bg-type").value = bgType;
      document.getElementById("input-bg-url").value = bgUrl;
      const bgUrlGroup = document.getElementById("group-bg-url");
      if (bgUrlGroup) {
        bgUrlGroup.style.display = bgType === "none" ? "none" : "flex";
      }
    }

    // Cargar configuraciones de caja de lectura (profileCard)
    if (t.profileCard) {
      profileCardBoxShow = t.profileCard.showBox === true;
      profileCardBoxShowNameTitle = t.profileCard.showNameTitleBox === true;
      profileCardBoxShowBio = t.profileCard.showBioBox === true;
      profileCardBoxShowSection = t.profileCard.showSectionBox === true;
      profileCardBoxShowFooter = t.profileCard.showFooterBox === true;
      profileCardBoxColor = t.profileCard.boxColor || "#111928";
      profileCardBoxOpacity = t.profileCard.boxOpacity !== undefined ? t.profileCard.boxOpacity : 0.65;
    }

    // Sincronizar inputs de cajas de lectura
    document.getElementById("input-profile-box-show").checked = profileCardBoxShow;
    document.getElementById("input-profile-box-show-nametitle").checked = profileCardBoxShowNameTitle;
    document.getElementById("input-profile-box-show-bio").checked = profileCardBoxShowBio;
    document.getElementById("input-profile-box-show-section").checked = profileCardBoxShowSection;
    document.getElementById("input-profile-box-show-footer").checked = profileCardBoxShowFooter;
    document.getElementById("input-profile-box-color").value = profileCardBoxColor;
    document.getElementById("input-profile-box-color-hex").value = profileCardBoxColor;
    document.getElementById("input-profile-box-opacity").value = profileCardBoxOpacity;
    document.getElementById("val-profile-box-opacity").textContent = Math.round(profileCardBoxOpacity * 100) + "%";

    const subHeaderGroup = document.getElementById("subgroup-profile-header-boxes");
    if (subHeaderGroup) {
      subHeaderGroup.style.display = profileCardBoxShow ? "none" : "flex";
    }

    const boxGroup = document.getElementById("group-profile-box");
    if (boxGroup) {
      boxGroup.style.display = (profileCardBoxShow || profileCardBoxShowNameTitle || profileCardBoxShowBio || profileCardBoxShowSection || profileCardBoxShowFooter) ? "flex" : "none";
    }

    // Cargar Favicon
    if (t.favicon) {
      const favType = t.favicon.type || "avatar";
      const favVal = t.favicon.value || "";
      document.getElementById("select-favicon-type").value = favType;
      
      if (favType === "icon") {
        document.getElementById("input-favicon-val-icon").value = favVal;
        document.getElementById("group-favicon-val-icon").style.display = "flex";
        document.getElementById("group-favicon-val-custom").style.display = "none";
      } else if (favType === "custom") {
        document.getElementById("input-favicon-val-custom").value = favVal;
        document.getElementById("group-favicon-val-icon").style.display = "none";
        document.getElementById("group-favicon-val-custom").style.display = "flex";
      } else {
        document.getElementById("group-favicon-val-icon").style.display = "none";
        document.getElementById("group-favicon-val-custom").style.display = "none";
      }
    } else {
      document.getElementById("select-favicon-type").value = "avatar";
      document.getElementById("group-favicon-val-icon").style.display = "none";
      document.getElementById("group-favicon-val-custom").style.display = "none";
    }
  }

  // Cargar compartir
  if (CONFIG.sharing && CONFIG.sharing.qrUrl) {
    document.getElementById("input-qr-url").value = CONFIG.sharing.qrUrl;
  }

  // Cargar footer
  const f = CONFIG.footer;
  if (f) {
    document.getElementById("input-footer-show").checked = f.show !== false;
    document.getElementById("input-footer-text").value = f.text !== undefined ? f.text : "";
    document.getElementById("input-footer-link-text").value = f.linkText !== undefined ? f.linkText : "";
    document.getElementById("input-footer-link-url").value = f.linkUrl !== undefined ? f.linkUrl : "";
    document.getElementById("input-footer-extra").value = f.extraText !== undefined ? f.extraText : "";
  }

  // Cargar orden estructural (layout)
  const l = CONFIG.layout;
  if (l) {
    if (l.componentOrder && l.componentOrder.length > 0) {
      layoutComponentOrder = JSON.parse(JSON.stringify(l.componentOrder));
    }
    if (l.actions) {
      if (l.actions.order && l.actions.order.length > 0) {
        layoutActionsOrder = JSON.parse(JSON.stringify(l.actions.order));
      }
      layoutActionsShow.vcard = l.actions.showVCard !== false;
      layoutActionsShow.share = l.actions.showShare !== false;
      layoutActionsShow.qr = l.actions.showQR !== false;
    }
  }

  // Cargar PWA
  const pwa = CONFIG.pwa || { enable: false, appName: "Mi Biolink", appShortName: "Biolink" };
  document.getElementById("input-pwa-enable").checked = !!pwa.enable;
  document.getElementById("input-pwa-name").value = pwa.appName || "Mi Biolink";
  document.getElementById("input-pwa-short-name").value = pwa.appShortName || "Biolink";
  document.getElementById("group-pwa-details").style.display = pwa.enable ? "flex" : "none";
}

function renderLayoutOrderEditor() {
  const container = document.getElementById("layout-order-container");
  if (!container) return;
  container.innerHTML = "";

  const nameMap = {
    profile: "Cabecera del Perfil",
    actions: "Botones de Acción (Guardar/Compartir/QR)",
    socials: "Fila de Iconos Sociales",
    content: "Enlaces y Secciones (Contenido Vertical)",
    footer: "Pie de Página (Footer)"
  };

  layoutComponentOrder.forEach((key, idx) => {
    const div = document.createElement("div");
    div.className = "drag-item";
    div.setAttribute("draggable", "true");
    div.setAttribute("data-index", idx);
    div.setAttribute("data-key", key);

    div.innerHTML = `
      <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
      <span class="drag-item-text">${nameMap[key]}</span>
    `;

    container.appendChild(div);
  });
}

function renderBioListEditor() {
  const container = document.getElementById("bio-list-container");
  if (!container) return;
  container.innerHTML = "";

  const isGlobalBox = profileCardBoxShow;
  const isBioBox = profileCardBoxShowBio;
  const isIndividualBoxEnabled = !isGlobalBox && !isBioBox;

  profileBio.forEach((para, idx) => {
    const div = document.createElement("div");
    div.className = "list-item-editor";
    div.setAttribute("draggable", "true");
    div.setAttribute("data-index", idx);
    div.innerHTML = `
      <div class="list-item-header-row">
        <span class="drag-handle-bio"><i class="fas fa-grip-vertical"></i> Párrafo #${idx + 1}</span>
        <button class="btn-delete-item" onclick="deleteBioParagraph(${idx})"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="form-group" style="width: 100%; margin-bottom: 8px;">
        <textarea placeholder="Escribe aquí tu párrafo..." oninput="updateBioParagraph(${idx}, this.value)" rows="3" style="width: 100%; box-sizing: border-box; resize: vertical;">${para.text || ""}</textarea>
      </div>
      <div class="form-group checkbox-group" style="margin-bottom: 0; display: ${isIndividualBoxEnabled ? 'flex' : 'none'};">
        <label>
          <input type="checkbox" ${para.showBox ? 'checked' : ''} onchange="updateBioParagraphBox(${idx}, this.checked)">
          Caja de Lectura en este párrafo
        </label>
      </div>
    `;
    container.appendChild(div);
  });
}

window.deleteBioParagraph = function(idx) {
  profileBio.splice(idx, 1);
  renderBioListEditor();
  updateLivePreview();
};

window.updateBioParagraph = function(idx, value) {
  if (profileBio[idx]) {
    profileBio[idx].text = value;
  }
  updateLivePreview();
};

window.updateBioParagraphBox = function(idx, value) {
  if (profileBio[idx]) {
    profileBio[idx].showBox = value;
  }
  updateLivePreview();
};

function renderActionsOrderEditor() {
  const container = document.getElementById("actions-order-container");
  if (!container) return;
  container.innerHTML = "";

  const nameMap = {
    vcard: "Guardar Contacto (VCard)",
    share: "Compartir Página",
    qr: "Código QR"
  };

  layoutActionsOrder.forEach((key, idx) => {
    const isChecked = layoutActionsShow[key];
    const div = document.createElement("div");
    div.className = "drag-item";
    div.setAttribute("draggable", "true");
    div.setAttribute("data-index", idx);
    div.setAttribute("data-key", key);

    div.innerHTML = `
      <div class="drag-handle"><i class="fas fa-grip-vertical"></i></div>
      <span class="drag-item-text">${nameMap[key]}</span>
      <input type="checkbox" id="check-action-${key}" ${isChecked ? 'checked' : ''} style="width: auto; margin-left: auto; cursor: pointer;">
    `;

    // Evento para cambiar visibilidad
    const checkbox = div.querySelector("input");
    checkbox.addEventListener("change", (e) => {
      layoutActionsShow[key] = e.target.checked;
      updateLivePreview();
    });

    container.appendChild(div);
  });
}

function setupDragAndDrop(containerId, dataArray, onReorderCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let dragStartIndex = -1;

  // Habilitar draggable="true" solo cuando el clic se inicia en el handle de arrastre
  const handleDragInit = (e) => {
    const handle = e.target.closest(".drag-handle, .drag-handle-social, .drag-handle-content, .drag-handle-bio");
    const item = e.target.closest("[data-index]");
    if (item) {
      if (handle) {
        item.setAttribute("draggable", "true");
      } else {
        item.setAttribute("draggable", "false");
      }
    }
  };

  container.addEventListener("mousedown", handleDragInit);
  container.addEventListener("touchstart", handleDragInit, { passive: true });

  container.addEventListener("dragstart", (e) => {
    const item = e.target.closest("[data-index]");
    if (!item || item.getAttribute("draggable") !== "true") {
      e.preventDefault();
      return;
    }

    dragStartIndex = parseInt(item.getAttribute("data-index"));
    item.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", dragStartIndex);
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const item = e.target.closest("[data-index]");
    if (!item) return;
    item.classList.add("drag-over");
  });

  container.addEventListener("dragleave", (e) => {
    const item = e.target.closest("[data-index]");
    if (!item) return;
    item.classList.remove("drag-over");
  });

  container.addEventListener("dragend", (e) => {
    const item = e.target.closest("[data-index]");
    if (item) {
      item.classList.remove("dragging");
      item.setAttribute("draggable", "false"); // Inhabilitar arrastre de nuevo
    }
    
    container.querySelectorAll("[data-index]").forEach(el => {
      el.classList.remove("drag-over");
    });
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    const targetItem = e.target.closest("[data-index]");
    if (!targetItem) return;

    const dragEndIndex = parseInt(targetItem.getAttribute("data-index"));
    targetItem.classList.remove("drag-over");

    if (dragStartIndex !== -1 && dragStartIndex !== dragEndIndex) {
      const draggedElement = dataArray[dragStartIndex];
      dataArray.splice(dragStartIndex, 1);
      dataArray.splice(dragEndIndex, 0, draggedElement);
      
      onReorderCallback();
    }
  });
}


function applyLayoutOrderPreview(order) {
  const container = document.querySelector(".preview-container");
  if (!container) return;
  
  const idMap = {
    profile: document.getElementById("preview-profile-header"),
    actions: document.getElementById("preview-action-bar"),
    socials: document.getElementById("preview-social-icons"),
    content: document.getElementById("preview-content-list"),
    footer: document.getElementById("preview-page-footer")
  };
  
  order.forEach(key => {
    const el = idMap[key];
    if (el) {
      container.appendChild(el);
    }
  });
}

function renderActionBarPreview() {
  const actionBar = document.getElementById("preview-action-bar");
  if (!actionBar) return;

  const btnContact = document.getElementById("preview-btn-vcard");
  const btnShare = document.getElementById("preview-btn-share");
  const btnQr = document.getElementById("preview-btn-qr");

  const buttonMap = {
    vcard: btnContact,
    share: btnShare,
    qr: btnQr
  };

  const showMap = {
    vcard: layoutActionsShow.vcard !== false,
    share: layoutActionsShow.share !== false,
    qr: layoutActionsShow.qr !== false
  };

  // Ocultar todos
  if (btnContact) btnContact.style.display = "none";
  if (btnShare) btnShare.style.display = "none";
  if (btnQr) btnQr.style.display = "none";

  let visibleCount = 0;
  layoutActionsOrder.forEach(key => {
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

  // Ocultar contenedor si no hay botones
  actionBar.style.display = visibleCount === 0 ? "none" : "flex";
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeHtmlWithIcons(str) {
  if (!str) return '';
  const FA_TAG = /<i\s+class="[^"]*fa[^"]*"[^>]*>\s*<\/i>/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  FA_TAG.lastIndex = 0;
  while ((match = FA_TAG.exec(str)) !== null) {
    parts.push(escapeHtml(str.slice(lastIndex, match.index)));
    parts.push(match[0]);
    lastIndex = FA_TAG.lastIndex;
  }
  parts.push(escapeHtml(str.slice(lastIndex)));
  return parts.join('');
}

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

function initFormBindings() {
  const inputs = [
    "input-name", "input-verified", "input-avatar", "input-title", 
    "select-theme", "select-button-style", 
    "select-button-anim", "input-accent-color", "input-qr-url",
    "input-footer-show", "input-footer-text", "input-footer-link-text",
    "input-footer-link-url", "input-footer-extra",
    "select-bg-type", "input-bg-url",
    "select-profile-avatar-type", "select-profile-avatar-shape",
    "select-profile-banner-type", "input-profile-banner-url",
    "input-web-title", "select-favicon-type", "input-favicon-val-icon", 
    "input-favicon-val-custom", "input-pwa-enable", "input-pwa-name", 
    "input-pwa-short-name"
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const eventType = el.type === "checkbox" ? "change" : "input";
    el.addEventListener(eventType, () => {
      if (id === "input-accent-color") {
        document.getElementById("input-accent-color-hex").value = el.value;
      }
      updateLivePreview();
    });
  });

  // Vinculaciones específicas para Banner
  const bannerShowInput = document.getElementById("input-profile-banner-show");
  const bannerDetailsGroup = document.getElementById("group-profile-banner-details");
  if (bannerShowInput && bannerDetailsGroup) {
    bannerShowInput.addEventListener("change", () => {
      bannerDetailsGroup.style.display = bannerShowInput.checked ? "flex" : "none";
      updateLivePreview();
    });
  }

  // Vinculaciones específicas para Favicon y PWA
  const faviconTypeSelect = document.getElementById("select-favicon-type");
  if (faviconTypeSelect) {
    faviconTypeSelect.addEventListener("change", () => {
      const val = faviconTypeSelect.value;
      document.getElementById("group-favicon-val-icon").style.display = val === "icon" ? "flex" : "none";
      document.getElementById("group-favicon-val-custom").style.display = val === "custom" ? "flex" : "none";
      updateLivePreview();
    });
  }

  const pwaEnableInput = document.getElementById("input-pwa-enable");
  if (pwaEnableInput) {
    pwaEnableInput.addEventListener("change", () => {
      document.getElementById("group-pwa-details").style.display = pwaEnableInput.checked ? "flex" : "none";
      updateLivePreview();
    });
  }

  // Vinculaciones específicas para Slider de Tamaño de Avatar
  const avatarSizeInput = document.getElementById("input-profile-avatar-size");
  const avatarSizeVal = document.getElementById("val-profile-avatar-size");
  if (avatarSizeInput && avatarSizeVal) {
    avatarSizeInput.addEventListener("input", () => {
      avatarSizeVal.textContent = `${avatarSizeInput.value}px`;
      updateLivePreview();
    });
  }

  // Enlazar controles de cajas de lectura (modo tarjeta)
  const boxShowCheck = document.getElementById("input-profile-box-show");
  const boxShowNameTitleCheck = document.getElementById("input-profile-box-show-nametitle");
  const boxShowBioCheck = document.getElementById("input-profile-box-show-bio");
  const boxShowSectionCheck = document.getElementById("input-profile-box-show-section");
  const boxShowFooterCheck = document.getElementById("input-profile-box-show-footer");
  const boxGroup = document.getElementById("group-profile-box");
  const subHeaderGroup = document.getElementById("subgroup-profile-header-boxes");

  const updateBoxGroupVisibility = () => {
    const isAnyBoxShown = profileCardBoxShow || profileCardBoxShowNameTitle || profileCardBoxShowBio || profileCardBoxShowSection || profileCardBoxShowFooter;
    if (boxGroup) boxGroup.style.display = isAnyBoxShown ? "flex" : "none";
    if (subHeaderGroup) subHeaderGroup.style.display = profileCardBoxShow ? "none" : "flex";
  };

  if (boxShowCheck) {
    boxShowCheck.addEventListener("change", () => {
      profileCardBoxShow = boxShowCheck.checked;
      updateBoxGroupVisibility();
      renderBioListEditor();
      updateLivePreview();
    });
  }
  if (boxShowNameTitleCheck) {
    boxShowNameTitleCheck.addEventListener("change", () => {
      profileCardBoxShowNameTitle = boxShowNameTitleCheck.checked;
      updateBoxGroupVisibility();
      updateLivePreview();
    });
  }
  if (boxShowBioCheck) {
    boxShowBioCheck.addEventListener("change", () => {
      profileCardBoxShowBio = boxShowBioCheck.checked;
      updateBoxGroupVisibility();
      renderBioListEditor();
      updateLivePreview();
    });
  }
  if (boxShowSectionCheck) {
    boxShowSectionCheck.addEventListener("change", () => {
      profileCardBoxShowSection = boxShowSectionCheck.checked;
      updateBoxGroupVisibility();
      renderContentListEditor();
      updateLivePreview();
    });
  }
  if (boxShowFooterCheck) {
    boxShowFooterCheck.addEventListener("change", () => {
      profileCardBoxShowFooter = boxShowFooterCheck.checked;
      updateBoxGroupVisibility();
      updateLivePreview();
    });
  }

  const boxColorPicker = document.getElementById("input-profile-box-color");
  const boxColorHex = document.getElementById("input-profile-box-color-hex");
  if (boxColorPicker && boxColorHex) {
    boxColorPicker.addEventListener("input", () => {
      profileCardBoxColor = boxColorPicker.value;
      boxColorHex.value = profileCardBoxColor;
      updateLivePreview();
    });
    boxColorHex.addEventListener("input", () => {
      const val = boxColorHex.value;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        profileCardBoxColor = val;
        boxColorPicker.value = val;
        updateLivePreview();
      }
    });
  }

  const boxOpacitySlider = document.getElementById("input-profile-box-opacity");
  const boxOpacityVal = document.getElementById("val-profile-box-opacity");
  if (boxOpacitySlider && boxOpacityVal) {
    boxOpacitySlider.addEventListener("input", () => {
      profileCardBoxOpacity = parseFloat(boxOpacitySlider.value);
      boxOpacityVal.textContent = Math.round(profileCardBoxOpacity * 100) + "%";
      updateLivePreview();
    });
  }

  const bgTypeSelect = document.getElementById("select-bg-type");
  const bgUrlGroup = document.getElementById("group-bg-url");
  if (bgTypeSelect && bgUrlGroup) {
    bgTypeSelect.addEventListener("change", () => {
      bgUrlGroup.style.display = bgTypeSelect.value === "none" ? "none" : "flex";
      updateLivePreview();
    });
  }

  const hexInput = document.getElementById("input-accent-color-hex");
  if (hexInput) {
    hexInput.addEventListener("input", () => {
      const colorVal = hexInput.value;
      if (/^#[0-9A-F]{6}$/i.test(colorVal)) {
        document.getElementById("input-accent-color").value = colorVal;
        updateLivePreview();
      }
    });
  }

  const themeSelect = document.getElementById("select-theme");
  if (themeSelect) {
    themeSelect.addEventListener("change", () => {
      const defaultColor = THEME_DEFAULTS[themeSelect.value];
      if (defaultColor) {
        document.getElementById("input-accent-color").value = defaultColor;
        document.getElementById("input-accent-color-hex").value = defaultColor;
      }

      // Cargar preajustes de fábrica de color/opacidad de caja para el nuevo tema
      const boxPreset = THEME_BOX_DEFAULTS[themeSelect.value];
      if (boxPreset) {
        profileCardBoxColor = boxPreset.boxColor;
        profileCardBoxOpacity = boxPreset.boxOpacity;
        
        if (boxColorPicker) boxColorPicker.value = boxPreset.boxColor;
        if (boxColorHex) boxColorHex.value = boxPreset.boxColor;
        if (boxOpacitySlider) boxOpacitySlider.value = boxPreset.boxOpacity;
        if (boxOpacityVal) boxOpacityVal.textContent = Math.round(boxPreset.boxOpacity * 100) + "%";
      }
      
      updateLivePreview();
    });
  }

  const addBioBtn = document.getElementById("btn-add-bio");
  if (addBioBtn) {
    addBioBtn.addEventListener("click", () => {
      profileBio.push({ text: "", showBox: false });
      renderBioListEditor();
      updateLivePreview();
    });
  }

  document.getElementById("btn-add-social").addEventListener("click", addSocialItem);
  document.getElementById("btn-add-content-item").addEventListener("click", () => addContentItem("link"));
  document.getElementById("btn-add-section-item").addEventListener("click", () => addContentItem("section"));
  document.getElementById("btn-add-separator-item").addEventListener("click", () => addContentItem("separator"));
  document.getElementById("btn-export").addEventListener("click", exportConfigFile);

  // Vinculaciones del panel SEO y Vista Previa
  const seoDomain = document.getElementById("input-seo-domain");
  const seoTitle = document.getElementById("input-seo-title");
  const seoDesc = document.getElementById("input-seo-desc");
  const seoImgType = document.getElementById("select-seo-image-type");
  const seoImgCustom = document.getElementById("input-seo-image-custom");

  if (seoDomain) seoDomain.addEventListener("input", updateSeoPreview);
  if (seoTitle) {
    seoTitle.addEventListener("input", () => {
      isSeoTitleCustom = true;
      updateSeoPreview();
    });
  }
  if (seoDesc) {
    seoDesc.addEventListener("input", () => {
      isSeoDescCustom = true;
      updateSeoPreview();
    });
  }
  if (seoImgType) seoImgType.addEventListener("change", updateSeoPreview);
  if (seoImgCustom) seoImgCustom.addEventListener("input", updateSeoPreview);

  const copySeoBtn = document.getElementById("btn-copy-seo");
  if (copySeoBtn) {
    copySeoBtn.addEventListener("click", () => {
      const codeOutput = document.getElementById("code-seo-output");
      if (!codeOutput) return;
      const code = codeOutput.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const originalHtml = copySeoBtn.innerHTML;
        copySeoBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        setTimeout(() => {
          copySeoBtn.innerHTML = originalHtml;
        }, 2000);
      }).catch(err => {
        console.error("Error al copiar al portapapeles:", err);
      });
    });
  }
}

function addSocialItem() {
  socialIcons.push({ name: "Nueva Red", url: "https://", icon: "link" });
  renderSocialListEditor();
  updateLivePreview();
}

function addContentItem(type) {
  if (type === "section") {
    contentList.push({ type: "section", title: "Nueva Sección", icon: "📁" });
  } else if (type === "separator") {
    contentList.push({ type: "separator", height: 24 });
  } else {
    contentList.push({ type: "link", title: "Nuevo Enlace", url: "https://", icon: "link", highlight: false });
  }
  renderContentListEditor();
  updateLivePreview();
}

function renderSocialListEditor() {
  const container = document.getElementById("social-list-container");
  if (!container) return;
  container.innerHTML = "";

  socialIcons.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "list-item-editor";
    div.setAttribute("draggable", "true");
    div.setAttribute("data-index", idx);
    div.innerHTML = `
      <div class="list-item-header-row">
        <div class="drag-handle-social"><i class="fas fa-grip-vertical"></i> Icono #${idx + 1} (${item.name})</div>
        <button class="btn-delete-item" onclick="deleteSocialItem(${idx})"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label>Nombre</label>
          <input type="text" value="${item.name}" oninput="updateSocialItem(${idx}, 'name', this.value)">
        </div>
        <div class="form-group col">
          <label>Icono</label>
          <input type="text" value="${item.icon}" oninput="updateSocialItem(${idx}, 'icon', this.value)">
        </div>
      </div>
      <div class="form-group">
        <label>Enlace</label>
        <input type="text" value="${item.url}" oninput="updateSocialItem(${idx}, 'url', this.value)">
      </div>
    `;
    container.appendChild(div);
  });
}

window.deleteSocialItem = function(idx) {
  socialIcons.splice(idx, 1);
  renderSocialListEditor();
  updateLivePreview();
};

window.updateSocialItem = function(idx, field, value) {
  socialIcons[idx][field] = value;
  updateLivePreview();
};

function renderContentListEditor() {
  const container = document.getElementById("content-list-container");
  if (!container) return;
  container.innerHTML = "";

  const isSectionBoxGlobal = profileCardBoxShowSection;

  contentList.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "list-item-editor";
    div.setAttribute("draggable", "true");
    div.setAttribute("data-index", idx);

    if (item.type === "section") {
      div.innerHTML = `
        <div class="list-item-header-row">
          <span class="drag-handle-content"><i class="fas fa-grip-vertical"></i> <i class="fas fa-folder-open"></i> Sección</span>
          <button class="btn-delete-item" onclick="deleteContentItem(${idx})"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="form-row">
          <div class="form-group col" style="flex: 2;">
            <label>Título</label>
            <input type="text" value="${item.title}" oninput="updateContentItem(${idx}, 'title', this.value)">
          </div>
          <div class="form-group col" style="flex: 1;">
            <label>Icono</label>
            <input type="text" value="${item.icon || ''}" oninput="updateContentItem(${idx}, 'icon', this.value)">
          </div>
        </div>
        <div class="form-group checkbox-group" style="margin-top: 8px; margin-bottom: 0; display: ${isSectionBoxGlobal ? 'none' : 'flex'};">
          <label>
            <input type="checkbox" ${item.showBox ? 'checked' : ''} onchange="updateContentItem(${idx}, 'showBox', this.checked)">
            Caja de Lectura en esta sección
          </label>
        </div>
      `;
    } else if (item.type === "separator") {
      div.innerHTML = `
        <div class="list-item-header-row">
          <span class="drag-handle-content"><i class="fas fa-grip-vertical"></i> <i class="fas fa-arrows-alt-v"></i> Separador Transparente</span>
          <button class="btn-delete-item" onclick="deleteContentItem(${idx})"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="form-group" style="margin-top: 8px;">
          <label>Altura del Separador: <span id="val-separator-height-${idx}">${item.height !== undefined ? item.height : 24}px</span></label>
          <input type="range" min="0" max="120" step="2" value="${item.height !== undefined ? item.height : 24}" 
                 style="width: 100%; accent-color: var(--color-primary);"
                 oninput="updateSeparatorHeight(${idx}, this.value)">
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="list-item-header-row">
          <span class="drag-handle-content"><i class="fas fa-grip-vertical"></i> <i class="fas fa-link"></i> Enlace</span>
          <button class="btn-delete-item" onclick="deleteContentItem(${idx})"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label>Título</label>
            <input type="text" value="${item.title}" oninput="updateContentItem(${idx}, 'title', this.value)">
          </div>
          <div class="form-group col">
            <label>Icono</label>
            <input type="text" value="${item.icon}" oninput="updateContentItem(${idx}, 'icon', this.value)">
          </div>
        </div>
        <div class="form-group">
          <label>Enlace</label>
          <input type="text" value="${item.url}" oninput="updateContentItem(${idx}, 'url', this.value)">
        </div>
        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" ${item.highlight ? 'checked' : ''} onchange="updateContentItem(${idx}, 'highlight', this.checked)">
            Brillo Destacado
          </label>
        </div>
      `;
    }
    container.appendChild(div);
  });
}

window.deleteContentItem = function(idx) {
  contentList.splice(idx, 1);
  renderContentListEditor();
  updateLivePreview();
};

window.updateContentItem = function(idx, field, value) {
  contentList[idx][field] = value;
  updateLivePreview();
};

window.updateSeparatorHeight = function(idx, value) {
  const heightVal = parseInt(value);
  if (contentList[idx]) {
    contentList[idx].height = heightVal;
    const textSpan = document.getElementById(`val-separator-height-${idx}`);
    if (textSpan) textSpan.textContent = `${heightVal}px`;
  }
  updateLivePreview();
};

function updateLivePreview() {
  const name = document.getElementById("input-name").value;
  const verified = document.getElementById("input-verified").checked;
  const avatar = document.getElementById("input-avatar").value;
  const title = document.getElementById("input-title").value;
  const theme = document.getElementById("select-theme").value;
  const btnStyle = document.getElementById("select-button-style").value;
  const btnAnim = document.getElementById("select-button-anim").value;
  const accentColor = document.getElementById("input-accent-color").value;
  const qrUrl = document.getElementById("input-qr-url").value;
  const bgType = document.getElementById("select-bg-type").value;
  const bgUrl = document.getElementById("input-bg-url").value;

  const avatarType = document.getElementById("select-profile-avatar-type").value;
  const avatarShape = document.getElementById("select-profile-avatar-shape").value;
  const avatarSize = parseInt(document.getElementById("input-profile-avatar-size").value);

  const bannerShow = document.getElementById("input-profile-banner-show").checked;
  const bannerType = document.getElementById("select-profile-banner-type").value;
  const bannerUrl = document.getElementById("input-profile-banner-url").value;

  // Actualizar tema en body
  document.body.className = "creator-body";
  document.body.classList.add(`theme-${theme}`);

  // Limpiar estilos del fondo personalizado en el previsualizador
  const previewFrame = document.querySelector(".preview-frame-container");
  const previewVideoContainer = document.getElementById("preview-video-bg-container");
  const previewStarfield = document.getElementById("starfield");

  if (previewFrame) {
    previewFrame.style.backgroundImage = "";
    previewFrame.style.backgroundSize = "";
    previewFrame.style.backgroundPosition = "";
  }
  if (previewVideoContainer) {
    previewVideoContainer.style.display = "none";
    previewVideoContainer.innerHTML = "";
  }
  // Aplicar fondo personalizado o reiniciar si es ninguno
  if (bgType === "none") {
    if (window.currentBgType !== "none") {
      if (previewFrame) previewFrame.style.backgroundImage = "";
      if (previewVideoContainer) {
        previewVideoContainer.style.display = "none";
        previewVideoContainer.innerHTML = "";
      }
      if (previewStarfield) previewStarfield.style.display = "block";
      window.currentBgUrl = "";
      window.currentBgType = "none";
    }
  } else if (bgUrl && bgUrl.trim() !== "") {
    if (previewStarfield && previewStarfield.style.display !== "none") {
      previewStarfield.style.display = "none";
    }

    const finalUrl = bgUrl.startsWith("http") || bgUrl.startsWith("./") || bgUrl.startsWith("../") ? bgUrl : `../${bgUrl}`;

    if (bgType === "image") {
      if (previewFrame && (window.currentBgUrl !== finalUrl || window.currentBgType !== bgType)) {
        previewFrame.style.backgroundImage = `url('${finalUrl}')`;
        previewFrame.style.backgroundSize = "cover";
        previewFrame.style.backgroundPosition = "center";
        
        // Limpiar el video si estaba activo
        if (previewVideoContainer) {
          previewVideoContainer.style.display = "none";
          previewVideoContainer.innerHTML = "";
        }
        
        window.currentBgUrl = finalUrl;
        window.currentBgType = bgType;
      }
    } else if (bgType === "video") {
      if (previewVideoContainer && (window.currentBgUrl !== finalUrl || window.currentBgType !== bgType)) {
        previewVideoContainer.style.display = "block";
        previewVideoContainer.innerHTML = `
          <video autoplay loop muted playsinline>
            <source src="${finalUrl}" type="video/mp4">
          </video>
        `;
        
        // Limpiar la imagen si estaba activa
        if (previewFrame) previewFrame.style.backgroundImage = "";
        
        window.currentBgUrl = finalUrl;
        window.currentBgType = bgType;
      }
    }
  }

  // Cambiar variables de acento en body
  const bodyEl = document.body;
  bodyEl.style.setProperty('--accent-color', accentColor);
  bodyEl.style.setProperty('--accent-glow', convertHexToRgba(accentColor, 0.45));

  // Renderizar campos de perfil
  document.getElementById("preview-profile-name").textContent = name;
  document.getElementById("preview-profile-verified").style.display = verified ? "inline-flex" : "none";
  document.getElementById("preview-profile-title").innerHTML = title;
  
  // Renderizar biografía dinámica
  const bioPreviewEl = document.getElementById("preview-profile-bio");
  const rgbaColor = convertHexToRgba(profileCardBoxColor, profileCardBoxOpacity);
  if (bioPreviewEl) {
    if (profileBio && profileBio.length > 0) {
      bioPreviewEl.innerHTML = profileBio.map(para => {
        const text = para.text || "";
        const showParaBox = !!para.showBox;
        
        // Párrafo individual solo lleva caja si no está en cabecera completa y tampoco en bio completa
        const shouldApplyParaBox = !profileCardBoxShow && !profileCardBoxShowBio && showParaBox;
        const classes = shouldApplyParaBox ? 'class="card-mode"' : '';
        const styles = shouldApplyParaBox ? `style="--profile-box-bg: ${rgbaColor}; --profile-box-border: rgba(255, 255, 255, 0.08);"` : '';
        
        return `<p ${classes} ${styles}>${text}</p>`;
      }).join("");
      bioPreviewEl.style.display = "block";
    } else {
      bioPreviewEl.innerHTML = "";
      bioPreviewEl.style.display = "none";
    }
  }
  
  const previewAvatarContainer = document.getElementById("preview-profile-avatar-container");
  if (previewAvatarContainer) {
    const finalAvatarUrl = avatar.startsWith("http") || avatar.startsWith("./") || avatar.startsWith("../") ? avatar : `../${avatar}`;
    const isVideo = avatarType === "video" || finalAvatarUrl.toLowerCase().endsWith(".mp4") || finalAvatarUrl.toLowerCase().endsWith(".webm");
    
    if (isVideo) {
      previewAvatarContainer.innerHTML = `
        <video id="preview-profile-avatar-video" class="avatar-img" autoplay loop muted playsinline>
          <source src="${finalAvatarUrl}" type="video/mp4">
        </video>
      `;
    } else {
      previewAvatarContainer.innerHTML = `
        <img id="preview-profile-avatar" src="${finalAvatarUrl}" alt="Preview Avatar" class="avatar-img" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'">
      `;
    }
    
    // Aplicar tamaño y forma
    previewAvatarContainer.style.setProperty("--avatar-size", `${avatarSize}px`);
    
    // Cambiar clases de forma
    previewAvatarContainer.className = "avatar-wrapper";
    previewAvatarContainer.classList.add(`avatar-shape-${avatarShape}`);
  }

  // Renderizar banner en el simulador
  const previewBanner = document.getElementById("preview-profile-banner");
  if (previewBanner) {
    const showBanner = bannerShow && bannerUrl && bannerUrl.trim() !== "";
    
    if (showBanner) {
      if (previewFrame) previewFrame.classList.add("has-banner");
      previewBanner.style.display = "block";
      
      const isVideo = bannerType === "video" || bannerUrl.toLowerCase().endsWith(".mp4") || bannerUrl.toLowerCase().endsWith(".webm");
      const finalUrl = bannerUrl.startsWith("http") || bannerUrl.startsWith("./") || bannerUrl.startsWith("../") ? bannerUrl : `../${bannerUrl}`;
      
      if (window.currentPreviewBannerUrl !== finalUrl || window.currentPreviewBannerType !== bannerType) {
        if (isVideo) {
          previewBanner.innerHTML = `
            <video autoplay loop muted playsinline>
              <source src="${finalUrl}" type="video/mp4">
            </video>
          `;
        } else {
          previewBanner.innerHTML = `<img src="${finalUrl}" alt="Preview Banner" onerror="this.parentNode.style.display='none'; document.querySelector('.preview-frame-container').classList.remove('has-banner');">`;
        }
        window.currentPreviewBannerUrl = finalUrl;
        window.currentPreviewBannerType = bannerType;
      }
    } else {
      if (previewFrame) previewFrame.classList.remove("has-banner");
      previewBanner.style.display = "none";
      previewBanner.innerHTML = "";
      window.currentPreviewBannerUrl = "";
      window.currentPreviewBannerType = "";
    }
  }

  // Helper para aplicar estilos de tarjeta de lectura en el simulador
  const applyCardModePreview = (element, shouldApply) => {
    if (!element) return;
    if (shouldApply) {
      element.classList.add("card-mode");
      element.style.setProperty('--profile-box-bg', rgbaColor);
      element.style.setProperty('--profile-box-border', 'rgba(255, 255, 255, 0.08)');
    } else {
      element.classList.remove("card-mode");
      element.style.removeProperty('--profile-box-bg');
      element.style.removeProperty('--profile-box-border');
    }
  };

  const previewProfileHeader = document.getElementById("preview-profile-header");
  const previewNameTitleEl = document.getElementById("preview-profile-name-title-container");

  applyCardModePreview(previewProfileHeader, profileCardBoxShow);
  applyCardModePreview(previewNameTitleEl, !profileCardBoxShow && profileCardBoxShowNameTitle);
  applyCardModePreview(bioPreviewEl, !profileCardBoxShow && profileCardBoxShowBio);

  // Redes
  const socialRow = document.getElementById("preview-social-icons");
  if (socialIcons.length === 0) {
    socialRow.style.display = "none";
    socialRow.innerHTML = "";
  } else {
    socialRow.style.display = "flex";
    socialRow.innerHTML = "";
    socialIcons.forEach(item => {
      const a = document.createElement("a");
      a.className = "social-icon-item";
      a.innerHTML = getIconHtml(item.icon, true);
      socialRow.appendChild(a);
    });
  }

  // Lista
  const contentListEl = document.getElementById("preview-content-list");
  if (contentList.length === 0) {
    contentListEl.style.display = "none";
    contentListEl.innerHTML = "";
  } else {
    contentListEl.style.display = "";
    contentListEl.innerHTML = "";

    const btnStyleClass = `btn-style-${btnStyle}`;
    const btnAnimClass = `btn-anim-${btnAnim}`;

    contentList.forEach(item => {
      if (item.type === "section") {
        const secDiv = document.createElement("div");
        secDiv.className = "content-section-title";
        
        // Aplicar caja de lectura a la sección si está activada (global o individual)
        const showSectionBox = !!profileCardBoxShowSection;
        const showIndividualBox = !showSectionBox && !!item.showBox;

        if (showSectionBox || showIndividualBox) {
          secDiv.classList.add("card-mode");
          secDiv.style.setProperty('--profile-box-bg', rgbaColor);
          secDiv.style.setProperty('--profile-box-border', 'rgba(255, 255, 255, 0.08)');
        }

        secDiv.innerHTML = `<span>${item.icon ? item.icon + ' ' : ''}${item.title}</span>`;
        contentListEl.appendChild(secDiv);
      } else if (item.type === "separator") {
        const sepDiv = document.createElement("div");
        sepDiv.className = "content-separator";
        sepDiv.style.height = `${item.height !== undefined ? item.height : 24}px`;
        contentListEl.appendChild(sepDiv);
      } else {
        const a = document.createElement("a");
        a.className = `link-item ${btnStyleClass} ${btnAnimClass} ${item.highlight ? 'link-highlight' : ''}`;
        
        if (item.highlight && btnAnim === 'none') {
          a.classList.add('btn-anim-shine');
        }

        a.innerHTML = `
          <div class="link-icon-container">${getIconHtml(item.icon)}</div>
          <div class="link-title">${item.title}</div>
          <i class="fas fa-chevron-right link-arrow"></i>
        `;
        contentListEl.appendChild(a);
      }
    });
  }

  // Renderizar Footer
  const footerShow = document.getElementById("input-footer-show").checked;
  const footerText = document.getElementById("input-footer-text").value;
  const footerLinkText = document.getElementById("input-footer-link-text").value;
  const footerLinkUrl = document.getElementById("input-footer-link-url").value;
  const footerExtra = document.getElementById("input-footer-extra").value;

  const previewFooter = document.getElementById("preview-page-footer");
  if (previewFooter) {
    if (!footerShow) {
      previewFooter.style.display = "none";
    } else {
      previewFooter.style.display = "block";
      let html = `<p>${footerText} `;
      if (footerLinkText && footerLinkUrl) {
        html += `<a href="${footerLinkUrl}" target="_blank" rel="noopener noreferrer">${footerLinkText}</a>`;
      }
      if (footerExtra) {
        html += ` | ${footerExtra}`;
      }
      html += `</p>`;
      previewFooter.innerHTML = html;

      // Aplicar caja de lectura al footer si está activada
      if (profileCardBoxShowFooter) {
        previewFooter.classList.add("card-mode");
        const rgbaColor = convertHexToRgba(profileCardBoxColor, profileCardBoxOpacity);
        previewFooter.style.setProperty('--profile-box-bg', rgbaColor);
        previewFooter.style.setProperty('--profile-box-border', 'rgba(255, 255, 255, 0.08)');
      } else {
        previewFooter.classList.remove("card-mode");
        previewFooter.style.removeProperty('--profile-box-bg');
        previewFooter.style.removeProperty('--profile-box-border');
      }
    }
  }

  // Ordenar componentes principales en el previsualizador
  applyLayoutOrderPreview(layoutComponentOrder);

  // Renderizar la barra de acciones en el previsualizador
  renderActionBarPreview();
 
  if (window.currentThemeEffect !== theme) {
    window.currentThemeEffect = theme;
    triggerBgReset(theme);
  }

  // Actualizar la Vista Previa de SEO y Generar Meta Tags
  if (typeof updateSeoPreview === "function") {
    updateSeoPreview();
  }
}

/**
 * CONTROL DE CAMBIO DE DISPOSITIVO (Simulador Adaptativo)
 */
function initDeviceToolbar() {
  const deviceBtns = document.querySelectorAll(".toolbar-btn");
  const frameContainer = document.querySelector(".preview-frame-container");
  
  deviceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      deviceBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const device = btn.getAttribute("data-device");
      frameContainer.className = "preview-frame-container";
      frameContainer.classList.add(`device-${device}`);
      
      // Forzar redimensionado del canvas
      setTimeout(() => {
        const canvas = document.getElementById("starfield");
        if (canvas) {
          canvas.width = canvas.parentElement.clientWidth;
          canvas.height = canvas.parentElement.clientHeight;
          if (window.triggerBgReset) {
            window.triggerBgReset(bgTheme);
          }
        }
      }, 450); // espera a que termine la transición CSS (0.4s)
    });
  });
}

function convertHexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * MOTOR DE RENDIMIENTO DE PARTÍCULAS EN EL CANVASS DEL MOCKUP (20 TEMAS)
 */
let bgParticles = [];
let bgTheme = "space";
let resizeListenerAttached = false;

function initPreviewAnimation() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  if (!resizeListenerAttached) {
    window.addEventListener("resize", () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });
    resizeListenerAttached = true;
  }

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  canvas.parentElement.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = (e.clientX - rect.left - width / 2) * 0.08;
    targetMouseY = (e.clientY - rect.top - height / 2) * 0.08;
  });

  window.triggerBgReset = function(newTheme) {
    bgTheme = newTheme;
    bgParticles.length = 0;

    if (newTheme === "minimal-static") return;

    const num = newTheme === "space" ? 50 : newTheme === "luxury" ? 30 : newTheme === "crimson" ? 25 : 20;

    if (newTheme === "space") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2, speedY: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.7 + 0.3, alphaSpeed: Math.random() * 0.01 + 0.005
        });
      }
    } 
    else if (newTheme === "luxury") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.1, speedY: -(Math.random() * 0.3 + 0.08),
          wobble: Math.random() * Math.PI, wobbleSpeed: Math.random() * 0.02 + 0.005,
          alpha: Math.random() * 0.6 + 0.2, twinkleSpeed: Math.random() * 0.01 + 0.005,
          color: `rgba(${Math.floor(Math.random() * 40 + 215)}, ${Math.floor(Math.random() * 30 + 170)}, ${Math.floor(Math.random() * 20 + 50)}, `
        });
      }
    } 
    else if (newTheme === "crimson") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 2.2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.15, speedY: -(Math.random() * 0.4 + 0.15),
          angle: Math.random() * Math.PI * 2, waveSpeed: Math.random() * 0.015 + 0.005,
          waveAmp: Math.random() * 0.5 + 0.2, alpha: Math.random() * 0.8 + 0.2,
          color: Math.random() > 0.4 ? 'rgba(255, 51, 51, ' : 'rgba(255, 120, 50, '
        });
      }
    } 
    else if (newTheme === "cyberpunk") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 0.8, color: Math.random() > 0.4 ? '#a855f7' : '#06b6d4'
        });
      }
    }
    else if (newTheme === "emerald") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 2.5 + 0.8,
          speedX: (Math.random() - 0.5) * 0.15, speedY: -(Math.random() * 0.3 + 0.08),
          wobble: Math.random() * Math.PI, wobbleSpeed: Math.random() * 0.01 + 0.005,
          alpha: Math.random() * 0.6 + 0.2
        });
      }
    }
    else if (newTheme === "sunset") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 2.5 + 0.8,
          speedX: -(Math.random() * 0.6 + 0.15), speedY: (Math.random() - 0.5) * 0.1,
          alpha: Math.random() * 0.7 + 0.2,
          color: Math.random() > 0.5 ? 'rgba(249, 115, 22, ' : 'rgba(236, 72, 153, '
        });
      }
    }
    else if (newTheme === "frost") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 2.2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.15, speedY: Math.random() * 0.3 + 0.08,
          wobble: Math.random() * Math.PI, wobbleSpeed: Math.random() * 0.02 + 0.005,
          alpha: Math.random() * 0.6 + 0.2
        });
      }
    }
    else if (newTheme === "matrix") {
      const cols = Math.floor(width / 14);
      for (let i = 0; i < cols; i++) {
        bgParticles.push({
          x: i * 14, y: Math.random() * height - height,
          speed: Math.random() * 2.5 + 0.8,
          chars: "10ABCDEFGH$#@%", val: ""
        });
      }
    }
    else if (newTheme === "rain") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 1.2 + 0.4,
          speedY: Math.random() * 3 + 2, length: Math.random() * 8 + 4
        });
      }
    }
    else if (newTheme === "fireflies") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 1.8 + 0.8,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random(), alphaSpeed: Math.random() * 0.025 + 0.01
        });
      }
    }
    else if (newTheme === "hexagons") {
      for (let i = 0; i < 15; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 18 + 8, alpha: 0,
          maxAlpha: Math.random() * 0.35 + 0.08,
          alphaSpeed: Math.random() * 0.005 + 0.002, state: 1
        });
      }
    }
    else if (newTheme === "clouds") {
      for (let i = 0; i < 15; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          radius: Math.random() * 60 + 30,
          vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.08,
          alpha: Math.random() * 0.2 + 0.05
        });
      }
    }
    else if (newTheme === "ocean") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          speedY: -(Math.random() * 0.4 + 0.1), speedX: (Math.random() - 0.5) * 0.08,
          wobble: Math.random() * Math.PI, wobbleSpeed: Math.random() * 0.02 + 0.005,
          alpha: Math.random() * 0.4 + 0.1
        });
      }
    }
    else if (newTheme === "abyss") {
      for (let i = 0; i < 18; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 2.5 + 0.8,
          pulseSpeed: Math.random() * 0.012 + 0.004,
          alpha: Math.random() * Math.PI, color: `rgba(29, 78, 216, `
        });
      }
    }
    else if (newTheme === "sakura") {
      for (let i = 0; i < num; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 3.5 + 1.5,
          speedX: -(Math.random() * 0.4 + 0.15), speedY: Math.random() * 0.25 + 0.08,
          angle: Math.random() * Math.PI * 2, rotSpeed: Math.random() * 0.02 + 0.005,
          alpha: Math.random() * 0.55 + 0.15
        });
      }
    }
    else if (newTheme === "quantum") {
      for (let i = 0; i < 12; i++) {
        bgParticles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6, radius: Math.random() * 35 + 15,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() * 0.025 + 0.008) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    }
  };

  triggerBgReset(bgTheme);

  let gridY = 0;
  let timeVal = 0;

  function loop() {
    const parentWidth = canvas.parentElement.clientWidth;
    const parentHeight = canvas.parentElement.clientHeight;
    if (parentWidth && parentHeight && (parentWidth !== canvas.width || parentHeight !== canvas.height)) {
      const oldWidth = width;
      const oldHeight = height;
      width = canvas.width = parentWidth;
      height = canvas.height = parentHeight;
      
      const scaleX = oldWidth > 0 ? width / oldWidth : 1;
      const scaleY = oldHeight > 0 ? height / oldHeight : 1;
      
      bgParticles.forEach(p => {
        if (p.x !== undefined) p.x = p.x * scaleX;
        if (p.y !== undefined) p.y = p.y * scaleY;
      });
    }

    const bgTypeEl = document.getElementById("select-bg-type");
    const bgUrlEl = document.getElementById("input-bg-url");
    const bgType = bgTypeEl ? bgTypeEl.value : "none";
    const bgUrl = bgUrlEl ? bgUrlEl.value : "";
    const hasCustomBg = bgType !== "none" && bgUrl && bgUrl.trim() !== "";

    if (hasCustomBg) {
      ctx.clearRect(0, 0, width, height);
      if (canvas.style.display !== "none") canvas.style.display = "none";
      requestAnimationFrame(loop);
      return;
    } else {
      if (canvas.style.display === "none") canvas.style.display = "block";
    }

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    timeVal += 0.005;

    // Pintar fondo
    if (bgTheme === "space") {
      ctx.fillStyle = "rgba(8, 11, 19, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "luxury") {
      ctx.fillStyle = "rgba(6, 6, 6, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "crimson") {
      ctx.fillStyle = "rgba(7, 1, 1, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "cyberpunk") {
      ctx.fillStyle = "rgba(7, 4, 15, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "emerald") {
      ctx.fillStyle = "rgba(3, 12, 8, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "sunset") {
      ctx.fillStyle = "rgba(13, 6, 15, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "frost") {
      ctx.fillStyle = "rgba(10, 15, 29, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "matrix") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "aurora") {
      ctx.fillStyle = "rgba(3, 8, 12, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "neon-grid" || bgTheme === "retro-wave") {
      ctx.fillStyle = bgTheme === "retro-wave" ? "rgba(26, 5, 46, 0.3)" : "rgba(10, 3, 20, 0.3)";
      ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "rain") {
      ctx.fillStyle = "rgba(9, 14, 20, 0.25)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "hexagons") {
      ctx.fillStyle = "rgba(11, 12, 16, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "fireflies") {
      ctx.fillStyle = "rgba(5, 7, 2, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "clouds") {
      ctx.fillStyle = "rgba(17, 24, 39, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "ocean") {
      ctx.fillStyle = "rgba(2, 26, 36, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "abyss") {
      ctx.fillStyle = "rgba(2, 4, 10, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "sakura") {
      ctx.fillStyle = "rgba(18, 9, 14, 0.3)"; ctx.fillRect(0, 0, width, height);
    } else if (bgTheme === "quantum") {
      ctx.fillStyle = "rgba(10, 10, 15, 0.3)"; ctx.fillRect(0, 0, width, height);
    }

    // Dibujado
    if (bgTheme === "space") {
      bgParticles.forEach((star) => {
        let renderX = star.x + mouseX * star.size * 0.4;
        let renderY = star.y + mouseY * star.size * 0.4;
        star.x += star.speedX; star.y += star.speedY;
        star.alpha += star.alphaSpeed;
        if (star.alpha <= 0.2 || star.alpha >= 1) star.alphaSpeed = -star.alphaSpeed;
        if (star.x < 0) star.x = width; if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height; if (star.y > height) star.y = 0;
        ctx.beginPath(); ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`; ctx.fill();
      });
    } 
    else if (bgTheme === "luxury") {
      bgParticles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        let renderX = p.x + Math.sin(p.wobble) * 8 + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.y += p.speedY; p.x += p.speedX;
        p.alpha += p.twinkleSpeed;
        if (p.alpha <= 0.15 || p.alpha >= 0.85) p.twinkleSpeed = -p.twinkleSpeed;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        if (p.x < -20) p.x = width + 20; if (p.x > width + 20) p.x = -20;
        ctx.beginPath(); ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`; ctx.fill();
      });
    } 
    else if (bgTheme === "crimson") {
      bgParticles.forEach((p) => {
        p.angle += p.waveSpeed;
        let renderX = p.x + Math.cos(p.angle) * (p.waveAmp * 6) + mouseX * p.size * 0.25;
        let renderY = p.y + mouseY * p.size * 0.25;
        p.y += p.speedY; p.x += p.speedX;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; p.alpha = Math.random() * 0.8 + 0.2; }
        let currentAlpha = p.alpha * (renderY / height);
        ctx.beginPath(); ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`; ctx.fill();
      });
    } 
    else if (bgTheme === "cyberpunk") {
      bgParticles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
      });
      ctx.lineWidth = 0.5;
      for (let i = 0; i < bgParticles.length; i++) {
        for (let j = i + 1; j < bgParticles.length; j++) {
          let p1 = bgParticles[i]; let p2 = bgParticles[j];
          let dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (dist < 70) {
            let alpha = (1 - dist / 70) * 0.25;
            ctx.strokeStyle = p1.color === '#06b6d4' ? `rgba(6, 182, 212, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
    }
    else if (bgTheme === "emerald") {
      bgParticles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        let renderX = p.x + Math.sin(p.wobble) * 6 + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.y += p.speedY; p.x += p.speedX;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        ctx.beginPath(); ctx.ellipse(renderX, renderY, p.size, p.size * 1.6, p.wobble, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`; ctx.fill();
      });
    }
    else if (bgTheme === "sunset") {
      bgParticles.forEach((p) => {
        let renderX = p.x + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < -20) { p.x = width + 20; p.y = Math.random() * height; }
        ctx.beginPath(); ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`; ctx.fill();
      });
    }
    else if (bgTheme === "frost") {
      bgParticles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        let renderX = p.x + Math.sin(p.wobble) * 8 + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        p.y += p.speedY; p.x += p.speedX;
        if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
        ctx.beginPath(); ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; ctx.fill();
      });
    }
    else if (bgTheme === "matrix") {
      ctx.font = "11px Courier New";
      ctx.fillStyle = "rgba(0, 255, 0, 0.6)";
      bgParticles.forEach((col) => {
        const char = col.chars[Math.floor(Math.random() * col.chars.length)];
        ctx.fillText(char, col.x, col.y);
        col.y += col.speed * 6;
        if (col.y > height) { col.y = -40; col.speed = Math.random() * 2 + 0.8; }
      });
    }
    else if (bgTheme === "aurora") {
      ctx.lineWidth = 25;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        let grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, "rgba(45, 212, 191, 0)");
        grad.addColorStop(0.5, i === 1 ? "rgba(16, 185, 129, 0.08)" : "rgba(45, 212, 191, 0.12)");
        grad.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.strokeStyle = grad; ctx.moveTo(0, height * 0.35 + i * 50);
        for (let x = 0; x < width; x += 10) {
          let y = height * 0.35 + i * 50 + Math.sin(x * 0.003 + timeVal + i) * 40;
          ctx.lineTo(x, y + mouseY * 1.2);
        }
        ctx.stroke();
      }
    }
    else if (bgTheme === "neon-grid" || bgTheme === "retro-wave") {
      ctx.strokeStyle = bgTheme === "retro-wave" ? "rgba(244, 63, 94, 0.22)" : "rgba(255, 0, 127, 0.22)";
      ctx.lineWidth = 1;
      gridY += 1.2;
      if (gridY >= 30) gridY = 0;
      const horizonY = height * 0.58;
      for (let y = horizonY; y < height; y += 30) {
        let actualY = y + gridY; if (actualY > height) continue;
        ctx.beginPath(); ctx.moveTo(0, actualY + mouseY * 0.5); ctx.lineTo(width, actualY + mouseY * 0.5); ctx.stroke();
      }
      for (let x = -width * 0.5; x < width * 1.5; x += 50) {
        ctx.beginPath(); ctx.moveTo(x + mouseX * 2, height); ctx.lineTo(width / 2 + mouseX * 0.3, horizonY + mouseY * 0.5); ctx.stroke();
      }
      if (bgTheme === "retro-wave") {
        let grad = ctx.createLinearGradient(width / 2, horizonY - 70, width / 2, horizonY);
        grad.addColorStop(0, "#f43f5e"); grad.addColorStop(1, "#facc15");
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(width / 2 + mouseX * 0.5, horizonY - 10, 60, Math.PI, 0); ctx.fill();
      }
    }
    else if (bgTheme === "rain") {
      ctx.strokeStyle = "rgba(96, 165, 250, 0.35)";
      bgParticles.forEach((p) => {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + mouseX * 0.08, p.y + p.length); ctx.stroke();
        p.y += p.speedY;
        if (p.y > height) { p.y = -20; p.x = Math.random() * width; }
      });
    }
    else if (bgTheme === "fireflies") {
      bgParticles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.05 || p.alpha >= 0.95) p.alphaSpeed = -p.alphaSpeed;
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
        ctx.beginPath(); ctx.arc(p.x + mouseX * 0.2, p.y + mouseY * 0.2, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 230, 53, ${Math.max(0, p.alpha)})`;
        ctx.fill();
      });
    }
    else if (bgTheme === "hexagons") {
      bgParticles.forEach((p) => {
        p.alpha += p.alphaSpeed * p.state;
        if (p.alpha >= p.maxAlpha) { p.alpha = p.maxAlpha; p.state = -1; }
        if (p.alpha <= 0) { p.state = 1; p.alpha = 0; p.x = Math.random() * width; p.y = Math.random() * height; }
        ctx.strokeStyle = `rgba(102, 252, 241, ${p.alpha})`;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          let angle = (i * Math.PI) / 3;
          let hx = p.x + p.size * Math.cos(angle) + mouseX * 0.15;
          let hy = p.y + p.size * Math.sin(angle) + mouseY * 0.15;
          if (i === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
        }
        ctx.closePath(); ctx.stroke();
      });
    }
    else if (bgTheme === "clouds") {
      bgParticles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -60) p.x = width + 60; if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60; if (p.y > height + 60) p.y = -60;
        let grad = ctx.createRadialGradient(p.x + mouseX * 0.2, p.y + mouseY * 0.2, 0, p.x + mouseX * 0.2, p.y + mouseY * 0.2, p.radius);
        grad.addColorStop(0, `rgba(147, 197, 253, ${p.alpha})`);
        grad.addColorStop(1, "rgba(147, 197, 253, 0)");
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x + mouseX * 0.2, p.y + mouseY * 0.2, p.radius, 0, Math.PI * 2); ctx.fill();
      });
    }
    else if (bgTheme === "ocean") {
      bgParticles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.y += p.speedY; p.x += p.speedX;
        let renderX = p.x + Math.sin(p.wobble) * 4 + mouseX * p.radius * 0.3;
        let renderY = p.y + mouseY * p.radius * 0.3;
        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        ctx.strokeStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.beginPath(); ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2); ctx.stroke();
      });
    }
    else if (bgTheme === "abyss") {
      bgParticles.forEach((p) => {
        p.alpha += p.pulseSpeed;
        let actualAlpha = Math.max(0.1, (Math.sin(p.alpha) + 1) * 0.35);
        ctx.beginPath(); ctx.arc(p.x + mouseX * 0.2, p.y + mouseY * 0.2, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${actualAlpha})`; ctx.fill();
      });
    }
    else if (bgTheme === "sakura") {
      bgParticles.forEach((p) => {
        p.angle += p.rotSpeed;
        p.x += p.speedX; p.y += p.speedY;
        let renderX = p.x + mouseX * p.size * 0.3;
        let renderY = p.y + mouseY * p.size * 0.3;
        if (p.x < -20 || p.y > height + 20) { p.x = Math.random() * width + 20; p.y = -20; }
        ctx.save(); ctx.translate(renderX, renderY); ctx.rotate(p.angle);
        ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`; ctx.fill(); ctx.restore();
      });
    }
    else if (bgTheme === "quantum") {
      bgParticles.forEach((p) => {
        p.angle += p.speed;
        let cx = p.x + mouseX * p.size * 0.3;
        let cy = p.y + mouseY * p.size * 0.3;
        let px = cx + Math.cos(p.angle) * p.radius;
        let py = cy + Math.sin(p.angle) * p.radius;
        ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 113, 133, 0.8)"; ctx.fill();
      });
    }

    requestAnimationFrame(loop);
  }

  loop();
}

/**
 * EXPORTACIÓN Y DESCARGA DEL ARCHIVO CONFIG.JS COMPLETO Y COMENTADO
 */
function exportConfigFile() {
  const name = document.getElementById("input-name").value;
  const verified = document.getElementById("input-verified").checked;
  const avatar = document.getElementById("input-avatar").value;
  const title = document.getElementById("input-title").value;
  
  const webTitle = document.getElementById("input-web-title").value;
  const faviconType = document.getElementById("select-favicon-type").value;
  const faviconIcon = document.getElementById("input-favicon-val-icon").value;
  const faviconCustom = document.getElementById("input-favicon-val-custom").value;
  const pwaEnable = document.getElementById("input-pwa-enable").checked;
  const pwaName = document.getElementById("input-pwa-name").value;
  const pwaShortName = document.getElementById("input-pwa-short-name").value;

  const faviconVal = faviconType === "icon" ? faviconIcon : (faviconType === "custom" ? faviconCustom : "");
  const theme = document.getElementById("select-theme").value;
  const btnStyle = document.getElementById("select-button-style").value;
  const btnAnim = document.getElementById("select-button-anim").value;
  const accentColor = document.getElementById("input-accent-color").value;
  const qrUrl = document.getElementById("input-qr-url").value;
  const bgType = document.getElementById("select-bg-type").value;
  const bgUrl = document.getElementById("input-bg-url").value;

  const avatarType = document.getElementById("select-profile-avatar-type").value;
  const avatarShape = document.getElementById("select-profile-avatar-shape").value;
  const avatarSize = parseInt(document.getElementById("input-profile-avatar-size").value);

  const bannerShow = document.getElementById("input-profile-banner-show").checked;
  const bannerType = document.getElementById("select-profile-banner-type").value;
  const bannerUrl = document.getElementById("input-profile-banner-url").value;

  // Formatear ordenes del diseño
  const compOrderStr = layoutComponentOrder.map(item => `"${item}"`).join(", ");
  const actOrderStr = layoutActionsOrder.map(item => `"${item}"`).join(", ");

  // Datos VCard
  const vcName = document.getElementById("input-vcard-name").value;
  const vcLname = document.getElementById("input-vcard-lname").value;
  const vcPhone = document.getElementById("input-vcard-phone").value;
  const vcEmail = document.getElementById("input-vcard-email").value;
  const vcUrl = document.getElementById("input-vcard-url").value;

  // Datos Footer
  const footerShow = document.getElementById("input-footer-show").checked;
  const footerText = document.getElementById("input-footer-text").value;
  const footerLinkText = document.getElementById("input-footer-link-text").value;
  const footerLinkUrl = document.getElementById("input-footer-link-url").value;
  const footerExtra = document.getElementById("input-footer-extra").value;

  // Formatear biografía como array de objetos, escapando correctamente saltos de línea y comillas
  const bioString = profileBio.map(p => {
    const escapedText = p.text
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\r?\n/g, '\\n');
    return `      { text: "${escapedText}", showBox: ${!!p.showBox} }`;
  }).join(",\n");

  // Formatear social
  const socialString = socialIcons.map(item => {
    return `    { name: "${item.name.replace(/"/g, '\\"')}", url: "${item.url.replace(/"/g, '\\"')}", icon: "${item.icon.replace(/"/g, '\\"')}" }`;
  }).join(",\n");

  // Formatear contenido vertical
  const contentString = contentList.map(item => {
    if (item.type === "section") {
      return `    {
      type: "section",
      title: "${item.title.replace(/"/g, '\\"')}",
      icon: "${(item.icon || '').replace(/"/g, '\\"')}",
      showBox: ${!!item.showBox}
    }`;
    } else if (item.type === "separator") {
      return `    {
      type: "separator",
      height: ${item.height !== undefined ? item.height : 24}
    }`;
    } else {
      return `    {
      type: "link",
      title: "${item.title.replace(/"/g, '\\"')}",
      url: "${item.url.replace(/"/g, '\\"')}",
      icon: "${item.icon.replace(/"/g, '\\"')}",
      highlight: ${item.highlight}
    }`;
    }
  }).join(",\n");

  // Documentar cada listado detalladamente en español
  const output = `/**
 * CONFIGURACIÓN DE LA LANDING PAGE
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
    name: "${name.replace(/"/g, '\\"')}",               // Tu nombre principal
    verified: ${verified},             // ¿Mostrar check azul de verificado? (true/false)
    avatar: "${avatar.replace(/"/g, '\\"')}",       // Archivo de tu foto o vídeo de perfil.
    avatarType: "${avatarType}",       // Tipo de avatar ("image" o "video")
    avatarShape: "${avatarShape}",     // Forma del avatar ("circle", "square", "rounded", etc.)
    avatarSize: ${avatarSize},         // Tamaño del avatar en px
    title: "${title.replace(/"/g, '\\"')}", // Tu cargo/título (aparecerá en negrita)
    pageTitle: "${webTitle.replace(/"/g, '\\"')}", // Título personalizado de la pestaña (Vacío para Nombre | Cargo)
    
    // Banner/Cabecera superior personalizado (Imagen o Video)
    headerBanner: {
      show: ${bannerShow},
      type: "${bannerType}",
      url: "${bannerUrl.replace(/"/g, '\\"')}"
    },
    
    // Tu biografía. Cada elemento en la lista es un párrafo nuevo.
    bio: [
${bioString}
    ],
    
    // Datos de contacto para la tarjeta digital (.vcf / VCard)
    // Cuando alguien pulse "Añadir Contacto", se agregará esta información a su agenda.
    vCard: {
      firstName: "${vcName.replace(/"/g, '\\"')}",
      lastName: "${vcLname.replace(/"/g, '\\"')}",
      organization: "",
      title: "${title.replace(/"/g, '\\"')}",
      phone: "${vcPhone.replace(/"/g, '\\"')}",
      email: "${vcEmail.replace(/"/g, '\\"')}",
      url: "${vcUrl.replace(/"/g, '\\"')}"
    }
  },

  // ==========================================
  // 2. CONFIGURACIÓN DEL CÓDIGO QR Y COMPARTIR
  // ==========================================
  sharing: {
    qrUrl: "${qrUrl.replace(/"/g, '\\"')}", // URL a la que dirigirá el código QR
    shareTitle: "Contacto de ${name.replace(/"/g, '\\"')}",
    shareText: "Echa un vistazo a la landing page de ${name.replace(/"/g, '\\"')}",
    shareUrl: "${qrUrl.replace(/"/g, '\\"')}"
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
    selectedTheme: "${theme}", 

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
    buttonStyle: "${btnStyle}",

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
    buttonAnimation: "${btnAnim}",
    accentColor: "${accentColor}",
    fontFamily: "'Outfit', sans-serif",
 
    // Configuración del Favicon dinámico (Icono de la pestaña del navegador)
    favicon: {
      type: "${faviconType}",                      // "avatar", "icon", o "custom"
      value: "${faviconVal.replace(/"/g, '\\"')}"  // Valor de icono FontAwesome o URL de la imagen
    },

    // 3.4. Fondo personalizado (opcional):
    // Elige un fondo propio (estático o animado) en lugar de los temas de partículas:
    // - type: "none"   -> Usa el tema visual seleccionado arriba.
    // - type: "image"  -> Usa una imagen estática o GIF animado.
    // - type: "video"  -> Usa un archivo de vídeo MP4 en bucle.
    // - url: Ruta del archivo (ej: "mi-fondo.gif", "video.mp4") o URL de internet.
    customBackground: {
      type: "${bgType}",
      url: "${bgUrl.replace(/"/g, '\\"')}"
    },

    // 3.5. Cajas de lectura para legibilidad de textos (opcional):
    // Permite añadir un fondo de tarjeta (glassmorphism/sólido) al perfil, secciones y/o pie de página
    // para asegurar la legibilidad del texto sobre fondos brillantes o vídeos.
    profileCard: {
      showBox: ${profileCardBoxShow},
      showNameTitleBox: ${profileCardBoxShowNameTitle},
      showBioBox: ${profileCardBoxShowBio},
      showSectionBox: ${profileCardBoxShowSection},
      showFooterBox: ${profileCardBoxShowFooter},
      boxColor: "${profileCardBoxColor}",
      boxOpacity: ${profileCardBoxOpacity}
    }
  },

  // ==========================================
  // 3.6. CONFIGURACIÓN DE APLICACIÓN INSTALABLE (PWA)
  // ==========================================
  pwa: {
    enable: ${pwaEnable},                              // ¿Habilitar la instalación como aplicación en móviles y PCs? (true/false)
    appName: "${pwaName.replace(/"/g, '\\"')}",                      // Nombre completo de la aplicación al instalarse
    appShortName: "${pwaShortName.replace(/"/g, '\\"')}"                     // Nombre corto de la aplicación en la pantalla de inicio
  },

  // ==========================================
  // 4. ICONOS RÁPIDOS DE CABECERA (Redes Sociales)
  // ==========================================
  socialIcons: [
${socialString}
  ],

  // ==========================================
  // 5. BLOQUES DE ENLACES PRINCIPALES (Botones y Secciones)
  // ==========================================
  content: [
${contentString}
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
    componentOrder: [${compOrderStr}],
    
    // Configuración de los botones de la barra de acciones rápidas:
    actions: {
      // Orden en el que aparecerán los botones:
      order: [${actOrderStr}],
      // Visibilidad de cada botón (true/false):
      showVCard: ${layoutActionsShow.vcard},
      showShare: ${layoutActionsShow.share},
      showQR: ${layoutActionsShow.qr}
    }
  },

  // ==========================================
  // 7. PIE DE PÁGINA (Footer)
  // ==========================================
  footer: {
    show: ${footerShow},                                 // ¿Mostrar el pie de página? (true/false)
    text: "${footerText.replace(/"/g, '\\"')}",                             // Texto de copyright o secundario
    linkText: "${footerLinkText.replace(/"/g, '\\"')}",               // Texto del enlace
    linkUrl: "${footerLinkUrl.replace(/"/g, '\\"')}",       // URL a la que dirigirá el enlace
    extraText: "${footerExtra.replace(/"/g, '\\"')}"                    // Texto final o créditos del pie de página
  }
};
`;

  // Descargar archivo config.js
  const blob = new Blob([output], { type: "application/javascript;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.download = "config.js";
  link.href = url;
  link.style.display = "none";
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * FUNCIONES PARA EL SIMULADOR SEO Y META TAGS OPEN GRAPH
 */
function updateSeoPreview() {
  const domainInput = document.getElementById("input-seo-domain");
  const titleInput = document.getElementById("input-seo-title");
  const descInput = document.getElementById("input-seo-desc");
  const imageTypeSelect = document.getElementById("select-seo-image-type");
  const imageCustomInput = document.getElementById("input-seo-image-custom");
  const customGroup = document.getElementById("group-seo-image-custom");

  if (!domainInput || !titleInput || !descInput || !imageTypeSelect) return;

  let domain = domainInput.value.trim();
  if (domain && !/^https?:\/\//i.test(domain)) {
    domain = "https://" + domain;
  }
  const baseDomain = domain.replace(/\/+$/, "");

  // Update domain label in simulation (without protocol)
  const cleanDomain = baseDomain.replace(/^https?:\/\//i, '').split('/')[0];
  const previewDomainLbl = document.getElementById("preview-seo-domain-lbl");
  if (previewDomainLbl) {
    previewDomainLbl.textContent = cleanDomain || "tudominio.com";
  }

  // Sincronizar de forma inteligente Título
  const nameVal = document.getElementById("input-name") ? document.getElementById("input-name").value.trim() : "";
  const titleVal = document.getElementById("input-title") ? document.getElementById("input-title").value.trim() : "";
  
  let currentTitle = titleInput.value;
  if (!isSeoTitleCustom) {
    currentTitle = (nameVal && titleVal) ? `${nameVal} | ${titleVal}` : (nameVal || titleVal || "");
    titleInput.value = currentTitle;
  }
  const previewTitleLbl = document.getElementById("preview-seo-title-lbl");
  if (previewTitleLbl) {
    previewTitleLbl.textContent = currentTitle || "Título del Enlace";
  }

  // Sincronizar de forma inteligente Descripción
  let currentDesc = descInput.value;
  if (!isSeoDescCustom) {
    // Tomar el primer párrafo de la biografía
    currentDesc = (profileBio && profileBio[0] && profileBio[0].text) ? profileBio[0].text : "";
    // Limpiar saltos de línea de la descripción para evitar que sea muy larga
    currentDesc = currentDesc.replace(/\s+/g, ' ');
    if (currentDesc.length > 150) {
      currentDesc = currentDesc.substring(0, 147) + "...";
    }
    descInput.value = currentDesc;
  }
  const previewDescLbl = document.getElementById("preview-seo-desc-lbl");
  if (previewDescLbl) {
    previewDescLbl.textContent = currentDesc || "Descripción del Enlace";
  }

  // Mostrar u ocultar grupo de URL personalizada
  const imgType = imageTypeSelect.value;
  if (customGroup) {
    customGroup.style.display = imgType === "custom" ? "flex" : "none";
  }

  // Calcular imagen de preview
  let imageUrl = "";
  const avatarVal = document.getElementById("input-avatar") ? document.getElementById("input-avatar").value.trim() : "";
  const bannerVal = document.getElementById("input-profile-banner-url") ? document.getElementById("input-profile-banner-url").value.trim() : "";
  const bannerShow = document.getElementById("input-profile-banner-show") ? document.getElementById("input-profile-banner-show").checked : false;

  if (imgType === "avatar") {
    if (avatarVal) {
      if (/^https?:\/\//i.test(avatarVal)) {
        imageUrl = avatarVal;
      } else {
        imageUrl = baseDomain ? `${baseDomain}/${avatarVal.replace(/^\.?\/+/, "")}` : avatarVal;
      }
    }
  } else if (imgType === "banner") {
    if (bannerShow && bannerVal) {
      if (/^https?:\/\//i.test(bannerVal)) {
        imageUrl = bannerVal;
      } else {
        imageUrl = baseDomain ? `${baseDomain}/${bannerVal.replace(/^\.?\/+/, "")}` : bannerVal;
      }
    }
  } else if (imgType === "qr") {
    const qrTarget = baseDomain || "https://tudominio.com";
    imageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrTarget)}`;
  } else if (imgType === "custom") {
    if (imageCustomInput) {
      imageUrl = imageCustomInput.value.trim();
    }
  }

  const previewImgContainer = document.getElementById("preview-seo-img-container");
  const previewImg = document.getElementById("preview-seo-img");

  if (imgType === "none" || !imageUrl) {
    if (previewImgContainer) {
      previewImgContainer.style.display = "none";
      previewImgContainer.className = "seo-preview-img-container";
    }
    if (previewImg) previewImg.src = "";
  } else {
    if (previewImgContainer) {
      previewImgContainer.style.display = "";
      // Restablecer y asignar clases específicas de ajuste
      previewImgContainer.className = "seo-preview-img-container";
      if (imgType === "qr") {
        previewImgContainer.classList.add("fit-qr");
      } else if (imgType === "avatar") {
        previewImgContainer.classList.add("fit-avatar");
      }
    }
    if (previewImg) {
      previewImg.src = imageUrl;
      previewImg.onerror = () => {
        // Fallback en caso de que falle la carga (como rutas relativas locales)
        previewImg.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80";
      };
    }
  }

  // Generar etiquetas meta
  generateMetaTags(baseDomain || 'https://tudominio.com', currentTitle, currentDesc, imageUrl);
}

function generateMetaTags(domain, title, desc, imageUrl) {
  const codeOutput = document.getElementById("code-seo-output");
  if (!codeOutput) return;

  let tags = `<!-- Etiquetas de compartido en redes sociales (Open Graph & Twitter) -->
<meta property="og:type" content="website">
<meta property="og:url" content="${domain}/">
<meta property="og:title" content="${escapeHtml(title || '')}">
<meta property="og:description" content="${escapeHtml(desc || '')}">`;

  if (imageUrl) {
    tags += `\n<meta property="og:image" content="${imageUrl}">`;
  }

  tags += `\n\n<!-- Etiquetas para Twitter / X -->
<meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${escapeHtml(title || '')}">
<meta name="twitter:description" content="${escapeHtml(desc || '')}">`;

  if (imageUrl) {
    tags += `\n<meta name="twitter:image" content="${imageUrl}">`;
  }

  codeOutput.textContent = tags;
}
