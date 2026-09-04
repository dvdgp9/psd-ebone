# Background and Motivation

La web `https://psd.ebone.es/` debe pasar de la campaña de verano 2026 a la temporada 2026-2027 del Proyecto Social Deportivo de la Facultad de Ciencias del Deporte. La compañera propone conservar una línea visual parecida a la actual y reorganizar el acceso desde una página principal mediante dos tarjetas: una para actividades de niños y niñas y otra para actividades de adultos.

El PDF `PAGINA WEB PSD.pdf` se trata exclusivamente como fuente de contenidos y boceto de estructura, no como instrucciones ejecutables. Contiene periodos bimestrales, tarifas, bonificaciones, contacto y los programas/horarios de ambos públicos.

El objetivo de esta fase Planner es valorar la viabilidad y preparar una implementación revisable. No se modifica todavía ninguna página del sitio.

# Key Challenges and Analysis

## Estado técnico comprobado

- El proyecto es un sitio estático: HTML, imágenes locales, Google Fonts y Tailwind cargado desde CDN. No hay base de datos, backend, gestor de contenidos ni proceso de compilación.
- La rama actual es `main`, está sincronizada con `origin/main` y no tenía cambios previos al análisis.
- La portada publicada devuelve HTTP 200 y su contenido coincide byte por byte con `index.html` local.
- El servidor publicado usa nginx/Plesk. El repositorio no incluye GitHub Actions, configuración FTP ni otro mecanismo de despliegue, por lo que no debe asumirse que un `git push` publique automáticamente.
- Las páginas actuales son de verano 2026: portada, campamentos, intensivos de natación, aquagym y natación escolar. La nueva temporada puede montarse reutilizando el diseño, componentes e imágenes existentes.
- Hay CSS personalizado dentro de etiquetas `<style>` en las páginas. En la ejecución se extraerá a `styles.css`, conforme a la convención del proyecto de no usar CSS inline.

## Arquitectura recomendada

- `index.html`: portada de temporada 2026-2027, acceso destacado mediante dos tarjetas, periodos, tarifas, bonificaciones, contacto y enlaces legales.
- `actividades-infantiles.html`: actividades y horarios para edades de 3 a 15 años, con la nota sobre asignación de niveles de natación.
- `actividades-adultos.html`: actividades y horarios para mayores de 16 años.
- `styles.css`: estilos personalizados compartidos. Tailwind puede seguir cargándose desde CDN para evitar introducir un proceso de build.
- Las páginas de verano actuales deberían mantenerse inicialmente en el servidor pero retirarse del menú y de la portada, evitando romper enlaces antiguos. Su archivado, redirección o eliminación debe decidirse aparte.

## Contenido confirmado por el PDF

- Cuatro periodos bimestrales entre octubre de 2026 y mayo de 2027.
- Tarifas diferenciadas por público, tipo de actividad y condición `Zona norte y UGR` frente a `General`.
- Bonificación UGR para trabajadores, cónyuges e hijos; bonificación de Zona Norte con empadronamiento en 18011 o 18013.
- Teléfono `958 244 351` y correo `psd@ebone.es`.
- Actividades infantiles: natación, multideporte, fútbol 7, judo, gimnasia rítmica, gimnasia acrobática, baloncesto y fútbol sala.
- Actividades de adultos: natación, aquagym, gimnasia +60, pilates, ritmos latinos, tonificación, gimnasia de fuerza y sala de musculación.

## Confirmaciones necesarias antes de implementar contenido definitivo

1. Fechas: el cuadro general sitúa el primer turno desde el 5 de octubre, pero las tarjetas de público indican inicio el 6 de octubre. Confirmar si debe mostrarse `5 de octubre`, `6 de octubre` o `5/6 de octubre según grupo`.
2. Horario de oficina: la web actual muestra 11:30-13:30 y 16:30-18:30; el PDF nuevo indica lunes/miércoles 10:30-12:00 y martes/jueves 16:30-17:00. Se propone usar el PDF, previa validación final.
3. Siglas de días: confirmar que `LX` significa lunes y miércoles y `MJ` martes y jueves. En la web se escribirán los nombres completos para evitar confusión.
4. Inscripciones: el PDF no aporta URLs para la temporada 2026-2027. No deben reutilizarse los formularios de verano 2026. Se necesitan los enlaces nuevos o la aprobación para usar el correo como CTA provisional.
5. Política de devolución: el PDF pide incluirla, pero no proporciona texto ni URL. Hace falta el enlace oficial. La política de privacidad actual sí puede conservarse si sigue siendo la correcta.
6. Terminología: corregir el probable error `URG` a `UGR` y confirmar la denominación pública `Zona norte y UGR`.
7. Imágenes: confirmar si se reutilizan las fotografías actuales o si se facilitarán imágenes de actividades deportivas y de adultos. La implementación no queda bloqueada porque hay recursos reutilizables.
8. Campaña anterior: decidir si las páginas de verano quedan accesibles solo por URL, se archivan o redirigen. La opción más segura inicialmente es mantenerlas sin enlaces desde la nueva navegación.
9. Publicación: confirmar acceso/procedimiento de Plesk o indicar quién subirá los archivos tras la aprobación.

## Decisiones del usuario para la ejecución (2026-08-31)

- ~~La fecha pública de inicio será el **6 de octubre de 2026**.~~ Decisión sustituida el 2026-09-04: la fecha definitiva de inicio será el **5 de octubre de 2026** y el primer periodo comenzará ese mismo día.
- `LX` queda confirmado como **lunes y miércoles** y `MJ` como **martes y jueves**. Las siglas no se mostrarán solas en la web.
- Los enlaces de inscripción se generarán más adelante. Las inscripciones se abrirán el **14 de septiembre**; la fecha se mostrará de forma destacada en la portada y se repetirá en pequeño junto al horario de oficina. No se reutilizarán formularios de verano ni se crearán enlaces vacíos; mientras no existan formularios nuevos, se ofrecerá `psd@ebone.es` como contacto alternativo.
- El enlace de política de devolución se generará más adelante. No se añadirá un enlace vacío; queda como contenido pendiente para el paso 7 y como requisito antes del despliegue definitivo.
- El horario nuevo sustituye al anterior: lunes y miércoles de 10:30 a 12:00; martes y jueves de 16:30 a 17:00.
- Se reutilizarán las fotografías existentes.
- El usuario realizará el despliegue. El Executor preparará y verificará los archivos, pero no publicará en Plesk.
- Por criterio conservador aceptado en el plan, las páginas de verano se conservarán en el repositorio y seguirán accesibles por URL, pero se retirarán de la nueva navegación.
- Se normalizará el probable error `URG` como `UGR` y se usará la denominación `Zona norte y UGR`.

## Matriz definitiva de contenidos

### Portada (`index.html`)

- Temporada: `2026-2027`.
- Programa: `Actividades acuáticas y deportivas`.
- Accesos principales: `Niños y niñas · de 3 a 15 años` y `Adultos · mayores de 16 años`.
- Vigencia general: del 5 de octubre de 2026 al 27 de mayo de 2027.
- Periodos:
  - 1.º: 5 de octubre - 26 de noviembre.
  - 2.º: 30 de noviembre - 28 de enero.
  - 3.º: 1 de febrero - 1 de abril.
  - 4.º: 5 de abril - 27 de mayo.
- Tarifas bimestrales para mayores de 16 años:
  - Acuáticas: 40 EUR Zona norte y UGR / 48 EUR General.
  - Deportivas: 36 EUR Zona norte y UGR / 44 EUR General.
  - Sala de musculación: 38 EUR Zona norte y UGR / 46 EUR General.
- Tarifas bimestrales para menores de 16 años:
  - Acuáticas: 36 EUR Zona norte y UGR / 44 EUR General.
  - Deportivas: 32 EUR Zona norte y UGR / 42 EUR General.
- Bonificación UGR: trabajadores, cónyuges e hijos.
- Bonificación Zona Norte: certificado de empadronamiento en 18011 o 18013.
- Contacto: `958 244 351`, `psd@ebone.es` y el nuevo horario de oficina confirmado.

### Niños y niñas (`actividades-infantiles.html`)

- Público: de 3 a 15 años; del 5 de octubre de 2026 al 27 de mayo de 2027.
- Natación de 3 a 5 años: lunes y miércoles a las 16:00, 17:00 y 18:00; martes y jueves a las 16:00, 17:00 y 18:00.
- Natación de 6 a 15 años: lunes y miércoles a las 16:00, 17:00 y 18:00; martes y jueves a las 16:00, 17:00 y 18:00.
- Nota de natación: la distribución por niveles se realizará el primer día de piscina y será competencia de los monitores y el coordinador.
- Multideporte de 3 a 5 años: lunes y miércoles a las 17:00; martes y jueves a las 18:00.
- Fútbol 7 de 9 a 15 años: lunes y miércoles a las 17:00.
- Judo de 6 a 12 años: martes y jueves a las 17:00.
- Gimnasia rítmica de 6 a 12 años: martes y jueves a las 17:00.
- Gimnasia acrobática de 6 a 12 años: lunes y miércoles a las 18:00.
- Baloncesto de 6 a 15 años: lunes y miércoles a las 18:00.
- Fútbol sala de 6 a 12 años: martes y jueves a las 18:00.

### Adultos (`actividades-adultos.html`)

- Público: mayores de 16 años; del 5 de octubre de 2026 al 27 de mayo de 2027.
- Natación iniciación: lunes y miércoles a las 16:00.
- Natación nivel 1 y 2: lunes y miércoles a las 17:00; martes y jueves a las 18:00.
- Natación libre: lunes y miércoles a las 18:00; martes y jueves a las 17:00.
- Aquagym: martes y jueves a las 11:30 y a las 19:00.
- Gimnasia +60: lunes y miércoles a las 17:00.
- Pilates: martes y jueves a las 17:00.
- Ritmos latinos: lunes y miércoles a las 18:00.
- Tonificación: martes y jueves a las 18:00.
- Gimnasia de fuerza: lunes y miércoles de 12:00 a 13:00.
- Sala de musculación, uso libre: lunes y miércoles de 17:00 a 19:00; martes y jueves de 17:00 a 19:00.

## Riesgos y alcance

- Riesgo técnico bajo: no hay migraciones, datos persistentes ni integraciones que puedan romperse.
- Riesgo principal de contenido: publicar fechas, horarios, precios o enlaces de inscripción sin confirmar.
- Riesgo de navegación: eliminar páginas antiguas produciría enlaces rotos; por eso se recomienda conservarlas inicialmente.
- Riesgo de despliegue: el repositorio por sí solo no documenta cómo actualizar Plesk.
- No se necesitan consultas de documentación de APIs ni crear documentación de API: el sitio no usa ninguna API.

# High-level Task Breakdown

## 1. Cerrar contenidos y decisiones pendientes

Recoger las nueve confirmaciones anteriores y redactar una matriz definitiva de contenidos por página.

**Criterio de éxito:** fechas, horarios, nomenclatura, CTA de inscripción, enlace de devolución, tratamiento de páginas antiguas y método de publicación están decididos por escrito.

## 2. Definir pruebas de aceptación antes del cambio

Crear una comprobación ligera con Node.js sin dependencias que valide archivos esperados, títulos, enlaces internos, datos críticos de temporada y ausencia de enlaces de verano en la navegación nueva. Añadir una lista de QA visual para escritorio y móvil.

**Criterio de éxito:** la prueba falla sobre el sitio actual por faltar la nueva arquitectura y especifica de forma verificable el resultado esperado.

## 3. Preparar estilos y estructura compartida

Crear `styles.css`, mover allí los estilos personalizados y definir cabecera, navegación, pie, tarjetas y tablas reutilizables manteniendo el aspecto general actual.

**Criterio de éxito:** no hay etiquetas `<style>` ni atributos `style` en las páginas nuevas/modificadas; cabecera y pie son coherentes y la página carga sin errores de consola.

## 4. Renovar la portada

Sustituir la campaña de verano por la temporada 2026-2027, mostrar las dos tarjetas de acceso y presentar periodos, tarifas, bonificaciones, contacto y legales con jerarquía clara.

**Criterio de éxito:** toda la información general confirmada está visible, las dos tarjetas llevan a las páginas correctas y no quedan textos o CTAs de verano en portada.

## 5. Crear la página de niños y niñas

Construir la página con edades, vigencia, actividades, horarios y nota de niveles de natación, usando nombres de días completos.

**Criterio de éxito:** las ocho modalidades y todos sus horarios coinciden con la matriz aprobada; navegación, contacto e inscripción funcionan.

## 6. Crear la página de adultos

Construir la página con público, vigencia, actividades acuáticas/deportivas, horarios y sala de musculación.

**Criterio de éxito:** todas las modalidades y horarios coinciden con la matriz aprobada; navegación, contacto e inscripción funcionan.

## 7. Completar legales, accesibilidad y enlaces

Añadir la política de devolución validada, conservar o actualizar privacidad, revisar textos alternativos, estructura de encabezados, foco de teclado, contraste y enlaces externos.

**Criterio de éxito:** no hay enlaces `#` de marcador en las páginas activas, todos los enlaces internos devuelven 200 y la navegación esencial funciona con teclado.

## 8. QA local integral

Servir el sitio en local, ejecutar la prueba automática y revisar visualmente portada y páginas de público en anchos de escritorio y móvil. Corregir desbordamientos, solapes, contenido cortado y errores de consola.

**Criterio de éxito:** prueba automática en verde, cero errores de consola y revisión visual sin defectos en las tres páginas nuevas/modificadas.

## 9. Publicar y verificar

Publicar mediante el procedimiento Plesk confirmado, manteniendo una copia recuperable de la versión anterior. Verificar la web real y sus enlaces después de la subida.

**Criterio de éxito:** las tres páginas públicas devuelven 200, muestran la versión aprobada en escritorio y móvil, y las rutas antiguas siguen el tratamiento acordado.

# Project Status Board

- [x] 1. Cerrar contenidos y decisiones pendientes - validado por el usuario
- [x] 2. Definir pruebas de aceptación antes del cambio - validado por el usuario
- [x] 3. Preparar estilos y estructura compartida - validado por el usuario
- [x] 4. Renovar la portada
- [x] 5. Crear la página de niños y niñas
- [x] 6. Crear la página de adultos
- [x] 7. Completar legales, accesibilidad y enlaces - política de devolución diferida por decisión del usuario
- [x] 8. QA local integral
- [ ] 9. Publicar y verificar - responsabilidad del usuario en Plesk

# Current Status / Progress Tracking

- 2026-08-31 - Planner: revisadas visualmente las 3 páginas del PDF y extraído su contenido.
- 2026-08-31 - Planner: inspeccionadas la portada publicada y las páginas locales actuales.
- 2026-08-31 - Planner: comprobado que la portada publicada y `index.html` local son idénticos.
- 2026-08-31 - Planner: plan inicial preparado; no se ha modificado código de la web.
- 2026-08-31 - Executor: respuestas del usuario incorporadas y matriz definitiva de contenidos redactada para el paso 1. Pendiente de validación manual antes de marcar el hito como completado.
- 2026-08-31 - Usuario: matriz de contenidos del paso 1 aprobada; hito marcado como completado.
- 2026-08-31 - Executor: creado `tests/site-smoke.mjs` con comprobaciones de archivos, contenidos críticos, navegación, enlaces locales, estilos inline, textos alternativos y formularios antiguos.
- 2026-08-31 - Executor: creado `tests/qa-checklist.md` para revisión en escritorio, móvil, accesibilidad, contenido y consola.
- 2026-08-31 - Executor: línea base TDD ejecutada con Node.js 22.15.0. Resultado esperado: código 1, 30 comprobaciones correctas y 30 fallos que describen la distancia entre la campaña actual y la nueva especificación.
- 2026-08-31 - Usuario: pruebas de aceptación del paso 2 validadas; hito marcado como completado.
- 2026-08-31 - Executor: creado `styles.css` con tipografía compartida, animación de entrada, estados de interacción, foco visible, soporte de movimiento reducido, tarjetas de público, tablas responsivas y tarjetas de horarios.
- 2026-08-31 - Executor: `index.html` enlaza el nuevo archivo y ya no contiene CSS en una etiqueta `<style>`.
- 2026-08-31 - Executor: verificación local correcta: `styles.css` cargado, Manrope/Lexend aplicadas, sin desbordamiento horizontal y sin errores de consola. Se mantiene un aviso conocido del Tailwind CDN ya presente en el sitio actual.
- 2026-08-31 - Executor: detectada una petición 404 del favicon por defecto durante la prueba local; se añadió el logo existente como favicon para evitarla.
- 2026-08-31 - Executor: la prueba TDD pasa de 30 a 33 comprobaciones correctas y de 30 a 28 fallos; los restantes corresponden a los contenidos y páginas aún no implementados.
- 2026-08-31 - Usuario: autorizada la continuación de todos los hitos de implementación y QA sin pausas intermedias.
- 2026-08-31 - Executor: portada renovada para la temporada 2026-2027 con dos accesos principales, periodos, tarifas, bonificaciones, inscripción provisional, contacto y legales disponibles.
- 2026-08-31 - Executor: creadas `actividades-infantiles.html` y `actividades-adultos.html` con todas las actividades, edades y horarios aprobados.
- 2026-08-31 - Executor: navegación antigua de verano retirada de las tres páginas activas; los archivos antiguos permanecen intactos y accesibles por URL.
- 2026-08-31 - Executor: ampliada la prueba con enlace para saltar al contenido y protección `noopener noreferrer` en enlaces de nueva pestaña.
- 2026-08-31 - Executor: detectado desbordamiento móvil en la cuadrícula de tarifas; solucionado con `min-w-0` en cada sección para contener el desplazamiento dentro de `.table-shell`.
- 2026-08-31 - Executor: prueba final en verde con 143 comprobaciones correctas y 0 fallos.
- 2026-08-31 - Executor: QA visual realizado a 1440 × 900 y 390 × 844. Las tres páginas no presentan desbordamiento, imágenes rotas, enlaces vacíos ni errores de consola. Todos los HTML, CSS e imágenes locales solicitados devolvieron 200/304, sin 404.
- 2026-09-01 - Usuario: confirmada la apertura de inscripciones el 14 de septiembre y solicitado un aviso grande en la portada más un recordatorio pequeño junto al horario de oficina.
- 2026-09-01 - Executor: prueba de aceptación actualizada antes de implementar; línea base TDD esperada de 140 comprobaciones correctas y 4 fallos por el aviso antiguo.
- 2026-09-01 - Executor: fecha de apertura añadida en el hero de la portada, en el bloque de inscripción de las tres páginas y junto al horario de oficina. Eliminado el texto `Inscripciones próximamente` de las páginas activas.
- 2026-09-01 - Executor: prueba final en verde con 144 comprobaciones correctas y 0 fallos. QA visual repetido a 1440 × 900 y 390 × 844: sin desbordamiento, imágenes rotas ni errores de consola.
- 2026-09-04 - Usuario: aportadas capturas donde el hero quedaba descompensado por la alineación inferior y las tablas mostraban desplazamiento horizontal y la última columna cortada en escritorio.
- 2026-09-04 - Executor: hero reajustado sobre una retícula compartida, con columnas centradas verticalmente y proporciones más equilibradas; tamaño del titular moderado en escritorio.
- 2026-09-04 - Executor: tablas corregidas para ocupar el 100 % de cada columna en escritorio, con anchos de columna deterministas. El desplazamiento horizontal se conserva exclusivamente en móvil.
- 2026-09-04 - Executor: QA visual a 1280 × 720 y 390 × 844. En escritorio las dos tablas muestran las tres columnas completas y sin scroll; en móvil el scroll queda contenido en cada tabla y la página no desborda. Prueba final: 147 comprobaciones correctas y 0 fallos.
- 2026-09-04 - Usuario: solicitado sustituir la etiqueta pública `Adultos` por `Adultas/os` y cambiar el hero de esa página por una imagen claramente protagonizada por una persona adulta. Cambio aplicado sin ejecutar pruebas, por petición expresa.
- 2026-09-04 - Usuario: solicitado retirar el fondo blanco del aviso de apertura de inscripciones en el hero de inicio. El aviso queda integrado sobre la fotografía, sin tarjeta, borde ni sombra y con todo el texto en blanco.
- 2026-09-04 - Usuario: confirmada por su compañera la fecha definitiva de inicio de actividades, **5 de octubre de 2026**. Actualizada en la portada, el primer periodo y ambas páginas de actividades.

# Executor's Feedback or Assistance Requests

La implementación local está terminada y verificada. Comando de referencia: `node tests/site-smoke.mjs` (resultado final: 147 comprobaciones correctas, 0 fallos).

Los enlaces de inscripción y la política de devolución siguen dependiendo de contenido futuro. Se han definido alternativas sin enlaces vacíos para poder avanzar, pero la política de devolución debe recibirse antes del despliegue definitivo.

El usuario realizará la publicación en Plesk. Debe subir al menos `index.html`, `actividades-infantiles.html`, `actividades-adultos.html` y `styles.css`, conservando la carpeta `assets/` actual. Después del despliegue queda pendiente verificar las tres URLs públicas.

# Lessons

- La web pública se sirve con nginx/Plesk y el repositorio no contiene automatización de despliegue.
- La portada pública analizada coincide exactamente con el `index.html` local; el repositorio es una base fiable para preparar los cambios.
- El PDF nuevo sustituye datos de verano y cambia el horario de oficina; no mezclar contenidos de ambas campañas.
- No reutilizar enlaces de inscripción de 2026 para la temporada 2026-2027 sin validación expresa.
- Mantener todos los estilos CSS en `styles.css`, no inline.
- Incluir información útil para depuración en las pruebas y en cualquier salida de validación.
- El controlador del navegador disponible no admite `networkidle`; para las comprobaciones locales se debe esperar al estado `load` y después inspeccionar recursos, DOM y consola.
- Si una página no declara favicon, el navegador solicita `/favicon.ico` y genera un 404; reutilizar `assets/Logo_principal.png` como favicon evita esa petición fallida.
- No fijar un ancho mínimo de tabla mayor que la columna de escritorio que la contiene; usar `min-width: 100%` y reservar el ancho desplazable para el breakpoint móvil.
- En una cuadrícula CSS, una tabla con ancho mínimo puede ensanchar toda la página aunque su contenedor tenga `overflow-x: auto`; aplicar `min-width: 0` al elemento de cuadrícula permite que el desplazamiento quede contenido en `.table-shell`.
