import { useEffect, useRef, useCallback } from "react";
import { useWebSocketStore } from "./store";

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const wsUrlRef = useRef<string | undefined>(undefined);
  const initRef = useRef(false);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const setOnlineUsers = useWebSocketStore((state) => state.setOnlineUsers);

  const setupWebSocket = useCallback(() => {
    if (initRef.current && reconnectAttemptsRef.current === 0) {
      return;
    }

    try {
      if (wsUrlRef.current === "") {
        return;
      }

      if (wsUrlRef.current === undefined) {
        initRef.current = true;
        fetch("/api/ws-config")
          .then((res) => res.json())
          .then((config) => {
            wsUrlRef.current = config.wsUrl;
            if (wsUrlRef.current === "") {
              console.log("WebSocket URL not configured, skipping connection");
              setOnlineUsers(0);
              return;
            }
            console.log("Attempting to connect to:", wsUrlRef.current);
            const ws = new WebSocket(wsUrlRef.current!);
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
          })
          .catch((error) => {
            console.error("Failed to fetch WebSocket config:", error);
            wsUrlRef.current = "";
            setOnlineUsers(0);
          });
      } else if (wsUrlRef.current) {
        console.log("Attempting to connect to:", wsUrlRef.current);
        const ws = new WebSocket(wsUrlRef.current);
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
      }
    } catch (error) {
      console.error("Failed to setup WebSocket:", error);
      setOnlineUsers(0);
    }
  }, [setOnlineUsers]);

  useEffect(() => {
    setupWebSocket();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        reconnectAttemptsRef.current = 0;
        if (
          wsUrlRef.current &&
          (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
        ) {
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
        wsRef.current = null;
        ws.close(1000);
      }
    };
  }, [setupWebSocket]);

  return useWebSocketStore((state) => state.onlineUsers);
}
