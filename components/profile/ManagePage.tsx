"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import EventManagePage from "../events/EventManagePage";
import { Comment, Event, Memory, Participant, User } from "@prisma/client";
import MemoryManage from "../memories/MemoryManage";

interface ManagePageProps {
  events: (Event & {
    participant: (Participant & { User: User })[];
    comments: (Comment & { User: User })[];
  })[];
  memories: (Memory & {
    comment: (Comment & { User: User })[];
  })[];
}

const ManagePage = ({ events, memories }: ManagePageProps) => {
  const [buttonState, setButtonState] = useState("Events");
  return (
    <div className="flex flex-col md:flex-row w-full px-4 md:px-14 md:mt-24">
      <div className="flex flex-row md:flex-col gap-3 border-b md:border-b-0 md:border-r p-4 md:px-10">
        <Button
          className={`${
            buttonState === "Events"
              ? "bg-zinc-800 text-white"
              : "bg-zinc-100 text-black hover:text-white"
          } w-full`}
          onClick={() => setButtonState("Events")}
        >
          Events
        </Button>
        <Button
          className={`${
            buttonState === "Memory"
              ? "bg-zinc-800 text-white"
              : "bg-zinc-100 text-black hover:text-white"
          } w-full`}
          onClick={() => setButtonState("Memory")}
        >
          Memories
        </Button>
      </div>
      <div className="w-full pt-7 md:pt-0">
        {buttonState === "Events" ? (
          <EventManagePage
            events={events.map((event) => ({
              ...event,
              participant: event.participant,
              comments: event.comments,
            }))}
          />
        ) : (
          <MemoryManage
            memories={memories.map((memory) => ({
              ...memory,
              comment: memory.comment,
            }))}
          />
        )}
      </div>
    </div>
  );
};

export default ManagePage;
