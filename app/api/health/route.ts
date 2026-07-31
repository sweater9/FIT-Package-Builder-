import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "global-holidayz-fit-builder",
    timestamp: new Date().toISOString(),
  });
}
