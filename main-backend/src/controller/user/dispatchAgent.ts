import { NextFunction, Request, Response } from "express";
import { AgentDispatchClient } from "livekit-server-sdk";

const dispatchAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { room, user } = req.body;

    const client = new AgentDispatchClient(
      process.env.LIVEKIT_URL!,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET
    );

    const dispatch = await client.createDispatch(room, `test-agent`, {
      metadata: JSON.stringify(user),
    });

    return res.json({ ok: true, dispatch });
  } catch (e: unknown) {
    const err = e as Error;
    console.error(err);

    return res.status(500).json({
      ok: false,
      error: err.message ?? "Unknown error",
    });
    next();
  }
};

export default dispatchAgent;
