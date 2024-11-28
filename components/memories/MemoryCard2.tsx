"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";
import { Memory, User } from "@prisma/client";
import Link from "next/link";

interface MemoryCardProps {
  memories: Memory & {
    user: User;
  };
  batchId: number;
}

const MemoryCard2 = ({ memories, batchId }: MemoryCardProps) => {
  return (
    <Link href={`/class/${batchId}/memories/${memories.id}`}>
      <div className="flex flex-col gap-2 rounded-xl transition ease-out break-inside-avoid mb-3">
        <img
          src={memories.image_url}
          className="max-w-full rounded-xl hover:opacity-90"
        />
        <div
          className="flex gap-2 justify-start items-center"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={
                memories.user.profile_picture
                  ? memories.user.profile_picture
                  : ""
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
    </Link>
  );
};

export default MemoryCard2;
