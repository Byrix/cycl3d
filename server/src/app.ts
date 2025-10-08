import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { logger } from "@tqman/nice-logger";
import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";
import { env } from "./env";

export const app = new Elysia()
  .use(cors())
  .use(openapi())
  .use(logger({ withTimestamp: true }))
  .use(
    staticPlugin({
      assets: `${env.STATIC_PATH}`,
      prefix: "/app",
      indexHTML: true,
    }),
  )
  .use(
    await autoload({
      dir: "./modules",
      prefix: "/api",
      ignore: ["**/model.ts", "**/service.ts"],
    }),
  );
