import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
let passed = 0;

function report(condition, label, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`PASS  ${label}`);
    return;
  }

  failures.push({ label, detail });
  console.error(`FAIL  ${label}${detail ? `\n      ${detail}` : ""}`);
}

function readProjectFile(relativePath) {
  const absolutePath = resolve(projectRoot, relativePath);
  const exists = existsSync(absolutePath);
  report(exists, `Existe ${relativePath}`, `No se encontró ${absolutePath}`);
  return exists ? readFileSync(absolutePath, "utf8") : "";
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expectText(pageName, text, expectedPhrases) {
  for (const phrase of expectedPhrases) {
    report(
      text.toLocaleLowerCase("es").includes(phrase.toLocaleLowerCase("es")),
      `${pageName} contiene «${phrase}»`,
      `Texto esperado no encontrado en ${pageName}`,
    );
  }
}

function checkHtmlBaseline(pageName, html) {
  if (!html) return;

  report(/<html\b[^>]*\blang=["']es["']/i.test(html), `${pageName} declara lang="es"`);
  report((html.match(/<h1\b/gi) ?? []).length === 1, `${pageName} contiene un único h1`);
  report(!/<style\b/i.test(html), `${pageName} no contiene etiquetas <style>`);
  report(!/\sstyle\s*=/i.test(html), `${pageName} no contiene atributos style`);
  report(!/href=["']#["']/i.test(html), `${pageName} no contiene enlaces vacíos href="#"`);
  report(!/Verano\s+2026/i.test(visibleText(html)), `${pageName} no muestra la campaña Verano 2026`);
  report(/class=["'][^"']*skip-link[^"']*["'][^>]*href=["']#contenido["']|href=["']#contenido["'][^>]*class=["'][^"']*skip-link/i.test(html), `${pageName} ofrece un enlace para saltar al contenido`);

  const newTabLinks = [...html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)].map((match) => match[0]);
  for (const link of newTabLinks) {
    report(/rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i.test(link), `${pageName} protege el enlace externo ${link.slice(0, 100)}`);
  }

  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  report(images.length > 0, `${pageName} contiene al menos una imagen`);
  for (const image of images) {
    report(/\balt=["'][^"']+["']/i.test(image), `${pageName} tiene texto alternativo en ${image.slice(0, 80)}`);
  }
}

function checkLocalLinks(pageName, html) {
  if (!html) return;

  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    const localPath = href.split("#", 1)[0];
    if (!localPath) continue;
    report(
      existsSync(resolve(projectRoot, localPath)),
      `${pageName} enlaza a un archivo local existente: ${localPath}`,
      `Destino ausente: ${resolve(projectRoot, localPath)}`,
    );
  }
}

const indexHtml = readProjectFile("index.html");
const childrenHtml = readProjectFile("actividades-infantiles.html");
const adultsHtml = readProjectFile("actividades-adultos.html");
readProjectFile("styles.css");

const activePages = [
  ["index.html", indexHtml],
  ["actividades-infantiles.html", childrenHtml],
  ["actividades-adultos.html", adultsHtml],
];

for (const [pageName, html] of activePages) {
  checkHtmlBaseline(pageName, html);
  checkLocalLinks(pageName, html);
}

if (indexHtml) {
  const indexText = visibleText(indexHtml);
  const navigation = indexHtml.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/i)?.[0] ?? "";

  expectText("index.html", indexText, [
    "Temporada 2026-2027",
    "Actividades acuáticas y deportivas",
    "Niños y niñas",
    "Adultos",
    "6 de octubre",
    "26 de noviembre",
    "30 de noviembre",
    "28 de enero",
    "1 de febrero",
    "1 de abril",
    "5 de abril",
    "27 de mayo",
    "40 EUR",
    "48 EUR",
    "36 EUR",
    "44 EUR",
    "38 EUR",
    "46 EUR",
    "32 EUR",
    "42 EUR",
    "18011",
    "18013",
    "Lunes y miércoles",
    "10:30 - 12:00",
    "Martes y jueves",
    "16:30 - 17:00",
    "958 244 351",
    "psd@ebone.es",
    "Inscripciones desde el 14 de septiembre",
  ]);

  report(indexHtml.includes('href="actividades-infantiles.html"'), "La portada enlaza a actividades-infantiles.html");
  report(indexHtml.includes('href="actividades-adultos.html"'), "La portada enlaza a actividades-adultos.html");
  report(!/campamentos\.html|intensivos-natacion\.html|aquagym\.html|natacion-escolar\.html/i.test(navigation), "La navegación nueva no enlaza páginas de verano");
}

if (childrenHtml) {
  expectText("actividades-infantiles.html", visibleText(childrenHtml), [
    "de 3 a 15 años",
    "6 de octubre de 2026",
    "27 de mayo de 2027",
    "Natación de 3 a 5 años",
    "Natación de 6 a 15 años",
    "distribución por niveles",
    "Multideporte",
    "Fútbol 7",
    "Judo",
    "Gimnasia rítmica",
    "Gimnasia acrobática",
    "Baloncesto",
    "Fútbol sala",
    "Lunes y miércoles",
    "Martes y jueves",
    "16:00",
    "17:00",
    "18:00",
    "Inscripciones desde el 14 de septiembre",
    "psd@ebone.es",
  ]);
}

if (adultsHtml) {
  expectText("actividades-adultos.html", visibleText(adultsHtml), [
    "Mayores de 16 años",
    "6 de octubre de 2026",
    "27 de mayo de 2027",
    "Natación iniciación",
    "Natación nivel 1 y 2",
    "Natación libre",
    "Aquagym",
    "Gimnasia +60",
    "Pilates",
    "Ritmos latinos",
    "Tonificación",
    "Gimnasia de fuerza",
    "Sala de musculación",
    "Lunes y miércoles",
    "Martes y jueves",
    "11:30",
    "12:00 - 13:00",
    "17:00 - 19:00",
    "19:00",
    "Inscripciones desde el 14 de septiembre",
    "psd@ebone.es",
  ]);
}

const combinedActiveHtml = activePages.map(([, html]) => html).join("\n");
report(!/Inscripciones\s+próximamente/i.test(visibleText(combinedActiveHtml)), "Las páginas activas no muestran el aviso antiguo de inscripciones próximas");
for (const oldFormSlug of [
  "campamento-de-verano-2026",
  "intensivo-de-natacion-2026",
  "aquagym-2026",
  "natacion-escolar-2026",
]) {
  report(!combinedActiveHtml.includes(oldFormSlug), `Las páginas activas no reutilizan el formulario antiguo ${oldFormSlug}`);
}

console.log(`\nResumen: ${passed} comprobaciones correctas; ${failures.length} fallos.`);

if (failures.length > 0) {
  console.error("\nAcciones necesarias:");
  for (const [index, failure] of failures.entries()) {
    console.error(`${index + 1}. ${failure.label}${failure.detail ? ` — ${failure.detail}` : ""}`);
  }
  process.exitCode = 1;
} else {
  console.log("La estructura y los contenidos críticos cumplen la especificación aprobada.");
}
