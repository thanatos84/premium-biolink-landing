# Wiki & Manual de Usuario Completo - Landing Page Premium

Bienvenido a la guía oficial de referencia. Este documento contiene todas las instrucciones paso a paso para utilizar, personalizar, hospedar y configurar un subdominio gratuito en tu Landing Page, diseñado de forma comprensible para cualquier persona sin conocimientos técnicos previos.

---

## 📖 Contenidos
1. [Glosario de Términos (Conceptos Básicos)](#1-glosario-de-términos-conceptos-básicos)
2. [Uso de la Web Principal](#2-uso-de-la-web-principal)
3. [Guía del Creador de Temas](#3-guía-del-creador-de-temas)
4. [Carga de Recursos Multimedia (Imágenes y Videos)](#4-carga-de-recursos-multimedia-imágenes-y-videos)
5. [Sistema Flexible de Iconos (FontAwesome)](#5-sistema-flexible-de-iconos-fontawesome)
6. [Soporte de Etiquetas HTML Libres](#6-soporte-de-etiquetas-html-libres)
7. [Hosting Gratuito (Alojamiento de tu Web)](#7-hosting-gratuito-alojamiento-de-tu-web)
8. [Proveedores de Subdominios Gratuitos](#8-proveedores-de-subdominios-gratuitos)
9. [Cómo Conectar tu Subdominio a tu Hosting (DNS)](#9-cómo-conectar-tu-subdominio-a-tu-hosting-dns)
10. [Cómo añadir Temas, Botones y Efectos (Desarrolladores)](#10-cómo-añadir-temas-botones-y-efectos-desarrolladores)

---

## 1. Glosario de Términos (Conceptos Básicos)
Si es tu primera vez creando una página web, estos conceptos te ayudarán a comprender todo el proceso sin tecnicismos complejos:

*   **Hosting (Alojamiento)**: Es como un "disco duro" conectado a internet las 24 horas del día. Allí es donde guardas los archivos de tu web (como `index.html`, `app.js`, etc.) para que otros puedan acceder a ellos.
*   **Dominio**: Tu nombre único en internet (ejemplo: `miweb.com`).
*   **Subdominio**: Un nombre añadido antes de tu dominio principal separado por un punto (ejemplo: `jonatan.is-a.dev` o `jonatan.pp.ua`). Son ideales porque muchos proveedores los ofrecen 100% gratis.
*   **DNS (Dirección DNS)**: Funciona como la agenda telefónica de internet. Traduce el nombre de tu web (como `jonatan.is-a.dev`) en la dirección numérica (IP) del ordenador donde está guardada tu web.
*   **Registro CNAME**: Una instrucción DNS específica que dice: *"Cuando alguien busque mi subdominio A, llévalo a la dirección del hosting B"* (ejemplo: apunta `jonatan.is-a.dev` a `tuusuario.github.io`).
*   **Nameservers (Servidores de nombres)**: Son las computadoras encargadas de gestionar las DNS de tu dominio. Al cambiarlos, le otorgas el control de tus DNS a otra plataforma (como Cloudflare).

---

## 2. Uso de la Web Principal
Tu Landing Page está optimizada con un diseño visual interactivo, responsivo y adaptado para móviles (Mobile-First) con efectos de neón y translúcidos (glassmorphism).

*   **Banner Superior**: Cubre el 100% de la pantalla horizontalmente con una imagen o vídeo continuo. Si decides no configurarlo, la cabecera se adapta de forma fluida.
*   **Avatar**: Foto o vídeo de perfil personalizable con formas geométricas dinámicas (corazón, hexágono, etc.) y un deslizador de tamaño para regular su escala.
*   **Cabecera**: Muestra tu nombre, insignia de verificado opcional, título profesional y tu biografía.
*   **Enlaces y Secciones**: Bloques organizados donde colocar tus enlaces externos con animaciones hover y efectos continuos de destacado.

---

## 3. Guía del Creador de Temas
El creador es una aplicación web interactiva (ubicada en `/theme-creator/index.html`) que te permite diseñar la web de forma visual y sin escribir código.

1.  **Edición en Vivo**: El panel izquierdo te permite modificar nombres, temas, colores, formas y enlaces, y ver el resultado de inmediato en la simulación del teléfono del panel derecho.
2.  **Gestión de Enlaces (Drag & Drop)**: Puedes arrastrar y soltar los bloques de enlaces en el creador para ordenarlos de arriba a abajo.
3.  **Separadores Transparentes**: Puedes añadir espaciadores invisibles y configurar su altura exacta mediante una barra deslizadora para separar secciones muy juntas.
4.  **Exportación**: Una vez termines de editar, haz clic en **"Exportar config.js"**. Descargará un archivo que deberás mover a la carpeta raíz de tu proyecto reemplazando el archivo `config.js` original para aplicar los cambios a la web definitiva.

---

## 4. Carga de Recursos Multimedia (Imágenes y Videos)
Puedes añadir tus recursos (fotos, videos para banner, videos para avatar, etc.) de dos formas:

### A. Archivos Locales (Recomendado)
Guarda tus fotos o videos en formato estándar (ej: `profile.jpg`, `banner.mp4`) en la misma carpeta raíz del proyecto donde se encuentra `index.html`. En el input de texto del Creador de Temas escribe el **nombre exacto del archivo con su extensión**.
*   *Ejemplo:* `profile.jpg` o `images/foto.png` (si organizas tus fotos en carpetas).

### B. URLs Remotas
Introduce la dirección URL directa completa de la imagen o vídeo alojado en un servidor externo de internet.
*   *Ejemplo:* `https://images.unsplash.com/photo-1579546929518-9e396f3cc809`

---

## 5. Uso de Iconos Flexibles (FontAwesome)
El proyecto cuenta con la biblioteca de iconos **FontAwesome v6**. Cuando introduces un valor en el campo de icono de tus enlaces o secciones, el código sigue este flujo de detección inteligente:

```
[Input del usuario]
       │
       ├─► ¿Comienza por "http://", "https://" o "./"?
       │     └─► SÍ: Renderiza una etiqueta de imagen <img src="...">
       │
       ├─► ¿Contiene el texto "fa-" o prefijos como "fab", "fas", "far"?
       │     └─► SÍ: Renderiza la clase nativa de FontAwesome introducida
       │
       ├─► ¿Es una palabra simple en minúsculas registrada en ICON_MAP?
       │     └─► SÍ: Traduce al icono asignado (ej: "whatsapp" -> "fab fa-whatsapp")
       │
       └─► NO coincide:
             └─► Fallback: Aplica por defecto "fas fa-{input}"
```

### Tabla de diferencias entre formatos de escritura:

| Formato ingresado | Interpretación del sistema | Resultado / Ejemplo |
| :--- | :--- | :--- |
| `whatsapp` | Traduce el alias simple en `ICON_MAP` | Muestra el icono de WhatsApp (`fab fa-whatsapp`) |
| `fa-brands fa-whatsapp` | Aplica clases directas de FontAwesome | Muestra el icono de WhatsApp directamente (más preciso) |
| `fab fa-whatsapp` | Carga compatible con la sintaxis clásica | Muestra el icono de WhatsApp perfectamente |
| `<i class="fa-brands fa-whatsapp"></i>` | Código HTML crudo | **No usar en inputs de "Icono"**. Solo se usa dentro de la biografía u otros textos libres. |

### Cómo Buscar Iconos Nuevos:
1.  Ingresa a la biblioteca oficial gratuita de [FontAwesome Icons](https://fontawesome.com/icons).
2.  Busca el icono de tu preferencia (ejemplo: "tiktok", "instagram", "envelope").
3.  Copia su nombre de clase gratuito (ej: `fa-brands fa-tiktok`) y pégalo directamente en el campo de icono del creador de temas.

---

## 6. Soporte de Etiquetas HTML Libres
Para que diseñes sin límites, los campos de **Biografía**, **Título Profesional**, **Secciones** y **Enlaces** soportan código HTML libre. Estas son las etiquetas recomendadas con ejemplos:

*   **Negritas**: `<b>Texto</b>` o `<strong>Texto</strong>` (Ej: `<b>Jonatan</b>`)
*   **Cursiva**: `<i>Texto</i>` o `<em>Texto</em>` (Ej: `<i>Diseñador</i>`)
*   **Subrayado**: `<u>Texto subrayado</u>`
*   **Tachado**: `<s>Texto tachado</s>` o `<del>Tachado</del>`
*   **Salto de Línea**: `<br>` (Permite escribir una nueva línea sin crear un párrafo nuevo)
*   **Color de Texto / Estilo Personalizado**: `<span style="color: #3b82f6; font-weight: bold;">Mi texto azul</span>`
*   **Iconos FontAwesome dentro del texto**: `Escríbeme al WhatsApp <i class="fa-brands fa-whatsapp"></i>`

---

## 7. Hosting Gratuito (Alojamiento de tu Web)
Aquí tienes los tutoriales detallados para publicar tu Landing Page en internet totalmente gratis:

### 1. GitHub Pages ([pages.github.com](https://pages.github.com/))
GitHub ofrece alojamiento web estático ilimitado gratis:
1.  Crea una cuenta gratuita en [GitHub.com](https://github.com).
2.  Haz clic en el botón **"+"** (arriba a la derecha) -> **New repository**.
3.  Asígnale a tu repositorio el nombre exacto: `tuusuario.github.io` (sustituye "tuusuario" por tu nombre real de usuario de GitHub). Configúralo como **Public**.
4.  Entra en tu nuevo repositorio, haz clic en **"uploading an existing file"** y arrastra todos los archivos de tu proyecto (incluyendo `index.html`, `app.js`, `index.css`, `config.js` y tus fotos/videos locales).
5.  Haz clic en el botón verde **"Commit changes"** abajo del todo. Tu web estará visible en minutos en `https://tuusuario.github.io`.

### 2. Cloudflare Pages ([pages.cloudflare.com](https://pages.cloudflare.com/))
Una plataforma ultra veloz con ancho de banda y visitas ilimitadas:
1.  Regístrate de forma gratuita en [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2.  Ve al menú lateral izquierdo -> **Workers & Pages** -> pestaña **Pages** -> pulsa en **Create an Application** -> **Upload assets**.
3.  Introduce un nombre para tu proyecto y arrastra la carpeta completa de tu proyecto al recuadro de subida.
4.  Haz clic en **Deploy Site**. Cloudflare te dará una dirección gratuita terminada en `*.pages.dev`.

### 3. Surge.sh ([surge.sh](https://surge.sh/))
Publica tu web en segundos desde la terminal:
1.  Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/).
2.  Abre la Consola de comandos de tu ordenador (PowerShell o cmd en Windows) y ejecuta:
    ```bash
    npm install -g surge
    ```
3.  Abre la terminal en la carpeta de tu proyecto (o navega hasta ella) y ejecuta el comando:
    ```bash
    surge
    ```
4.  Te pedirá introducir un correo y contraseña para crear tu cuenta gratuita. Confirma la carpeta y escribe el subdominio gratuito terminado en `.surge.sh` que desees.

### 4. Codeberg Pages ([pages.codeberg.org](https://pages.codeberg.org/))
Alojamiento estático gratuito, sin ánimo de lucro y centrado en la privacidad:
1.  Crea una cuenta en [Codeberg.org](https://codeberg.org).
2.  Crea un nuevo repositorio público pulsando el botón "+" -> **New Repository** y nómbralo exactamente: `pages`.
3.  Sube todos los archivos del proyecto a la rama `main` y tu sitio se desplegará en `https://tuusuario.codeberg.page`.

### 5. Sourcehut Pages ([srht.site](https://srht.site/))
Alojamiento rápido y sencillo:
1.  Crea tu cuenta en [meta.sr.ht](https://meta.sr.ht).
2.  Comprime tus archivos en un archivo `.tar.gz` y súbelos desde su formulario web en la dirección [srht.site](https://srht.site).

---

## 8. Proveedores de Subdominios Gratuitos
Consigue tu propio nombre personalizado de manera 100% gratuita utilizando estos servicios:

### 1. pp.ua (a través de [nic.ua](https://nic.ua/en))
Un dominio de nivel superior oficial gratis de Ucrania con activación por Telegram:
1.  Ve a [nic.ua/en](https://nic.ua/en), busca un dominio terminado en `.pp.ua` (ejemplo: `jonatan.pp.ua`), agrégalo al carrito por $0 y finaliza la compra gratuita.
2.  Abre tu Telegram y busca el bot oficial: **`@NicUaBot`** (o entra a [t.me/NicUaBot](https://t.me/NicUaBot)).
3.  Envíale `/start` y comparte tu número de teléfono cuando el bot te lo solicite pulsando en el botón inferior de validación de usuario.
4.  Envía el comando `/activate` y haz clic en el botón de confirmación de tu dominio registrado. Tu dominio estará listo para configurarse en la web de nic.ua.

### 2. DigitalPlat Domain Portal ([domain.digitalplat.org](https://domain.digitalplat.org))
Otorga subdominios de red gratuitos como `*.dp.ua` o `*.net.ua`:
1.  Crea una cuenta de usuario en [domain.digitalplat.org](https://domain.digitalplat.org).
2.  Busca tu nombre libre, solicita la extensión deseada y gestiona sus DNS desde su panel web.

### 3. is-a.dev ([is-a.dev](https://is-a.dev/))
Subdominios gratis para programadores del tipo `tunombre.is-a.dev` gestionados desde GitHub:
1.  Crea una cuenta en GitHub y entra a [github.com/is-a-dev/register](https://github.com/is-a-dev/register). Haz clic en **Fork** (arriba a la derecha).
2.  En tu fork personal, accede a la carpeta `domains`. Haz clic en **Add file** -> **Create new file**.
3.  Nombra el archivo exactamente: `tunombre.json` (ejemplo: `jonatan.json`).
4.  Pega el siguiente texto configurado con tus datos en su interior:
    ```json
    {
      "owner": {
        "username": "tu-usuario-github",
        "email": "tuemail@gmail.com"
      },
      "record": {
        "CNAME": "tuusuario.github.io"
      }
    }
    ```
5.  Guarda el archivo pulsando "Commit changes".
6.  Ve a la pestaña **"Pull requests"** -> botón verde **"New pull request"** -> **"Create pull request"** y envíalo. Una vez aprobado por su robot, tu subdominio estará activo.

### 4. js.org ([js.org](https://js.org/))
Exclusivo para páginas de JavaScript hospedadas en GitHub Pages:
1.  Tu proyecto debe estar desplegado y accesible en GitHub Pages.
2.  Haz un Fork del repositorio [github.com/js-org/js.org](https://github.com/js-org/js.org).
3.  Edita el archivo `cnames.active.js` y añade tu subdominio por orden alfabético estricto de esta forma:
    ```javascript
    "tunombre": "tuusuario.github.io",
    ```
4.  Guarda el archivo y abre un Pull Request hacia el repositorio principal. Una vez aprobado, tu dominio estará enlazado.

### 5. thedev.id / Upset.dev ([thedev.id](https://thedev.id))
Subdominios del tipo `usuario.thedev.id` validados por tu perfil de GitHub:
1.  Haz un Fork de [github.com/thedev-id/register](https://github.com/thedev-id/register).
2.  Crea el archivo `domains/tuusuario.json` con tus datos y el apuntamiento CNAME a tu hosting (idéntico al proceso de is-a.dev).
3.  Crea y envía el Pull Request. Una vez aceptado, estará online.

### 6. isroot.in ([isroot.in](https://isroot.in/))
Otorga subdominios de desarrollador gratuitos como `*.isroot.dev` e `*.isroot.in`:
1.  Regístrate en [isroot.in](https://isroot.in/).
2.  En tu panel de control, ve a "Add subdomain", ingresa tu nombre y configúralo.
3.  Accede a la gestión de DNS para añadir tu registro de apuntamiento.

### 7. getfreedomain.name ([getfreedomain.name](https://www.getfreedomain.name/))
Permite adquirir subdominios de segundo nivel sin coste:
1.  Regístrate en [getfreedomain.name](https://www.getfreedomain.name/), busca un nombre disponible con extensiones gratuitas y finaliza el proceso de compra por $0.
2.  Ve a tu lista de dominios activos en tu panel, entra a "DNS Management" y añade tus registros.

---

## 9. Cómo Conectar tu Subdominio a tu Hosting (DNS)
Tienes dos opciones para enlazar la dirección de tu subdominio con tu servidor de alojamiento web:

### Método 1: Usando el Panel de DNS Nativo del Proveedor (Sin Cloudflare)
Es el camino más directo. Gestionas las DNS utilizando los servidores gratuitos que te proporciona tu mismo registrador de dominio (ej: nic.ua, isroot.in, getfreedomain.name, etc.):

1.  Inicia sesión en tu proveedor de dominio y ve a la sección de **DNS Management** o **Administración de DNS / Zona de registros**.
2.  Añade un nuevo registro de tipo **CNAME**:
    *   **Tipo (Type)**: `CNAME`
    *   **Nombre (Host/Name)**: `@` (o déjalo en blanco si representa tu dirección principal)
    *   **Destino (Value/Target)**: Escribe la dirección que te dio tu hosting (ejemplo: `tuusuario.github.io` o `tuproyecto.pages.dev`).
3.  Guarda los cambios. *Nota: Este cambio tarda de 5 minutos a unas pocas horas en propagarse.*

### Método 2: A través de Cloudflare (Gestionado, Seguro y con Proxy)
Cloudflare es una pasarela DNS profesional totalmente gratuita. Ofrece ancho de banda ilimitado, protección contra hackers y activa automáticamente el certificado de navegación segura SSL (candado verde).

```
   [Tu Subdominio] 
          │
          ▼
   [Nameservers de Cloudflare] (Reemplazados en tu proveedor)
          │
          ▼
   [Proxy de Cloudflare] (Nube naranja activa) ➔ Certificado SSL gratuito
          │
          ▼
   [Hosting de Destino] (GitHub Pages / Cloudflare Pages)
```

1.  Regístrate en [Cloudflare.com](https://www.cloudflare.com) y pulsa en **"Add a Site"**. Escribe tu dominio (ej: `jonatan.pp.ua`) y elige el plan gratis.
2.  Cloudflare te dará dos Nameservers (ej: `eva.ns.cloudflare.com` y `will.ns.cloudflare.com`). Ve al panel de tu proveedor de dominio (ej: nic.ua) y reemplaza los Nameservers originales por los de Cloudflare.
3.  En Cloudflare, ve a **DNS -> Records** y añade tu registro:
    *   **Type**: `CNAME`
    *   **Name**: `@`
    *   **Target**: La URL de tu hosting (ej: `tuusuario.github.io`).
    *   **Proxy status**: Mantén la nube en color naranja (Proxied) activa.
4.  **Configurar en tu Hosting**:
    *   *En GitHub Pages:* Ve a tu Repositorio -> Settings -> Pages. En "Custom Domain" escribe tu dominio (ej: `jonatan.pp.ua`) y pulsa Save. Activa la casilla "Enforce HTTPS".
    *   *En Cloudflare Pages:* Entra a tu proyecto -> pestaña Custom Domains -> Set up a Custom Domain y escribe tu dominio.

---

## 10. Cómo añadir Temas, Botones y Efectos (Desarrolladores)

Si tienes conocimientos de desarrollo web y deseas crear tus propios diseños:

### A. Crear un nuevo Tema de Fondo
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
2.  **Partículas en Canvas**: Añade la lógica del tema dentro de la función `initBackgroundAnimation()` de `app.js` y `initPreviewAnimation()` de `theme-creator/creator.js` para renderizar partículas personalizadas en el lienzo Canvas del fondo.
3.  **Dropdown del Creador**: En `theme-creator/index.html`, añade la opción dentro de `<select id="select-theme">`.

### B. Añadir un nuevo Estilo de Botón
1.  **CSS**: Añade en `index.css` los estilos normales y hover de tu botón:
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
2.  **Dropdown del Creador**: En `theme-creator/index.html`, añade la opción en `<select id="select-button-style">`.

### C. Añadir un nuevo Efecto de Animación
1.  **CSS**: Define la animación keyframes y su clase asociada en `index.css`:
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
2.  **Dropdown del Creador**: Regístralo en el desplegable `<select id="select-button-anim">` de `theme-creator/index.html`.
