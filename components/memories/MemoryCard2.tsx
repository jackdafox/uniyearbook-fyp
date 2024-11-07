"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";

const redirect = () => {
  console.log("Redirecting to user's profile");
};

const MemoryCard2 = () => {
  return (
    <div className="flex flex-col gap-2 hover:bg-zinc-50 p-3 rounded-xl transition ease-out">
      <img
        src="https://www.cultura.id/wp-content/uploads/2023/11/Daniel-Caesar-Never-Enough.jpg"
        className="min-h-52 min-w-52 max-h-48 max-w-96 rounded-xl"
      />
      <div
        className="flex gap-2 justify-start items-center"
        onClick={() => redirect}
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src="picture" />
          <AvatarFallback>{getInitials("username")}</AvatarFallback>
        </Avatar>
        <h1 className="text-sm font-semibold">"username"</h1>
      </div>
    </div>
  );
};

export default MemoryCard2;
