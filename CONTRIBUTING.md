# Cómo contribuir

¡Gracias por querer ayudar! Este es un proyecto pequeño para que niños de 1° básico practiquen inglés, así que buscamos cambios simples y cuidados.

## Ideas bienvenidas

- Nuevas actividades de la Unidad 6 (por ejemplo, *Listen and color*).
- Más vocabulario o frases que aparezcan en el libro.
- Mejoras de accesibilidad (teclado, lectores de pantalla, contraste).
- Corrección de errores en tablets o navegadores específicos.

## Pasos

1. Haz un *fork* y crea una rama: `git checkout -b feature/mi-mejora`.
2. Edita `index.html` y pruébalo abriéndolo en el navegador (escritorio **y** móvil/tablet).
3. Haz commits pequeños y descriptivos: `git commit -m "Agrega actividad Listen and color"`.
4. Abre un *Pull Request* explicando qué cambiaste y por qué (capturas de pantalla ayudan).

## Reglas del proyecto

- **Sin dependencias ni build:** todo debe seguir funcionando abriendo `index.html` directamente.
- **Pensado para niños de 6–7 años:** botones grandes, poco texto, todo con audio. Instrucciones en español, vocabulario en inglés.
- **Seguridad:** inserta texto con `textContent`, nunca `innerHTML` con datos variables. No agregues analítica, rastreadores ni llamadas a servicios externos. No guardes datos personales.
- **Contenido:** no copies ilustraciones ni textos protegidos del libro; usa dibujos propios (SVG) o emojis.
- **Datos:** el vocabulario vive en las constantes `ROOMS`, `OBJECTS`, `ACTIONS` y `PARTS` al inicio del script; agrega palabras ahí.

## Después de editar el script

`index.html` tiene una Content-Security-Policy que autoriza el `<script>` inline por su hash. Si cambias el script, recalcula el hash y actualiza el valor `sha256-…` de la etiqueta `Content-Security-Policy`:

```bash
python3 - <<'PY'
import re, hashlib, base64
s = open('index.html', encoding='utf-8').read()
js = re.search(r'<script>(.*?)</script>', s, re.S).group(1)
print("sha256-" + base64.b64encode(hashlib.sha256(js.encode()).digest()).decode())
PY
```

Si el juego queda en blanco, revisa la consola del navegador: suele ser este hash. Recuerda también subir `VERSION` en `sw.js`.

## Reportar problemas

Abre un *issue* indicando navegador, dispositivo, pasos para reproducir y qué esperabas que pasara.
