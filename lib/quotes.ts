import { validQuoteInput, calculateQuoteTotal, type QuoteInput } from "./quote-input.ts";
export { validQuoteInput } from "./quote-input.ts";
export type { QuoteInput } from "./quote-input.ts";

export type StoredQuote = {
  quoteNumber: string;
  publicToken: string;
  ownerEmail: string;
  destination: string;
  data: QuoteInput;
  total: number;
  createdAt: string;
  updatedAt: string;
};

async function database() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("The quotation database is unavailable.");
  return env.DB;
}

export async function createQuote(
  ownerEmail: string,
  data: QuoteInput,
): Promise<StoredQuote> {
  if (!validQuoteInput(data)) throw new Error("Invalid quotation.");
  const total = calculateQuoteTotal(data);
  const id = crypto.randomUUID();
  const publicToken = crypto.randomUUID().replaceAll("-", "");
  const year = new Date().getUTCFullYear();
  const quoteNumber = `GH-${year}-${publicToken.slice(0, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  const db = await database();
  await db
    .prepare(
      `INSERT INTO quotes
        (id, quote_number, public_token, owner_email, destination, data, total, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      quoteNumber,
      publicToken,
      ownerEmail,
      data.destinationName,
      JSON.stringify(data),
      Math.max(0, Math.round(total)),
      now,
      now,
    )
    .run();

  return {
    quoteNumber,
    publicToken,
    ownerEmail,
    destination: data.destinationName,
    data,
    total: Math.max(0, Math.round(total)),
    createdAt: now,
    updatedAt: now,
  };
}

export async function findQuoteByToken(token: string): Promise<StoredQuote | null> {
  const db = await database();
  const row = await db
    .prepare(
      `SELECT quote_number, public_token, owner_email, destination, data, total,
              created_at, updated_at
       FROM quotes WHERE public_token = ? LIMIT 1`,
    )
    .bind(token)
    .first<{
      quote_number: string;
      public_token: string;
      owner_email: string;
      destination: string;
      data: string;
      total: number;
      created_at: string;
      updated_at: string;
    }>();

  if (!row) return null;
  return {
    quoteNumber: row.quote_number,
    publicToken: row.public_token,
    ownerEmail: row.owner_email,
    destination: row.destination,
    data: JSON.parse(row.data) as QuoteInput,
    total: row.total,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listQuotesForOwner(ownerEmail: string) {
  const db = await database();
  return db
    .prepare(
      `SELECT quote_number, public_token, destination, total, created_at
       FROM quotes WHERE owner_email = ?
       ORDER BY created_at DESC LIMIT 100`,
    )
    .bind(ownerEmail)
    .all<{
      quote_number: string;
      public_token: string;
      destination: string;
      total: number;
      created_at: string;
    }>();
}
