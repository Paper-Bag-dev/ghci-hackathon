from livekit.agents import Agent
import httpx
from livekit.agents import function_tool
# from tools.lookup_datetime import lookup_datetime
from livekit.agents import function_tool, Agent, RunContext
from typing import List, Dict, Optional
BACKEND_URL='http://localhost:5000'
import logging
import asyncio
import json

logger = logging.getLogger("genric-agent")

class GenericAssistant(Agent):
    firstname = ""
    lastname = ""
    def __init__(self, metadata: dict | None = None) -> None:
        super().__init__(
        instructions = f"""
            If you are reading this it means your instructions weren't updated. Let the user know that. 
            """,
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
            - When user requests to transfer funds to someone always check if they mean to transfer to a 
            relationship via the get_relationships tool.
            Respond concisely and accurately."""
        )
        await self.session.generate_reply(instructions="Greet the user by their name and tell only a little bit about what you do in a short manner.")

    @function_tool
    async def fetch_user_balance(self, ctx: RunContext) -> dict:
        """
        Fetches the user's balance.
        """

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"http://localhost:5000/api/v1/agents/balance/{ctx.session.userdata.id}")

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

    @function_tool()
    async def navigate(self, ctx: RunContext, url:str):
        """
        Navigate the user to different pages inside the dashboard or refresh the page.

        SUPPORTED ROUTES:
        dashboard: "/dashboard",
        account: "/dashboard/account",
        alerts: "/dashboard/alerts-notifications",
        cards: "/dashboard/card-management",
        deposits: "/dashboard/deposit-services",
        investments: "/dashboard/net-banking/investments",
        create_investment: "/dashboard/net-banking/investments/create",
        loans: "/dashboard/net-banking/loans",
        create_loan: "/dashboard/net-banking/loans/create",
        create_deposits: "/dashboard/net-banking/deposits",
        alerts_reminders: "/dashboard/alerts-notifications",
        settings: "/dashboard/settings"
        refresh: "refresh"

        ARGS:
        - url (str): The key of the specified url required.

        EXAMPLE CALL BY MODEL:
        navigate(url="investments")
        navigate(url="cards")

        The AI should infer user intent and choose the correct matching route.
        """
        async with httpx.AsyncClient() as client:
            resp = await client.post(f"{BACKEND_URL}/api/v1/agents/ui/{ctx.session.userdata.id}",
                              json={
                                  "url" : url
                              })
            
            return resp.json()

        return {"status": False, "message": f"Unable to navigate to page."}




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
                f"{BACKEND_URL}/api/v1/agents/reminder/{ctx.session.userdata.id}",
                json={"reminders": [reminder]}
            )

        return {"status": "ok", "reminder": reminder}

    @function_tool()
    async def create_transaction(self, ctx: RunContext, sendTo: str, amount: int):
        """
        Create a transaction for user.
        ARGS:
        - sendTo: The receivers account id(should be clerkId). Check via get_relationships or ask user.
        - amount: the amount to send
        Creates a reminder for the user and pushes it to the UI.
        """

        # push the event to the UI
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BACKEND_URL}/api/v1/agents/transaction/create",
                json={
                        "id" : ctx.session.userdata.id,
                        "toId": sendTo,
                        "amount" : amount,
                    }
            )
            return response.json()

    @function_tool()
    async def verify_transaction(self, ctx: RunContext, otp: str):
        """
        Verify a transaction for user. If verification fails ask user to recreate transaction.
        ARGS:
        - otp: The otp sent to the user
        Verifies a transaction for the user.
        """

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BACKEND_URL}/api/v1/agents/transaction/verify",
                json={
                        "id" : ctx.session.userdata.id,
                        "otp": otp
                    }
            )
            return response.json()
        
    @function_tool()
    async def get_transaction_history(self, ctx: RunContext):
        """
        Fetch transaction history for user.
        """

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BACKEND_URL}/api/v1/agents/transaction/{ctx.session.userdata.id}"
            )
            return response.json()
        
    @function_tool()
    async def create_relationships(self, ctx: RunContext, receiver_identifier: str):
        """
        Create a relationship for the user automatically.

        ARGS:
        - receiver_identifier: The receivers account ID, email, or phone number.
        
        The AI should infer the id type automatically and request creation.
        """

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BACKEND_URL}/api/v1/agents/relationship/{ctx.session.userdata.id}/create",
                json={
                    "receiver_identifier": receiver_identifier
                }
            )
            return response.json()

    
    @function_tool()
    async def get_relationships(self, ctx: RunContext):
        """
        Fetch relationships for user.
        """

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BACKEND_URL}/api/v1/agents/relationship/{ctx.session.userdata.id}"
            )
            return response.json()
    
    @function_tool()
    async def get_ui_interface(self, ctx: RunContext):
        """
        Fetches available UI card/chip types and supported actions from backend.
        Used by AI to determine what UI constructs it may generate.
        """

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BACKEND_URL}/api/v1/agents/uichips"
            )
            return response.json()
    
        return {status: False, message: "Error encountered in ui chips"}
    

    @function_tool()
    async def push_ui_interfacce(
        ctx: RunContext,
        chip_type: str,
        title: str,
        value: str = "",
        label: str = "",
        action_type: str = "",
        action_payload: str = "",
    ):
        """
        Push a UI interface to the frontend UI to show the user. Use get_ui_chips to know what you can generate.
        Fill rest of the details yourself if they are missing just pass in the values you think are relevant. 
        To show the user things use the card chp_type with nothing in actions.

        ARGS:
        - chip_type: UI element type ('card' | 'chip')
        - title: Title or label text
        - value: Optional displayed value for cards
        - label: Text for chip buttons
        - action_type: 'redirect' or 'copy'
        - action_payload: URL to the required page from below
        
        SUPPORTED ROUTES:
        dashboard: "/dashboard",
        account: "/dashboard/account",
        alerts: "/dashboard/alerts-notifications",
        cards: "/dashboard/card-management",
        deposits: "/dashboard/deposit-services",
        investments: "/dashboard/net-banking/investments",
        create_investment: "/dashboard/net-banking/investments/create",
        loans: "/dashboard/net-banking/loans",
        create_loan: "/dashboard/net-banking/loans/create",
        create_deposits: "/dashboard/net-banking/deposits",
        alerts_reminders: "/dashboard/alerts-notifications",
        settings: "/dashboard/settings"
        refresh: "refresh"

        """

        payload = {
            "ui_cards": [
                {
                    "type": chip_type,
                    "data": {
                        "title": title,
                        "value": value,
                        "label": label,
                    },
                    "actions": [
                        {
                            "type": action_type,
                            "payload": action_payload,
                        }
                    ],
                }
            ]
        }


        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BACKEND_URL}/api/v1/agents/uichips/{ctx.session.userdata.id}",
                json=payload,
            )
        return response.json()
