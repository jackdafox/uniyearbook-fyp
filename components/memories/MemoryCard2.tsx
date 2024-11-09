"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";

const redirect = () => {
  console.log("Redirecting to user's profile");
};

const MemoryCard2 = () => {
  return (
    <div className="flex flex-col gap-2 rounded-xl transition ease-out break-inside-avoid mb-3">
      <img
        src="https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg"
        className="max-w-full rounded-xl hover:opacity-90"
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
