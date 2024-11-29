"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ChatUserSection from "./ChatUserSection";
import { GoPlus } from "react-icons/go";
import IconButton from "@mui/material/IconButton";
import { IoChatbubbleSharp } from "react-icons/io5";
import ChatIndividual from "./ChatIndividual";

const ChatContainer = () => {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");

  const handleOpen = (state: boolean) => {
    setOpen(state);
  };

  const handleText = (text: string) => {
    setText(text);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <IoChatbubbleSharp size={35} color="dimgray" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem] h-[50rem]">
        {open ? (
          <>
            <div className="flex gap-1 items-center">
              <DropdownMenuLabel className="text-2xl tracking-tight p-3">
                Messages
              </DropdownMenuLabel>
              <Button variant="outline" size="icon">
                <GoPlus />
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-3 p-3">
              <ChatUserSection onOpen={handleOpen} onText={handleText} />
            </div>{" "}
          </>
        ) : (
          <ChatIndividual onOpen={handleOpen} text={text} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatContainer;
