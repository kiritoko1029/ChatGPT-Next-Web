import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 处理 WebSocket 升级请求
  if (req.method === "GET") {
    res.status(200).json({ message: "WebSocket server is running" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// Integrate with Next.js server
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

    // Send initial count to the new client
    ws.send(JSON.stringify({ type: "online", count: onlineUsers }));

    // Broadcast to all clients
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

  server.on("upgrade", (request, socket, head) => {
    if (request.url === "/ws") {
      wss?.handleUpgrade(request, socket, head, (ws) => {
        wss?.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });
}
