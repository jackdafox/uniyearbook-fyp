"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ChatUserSection from "./ChatUserSection";
import { GoPlus } from "react-icons/go";
import IconButton from "@mui/material/IconButton";
import { IoChatbubbleSharp } from "react-icons/io5";
import ChatIndividual from "./ChatIndividual";
import { Conversation, Message, User } from "@prisma/client";

interface ChatContainerProps {
  currentUser: User & {
    conversations: (Conversation & {
      user: User;
      messages: Message[];
    })[];
  };
}

const ChatContainer = ({ currentUser }: ChatContainerProps) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const handleConversation = (conversation: Conversation) => {
    setConversation(conversation);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <IoChatbubbleSharp size={35} color="dimgray" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem] h-[50rem]">
        {conversation === null ? (
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
              {currentUser.conversations.map((conversation) => (
                <ChatUserSection
                  key={conversation.id}
                  onConversation={handleConversation}
                  conversation={conversation}
                />
              ))}
            </div>
          </>
        ) : (
          <></>
          // <ChatIndividual text={text}  />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatContainer;
