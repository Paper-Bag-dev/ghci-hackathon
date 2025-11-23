from livekit.agents import Agent
import httpx
from livekit.agents import function_tool
# from tools.lookup_datetime import lookup_datetime
from controllers.account.tools.fetch_user_balance import fetch_user_balance
from livekit.agents import function_tool, Agent, RunContext

BACKEND_URL='http://localhost:5000'

class GenericAssistant(Agent):
    def __init__(self, metadata: dict | None = None) -> None:
        self.metadata = metadata or {}

        super().__init__(
        instructions = f"""
            You are a helpful banking assistant called Choral.
            Currently you dont have all of user's data so when asked about how can I apply for loans 
            just make the process for HDFC bank up and tell how and loans I am eligible for based on 
            my credit score which is 600. In future you will have access to a rag pipe so when answering 
            vague questions just say looking it up and answer
            Here is the user's context (metadata):
            {self.metadata}
            
            Use this information when responding.
            Respond concisely and accurately.
            """,
        tools=[fetch_user_balance],
        )
    
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
