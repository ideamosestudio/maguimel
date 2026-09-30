import { gzipSync } from 'node:zlib';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve(process.argv[2] || 'docs');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json'};
const server = createServer(async (req,res) => {
  try {
    let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if (!path.startsWith(root + '/') && !path.startsWith(root + '\\') && path !== root) { res.writeHead(403).end(); return; }
    if ((await stat(path)).isDirectory()) path=resolve(path,'index.html');
    res.setHeader('Content-Type',types[extname(path)] || 'application/octet-stream');
    const body=await readFile(path);
    if (/gzip/.test(req.headers['accept-encoding'] || '') && /\.(html|js|css|json)$/.test(path)) {
      res.setHeader('Content-Encoding','gzip'); res.setHeader('Vary','Accept-Encoding'); res.end(gzipSync(body));
    } else res.end(body);
  } catch { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}); res.end(await readFile(resolve(root,'404.html'))); }
});
server.listen(Number(process.argv[3] || 4173),'127.0.0.1',()=>console.log('Preview http://127.0.0.1:4173'));
