import fs from "fs/promises";
import crypto from "crypto";
import { NextResponse } from "next/server";
function generateHash(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}
async function handler(req: any, res: any) {
  // 定义文件路径
  if (process.env.ANNOUNCEMENT_PATH) {
    const filePath = process.env.ANNOUNCEMENT_PATH;
    const data = await fs.readFile(filePath, "utf8");
    return NextResponse.json({ content: data, hash: generateHash(data) });
  }
  return NextResponse.json({ content: "", hash: "" });
}
export const GET = handler;
export const POST = handler;
