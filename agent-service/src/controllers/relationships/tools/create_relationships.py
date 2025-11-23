from livekit.agents import function_tool
import httpx
import os

@function_tool
async def create_relationship(self, name: str, identifier: str) -> dict:
    """
    Creates a relationship for the user.

    AI MAY use this tool to add someone to the user's saved contacts.
    The 'identifier' can be an email, phone number, username, or user ID.
    The backend will resolve it.

    Args:
        name: The nickname like "Josh", "Mom", "Landlord"
        identifier: Any unique identifier for the target user
    """

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{os.getenv("BACKEND_URL")}/api/v1/agent/relationship",
            json={
                "name": name,
                "identifier": identifier
            }
        )

    if resp.status_code >= 400:
        return {"status": "ERROR", "message": resp.json().get("message", "failed")}

    return {"status": "SUCCESS"}
