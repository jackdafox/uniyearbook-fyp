import { getInitials } from "@/components/events/EventProfile";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";

const page = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-200 rounded-xl ">
          <div className="flex gap-3 justify-center items-center p-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{getInitials("Jaki")}</AvatarFallback>
            </Avatar>
            <SlArrowDown size={15}/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <div className="flex gap-3 py-5 justify-center items-center">
              <Avatar className="h-full">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{getInitials("Jaki")}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1>Jakii</h1>
                <h1 className="text-zinc-400">server8868@gmail.com</h1>
              </div>
              <FaCheck className="ml-5"/>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Class</DropdownMenuItem>
          <DropdownMenuItem>Create Event</DropdownMenuItem>
          <DropdownMenuItem>Messages</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default page;
