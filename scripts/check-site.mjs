import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve(import.meta.dirname, '..', 'docs');
const origin = 'https://textilmaguimel.com.ar';
for (const route of ['', 'colegio', 'publicidad', 'trabajo']) {
  const file = resolve(root, route, 'index.html');
  const html = readFileSync(file, 'utf8');
  const canonical = origin + '/' + (route ? route + '/' : '');
  assert(html.includes('href="' + canonical + '"'), `${route}: canonical`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: heading`);
  assert(html.includes('lang="es-AR"'), `${route}: language`);
  assert(html.includes('name="description"'), `${route}: description`);
  assert(!html.includes('http://'), `${route}: insecure URL`);
  const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
  assert(policy?.includes("object-src 'none'"), `${route}: CSP`);
  for (const [, body] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (body.trim()) assert(policy.includes(createHash('sha256').update(body).digest('base64')), `${route}: script hash`);
  }
  for (const [tag, url] of [...html.matchAll(/<(?:script|img|link)\b[^>]*?(?:src|href)="([^"]+)"[^>]*>/g)].map(m => [m[0], m[1]])) {
    if (/^(https?:|data:)/.test(url)) {
      assert(!tag.startsWith('<script') || url.startsWith(origin + '/'), `${route}: third party script`);
      continue;
    }
    const target = url.startsWith('/') ? resolve(root, url.slice(1)) : resolve(dirname(file), url);
    assert(existsSync(target.split('?')[0]), `${route}: missing ${url}`);
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(/rel="[^"]*(?:noopener|noreferrer)/.test(tag), `${route}: opener protection`);
}
const notFound = readFileSync(resolve(root, '404.html'), 'utf8');
assert(notFound.includes('noindex') && !notFound.includes('index, follow'));
assert(!notFound.includes('rel="canonical"'));
assert.equal(readFileSync(resolve(root, 'CNAME'), 'utf8').trim(), 'textilmaguimel.com.ar');
assert(readFileSync(resolve(root, 'robots.txt'), 'utf8').includes(origin + '/sitemap.xml'));
const walk = dir => readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(resolve(dir,e.name)) : [resolve(dir,e.name)]);
assert(!walk(root).some(f => /\.(?:php|map|pem|key)$|[\\/]\.env/.test(f)), 'No backend, sourcemaps or credentials in Pages');
console.log('PASS: four routes, local resources, SEO, CSP hashes, external links, 404 and Pages artifact.');
