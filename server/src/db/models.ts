import { createSelectSchema } from "drizzle-typebox";
import { users } from "./schema";

export type SelectUser = typeof users.$inferSelect;
export const SelectUserSchema = createSelectSchema(users);
