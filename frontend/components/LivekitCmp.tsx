"use client";

import {
  BarVisualizer,
  useVoiceAssistant,
  useLocalParticipant,
  useChat,
  useTranscriptions,
} from "@livekit/components-react";
import type {
  ChatMessage,
  ReceivedChatMessage,
} from "@livekit/components-core";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

interface ChatUIProps {
  chatMessages: ChatMessage[];
  send: (msg: string) => Promise<ReceivedChatMessage>;
  isSending: boolean;
  username: string;
}

export default function LiveKitContent({ username }: { username: string }) {
  const { mainState, agentAudioTrack, setAgentAudioTrack, setMainState } =
    useAppContext();
  const { state, audioTrack } = useVoiceAssistant();
  // const {localParticipant} = useLocalParticipant();
  useTranscriptions({});

  const { chatMessages, send, isSending } = useChat();

  useEffect(() => {
    if (agentAudioTrack && audioTrack && !mainState) {
      setAgentAudioTrack(audioTrack);
      setMainState(state);
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Visualizer */}
      <div className="border-b border-gray-300 flex items-center justify-center">
        <BarVisualizer
          barCount={7}
          state={state}
          track={audioTrack}
          style={{
            height: "6rem",
            width: "100%",
            color: "blue",
          }}
        />
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-1 overflow-hidden pt-4">
        <ChatUI
          chatMessages={chatMessages}
          send={send}
          isSending={isSending}
          username={username}
        />
      </div>
    </div>
  );
}

function ChatUI({ chatMessages, send, isSending, username }: ChatUIProps) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {chatMessages.map((msg) => {
          const isSelf = msg.message.startsWith("[user]");

          return (
            <div key={msg.timestamp} className="text-sm">
              <strong>{!isSelf ? username : "Assistant"}:</strong>{" "}
              {msg.message.replace("[user]", "")}
            </div>
          );
        })}
      </div>

      {/* Input + Send */}
      {/* <div className="border-t flex gap-2 items-center p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="
            flex-grow px-3 py-2 
            border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        <button
          disabled={isSending || input.trim().length === 0}
          onClick={async () => {
            await send(input.trim());
            setInput("");
          }}
          className="
            px-4 py-2 rounded-lg 
            bg-[#dbe9ff] text-white 
            disabled:bg-gray-400
            hover:cursor-pointer
          "
        >
          Send
        </button>
      </div> */}
    </div>
  );
}
