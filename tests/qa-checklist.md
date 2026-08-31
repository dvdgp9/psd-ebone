# QA visual de la temporada 2026-2027

Ejecutar primero:

```bash
node tests/site-smoke.mjs
```

La comprobación debe terminar con código 0 antes de dar por válida la implementación.

## Páginas que deben revisarse

- `index.html`
- `actividades-infantiles.html`
- `actividades-adultos.html`

## Escritorio - 1440 × 900

- [ ] La navegación muestra Inicio, Niños y niñas, Adultos y Contacto sin solapes.
- [ ] El hero tiene texto legible sobre la imagen y un único título principal.
- [ ] Las dos tarjetas de público tienen el mismo peso visual y son completamente clicables.
- [ ] Periodos, tarifas y horarios pueden compararse sin ambigüedad.
- [ ] Las tablas no cortan texto, precios ni encabezados.
- [ ] Las imágenes mantienen una proporción natural y no aparecen pixeladas.
- [ ] El pie muestra contacto y enlaces legales disponibles sin marcadores vacíos.

## Móvil - 390 × 844

- [ ] No existe desplazamiento horizontal en ninguna página.
- [ ] Logo, navegación y CTA no se solapan.
- [ ] Las tarjetas se apilan en un orden lógico y conservan un área táctil cómoda.
- [ ] Las tablas se adaptan o permiten desplazamiento horizontal dentro de su contenedor.
- [ ] Los horarios largos siguen siendo legibles y no quedan cortados.
- [ ] Teléfono y correo se pueden pulsar sin ampliar la pantalla.
- [ ] Ningún contenido queda oculto detrás de la cabecera fija.

## Accesibilidad e interacción

- [ ] Se puede recorrer la navegación, tarjetas y enlaces usando solo Tab y Enter.
- [ ] El foco de teclado es claramente visible.
- [ ] El orden de foco coincide con el orden visual.
- [ ] Todos los textos mantienen contraste suficiente sobre fotografías y fondos de color.
- [ ] Todas las imágenes informativas tienen un texto alternativo útil.
- [ ] Los títulos siguen una jerarquía coherente: un `h1` y secciones con `h2`/`h3`.
- [ ] Los enlaces externos que abren otra pestaña usan `rel="noopener noreferrer"`.

## Contenido y diagnóstico

- [ ] No aparece ningún dato de la campaña Verano 2026 en las tres páginas activas.
- [ ] No se muestran URLs antiguas de inscripción.
- [ ] `Inscripciones próximamente` y `psd@ebone.es` aparecen como alternativa temporal.
- [ ] La consola del navegador no muestra errores.
- [ ] Todas las solicitudes de HTML, CSS, imágenes y fuentes terminan correctamente.
- [ ] Los enlaces a las dos páginas de público y los enlaces de regreso funcionan.
