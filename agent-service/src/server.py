from dotenv import load_dotenv
from livekit.agents import AgentServer, AgentSession, room_io
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit import agents, rtc
from agents.generic import GenericAssistant
import os
import json

load_dotenv()

stt = os.getenv("STT")
llm = os.getenv("LLM")
tts = os.getenv("TTS")

server = AgentServer()

@server.rtc_session()
async def my_agent(ctx: agents.JobContext):
    # STEP 1: Check for participants and extract metadata FIRST
    user_participant = None
    user_data = None
    
    print("Agent ready, checking for participants...")
    
    if ctx.room.remote_participants:
        user_participant = next(iter(ctx.room.remote_participants.values()))
        print("Existing participant found:", user_participant)
        print("Participant metadata:", user_participant.metadata)
        
        # Parse the metadata
        if user_participant.metadata:
            try:
                user_data = json.loads(user_participant.metadata)
                print("Parsed user data:", user_data)
            except Exception as e:
                print("Could not parse metadata:", e)
    
    # STEP 2: Create session
    session = AgentSession(
        stt=stt,
        llm=llm,
        tts=tts,
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )
    
    # STEP 3: Start session with user data
    await session.start(
        room=ctx.room,
        agent=GenericAssistant(
            metadata={
                "name": "Vikalp Sharma",
                "role": "Your creator",
                "user_data": user_data  # Pass the extracted user data
            }
        ),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: noise_cancellation.BVCTelephony() 
                    if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP 
                    else noise_cancellation.BVC(),
            ),
        ),
    )
    
    # STEP 4: Set up event handler for future participants
    @ctx.room.on("participant_connected")
    def on_participant_connected(participant: rtc.RemoteParticipant):
        print(f"New participant connected: {participant.identity}")
        print(f"Participant metadata: {participant.metadata}")
    
    # STEP 5: Generate greeting
    await session.generate_reply(
        instructions="Greet the user and explain who you are in a short manner."
    )


if __name__ == "__main__":
    agents.cli.run_app(server)