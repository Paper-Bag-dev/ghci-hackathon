from dotenv import load_dotenv
from livekit.agents import AgentServer, AgentSession, room_io
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit import agents, rtc
from agents.generic import GenericAssistant
from dataclass.session_info import MySessionInfo
from livekit.agents.voice.room_io import TextInputEvent
import os
import json

load_dotenv()

stt = os.getenv("STT")
llm = os.getenv("LLM")
tts = os.getenv("TTS")

server = AgentServer()

@server.rtc_session()
async def my_agent(ctx: agents.JobContext):
    session = AgentSession[MySessionInfo](
        stt=stt,
        llm=llm,
        tts=tts,
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
        userdata=MySessionInfo()
        )
    
    @ctx.room.on("participant_connected")
    def on_participant_connected(participant: rtc.RemoteParticipant):
            metadata = json.loads(participant.metadata)
            
            # Extract the clerk ID
            clerk_id = metadata.get("clerk", {}).get("id")
            
            if clerk_id:
                session.userdata.id = clerk_id
                print(f"Updated session with clerk ID: {clerk_id}")
            print(f"Updated session with clerk ID: {session.userdata.id}")


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
        
        # room_input_options=room_io.RoomInputOptions(
        #     text_input_cb=custom_text_input_handler
        # )
    )

    
    
    await session.generate_reply(
        instructions="Greet the user and explain who you are in a short manner."
    )

# def custom_text_input_handler(session: AgentSession, event: TextInputEvent) -> None:
#     # Access the incoming text message
#     message = event.text

#     # Handle commands
#     print(event.text)

if __name__ == "__main__":
    agents.cli.run_app(server)
