from dotenv import load_dotenv
from livekit.agents import AgentServer, AgentSession, room_io
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit import agents, rtc
from agents.generic import GenericAssistant
import os

load_dotenv()

stt = os.getenv("STT")
llm = os.getenv("LLM")
tts = os.getenv("TTS")

server = AgentServer()

@server.rtc_session()
async def my_agent(ctx: agents.JobContext):
    session = AgentSession(
        stt=stt,
        llm=llm,
        tts=tts,
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
        )

    await session.start(
        room=ctx.room,
        agent=GenericAssistant(
            metadata={
                "name" : "Vikalp Sharma",
                "role" : "Your creator"
            }
        ),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: noise_cancellation.BVCTelephony() if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP else noise_cancellation.BVC(),
            ),
        ),
    )
    
    await session.generate_reply(
        instructions="Greet the user and explain who you are in a short manner."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)
