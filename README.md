# My House Game 🏠

Juego web de inglés para niños de **1° básico (Chile)**, basado en la **Unidad 6 «My House»** del texto oficial *Inglés 1° básico – Student's Book* (Mineduc).

El niño aprende y practica:

- **Habitaciones:** living room, kitchen, bathroom, bedroom, dining room, balcony, garden.
- **Objetos y muebles:** sofa, TV, lamp, fridge, stove, toilet, shower, sink, bed, table, chair…
- **Acciones:** read a book, watch TV, cook, take a shower, brush my teeth, sleep, play, eat lunch…
- **Frases:** *This is the kitchen.* · *I cook in the kitchen.* · *Where's Michi?*

## Actividades

| Actividad | Tipo | Qué practica |
|---|---|---|
| Explore the house | Exploración | Tocar cada habitación y escuchar objetos y acciones |
| Listen and point | Escuchar y tocar | Reconocer palabras por audio |
| Where does it go? | Drag & drop | Llevar cada objeto a su habitación |
| What do you do here? | Drag & drop | Llevar cada acción a su habitación |
| Trace and complete | Drag & drop | Completar oraciones y la letra que falta |
| Where's Michi? | Escuchar y tocar | Comprensión auditiva: encontrar al gato Michi (inspirado en el cuento de la unidad) |
| My Progress | Quiz | Repaso final con estrellas |

Todo se escucha en voz alta en inglés (Web Speech API); las instrucciones también se leen en español. El botón 🐢 hace la voz más lenta.

## Cómo usarlo

No necesita instalación ni dependencias: es un único archivo `index.html`.

```bash
git clone https://github.com/jcarcamob/english-1ro.git
cd english-1ro
open index.html          # macOS (o doble clic en el archivo)
```

O sírvelo localmente:

```bash
python3 -m http.server 8000   # luego abre http://localhost:8000
```

**Publicarlo con GitHub Pages:** *Settings → Pages → Deploy from a branch → `main` / root*.

## App instalable (PWA)

El juego es una **Progressive Web App**: se puede instalar en tablet, celular o computador y funciona **sin conexión** después de la primera visita.

- **Chrome / Edge (Android, Windows, macOS):** aparece el botón **📲 Instalar** en la barra superior (o el ícono de instalar en la barra de direcciones).
- **Safari en iPad / iPhone:** botón *Compartir* → **Agregar a pantalla de inicio**.
- **Safari en Mac:** *Archivo* → **Agregar al Dock**.

> La PWA requiere servirse por `https://` (GitHub Pages) o `http://localhost`. Abriendo `index.html` con doble clic el juego funciona, pero sin instalación ni modo offline.

**Publicar una nueva versión:** cambia `VERSION` en `sw.js` para que los dispositivos descarguen la actualización y borren la caché anterior.

### Navegadores

Chrome, Edge y Safari recientes (escritorio, tablet y móvil). El arrastre funciona con mouse, dedo o lápiz; también se puede tocar una tarjeta y luego la habitación, o usar el teclado (Tab + Enter).

## Estructura

```
index.html             # juego completo (HTML + CSS + JS, sin dependencias)
manifest.webmanifest   # metadatos de la app instalable
sw.js                  # service worker: caché offline
icons/                 # íconos de la app (SVG, PNG y maskable)
README.md
CONTRIBUTING.md
LICENSE
```

Dentro de `index.html` el script está dividido en secciones: datos de la unidad, helpers, progreso (`localStorage`), audio, motor drag & drop (Pointer Events), pantallas y arranque.

## Privacidad y seguridad

- No recolecta datos personales, no usa analítica ni llamadas a APIs externas.
- Solo guarda en el navegador las estrellas obtenidas y las preferencias de sonido (validadas al leerse).
- Todo el contenido es estático; el texto se inserta con `textContent`.
- Única dependencia externa: tipografías de Google Fonts (con fuentes de respaldo si no cargan).
- `Content-Security-Policy` estricta: el script inline está autorizado por hash SHA-256 y no se permite `eval`, `object`, formularios ni `<base>` externos. **Si editas el `<script>` de `index.html`, recalcula el hash** (ver `CONTRIBUTING.md`).
- El service worker solo guarda en caché archivos propios y las tipografías; no intercepta ningún otro dominio.

## Créditos

- Contenido pedagógico alineado con la Unidad 6 del texto *Inglés 1° básico* del Ministerio de Educación de Chile. Este proyecto **no está afiliado** al Mineduc y **no reproduce** ilustraciones del libro: los dibujos son SVG propios y emojis del sistema.
- Tipografías: [Grandstander](https://fonts.google.com/specimen/Grandstander) y [Andika](https://fonts.google.com/specimen/Andika) (SIL Open Font License).

## Licencia

[MIT](LICENSE)
