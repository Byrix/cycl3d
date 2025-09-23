import type { Config } from "drizzle-kit";

import { dbCreds } from "./src/env";

export default {
  dbCredentials: dbCreds,
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  breakpoints: true,
} satisfies Config;
