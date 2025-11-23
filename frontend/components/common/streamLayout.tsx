"use client";
import React from "react";
import StreamListener from "./UIListener";

const StreamLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StreamListener />
      {children}
    </div>
  );
};

export default StreamLayout;
