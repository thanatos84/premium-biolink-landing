# Wiki y Tutorial de Personalización Avanzada - Landing Page

Esta es la guía de referencia oficial para personalizar, extender y publicar tu Landing Page Premium. 

---

## 📖 Contenidos
1. [Guía de Uso del Proyecto](#1-guía-de-uso-del-proyecto)
2. [Carga de Recursos Multimedia (Imágenes y Videos)](#2-carga-de-recursos-multimedia-imágenes-y-videos)
3. [Guía del Creador de Temas](#3-guía-del-creador-de-temas)
4. [Uso de Iconos Flexibles (FontAwesome)](#4-uso-de-iconos-flexibles-fontawesome)
5. [Uso de Etiquetas HTML Libres](#5-uso-de-etiquetas-html-libres)
6. [Hosting Gratuito (Despliegue de la Web)](#6-hosting-gratuito-despliegue-de-la-web)
7. [Subdominios Gratuitos](#7-subdominios-gratuitos)
8. [Configuración DNS con Cloudflare](#8-configuración-dns-con-cloudflare)
9. [Cómo añadir Temas, Botones y Efectos de Animación (Desarrolladores)](#9-cómo-añadir-temas-botones-y-efectos-de-animación-desarrolladores)

---

## 1. Guía de Uso del Proyecto
La landing page es un portfolio digital de enlaces y presentación. Funciona cargando un único archivo de configuración estático (`config.js`) y dibujando la interfaz de forma dinámica y fluida mediante `app.js` e `index.css`.

- **Visualización**: Abre `index.html` en cualquier navegador web para ver el resultado de tu landing.
- **Personalización**: Abre `theme-creator/index.html` para abrir la aplicación interactiva que te permite generar tus configuraciones sin tocar código.

---

## 2. Carga de Recursos Multimedia (Imágenes y Videos)
Tanto para la **Foto de Perfil** (avatar) como para el **Banner de Cabecera**, tienes dos formas de configurarlos en la interfaz:

### A. Archivos Locales (Recomendado)
Copia la imagen (PNG, JPG, SVG, GIF) o video (MP4, WebM) dentro de la carpeta raíz del proyecto (donde está `index.html`). En el input del Creador de Temas simplemente escribe el **nombre exacto del archivo con su extensión**.
*   *Ejemplo para perfil:* `profile.jpg`
*   *Ejemplo para banner:* `banner.mp4` o `cabecera.jpg`

### B. URLs Remotas / Externas
Si deseas utilizar imágenes de internet (Imgur, Discord, Unsplash, etc.), introduce la URL directa completa.
*   *Ejemplo:* `https://images.unsplash.com/photo-1579546929518-9e396f3cc809`

---

## 3. Guía del Creador de Temas
El creador es una aplicación web visual e interactiva que facilita la personalización de tu Landing.
1. **Configuración de Perfil**: Permite ingresar Nombre, Título Profesional, estado Verificado y configurar tu Avatar (forma y tamaño dinámico mediante barras deslizadoras).
2. **Banner**: Opción de activar o desactivar el banner superior de la pantalla. Soporta imagen o video continuo.
3. **Biografía**: Soporte para múltiples párrafos en lista. Cada párrafo puede tener su propia caja de lectura o agruparse en una sola.
4. **Contenido**: Añade botones de enlaces externos, secciones organizadoras o espaciadores transparentes cuya altura es ajustable en píxeles. Puedes arrastrar y soltar elementos (Drag & Drop) para reorganizar la página sobre la marcha.
5. **Previsualizador**: Simula un teléfono móvil en tiempo real donde ves los resultados antes de guardarlos.
6. **Exportador**: Al pulsar en "Exportar config.js", se descargará un archivo. Reemplaza el archivo `config.js` de la raíz del proyecto con el descargado para publicar tus cambios de manera oficial.

---

## 4. Uso de Iconos Flexibles (FontAwesome)
El proyecto incluye la biblioteca de iconos vectoriales **FontAwesome v6**. El campo "Icono" en tus enlaces o secciones es inteligente y soporta múltiples formatos.

### A. ¿Cómo busca e interpreta el código los iconos?
La función interna `getIconHtml()` en `app.js` y `creator.js` analiza el texto introducido en el campo de icono:
1.  **Detección de Imagen**: Si el texto inicia con `http://`, `https://` o `./`, interpreta que es una ruta de imagen y genera una etiqueta `<img src="...">`.
2.  **Detección de Clase FontAwesome**: Si el texto contiene el prefijo `fa-` o contiene palabras clave de librerías como `fab `, `fas `, `far `, `fa `, asume que es una clase y dibuja el icono de forma nativa.
3.  **Mapa de Alias Interno**: Si escribes un nombre simple en minúsculas (ej: `whatsapp`, `github`, `linkedin`, `mail`), el sistema consulta un diccionario interno (`ICON_MAP`) para buscar su traducción en clase de icono.
4.  **Fallback**: Si no cumple con ninguno de los puntos anteriores, el sistema intenta añadir el prefijo por defecto `fas fa-` seguido del texto ingresado.

### B. Diferencia entre formatos
*   `whatsapp`: Traduce a la clase `fab fa-whatsapp` automáticamente mediante el mapa interno de alias.
*   `fa-brands fa-whatsapp` o `fab fa-whatsapp`: Carga el icono directamente utilizando clases puras de FontAwesome (ideal si deseas usar iconos específicos que no están en el diccionario).
*   `<i class="fa-brands fa-whatsapp"></i>`: **No debes escribir esto en el input "Icono"**. Esta etiqueta HTML completa de FontAwesome se utiliza únicamente dentro de textos libres como tu biografía o descripciones.

### C. Buscar Iconos Nuevos
Entra al sitio oficial de [FontAwesome Icons](https://fontawesome.com/icons) y busca el icono gratuito que desees. Copia el nombre de la clase (ej: `fa-brands fa-tiktok` o `fa-solid fa-envelope`) y pégalo directamente en el creador.

---

## 5. Uso de Etiquetas HTML Libres
Los campos del proyecto son compatibles con código HTML nativo para dar la máxima flexibilidad de diseño a tus textos. Puedes utilizar estas etiquetas en la **Biografía**, el **Título Profesional**, los **Títulos de Secciones** y de **Enlaces**:

- **Negritas**: `<b>Texto</b>` o `<strong>Texto</strong>`
- **Cursiva**: `<i>Texto</i>` o `<em>Texto</em>`
- **Subrayado**: `<u>Texto</u>`
- **Tachado**: `<s>Tachado</s>` o `<del>Tachado</del>`
- **Salto de Línea**: `<br>`
- **Estilos de Color o Tamaños**: `<span style="color: #3b82f6; font-weight: bold;">Texto azul</span>`
- **Icono FontAwesome incrustado**: `Contáctame aquí <i class="fa-brands fa-telegram"></i>`

---

## 6. Hosting Gratuito (Despliegue de la Web)
Cuando tengas lista la web y tu archivo `config.js` actualizado, puedes hospedarla gratuitamente usando cualquiera de estos proveedores de hosting estático:

### A. GitHub Pages
1.  Crea un repositorio público en [GitHub](https://github.com) llamado `tuusuario.github.io` (sustituyendo "tuusuario" por tu nombre real de usuario).
2.  Sube todos tus archivos (incluyendo `index.html`, `app.js`, `index.css`, `config.js`, etc.) a la rama principal `main` o `master`.
3.  ¡Tu web estará visible automáticamente en `https://tuusuario.github.io`!

### B. Cloudflare Pages
1.  Entra en el panel de [Cloudflare Pages](https://pages.cloudflare.com) y crea una cuenta.
2.  Ve a **Create an Application** -> **Deploy Pages**.
3.  Puedes conectar tu GitHub o arrastrar directamente la carpeta de tu proyecto.
4.  Te asignará una URL aleatoria con terminación `*.pages.dev`.

### C. Surge.sh
1.  Instala [Node.js](https://nodejs.org).
2.  Abre tu terminal en la carpeta del proyecto y ejecuta: `npm install -g surge`.
3.  Escribe: `surge`
4.  Crea una cuenta ingresando un email y contraseña en la misma consola, confirma la carpeta y elige el subdominio gratuito terminado en `.surge.sh`.

### D. Codeberg Pages
1.  Regístrate en la plataforma git independiente [Codeberg.org](https://codeberg.org).
2.  Crea un nuevo repositorio en tu cuenta llamado obligatoriamente `pages`.
3.  Sube los archivos del proyecto y la página estará disponible en `https://tuusuario.codeberg.page`.

### E. Sourcehut (srht.site)
1.  Crea tu cuenta en [Sourcehut](https://sourcehut.org).
2.  Empaqueta los archivos estáticos en un `.tar.gz` y súbelos mediante su consola o interfaz en `srht.site`.

---

## 7. Subdominios Gratuitos
Si deseas una dirección web personalizada sin coste, puedes conseguir un subdominio gratuito con cualquiera de estos proveedores especializados:

### A. pp.ua (vía nic.ua)
1.  Ve a [nic.ua](https://nic.ua/en), busca el dominio gratuito que deseas con la terminación `.pp.ua` (ej: `jonatandev.pp.ua`) y agrégalo al carrito por $0.
2.  Finaliza la compra y registra los datos requeridos.
3.  **Proceso de Activación en Telegram**:
    *   Abre Telegram y busca el bot oficial `@NicUaBot` (o accede a `t.me/NicUaBot`).
    *   Inicia el bot pulsando `/start` y comparte tu número telefónico para autenticarte.
    *   Envía el comando `/activate`. El bot te listará tu dominio `.pp.ua` registrado. Presiona el botón para confirmar y activar.
4.  Una vez activado en Telegram, nic.ua desbloqueará el dominio para que puedas cambiar los Nameservers.

### B. digitalplat.org (FreeDomain)
1.  Ingresa a [domain.digitalplat.org](https://domain.digitalplat.org) o ve a su repositorio en [FreeDomain Github](https://github.com/DigitalPlatDev/FreeDomain).
2.  Completa el registro online de tu dominio (ej: `*.dp.ua`) proporcionando los servidores de nombre (NS) que vayas a usar.

### C. is-a.dev
1.  Crea un fork de [is-a-dev/register](https://github.com/is-a-dev/register) en GitHub.
2.  Crea un archivo JSON con tu subdominio (ej: `domains/tunombre.json`).
3.  Escribe el contenido indicando tu nombre, email de contacto y registro CNAME que apunte a tu hosting.
4.  Envía un Pull Request para que sea aprobado de forma automática.

### D. js.org
1.  Tu proyecto debe estar desplegado en GitHub Pages.
2.  Crea un Pull Request en [github.com/js-org/js.org](https://github.com/js-org/js.org) añadiendo tu subdominio de cara al registro DNS de GitHub Pages.

### E. Otros Proveedores (thedev.id / isroot.in / getfreedomain.name)
*   Visita sus respectivos portales web oficiales, realiza el registro de usuario y apunta los servidores DNS a tu gestor (por ejemplo, Cloudflare).

---

## 8. Configuración DNS con Cloudflare
Para conectar tu subdominio gratuito con la URL de tu hosting y asegurar la conexión mediante un certificado de seguridad SSL gratis (candado), usaremos Cloudflare.

1.  **Añadir sitio**: Inicia sesión en [Cloudflare](https://www.cloudflare.com) y añade tu dominio completo registrado (ej: `jonatandev.pp.ua`). Selecciona el plan gratuito.
2.  **Configurar Nameservers**: Copia los dos nombres de servidor que te da Cloudflare (ej: `eva.ns.cloudflare.com` y `will.ns.cloudflare.com`) y colócalos en el panel del proveedor del dominio (ej: nic.ua o isroot.in).
3.  **Configurar registros DNS**: En el panel de Cloudflare, ve a **DNS -> Records** y crea tu apuntamiento:
    *   **Tipo**: `CNAME`
    *   **Nombre**: `@` (o `www`)
    *   **Destino**: La dirección que te dio tu hosting (ej: `tuusuario.github.io` o `tuproyecto.pages.dev`).
    *   **Proxy Status**: Déjalo activo (icono de la nube naranja de Cloudflare).
4.  **Configurar Dominio Personalizado en tu Hosting**:
    *   *En GitHub Pages:* Ve a tu Repositorio -> Settings -> Pages. En "Custom Domain" escribe tu dominio y pulsa Guardar. Activa "Enforce HTTPS".
    *   *En Cloudflare Pages:* Entra a tu proyecto -> Custom Domains -> Set up a Custom Domain y escribe tu dominio.

---

## 9. Cómo añadir Temas, Botones y Efectos de Animación (Desarrolladores)

Si deseas expandir la programación de la landing, puedes crear nuevos diseños:

### A. Crear un nuevo Tema Visual
1.  **CSS**: Abre `index.css` y define las variables de color en `body.theme-mituema`:
    ```css
    body.theme-volcano {
      --bg-color: #0b0200;
      --text-muted: #f87171;
      --accent-color: #f97316;
      --accent-glow: rgba(249, 115, 22, 0.4);
      --glass-bg: rgba(30, 8, 4, 0.8);
      --glass-border: rgba(249, 115, 22, 0.15);
      background: radial-gradient(circle at center, #2e0802 0%, #0b0200 100%) !important;
    }
    ```
2.  **Canvas**: En `app.js` (función `initBackgroundAnimation()`) y en `creator.js` (función `initPreviewAnimation()`), añade la creación y dibujado de partículas en Canvas para animar el fondo.
3.  **HTML**: En `theme-creator/index.html`, añade la opción en el selector `<select id="select-theme">`.

### B. Crear un nuevo Estilo de Botón
1.  **CSS**: Añade en `index.css` el diseño para el botón:
    ```css
    .btn-style-neon-doble {
      background: transparent;
      border: 2px solid var(--accent-color);
      box-shadow: 0 0 5px var(--accent-color);
    }
    .btn-style-neon-doble:hover {
      background: var(--accent-glow);
    }
    ```
2.  **HTML**: En `theme-creator/index.html`, añade la opción en `<select id="select-button-style">`.

### C. Crear una nueva Animación de Botón
1.  **CSS**: Define una animación CSS en `index.css`:
    ```css
    .btn-anim-shake-fast {
      animation: shake 1.5s infinite;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-3px); }
      75% { transform: translateX(3px); }
    }
    ```
2.  **HTML**: Regístralo en `<select id="select-button-anim">` de `theme-creator/index.html`.
