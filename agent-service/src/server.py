from dotenv import load_dotenv
from livekit.agents import AgentServer, AgentSession, room_io, JobContext
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit import agents, rtc
from agents.generic import GenericAssistant
from dataclass.session_info import MySessionInfo
import logging
import os

load_dotenv()

stt = os.getenv("STT")
llm = os.getenv("LLM")
tts = os.getenv("TTS")

logger = logging.getLogger("my-worker")
server = AgentServer()




@server.rtc_session()
async def my_agent(ctx: agents.JobContext):    
    async def participant_task_1(ctx, p):
        import json

        logger.info(f"populating user metadata raw: {p.metadata}")

        md = json.loads(p.metadata or "{}")
        clerk = md.get("clerk", {})

        session.userdata.firstname = clerk.get("firstName", "")
        session.userdata.lastname  = clerk.get("lastName", "")
        session.userdata.id        = clerk.get("id", "")

        logger.info(f"Session userdata populated: {session.userdata}")


    ctx.add_participant_entrypoint(entrypoint_fnc=participant_task_1)

    session = AgentSession[MySessionInfo](
        stt=stt,
        llm=llm,
        tts=tts,
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
        userdata=MySessionInfo(),
        )

    await session.start(
        room=ctx.room,
        agent=GenericAssistant(),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: noise_cancellation.BVCTelephony() if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP else noise_cancellation.BVC(),
            ),
        ),
    )

if __name__ == "__main__":
    agents.cli.run_app(server)
