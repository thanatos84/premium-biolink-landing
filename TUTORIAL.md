# Tutorial de Personalización Avanzada (Crea tus propios Temas, Botones y Efectos)

Este tutorial te guiará paso a paso para añadir tus propios **Temas Visuales**, **Estilos de Botón** y **Efectos de Animación** modificando el código del proyecto.

---

## 1. Cómo Añadir un Nuevo Tema Visual con Efectos de Fondo

Para crear un nuevo tema completo (por ejemplo, el tema `"volcano"`), debes realizar 4 sencillos pasos en los archivos:

### Paso A: Declarar las Variables CSS del Tema
Abre `index.css` y añade las variables de colores y fondos para tu nuevo tema utilizando el selector de clase `body.theme-nombre`:

```css
/* TEMA VOLCANO */
body.theme-volcano {
  --bg-color: #0b0200;                  /* Color de fondo base */
  --text-muted: #f87171;                /* Color del texto secundario/biografía */
  --accent-color: #f97316;              /* Color de acento principal (Naranja fuego) */
  --accent-glow: rgba(249, 115, 22, 0.4); /* Resplandor/Sombra del color de acento */
  --glass-bg: rgba(30, 8, 4, 0.8);      /* Fondo de los botones (translúcido) */
  --glass-border: rgba(249, 115, 22, 0.15); /* Borde fino de los botones */
  background: radial-gradient(circle at center, #2e0802 0%, #0b0200 100%) !important;
}
```

### Paso B: Programar la Animación en Canvas (`app.js` y `creator.js`)
Para que tu tema tenga un fondo animado en el lienzo (Canvas), abre `app.js` y localiza la función `initBackgroundAnimation()`.

1. **Inicializar Partículas**:
   Busca el bloque `// --- CONFIGURACIÓN E INICIALIZACIÓN DE PARTÍCULAS POR TEMA ---` y añade la inicialización de tus partículas:
   ```javascript
   else if (theme === "volcano") {
     numParticles = 50; // Cantidad de partículas
     for (let i = 0; i < numParticles; i++) {
       particles.push({
         x: Math.random() * width,
         y: Math.random() * height,
         size: Math.random() * 4 + 1,
         speedY: -(Math.random() * 0.4 + 0.1), // Flotan hacia arriba
         alpha: Math.random() * 0.7 + 0.2
       });
     }
   }
   ```

2. **Dibujar las Partículas en el bucle**:
   Busca la función `draw()` dentro de `initBackgroundAnimation()` y añade el dibujado:
   ```javascript
   else if (theme === "volcano") {
     // Limpiar con color de fondo del tema
     ctx.fillStyle = "rgba(11, 2, 0, 0.25)";
     ctx.fillRect(0, 0, width, height);

     particles.forEach((p) => {
       p.y += p.speedY; // Mover
       if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; } // Reiniciar al salir

       ctx.beginPath();
       ctx.arc(p.x + mouseX * p.size * 0.3, p.y + mouseY * p.size * 0.3, p.size, 0, Math.PI * 2);
       ctx.fillStyle = `rgba(249, 115, 22, ${p.alpha})`; // Naranja
       ctx.fill();
     });
   }
   ```
*Nota: Para sincronizar el previsualizador del Creador de Temas visual, repite estos dos bloques exactamente en el archivo `theme-creator/creator.js` dentro de la función `initPreviewAnimation()`.*

### Paso C: Añadir la Opción en el Selector del Creador de Temas
Abre `theme-creator/index.html` y busca el selector `<select id="select-theme">`. Añade tu nueva opción:
```html
<option value="volcano">21. Volcano (Fumarola de magma y lava)</option>
```

### Paso D: Configurar en `config.js`
¡Listo! Ya puedes utilizar tu tema escribiendo `selectedTheme: "volcano"` en tu configuración principal.

---

## 2. Cómo Añadir un Nuevo Estilo de Botón en CSS

Los estilos de botones se definen 100% mediante CSS y se asignan mediante la clase `.btn-style-nombre`.

### Paso A: Declarar los estilos en `index.css`
Abre `index.css` y añade las clases para el estado normal y el estado hover (`:hover`). Utiliza las variables CSS de acento y resplandor para que tu estilo se adapte automáticamente al tema de fondo seleccionado:

```css
/* ESTILO BORDE NEÓN TRIPLE */
.btn-style-triple-neon {
  background: transparent;
  border: 1.5px solid var(--accent-color);
  box-shadow: 0 0 4px var(--accent-color), 0 0 10px var(--accent-glow);
  color: var(--text-color);
}

.btn-style-triple-neon:hover {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 8px var(--accent-color), 0 0 20px var(--accent-glow);
  transform: translateY(-2px); /* Elevar sutilmente */
}
```

### Paso B: Registrar la opción en el HTML del Creador
Abre `theme-creator/index.html`, busca el desplegable `<select id="select-button-style">` y añade:
```html
<option value="triple-neon">21. Triple Neon (Líneas finas de neón)</option>
```

---

## 3. Cómo Añadir un Nuevo Efecto / Animación de Botón

Las animaciones de botones utilizan animaciones keyframes estándar de CSS y se definen bajo la clase `.btn-anim-nombre`.

### Paso A: Crear la animación en `index.css`
Abre `index.css` y define la animación `@keyframes` junto con la clase del botón:

```css
/* ANIMACIÓN SPIN-SHAKE (Vibrar rotando) */
.btn-anim-spin-shake {
  animation: spinShakeButton 4s infinite ease-in-out;
}

@keyframes spinShakeButton {
  0%, 90%, 100% { transform: rotate(0deg); }
  92% { transform: rotate(-2deg); }
  94% { transform: rotate(2deg); }
  96% { transform: rotate(-1deg); }
  98% { transform: rotate(1deg); }
}
```

### Paso B: Registrar la opción en el HTML del Creador
Abre `theme-creator/index.html`, busca el desplegable `<select id="select-button-anim">` y añade:
```html
<option value="spin-shake">22. Spin Shake (Vibración y rotación en bucle)</option>
```

---

## 4. Subir los Cambios
Una vez realizados los pasos, guarda todos los archivos y refresca la web o el creador de temas. ¡Tus nuevos diseños aparecerán en los menús y funcionarán perfectamente!
