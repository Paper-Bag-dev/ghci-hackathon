"use client";

import { RoomAudioRenderer, RoomContext } from "@livekit/components-react";
import { Room } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import LiveKitModal from "@/components/modals/LiveKitModal";
import axios from "axios";

export default function RoomPage() {
  const { user } = useAppContext();
  const [token, setToken] = useState<string>();
  const [dispatchDone, setDispatchDone] = useState(false);

  const room = `session-${Date.now()}`;
  const name = `quickstart-user`;

  const [roomInstance, setRoomInstance] = useState<Room | undefined>(undefined);
  const [open, setOpen] = useState(true);

  // Create livekit room instance
  useEffect(() => {
    const room = new Room({ adaptiveStream: true, dynacast: true });
    setRoomInstance(room);

    return () => {
      room.disconnect();
    };
  }, []);

  // Connect to LiveKit + dispatch agent
  useEffect(() => {
    if (!roomInstance) return;

    let mounted = true;

    (async () => {
      try {
        // 1. Request LiveKit token from Node backend
        const resp = await fetch(
          `/api/token?room=test-effect&username=Reno&userData=${encodeURIComponent(
            JSON.stringify(user)
          )}`
        );
        const data = await resp.json();

        if (!mounted) return;

        if (data.token) {
          // 2. Connect to room
          await roomInstance.connect(
            process.env.NEXT_PUBLIC_LIVEKIT_URL!,
            data.token
          );
          setToken(data.token);

          if (!dispatchDone) {
            await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/protected/user/dispatch`,
              {
                room,
                user,
              },
              { withCredentials: true }
            );

            setDispatchDone(true);
            console.log("Agent dispatched!");
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [roomInstance]);

  if (!roomInstance) return <div>Loading room instance…</div>;
  if (!token) return <div>Loading connection…</div>;

  return (
    <RoomContext.Provider value={roomInstance}>
      <div data-lk-theme="default" style={{ height: "100dvh" }}>
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setOpen(true)}
          >
            Open Voice Assistant
          </button>

          {/* <LiveKitModal onClose={() => setOpen(false)} /> */}
        </div>
      </div>
    </RoomContext.Provider>
  );
}
