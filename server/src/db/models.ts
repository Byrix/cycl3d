import { createSelectSchema } from "drizzle-typebox";
import { lgas } from "./schema";

export type SelectUser = typeof lgas.$inferSelect;
export const SelectUserSchema = createSelectSchema(lgas);
