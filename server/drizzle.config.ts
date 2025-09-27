import type { Config } from "drizzle-kit";

import { dbCreds } from "./src/env";

export default {
  dbCredentials: dbCreds,
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./scripts",
  breakpoints: true,
  extensionsFilters: ["postgis"],
  schemaFilter: ["public", "cycl3d"],
  tablesFilter: ["*"],
  introspect: { casing: "camel" },
} satisfies Config;
