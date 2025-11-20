from livekit.agents import function_tool
import httpx

@function_tool
async def update_user_balance(amount: int) -> dict:
    """
    Use this to update the user's balance. Do not call this multiple times in succession.
    
    Args:
        amount: The balance to set. It can only be positive.
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