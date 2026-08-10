import { cp, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "docs");
const client = resolve(root, "dist", "client");

await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true, force: true });

const workerModule = await import(new URL(`../dist/server/index.js?build=${Date.now()}`, import.meta.url));
const response = await workerModule.default.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed: ${response.status}`);

let html = await response.text();
html = html
  .replaceAll('/_next/', './_next/')
  .replaceAll('href="/images/', 'href="./images/')
  .replaceAll('src="/images/', 'src="./images/')
  .replaceAll('href="/og.png"', 'href="./og.png"')
  .replaceAll('content="/og.png"', 'content="https://ideamosestudio.github.io/maguimel/og.png"');

await Promise.all([
  writeFile(resolve(output, "index.html"), html),
  writeFile(resolve(output, "404.html"), html),
  writeFile(resolve(output, ".nojekyll"), ""),
]);

console.log("Static GitHub Pages bundle created in docs/");
