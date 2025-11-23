import { NextResponse } from "next/server";

let clients: Record<string, ((msg: string) => void)[]> = {};

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  console.log("👂 SSE CONNECT for user:", userId);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (msg: string) => {
        console.log("📤 SENDING TO CLIENT:", userId, "→", msg);

        try {
          controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
        } catch (err: any) {
          console.log("❌ SEND ERROR:", err.message);
        }
      };

      if (!clients[userId]) {
        clients[userId] = [];
      }

      clients[userId].push(send);

      console.log(
        "📌 ACTIVE CLIENTS FOR USER:",
        userId,
        clients[userId].length
      );

      send("connected");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function POST(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params; // IMPORTANT FIX

  const body = await req.json().catch(() => ({}));
  const message = body.message;

  console.log("📨 POST SSE message:", { userId, message });

  pushToUser(userId, message);

  return NextResponse.json({
    ok: true,
    pushed: message,
  });
}

export function pushToUser(userId: string, msg: string) {
  console.log("🔥 pushToUser CALLED for:", userId, "msg:", msg);
  console.log("📦 clients currently:", Object.keys(clients));

  if (!clients[userId]) {
    console.log("❌ NO CLIENTS FOUND for:", userId);
    return;
  }

  clients[userId].forEach((send, i) => {
    console.log("➡️ Pushing to connection", i);
    send(msg);
  });
}
