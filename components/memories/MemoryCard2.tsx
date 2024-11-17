"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";
import { Memory, User } from "@prisma/client";

interface MemoryCardProps {
  memories: Memory & {
    user: User;
  };
}

const MemoryCard2 = ({ memories }: MemoryCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl transition ease-out break-inside-avoid mb-3">
      <img
        src="https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg"
        className="max-w-full rounded-xl hover:opacity-90"
      />
      <div
        className="flex gap-2 justify-start items-center"
        // onClick={(url) => redirect}
      >
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              memories.user.profile_picture ? memories.user.profile_picture : ""
            }
          />
          <AvatarFallback>
            {getInitials(memories.user.first_name)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-sm font-semibold">
          {memories.user.first_name} {memories.user.last_name}
        </h1>
      </div>
    </div>
  );
};

export default MemoryCard2;
