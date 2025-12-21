import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerk = await clerkClient();

    const userId = "user_36qPqMEimVSMXwcMhbppcwZOfuj";

    const session = await clerk.sessions.createSession({
      userId,
    });

    return Response.json({ sessionId: session.id });
  } catch (err: any) {
    console.log("CLERK ERROR:", err.errors || err);
    return Response.json({ error: err.errors || err }, { status: 400 });
  }
}
