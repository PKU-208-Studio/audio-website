import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload.event !== "string") {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.ANALYTICS_WEBHOOK_TOKEN
          ? { authorization: `Bearer ${process.env.ANALYTICS_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    }).catch(() => null);
  }

  return NextResponse.json({ accepted: true }, { status: 202 });
}
