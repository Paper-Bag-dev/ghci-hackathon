"use client";

import {
  BarVisualizer,
  useVoiceAssistant,
  useLocalParticipant,
  useTranscriptions,
  ControlBar,
  Chat,
  ChatEntry,
  useChat,
} from "@livekit/components-react";
import type {
  ChatMessage,
  ReceivedChatMessage,
} from "@livekit/components-core";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context";
interface ChatUIProps {
  chatMessages: ChatMessage[];
  send: (msg: string) => Promise<ReceivedChatMessage>;
  isSending: boolean;
  username: string;
}

export default function LiveKitContent({ username }: { username: string }) {
  const { setAgentAudioTrack, setMainState } = useAppContext();
  const { state, audioTrack, agent } = useVoiceAssistant();
  const { localParticipant } = useLocalParticipant();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState("");
  const { chatMessages, send, isSending } = useChat();
  const transcriptions = useTranscriptions({
    participantIdentities: [
      ...(agent?.identity ? [agent.identity] : []),
      localParticipant.identity,
    ],
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    transcriptions.push({
      participantInfo: {identity: localParticipant.identity},
      streamInfo: "custom",
      text: text,
    });
    await send(text);
    setText("");
  };

  useEffect(() => {
    if (audioTrack) {
      setAgentAudioTrack(audioTrack);
    }
    setMainState(state);
  }, [audioTrack, state]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTo({
        top: node.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [transcriptions]);
  return (
    <div className="flex flex-col h-full w-full ">
      {/* Visualizer */}
      <div className="border-b border-gray-300 flex items-center justify-center flex flex-col">
        <BarVisualizer
          barCount={7}
          state={state}
          track={audioTrack}
          style={{
            height: "6rem",
            width: "100%",
          }}
        />
        <div className="">
          <ControlBar
            variation="verbose"
            data-lk-theme="control"
            controls={{
              microphone: true,
              camera: false,
              screenShare: false,
              leave: true, // LiveKit will handle disconnect
            }}
          />
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-1 overflow-hidden pt-4">
        {/* <ChatUI
          chatMessages={chatMessages}
          send={send}
          isSending={isSending}
          username={username}
        /> */}
        <div
          className="flex flex-col h-full overflow-y-auto px-4 py-2"
          ref={scrollRef}
        >
          {transcriptions.map((transcription, ind) => {
            const isAgent =
              transcription.participantInfo.identity.startsWith("agent");
            return (
              <div
                key={ind}
                className={`w-full flex my-2 ${
                  isAgent ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-xl ${
                    isAgent
                      ? "bg-[#ecf3ff] text-black"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <strong>
                    {isAgent
                      ? "Choral"
                      : transcription.participantInfo.identity}
                    :
                  </strong>
                  <p className="mt-1 whitespace-pre-wrap">
                    {transcription.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <form className="flex items-center gap-2 p-2" onSubmit={handleSend}>
          <input
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
            type="text"
            placeholder="Type a message..."
            value={text}
            disabled={isSending}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isSending}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
