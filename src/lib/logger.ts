export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[INFO]: ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN]: ${message}`, ...args);
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR]: ${message}`, error);
  },
};
