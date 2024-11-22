import fs from "fs/promises";
import crypto from "crypto";
import { NextResponse } from "next/server";
function generateHash(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}
async function handler(req: any, res: any) {
  // 定义文件路径
  if (process.env.ANNOUNCEMENT_PATH) {
    // 使用正则表达式判断是不是URL [a-zA-z]+://[^\s]*
    const rule = new RegExp("^[a-zA-z]+://[^s]*");
    if (rule.test(process.env.ANNOUNCEMENT_PATH)) {
      // 是URL,向这个地址请求以获取文本
      const response = await fetch(process.env.ANNOUNCEMENT_PATH);
      if (!response.ok) {
        return NextResponse.json({
          content: "获取云公告失败，请检查公告地址是否可访问",
          hash: "",
        });
      }
      const data = await response.text();
      return NextResponse.json({ content: data, hash: generateHash(data) });
    } else {
      const filePath = process.env.ANNOUNCEMENT_PATH;
      const data = await fs.readFile(filePath, "utf8");
      return NextResponse.json({ content: data, hash: generateHash(data) });
    }
  }
  return NextResponse.json({ content: "", hash: "" });
}
export const GET = handler;
export const POST = handler;
