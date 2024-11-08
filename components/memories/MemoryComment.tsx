import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const MemoryComment = () => {
  return (
    <div className="flex flex-col gap-3 max-w-96">
      <div className="flex gap-3 justify-start items-center">
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-[0.8rem] font-bold">Username</h1>
      </div>
      <p>
        Join us for an unforgettable evening with WIM, the acclaimed artist
        behind a distinctive blend of indie, soul, and electronic music. As part
        of his NOICE Asia Tour 2024, WIM will be performing live at Bentley
        Music Auditorium on 6 November at 8PM.
      </p>
    </div>
  );
};

export default MemoryComment;
