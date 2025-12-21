"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Room } from "livekit-client";

const AppContext = createContext<any>(null);

export interface UIAction {
  type: "redirect" | "copy" | string;
  label: string;
  payload: string;
}

export interface UICard {
  type: "card" | "chip";
  data: {
    title?: string;
    value?: string;
    changePercentage?: number;
    label?: string;
  };
  actions?: UIAction[];
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  status: "active" | "completed";
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    title: "Loan EMI Payment",
    description: "Pay monthly loan EMI for home loan",
    date: "2025-01-01",
    time: "09:00",
    type: "payment",
    status: "active",
  },
  {
    id: "2",
    title: "Investment Review",
    description: "Review quarterly investment portfolio performance",
    date: "2025-01-15",
    time: "14:00",
    type: "review",
    status: "active",
  },
  {
    id: "3",
    title: "Credit Card Bill",
    description: "Pay credit card bill before due date",
    date: "2025-01-10",
    time: "10:00",
    type: "payment",
    status: "active",
  },
];

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [mainState, setMainState] = useState(undefined);
  const [agentAudioTrack, setAgentAudioTrack] = useState(undefined);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [uiCards, setUICards] = useState<UICard[]>([]);

  const [roomInstance, setRoomInstance] = useState<Room | null>(null);

  useEffect(() => {
    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
    });
    setRoomInstance(room);

    return () => {
      room.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        mainState,
        setMainState,
        agentAudioTrack,
        setAgentAudioTrack,
        roomInstance,
        reminders,
        setReminders,
        uiCards,
        setUICards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
