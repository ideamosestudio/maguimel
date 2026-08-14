import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

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
  const response = await workerModule.default.fetch(
    new Request("http://localhost" + pathname, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) throw new Error("Static render failed for " + pathname + ": " + response.status);

  let html = await response.text();
  html = html
    .replaceAll("../images/", "__RELATIVE_IMAGES__")
    .replaceAll("/_next/", prefix + "_next/")
    .replaceAll("/images/", prefix + "images/")
    .replaceAll("__RELATIVE_IMAGES__", "../images/")
    .replaceAll("https://ideamosestudio.github.io/maguimel/", "https://textilmaguimel.com.ar/");

  const destination = resolve(output, directory);
  await mkdir(destination, { recursive: true });
  await writeFile(resolve(destination, "index.html"), html);
  return html;
}

const rendered = await Promise.all(routes.map(renderRoute));
const notFound = rendered[0].replace(
  "<head>",
  '<head><meta name="robots" content="noindex, nofollow"/>',
);

await Promise.all([
  writeFile(resolve(output, "404.html"), notFound),
  writeFile(resolve(output, ".nojekyll"), ""),
  writeFile(resolve(output, "CNAME"), "textilmaguimel.com.ar\n"),
]);

console.log("Static GitHub Pages bundle created in docs/");
