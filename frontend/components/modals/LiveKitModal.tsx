"use client";

import { RoomAudioRenderer, RoomContext } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { UIAction, UICard, useAppContext } from "@/context";
import axios from "axios";
import LiveKitContent from "../LivekitCmp";
import StatisticsCard from "../shadcn-studio/blocks/statistics-card-01";
import { useRouter } from "next/navigation";
import { BrainIcon } from "lucide-react";

type LiveKitModalProps = {
  onClose: () => void;
  dockSide: "left" | "right";
};

export default function LiveKitModal({ onClose, dockSide }: LiveKitModalProps) {
  const { user, setUser, roomInstance, uiCards } = useAppContext();
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>();
  const [roomName, setRoomName] = useState("");
  const [username, setUserName] = useState("");

  const handleAction = (action: UIAction) => {
    if (!action) return;
    console.log("action: ", action)
    switch (action.type) {
      case "redirect": {
        console.log("Action tried: ", action.payload);
        const path = action.payload.startsWith("/")
          ? action.payload
          : `/${action.payload}`;
        router.push(path);
        break;
      }

      case "copy": {
        navigator.clipboard.writeText(action.payload);
        break;
      }

      default:
        console.warn("Unknown action type:", action.type);
    }
  };

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
        className={`fixed inset-0 z-[9999] flex ${sideAlign} pointer-events-none mb-4`}
      >
        <span className="flex-col mr-4">
          {uiCards.length > 0 && (
            <div className="w-[28rem] flex flex-col gap-3 mb-4 z-[9999]">
              {uiCards.map((card: UICard, index: number) => {
                const action = card.actions?.[0];
                console.log("Action: ", action)
                return (
                  <div
                    key={index}
                    className="slide-fade-in p-2 rounded-xl bg-white shadow-lg border border-gray-200"
                  >
                    {/* CARD UI */}
                    {card.type === "card" && (
                      <StatisticsCard
                        icon={<BrainIcon />}
                        value={card.data?.value ?? ""}
                        title={card.data?.title ?? ""}
                        changePercentage={String(
                          card.data?.changePercentage ?? "0"
                        )}
                      />
                    )}

                    {/* CHIP UI */}
                    {card.type === "chip" && (
                      <button
                        className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        onClick={() => action && handleAction(action)}
                      >
                        {card.data?.label ?? action?.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </span>

        <div
          className=" 
            pointer-events-auto
            w-[28rem] h-[40rem]
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
          </RoomContext.Provider>
        </div>
      </div>
    </>
  );
}
