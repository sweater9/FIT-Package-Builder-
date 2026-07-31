import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quotes = sqliteTable(
  "quotes",
  {
    id: text("id").primaryKey(),
    quoteNumber: text("quote_number").notNull().unique(),
    publicToken: text("public_token").notNull().unique(),
    ownerEmail: text("owner_email").notNull(),
    destination: text("destination").notNull().default("Dubai, UAE"),
    data: text("data").notNull(),
    total: integer("total").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("quotes_owner_created_idx").on(table.ownerEmail, table.createdAt),
    index("quotes_public_token_idx").on(table.publicToken),
  ],
);
