import { NextResponse } from "next/server";
import { findQuoteByToken } from "../../../../lib/quotes";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  if (!/^[a-f0-9]{32}$/.test(token)) {
    return NextResponse.json({ error: "Quotation not found." }, { status: 404 });
  }

  const quote = await findQuoteByToken(token);
  if (!quote) {
    return NextResponse.json({ error: "Quotation not found." }, { status: 404 });
  }

  return NextResponse.json({
    quoteNumber: quote.quoteNumber,
    destination: quote.destination,
    data: quote.data,
    total: quote.total,
    createdAt: quote.createdAt,
  });
}
