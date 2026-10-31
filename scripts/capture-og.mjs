import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const outputOg = path.resolve(__dirname, '../public/og-image.png');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath === '/' ? 'index.html' : urlPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(4173, '127.0.0.1', async () => {
  console.log('Static server listening on http://127.0.0.1:4173');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const targetUrl = 'http://127.0.0.1:4173/?skipLoader=true';

  console.log(`Taking screenshot with Chrome: ${outputOg}...`);
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    `--screenshot=${outputOg}`,
    '--virtual-time-budget=4000',
    targetUrl,
  ]);

  chrome.on('close', (code) => {
    console.log(`Chrome exited with code ${code}`);
    server.close(() => {
      console.log('Server stopped');
      if (fs.existsSync(outputOg)) {
        const stats = fs.statSync(outputOg);
        console.log(`Success! og-image.png created (${stats.size} bytes).`);
      } else {
        console.error('Failed to create og-image.png');
      }
    });
  });
});

