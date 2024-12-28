import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

let onlineUsers = 0;
export let wss: WebSocketServer | null = null;

function broadcastOnlineUsers() {
  if (!wss) return;
  const message = JSON.stringify({ type: "online", count: onlineUsers });
  wss.clients.forEach((client) => {
    try {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    } catch (error) {
      console.error("Error broadcasting to client:", error);
    }
  });
}

export function setupWebSocket(server: Server) {
  if (wss) return;

  wss = new WebSocketServer({
    server,
    path: "/ws",
    perMessageDeflate: false,
  });

  console.log("WebSocket server is set up");

  wss.on("connection", (ws: WebSocket) => {
    onlineUsers++;
    console.log("New connection established. Online users:", onlineUsers);

    ws.send(JSON.stringify({ type: "online", count: onlineUsers }));
    broadcastOnlineUsers();

    ws.on("message", (message: string) => {
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
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    });
  });
}
