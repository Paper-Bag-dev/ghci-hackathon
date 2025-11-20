from livekit.agents import Agent
# from tools.lookup_datetime import lookup_datetime
from controllers.account import account_tools

GENERIC_AGENT_INST = "You are a helpful assistant called Miluwakee. Respond to user queries concisely and accurately."

class GenericAssistant(Agent):
    def __init__(self, metadata: dict | None = None) -> None:
        self.metadata = metadata or {}

        super().__init__(
        instructions = f"""
            You are a helpful banking assistant called Choral.

            Here is the user's context (metadata):
            {self.metadata}

            Use this information when responding.
            Respond concisely and accurately.
            """,
        tools=account_tools,
        )
    
