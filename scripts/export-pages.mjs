import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "docs");
const client = resolve(root, "dist", "client");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true, force: true });

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("build", String(Date.now()));
const workerModule = await import(workerUrl.href);

const routes = [
  { pathname: "/", directory: "", prefix: "./" },
  { pathname: "/colegio", directory: "colegio", prefix: "../" },
  { pathname: "/publicidad", directory: "publicidad", prefix: "../" },
  { pathname: "/trabajo", directory: "trabajo", prefix: "../" },
];

async function renderRoute({ pathname, directory, prefix }) {
  const response = await workerModule.default(
    new Request("http://localhost" + pathname, { headers: { accept: "text/html" } }),
  );

  if (!response.ok) throw new Error("Static render failed for " + pathname + ": " + response.status);

  let html = await response.text();
  html = html
    .replaceAll("https://textilmaguimel.com.ar/images/", "__ABSOLUTE_IMAGES__")
    .replaceAll("../images/", "__RELATIVE_IMAGES__")
    .replaceAll("/_next/", prefix + "_next/")
    .replaceAll("/images/", prefix + "images/")
    .replaceAll("__RELATIVE_IMAGES__", "../images/")
    .replaceAll("__ABSOLUTE_IMAGES__", "https://textilmaguimel.com.ar/images/")
    .replaceAll("https://ideamosestudio.github.io/maguimel/", "https://textilmaguimel.com.ar/");

  const canonical = "https://textilmaguimel.com.ar/" + (directory ? directory + "/" : "");
  html = html.replace(/<link rel="canonical" href="[^"]*"\/?>/, '<link rel="canonical" href="' + canonical + '"/>');
  // Only retain the Latin subsets used by the Spanish site, including accents.
  html = html.replace(/<style data-vinext-fonts>([\s\S]*?)<\/style>/g, (_, css) =>
    '<style data-vinext-fonts>' + css.replace(/\/\* ([\w-]+) \*\/\s*@font-face\s*\{[^}]*\}/g,
      (rule, subset) => ['latin', 'latin-ext'].includes(subset) ? rule : '') + '</style>');
  // Hash exact inline scripts after URL rewriting; allow no arbitrary inline JS.
  const hashes = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
    .filter((match) => match[1].trim())
    .map((match) => "'sha256-" + createHash("sha256").update(match[1]).digest("base64") + "'");
  const policy = ["default-src 'self'", "base-uri 'none'", "object-src 'none'",
    "script-src 'self' " + [...new Set(hashes)].join(" "), "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:", "font-src 'self'", "connect-src 'self' https://api.textilmaguimel.com.ar",
    "frame-src https://www.google.com", "form-action https://api.textilmaguimel.com.ar"].join("; ");
  html = html.replace("<head>", '<head><meta http-equiv="Content-Security-Policy" content="' + policy + '"/>');
  const destination = resolve(output, directory);
  await mkdir(destination, { recursive: true });
  await writeFile(resolve(destination, "index.html"), html);
  return html;
}

await Promise.all(routes.map(renderRoute));
const notFound = '<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Página no encontrada | Textil Maguimel</title><meta name="referrer" content="strict-origin-when-cross-origin"></head><body><main><h1>Página no encontrada</h1><p>La dirección no existe o cambió.</p><a href="/">Volver a Textil Maguimel</a></main></body></html>';

await Promise.all([
  writeFile(resolve(output, "404.html"), notFound),
  writeFile(resolve(output, ".nojekyll"), ""),
  writeFile(resolve(output, "CNAME"), "textilmaguimel.com.ar\n"),
]);

console.log("Static GitHub Pages bundle created in docs/");
