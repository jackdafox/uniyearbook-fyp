"use client";
import React, { useEffect, useState } from "react";
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
import Pusher from "pusher-js";
import { set } from "date-fns";

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
  const [conversationList, setConversationList] = useState<
    (Conversation & {
      user: User[];
      messages: (Message & { sender: User })[];
    })[]
  >(currentUser.conversations);

  // useEffect(() => {
  //   setConversationList(currentUser.conversations);
  //   const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  //     cluster: "ap1",
  //   });

  //   const channel = pusher.subscribe("chat");
  //   channel.bind(
  //     conversation.id,
  //     function (
  //       data: Conversation & {
  //         user: User[];
  //         messages: (Message & { sender: User })[];
  //       }
  //     ) {
  //       setConversationList((prev) => {
  //         if (prev && prev.some((msg) => msg.id === data.id)) {
  //           return prev;
  //         }
  //         return [{ ...data }, ...(prev || [])];
  //       });
  //     }
  //   );

  //   return () => {
  //     pusher.unsubscribe("chat");
  //     pusher.disconnect();
  //   };
  // }, []);

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
            </div>
            <DropdownMenuSeparator />
            {userList !== undefined && (
              <div className="p-2">
                <CreateChatDialog users={userList} />
              </div>
            )}
            <div className="flex flex-col gap-3 p-3">
              {conversationList && conversationList.length > 0 ? (
                conversationList.map((conversation) => (
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
                <h1>Create a conversation to start chatting!</h1>
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
