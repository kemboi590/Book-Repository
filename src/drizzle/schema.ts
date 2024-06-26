import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// 1. State
export const bookTable = pgTable("book", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  year: integer("year").notNull(),
});

// State table types
export type TIBook = typeof bookTable.$inferInsert;
export type TSIBook = typeof bookTable.$inferSelect;
