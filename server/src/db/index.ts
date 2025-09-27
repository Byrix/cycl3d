import { drizzle } from "drizzle-orm/node-postgres";
import { dbCreds } from "$/env";

export const db = drizzle({ connection: dbCreds, casing: "snake_case" });
