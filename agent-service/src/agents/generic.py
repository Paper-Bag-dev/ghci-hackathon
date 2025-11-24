from livekit.agents import Agent
import httpx
from livekit.agents import function_tool
# from tools.lookup_datetime import lookup_datetime
from controllers.account.tools.fetch_user_balance import fetch_user_balance
from livekit.agents import function_tool, Agent, RunContext
import json
BACKEND_URL='http://localhost:5000'
import logging
import asyncio

logger = logging.getLogger("genric-agent")

class GenericAssistant(Agent):
    firstname = ""
    lastname = ""
    def __init__(self, metadata: dict | None = None) -> None:
        super().__init__(
        instructions = f"""
            If you are reading this it means your instructions weren't updated. Let the user know that. 
            """,
        tools=[fetch_user_balance],
        )
    
    async def on_enter(self):
        # New method: update agent metadata
        while not self.session.userdata.firstname:
            await asyncio.sleep(0.05)

        print(f"User Data: {self.session.userdata}")
        await self.update_instructions(
            instructions=f"""You are a helpful female banking voice assistant called Choral.
            Use this information when responding:
            {self.session.userdata}
            Respond concisely and accurately."""
        )
        await self.session.generate_reply(instructions="Greet the user by their name and tell what you do in a short manner.")

    
    @function_tool()
    async def navigate_loans(self, ctx: RunContext):
        """Navigate user to the loans page when they ask for loans."""

        async with httpx.AsyncClient() as client:
            await client.get(f"{BACKEND_URL}/api/v1/agents/ui/user_35n5MPjm6HTLT3zsAB2drmbwmMi")

        return {"status": "ok", "message": "Navigating to loans page."}


    @function_tool()
    async def create_reminders(self, ctx: RunContext, title: str, description: str, date: str, time: str, type: str):
        """
        Create a reminder for user.
        ARGS:
        - title: Title of the reminder
        - description: Description of the reminder
        - date: Date of the reminder
        - time: Time of the reminder
        - type: Type of the reminder (e.g., payment, meeting, etc.)
        Creates a reminder for the user and pushes it to the UI.
        """


        # build reminder object
        reminder = {
            "id": f"{date}-{time}",
            "title": title,
            "description": description,
            "date": date,
            "time": time,
            "type": type,
            "status": "active"
        }

        # push the event to the UI
        async with httpx.AsyncClient() as client:
            await client.post(
                f"{BACKEND_URL}/api/v1/agents/reminder/user_35n5MPjm6HTLT3zsAB2drmbwmMi",
                json={"reminders": [reminder]}
            )

        return {"status": "ok", "reminder": reminder}

    @function_tool()
    async def create_transaction(self, ctx: RunContext, sendTo: str, id: bool):
        """
        Create a transaction for user.
        ARGS:
        - title: Title of the reminder
        - description: Description of the reminder
        - date: Date of the reminder
        - time: Time of the reminder
        - type: Type of the reminder (e.g., payment, meeting, etc.)
        Creates a reminder for the user and pushes it to the UI.
        """


        # build reminder object
        reminder = {
            "id": f"{date}-{time}",
            "title": title,
            "description": description,
            "date": date,
            "time": time,
            "type": type,
            "status": "active"
        }

        # push the event to the UI
        async with httpx.AsyncClient() as client:
            await client.post(
                f"{BACKEND_URL}/api/v1/agents/reminder/user_35n5MPjm6HTLT3zsAB2drmbwmMi",
                json={"reminders": [reminder]}
            )

        return {"status": "ok", "reminder": reminder}