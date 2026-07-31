import { NextResponse } from "next/server";
import { getChatGPTUser } from "../../chatgpt-auth";
import { createQuote, validQuoteInput } from "../../../lib/quotes";

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

  const candidate = body as { data?: unknown; total?: unknown };
  if (!validQuoteInput(candidate.data) || !Number.isFinite(candidate.total)) {
    return NextResponse.json({ error: "Invalid quotation." }, { status: 400 });
  }

  const quote = await createQuote(user.email, candidate.data, Number(candidate.total));
  return NextResponse.json({
    quoteNumber: quote.quoteNumber,
    publicToken: quote.publicToken,
    total: quote.total,
    createdAt: quote.createdAt,
  });
}
