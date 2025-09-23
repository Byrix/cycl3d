import { integer, pgSchema, varchar } from "drizzle-orm/pg-core";

export const dbSchema = pgSchema("cycl3d");
export const users = dbSchema.table("users", {
  id: integer(),
  first_name: varchar(),
});
