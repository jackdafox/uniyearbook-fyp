"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "@prisma/client";
import { getInitials } from "@/lib/utils";

interface EventProfileProps {
  user: User;
  className?: string;
}

const EventProfile = ({ user, className }: EventProfileProps) => {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center border-gray-200 bg-white border-[1px] p-5 rounded-lg w-full max-w-[30rem] gap-4 sm:gap-0 ${className}`}
    >
      <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.profile_picture || ""} />
        <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
      </Avatar>
      <h1 className="text-lg tracking-tight">
        {user.first_name} {user.last_name}
      </h1>
      </div>
      <Link href={`/profile/${user.id}`}>
      <Button>View Profile</Button>
      </Link>
    </div>
  );
};



export default EventProfile;
