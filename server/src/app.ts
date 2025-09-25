import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { logger } from "@tqman/nice-logger";
import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";

export const app = new Elysia()
  .use(cors())
  .use(openapi())
  .use(logger({ withTimestamp: true }))
  .use(
    await autoload({
      dir: "./modules",
      prefix: "/api",
      ignore: ["**/model.ts", "**/service.ts"],
    }),
  );
