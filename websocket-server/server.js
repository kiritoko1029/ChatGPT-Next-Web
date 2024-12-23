const { WebSocketServer } = require('ws');
const { createServer } = require('http');

const hostname = '0.0.0.0';
const port = 13001;

let onlineUsers = 0;
let wss = null;

function broadcastOnlineUsers() {
  if (!wss) return;
  const message = JSON.stringify({ type: "online", count: onlineUsers });
  wss.clients.forEach((client) => {
    try {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(message);
      }
    } catch (error) {
      console.error("Error broadcasting to client:", error);
    }
  });
}

const server = createServer();

wss = new WebSocketServer({
  server,
  path: "/ws",
  perMessageDeflate: false,
});

console.log("WebSocket server is set up");

wss.on("connection", (ws) => {
  onlineUsers++;
  console.log("New connection established. Online users:", onlineUsers);

  // Send initial count to the new client
  ws.send(JSON.stringify({ type: "online", count: onlineUsers }));

  // Broadcast to all clients
  broadcastOnlineUsers();

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === "getOnline") {
        ws.send(JSON.stringify({ type: "online", count: onlineUsers }));
      }
    } catch (e) {
      console.error("Failed to parse message:", e);
    }
  });

  ws.on("close", () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    console.log("Connection closed. Online users:", onlineUsers);
    broadcastOnlineUsers();
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.close();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`WebSocket server is running at ws://${hostname}:${port}`);
}); 