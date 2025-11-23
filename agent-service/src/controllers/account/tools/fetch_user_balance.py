import httpx, os
from livekit.agents import function_tool, RunContext
from dataclass.session_info import MySessionInfo
from dotenv import load_dotenv

load_dotenv()

@function_tool
async def fetch_user_balance(ctx: RunContext[MySessionInfo]) -> dict:
    """
    Fetches the user's balance.
    """

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"http://localhost:5000/api/v1/agents/balance/user_35n5MPjm6HTLT3zsAB2drmbwmMi")
            
            return response.json()
            # MOCK RESPONSE
            # return {
            #     "user_name": "Vikalp Sharma",
            #     "user_id": ctx.session.userdata.id,
            #     "user_balance": "100 rupees"
            # }

    except Exception as e:
        print(e)
        return {"error": str(e)}
