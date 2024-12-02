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
import CreateChatDialog from "./CreateChatDialog";

interface ChatContainerProps {
  currentUser: User & {
    conversations: (Conversation & {
      user: User[];
      messages: (Message & { sender: User })[];
    })[];
  };
  userList: User[];
}

const ChatContainer = ({ currentUser, userList }: ChatContainerProps) => {
  const [conversation, setConversation] = useState<
    | (Conversation & {
        user: User[];
        messages: (Message & { sender: User })[];
      })
    | null
  >(null);

  const handleConversation = (conversationId: string) => {
    const conversation = currentUser.conversations.find(
      (conv) => conv.id === conversationId
    );
    setConversation(conversation || null);
  };

  const handleBack = () => {
    setConversation(null);
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
            {userList !== undefined && <CreateChatDialog users={userList} />}
            <div className="flex flex-col gap-3 p-3">
              {currentUser.conversations.length > 1 ? (
                currentUser.conversations.map((conversation) => (
                  <ChatUserSection
                    key={conversation.id}
                    onConversation={handleConversation}
                    conversation={conversation}
                    otherUser={
                      conversation.user[0].id === currentUser.id
                        ? conversation.user[1]
                        : conversation.user[0]
                    }
                  />
                ))
              ) : (
                <h1>No conversations</h1>
              )}
            </div>
          </>
        ) : (
          <ChatIndividual
            conversation={conversation}
            currentUser={currentUser}
            onBack={handleBack}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatContainer;
