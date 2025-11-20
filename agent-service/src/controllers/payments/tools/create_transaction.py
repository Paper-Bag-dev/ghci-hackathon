from livekit.agents import function_tool
import httpx

@function_tool
async def create_transaction(self, amount: int, receiver_id: str) -> dict:
    """
    Use this to send money from user's account to another party or person.
    
    CRITICAL RULES — YOU MUST FOLLOW THESE:
    1. NEVER call this tool without explicit user confirmation for amounts ≥ ₹500
    2. For amounts < ₹500 you may call directly IF the user clearly says "send" or similar word in their native language
    3. If user hasn't confirmed, respond with a confirmation question instead of calling
    4. Only call this ONCE per transfer — never repeatedly
    5. If user says "cancel" or "no" — do NOT call this tool
    6. For amount > 500 you must pass the OTP to 'confirm_transaction' tool to verify and proceed.
    
    Args:
        amount: The amount to send
        receiver_id: The id of amount receiving user. 
    """
    
    if amount > 500:
       return {
           "status" : "PENDING",
           "message" : "confirm transaction with otp via 'confirm_transaction' tool",
       } 
    
    return {
        "status": "INITIATED"
    }