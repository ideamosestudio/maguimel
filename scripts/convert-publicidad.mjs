import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [sourceDir, outputDir] = process.argv.slice(2);

if (!sourceDir || !outputDir) {
  throw new Error("Usage: node scripts/convert-publicidad.mjs <sourceDir> <outputDir>");
}

const files = (await readdir(sourceDir))
  .filter((file) => /\.(png|jpe?g)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (files.length !== 34) {
  throw new Error(`Expected 34 gallery images, found ${files.length}.`);
}

for (const [index, file] of files.entries()) {
  const outputName = `publicidad-v2-${String(index + 1).padStart(3, "0")}.webp`;
  await sharp(path.join(sourceDir, file), { failOn: "error" })
    .rotate()
    .resize({ width: 1400, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, effort: 5, smartSubsample: true })
    .toFile(path.join(outputDir, outputName));
}

console.log(`Converted ${files.length} publicity images.`);
