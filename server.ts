import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { setupWebSocket } from './app/api/websocket';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      if (req.method === 'OPTIONS') {
        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        });
        res.end();
        return;
      }

      if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket') {
        res.writeHead(101, {
          'Upgrade': 'websocket',
          'Connection': 'Upgrade'
        });
        return;
      }

      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  setupWebSocket(server);

  server.listen(port, hostname, () => {
    console.log(`> Server listening at http://${hostname}:${port}`);
    console.log(`> WebSocket server is ready`);
  });
}); 