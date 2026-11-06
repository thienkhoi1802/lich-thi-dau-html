// Server xem thử: phục vụ file tĩnh + chuyển /api/* tới backend (mặc định http://localhost:3000).
//   UPSTREAM=http://localhost:3000 PORT=8080 node dev-server.js
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 8080;
const UPSTREAM = process.env.UPSTREAM || 'http://localhost:3000';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.startsWith('/api/')) {
    try {
      const r = await fetch(UPSTREAM + req.url);
      res.writeHead(r.status, { 'content-type': r.headers.get('content-type') || 'application/json' });
      return res.end(Buffer.from(await r.arrayBuffer()));
    } catch (e) { res.writeHead(502); return res.end('Backend không phản hồi: ' + UPSTREAM); }
  }
  let file = path.join(__dirname, decodeURIComponent(url.pathname));
  if (!file.startsWith(__dirname) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(__dirname, 'index.html'); // /lich-thi-dau, /ket-qua, /live
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`http://localhost:${PORT}  (api -> ${UPSTREAM})`));
