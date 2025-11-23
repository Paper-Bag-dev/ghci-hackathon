from livekit.agents import function_tool, RunContext
import httpx
from dataclass.session_info import MySessionInfo

@function_tool
async def create_reminder(
    ctx: RunContext[MySessionInfo],
    reminders: list[str]  # array of reminders
) -> dict:
    """
    Creates reminders for a user. Just call it.
    """

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "http://localhost:3000/api/agent/reminder/user_35n5MPjm6HTLT3zsAB2drmbwmMi",
                json={"reminders": reminders}
            )

            return resp.json()

    except Exception as e:
        print(e)
        return {"error": str(e)}
