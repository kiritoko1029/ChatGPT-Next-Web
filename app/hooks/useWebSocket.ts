import { useEffect, useRef, useCallback } from "react";
import { create } from "zustand";

interface WebSocketStore {
  onlineUsers: number;
  setOnlineUsers: (count: number) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  onlineUsers: 0,
  setOnlineUsers: (count) => set({ onlineUsers: count }),
}));

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const setOnlineUsers = useWebSocketStore((state) => state.setOnlineUsers);

  const setupWebSocket = useCallback(() => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const host = window.location.host;
      console.log(`Attempting WebSocket connection to ${protocol}//${host}/ws`);

      const ws = new WebSocket(`${protocol}//${host}/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection established successfully");
        reconnectAttemptsRef.current = 0;
        ws.send(JSON.stringify({ type: "getOnline" }));
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        if (error instanceof Event) {
          console.error("Error event:", {
            type: error.type,
            target: error.target,
            timeStamp: error.timeStamp,
          });
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed with code:", event.code);
        console.log("Close reason:", event.reason);

        if (event.code !== 1000 && event.code !== 1001) {
          console.log("Attempting to reconnect...");
          reconnectAttemptsRef.current += 1;

          if (reconnectAttemptsRef.current <= MAX_RECONNECT_ATTEMPTS) {
            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttemptsRef.current),
              10000,
            );
            console.log(
              `Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`,
            );

            reconnectTimeoutRef.current = setTimeout(() => {
              if (document.visibilityState === "visible") {
                setupWebSocket();
              }
            }, delay);
          } else {
            console.log("Max reconnection attempts reached");
          }
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "online") {
            setOnlineUsers(data.count);
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };
    } catch (error) {
      console.error("Failed to setup WebSocket:", error);
    }
  }, [setOnlineUsers]);

  useEffect(() => {
    setupWebSocket();

    // 页面可见性变化时的处理
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        reconnectAttemptsRef.current = 0; // 重置重连次数
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          setupWebSocket();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        const ws = wsRef.current;
        wsRef.current = null; // 立即清空引用
        ws.close(1000); // 使用正常关闭代码
      }
    };
  }, [setupWebSocket]);

  return useWebSocketStore((state) => state.onlineUsers);
}
