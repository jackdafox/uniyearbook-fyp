import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";
import { Card } from "../ui/card";

const StudentSearchCard = () => {
  return (
    <Card className="p-3 hover:bg-zinc-100 cursor-pointer">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{getInitials("Jaki")}</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold mt-5">Jaki</h1>
        <h2 className="text-md text-zinc-400 text-center">Faculty of Computer Science</h2>
        <h2 className="text-md text-zinc-400 text-center">Multimedia Computing</h2>
        <h2 className="text-md font-semibold text-center mt-5">2021/2022</h2>
      </div>
    </Card>
  );
};

export default StudentSearchCard;
