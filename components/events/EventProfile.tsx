import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const EventProfile = () => {
  return (
    <div className="flex justify-between items-center border-gray-200 bg-white border-[1px] p-5 rounded-lg w-[30rem]">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>"IF NOT AVATAR"</AvatarFallback>
        </Avatar>
        <h1 className="text-lg tracking-tight">
          <span className="font-semibold">By </span>Averton
        </h1>
      </div>
      <Button>View Profile</Button>
    </div>
  );
};

export default EventProfile;
