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

## Reportar problemas

Abre un *issue* indicando navegador, dispositivo, pasos para reproducir y qué esperabas que pasara.
