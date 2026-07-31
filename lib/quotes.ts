export type QuoteInput = {
  destinationId: string;
  destinationName: string;
  nights: number;
  hotelId: number;
  hotel: { id: number; name: string; stars: number; nightly: number; room: string };
  experiencePrice: number;
  transferPrices: Record<string, number>;
  startDate: string;
  adults: number;
  children: number;
  infants: number;
  transfer: string;
  insurance: boolean;
  addOns: string[];
};

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

export function validQuoteInput(value: unknown): value is QuoteInput {
  if (!value || typeof value !== "object") return false;
  const quote = value as Partial<QuoteInput>;
  return (
    typeof quote.destinationId === "string" &&
    quote.destinationId.length > 0 &&
    typeof quote.destinationName === "string" &&
    quote.destinationName.length > 0 &&
    Number.isInteger(quote.nights) &&
    Number(quote.nights) >= 2 &&
    Number(quote.nights) <= 14 &&
    Number.isInteger(quote.hotelId) &&
    Boolean(quote.hotel) &&
    typeof quote.hotel?.name === "string" &&
    typeof quote.hotel?.room === "string" &&
    Number.isFinite(quote.hotel?.nightly) &&
    Number.isFinite(quote.experiencePrice) &&
    Boolean(quote.transferPrices) &&
    typeof quote.transferPrices === "object" &&
    typeof quote.startDate === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(quote.startDate) &&
    Number.isInteger(quote.adults) &&
    Number.isInteger(quote.children) &&
    Number.isInteger(quote.infants) &&
    typeof quote.transfer === "string" &&
    typeof quote.insurance === "boolean" &&
    Array.isArray(quote.addOns) &&
    quote.addOns.every((item) => typeof item === "string")
  );
}

export async function createQuote(
  ownerEmail: string,
  data: QuoteInput,
  total: number,
): Promise<StoredQuote> {
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
    destination: "Dubai, UAE",
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
