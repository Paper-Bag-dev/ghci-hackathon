"use client";

import {
  ControlBar,
  RoomAudioRenderer,
  RoomContext,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import axios from "axios";
import LiveKitContent from "../LivekitCmp";

type LiveKitModalProps = {
  onClose: () => void;
  dockSide: "left" | "right";
};

export default function LiveKitModal({ onClose, dockSide }: LiveKitModalProps) {
  const { user, setUser, roomInstance } = useAppContext();

  const [token, setToken] = useState<string | undefined>();
  const [roomName, setRoomName] = useState("");
  const [username, setUserName] = useState("");

  /** Fetch user, set roomName and username */
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/protected/user`,
          { withCredentials: true }
        );
        setUser(data.user);
        setRoomName(data.user.clerk.id);
        setUserName(data.user.clerk.firstName);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  /** Connect to LiveKit using global room instance */
  useEffect(() => {
    if (!roomInstance) return;

    let mounted = true;

    (async () => {
      try {
        if (!user) return;

        const resp = await fetch(
          `/api/token?room=${roomName}&username=${username}&userData=${encodeURIComponent(
            JSON.stringify(user)
          )}`
        );
        const data = await resp.json();

        if (!mounted) return;

        if (data.token) {
          await roomInstance.connect(
            process.env.NEXT_PUBLIC_LIVEKIT_URL!,
            data.token
          );
          // await roomInstance.localParticipant.sendText(`${user}`, {
          //   topic: "metadata",
          // });
          setToken(data.token);
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      // IMPORTANT: Do NOT disconnect on modal close
      mounted = false;
    };
  }, [roomInstance, roomName, user, username]);

  if (!roomInstance) return <div>Loading room instance…</div>;
  if (!token) return <div>Loading connection…</div>;

  const sideAlign =
    dockSide === "right"
      ? "items-end justify-end pr-6"
      : "items-end justify-start pl-6";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9999] flex ${sideAlign} pb-6 pointer-events-none`}
      >
        <div
          className="
            pointer-events-auto
            w-[28rem] h-[16rem]
            rounded-2xl border border-border
            bg-white
            shadow-2xl 
            p-4 
            flex flex-col 
            relative
            transform
            origin-bottom
            transition-transform transition-opacity
            duration-200
            ease-out
            animate-[fadeIn_0.2s_ease-out]
            lk-modal
          "
          data-lk-theme="custom"
        >
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 
              px-2 py-1 
              rounded-md 
              text-xs
              text-gray-500 hover:text-gray-700
              hover:bg-gray-100
            "
          >
            ✕
          </button>

          <RoomContext.Provider value={roomInstance}>
            <RoomAudioRenderer />
            <LiveKitContent username={username} />

            <div className="pt-3">
              <ControlBar
                variation="minimal"
                data-lk-theme="control"
                controls={{
                  microphone: true,
                  camera: false,
                  screenShare: false,
                  leave: true, // LiveKit will handle disconnect
                }}
              />
            </div>
          </RoomContext.Provider>
        </div>
      </div>
    </>
  );
}
