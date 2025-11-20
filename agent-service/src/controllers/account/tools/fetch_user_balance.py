from livekit.agents import function_tool
import httpx
import os

@function_tool
async def fetch_user_balance(user_id: str) -> dict:
    """
    Use this to fetch the user's balance. Do not call this multiple times in succession.
    
    Args:
        user_id: The user id to look up account balance for.
    """
    
    try:
        async with httpx.AsyncClient() as client:
            # response= await client.get(f"{os.getenv("MAIN_SERVER_URL")}/accounts/balance/{user_id}")
            # data = response.json()
            
            # return {
            #     # "user_name" : data.get("user_name"),
            #     # "user_id" : data.get("user_id"),
            #     # "user_balance" : data.get("balance")
            # }
            
            return {
                "user_name" : "Vikalp Sharma",
                "user_id" : 123,
                "user_balance" : "100 rupees"
            }
    except Exception as e:
        return {"error" : str(e)}