import fs from "fs/promises";
import { NextResponse } from "next/server";
export default async function handler(req: any, res: any) {
  // 定义文件路径
  if (process.env.ANNOUNCEMENT_PATH) {
    const filePath = process.env.ANNOUNCEMENT_PATH;
    const data = await fs.readFile(filePath, "utf8");
    return NextResponse.json({ content: data });
  }
  return NextResponse.json({ content: "" });
}
export const GET = handler;
export const POST = handler;

export const runtime = "edge";
