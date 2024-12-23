import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { setupWebSocket } from './app/api/websocket';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 13001;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  setupWebSocket(server);

  server.on("error", (error) => {
    console.error("Server error:", error);
  });

  server.on("close", () => {
    if (wss) {
      wss.close();
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}); 