// WebSocket 配置相关
export const getWebSocketConfig = () => {
  return {
    wsUrl: process.env.WS_URL || undefined,
  };
};
