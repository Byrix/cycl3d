import type { App } from '$/exports';

// TODO: Update these to use actual checks against services
export default (app: App) => app
  .get(
    "/",
    () => ({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: "0.0.1",
    }),
    {
      detail: {
        summary: "Health check",
        description: "Returns the API health status and system information",
        tags: ["Health"],
      },
    },
  )
  .get("/ping", () => "pong", {
    detail: {
      summary: "Ping endpoint",
      description: "Simple ping endpoint that returns pong",
      tags: ["Health"],
    },
  })
  .get(
    "/status",
    () => ({
      status: "operational",
      services: {
        database: "connected",
        cache: "connected",
        external_api: "avaliable",
      },
      last_check: new Date().toISOString(),
    }),
    {
      detail: {
        summary: "Service status",
        description: "Returns the status of various services and dependencies",
        tags: ["Health"],
      },
    },
  );