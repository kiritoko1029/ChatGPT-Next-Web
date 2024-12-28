import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    wsUrl: process.env.WS_URL ?? "",
  });
}
