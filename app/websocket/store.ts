import { create } from "zustand";

interface WebSocketStore {
  onlineUsers: number;
  setOnlineUsers: (count: number) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  onlineUsers: 0,
  setOnlineUsers: (count) => set({ onlineUsers: count }),
}));
