import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",

  // Pretty print in development
  ...(process.env.NODE_ENV !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  }),

  // Production config for AWS/Vercel
  ...(process.env.NODE_ENV === "production" && {
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  }),
});

export default logger;
