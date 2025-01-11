"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Memory, User } from "@prisma/client";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface MemoryCardProps {
  memories: Memory & {
    user: User;
  };
  batchId: number;
}

const MemoryCard2 = ({ memories, batchId }: MemoryCardProps) => {
  return (
    <Link href={`/class/${batchId}/memories/${memories.id}`}>
      <div className="flex flex-col gap-2 transition ease-out mb-3 overflow-hidden saturate-0 hover:saturate-100 hover:scale-95">
        {memories.image_url &&
        memories.image_url.toLowerCase().match(/\.(jpg|png|jpeg|gif)$/) ? (
          <img
            src={
              memories.image_url ? memories.image_url : "/default-profile.png"
            }
            className="object-cover"
          />
        ) : (
          <video src={memories.image_url} autoPlay loop muted />
        )}
        <Badge variant="outline" className="w-fit">
          {memories.category}
        </Badge>
        <div className="flex gap-2 items-center">
          <h1 className="tracking-tight font-bold text-3xl">
            {memories.title}
          </h1>
        </div>
        <div className="flex gap-2 justify-between items-center text-gray-600">
          <div className="flex gap-2 items-center">
            <Avatar className="w-5 h-5">
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
              {memories.user.first_name} {memories.user.last_name} •{" "}
              {convertDateShort(memories.date_posted)}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

const convertDateShort = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} minute(s) ago`;
    }
    return `${diffHours} hour(s) ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day(s) ago`;
  } else {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month(s) ago`;
  }
};

export default MemoryCard2;
