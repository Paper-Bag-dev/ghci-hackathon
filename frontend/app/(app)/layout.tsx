import React from "react";
import LiveKitUIProvider from "@/components/modals/LiveKItUIProvider";
import StreamLayout from "@/components/common/streamLayout";

const AgentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveKitUIProvider>
      <StreamLayout>{children}</StreamLayout>
    </LiveKitUIProvider>
  );
};

export default AgentLayout;
