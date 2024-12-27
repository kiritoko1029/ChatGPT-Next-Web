declare global {
  interface Window {
    __ENV?: {
      WS_PORT?: string;
      [key: string]: string | undefined;
    };
  }
}

export {};
