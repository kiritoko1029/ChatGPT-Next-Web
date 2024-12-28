import { NextResponse } from "next/server";
import { getWebSocketConfig } from "./config";

export async function GET() {
  return NextResponse.json(getWebSocketConfig());
}
