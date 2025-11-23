import { NextResponse } from "next/server";
import { pushToUser } from "../../stream/[userId]/route";

export async function POST(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  const body = await req.json().catch(() => ({}));
  const { reminder } = body;

  // console.log("POST Reminder Trigger:", { userId, reminder });

  pushToUser(userId, `reminder: ${reminder}`);

  return NextResponse.json({
    ok: true,
    user: userId,
    message: "Event pushed to user",
  });
}
