import pc from "picocolors";
import { app } from "./app";
import { env } from "./env";

const ELYSIA_VERSION = import.meta.require("elysia/package.json").version;
const startTime = performance.now();

app.listen(
  {
    port: env.PORT,
    hostname: env.HOSTNAME,
  },
  (server) => {
    const duration = performance.now() - startTime;

    console.log(
      `🦊 ${pc.green(`${pc.bold("Elysia")} v${ELYSIA_VERSION}`)} ${pc.gray("started in")} ${pc.bold(duration.toFixed(2))} ms ${pc.gray("in")} ${pc.bold(env.NODE_ENV)} ${pc.gray("mode")}\n`,
    );
    console.log(
      `${pc.green(" ➜ ")} ${pc.bold("Server")}:     ${pc.cyan(String(server.url))}`,
    );
    console.log(
      `${pc.green(" ➜ ")} ${pc.bold("Static")}:     ${pc.cyan(`${process.cwd()}/${env.STATIC_PATH}`)}`,
    );
    console.log(
      `${pc.green(" ➜ ")} ${pc.bold("Database")}:   ${pc.cyan(`postgres://${env.PGUSER}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`)}`,
    );
    console.log(
      `${pc.green(" ➜ ")} ${pc.bold("Geoserver")}:  ${pc.cyan(env.GEOSERVER_BASE)}`,
      "\n",
    );
  },
);
