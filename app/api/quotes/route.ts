import { NextResponse } from "next/server";
import { getChatGPTUser } from "../../chatgpt-auth";
import { createQuote } from "../../../lib/quotes";

import { validQuoteRequest } from "../../../lib/quote-input";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in is required to save quotations." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!validQuoteRequest(body)) {
    return NextResponse.json({ error: "Invalid quotation." }, { status: 400 });
  }

  const quote = await createQuote(user.email, body.data);
  return NextResponse.json({
    quoteNumber: quote.quoteNumber,
    publicToken: quote.publicToken,
    total: quote.total,
    createdAt: quote.createdAt,
  });
}
