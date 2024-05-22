"use client"
import { serial, text, pgSchema } from "drizzle-orm/pg-core";

// e.g.
export const otc = pgSchema("otc");
export const colors = otc.enum('colors', ['red', 'green', 'blue']);
export const  otcUsers = otc.table('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  color: colors('color').default('red'),
});