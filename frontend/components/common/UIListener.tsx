"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  status: "active" | "completed";
}


export default function StreamListener() {
  const { user, isLoaded } = useUser();
  const { setReminders } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const userId = user.id;

    console.log("🔌 Connecting to SSE for user:", userId);

    const evt = new EventSource(`/api/stream/${userId}`);

    evt.onmessage = (e) => {
      const msg = e.data;
      console.log("📩 SSE MESSAGE:", msg);

      // 👉 NAVIGATION
      if (msg.startsWith("navigate:")) {
        const path = msg.replace("navigate:", "");
        console.log("➡️ Navigating to:", path);
        router.push(path);
        return;
      }

      // 👉 REMINDER RECEIVED
      if (msg.startsWith("reminder:")) {
        const jsonString = msg.replace("reminder:", "");

        try {
          const reminder = JSON.parse(jsonString);
          console.log("🆕 Adding reminder:", reminder);

          // add to reminders inside context
          setReminders((prev:Reminder[]) => [...prev, reminder]);
        } catch (err) {
          console.error("❌ Could not parse reminder JSON", err);
        }
      }
    };

    evt.onerror = (err) => {
      console.error("❌ SSE ERROR:", err);
    };

    return () => evt.close();
  }, [isLoaded, user, router, setReminders]);

  return null;
}
