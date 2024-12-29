import { NextResponse } from "next/server";
import { getSidebarConfig } from "../../config/server";

const config = getSidebarConfig();

export async function GET() {
  return NextResponse.json({
    wsUrl: config.wsUrl || process.env.WS_URL || "",
  });
}

export const runtime = "edge";
