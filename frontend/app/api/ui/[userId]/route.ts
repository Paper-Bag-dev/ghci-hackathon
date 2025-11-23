import { NextResponse } from "next/server";
import { pushToUser } from "../../stream/[userId]/route";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }

) {
  const { userId } = await context.params;

  pushToUser(userId, "navigate:/dashboard/net-banking/loans");

  return NextResponse.json({
    ok: true,
    user: userId,
    message: "Navigation event sent",
  });
}
