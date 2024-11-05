import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const getInitials = (name: string): string => {
  const words = name.trim().split(" ");
  const initials = words.map((word) => word[0].toUpperCase());
  return initials.slice(0, 2).join("");
};

const EventProfile = ({
  picture,
  username,
}: {
  picture: string;
  username: string;
}) => {
  return (
    <div className="flex justify-between items-center border-gray-200 bg-white border-[1px] p-5 rounded-lg w-[30rem]">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={picture} />
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
        <h1 className="text-lg tracking-tight">
          <span className="font-semibold">By </span>
          {username}
        </h1>
      </div>
      <Button>View Profile</Button>
    </div>
  );
};

export default EventProfile;
