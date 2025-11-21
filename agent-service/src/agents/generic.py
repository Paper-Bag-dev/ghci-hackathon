from livekit.agents import Agent
from tools.lookup_datetime import lookup_datetime

GENERIC_AGENT_INST = "You are a helpful assistant called Miluwakee. Respond to user queries concisely and accurately."

class GenericAssistant(Agent):
    def __init__(self, metadata: dict | None = None) -> None:
        self.metadata = metadata or {}

        super().__init__(
        instructions = f"""
            You are a helpful assistant called Milwaukee.

            Here is the user's context (metadata):
            {self.metadata}

            Use this information when responding.
            Respond concisely and accurately.
            """,
        tools=[lookup_datetime]
        )
    
