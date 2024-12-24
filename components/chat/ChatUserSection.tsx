"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Conversation, Message, User } from "@prisma/client";
import Pusher from "pusher-js";
import { getInitials } from "@/lib/utils";
import { getMessages } from "@/utils/actions/chat";
import { Button } from "../ui/button";

interface ChatUserSectionProps {
  onConversation: (conversation: string) => void;
  conversation: Conversation & {
    user: User[];
    messages: Message[];
  };
  otherUser: User;
}

const ChatUserSection = ({
  onConversation,
  conversation,
  otherUser,
}: ChatUserSectionProps) => {
  const [messages, setMessages] = useState<string>();
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    if (!isFetched) {
      fetchInitialMessages();
      setIsFetched(true);
    }
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind(conversation.id, function (data: Message & { sender: User }) {
      setMessages(data.content);
    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, []);

  async function fetchInitialMessages() {
    try {
      const { messages: initialMessages, error } = await getMessages(
        conversation.id
      );
      if (initialMessages) {
        setMessages(initialMessages[0].content || "");
      } else if (error) {
        console.error("Error fetching messages:", error);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  return (
    <div
      className="flex gap-3 justify-start items-center hover:bg-muted p-2 rounded-md cursor-pointer"
      onClick={() => {
        onConversation(conversation.id);
      }}
    >
      <Avatar>
        <AvatarImage
          src={otherUser.profile_picture || ""}
          className="w-10 h-10"
        />
        <AvatarFallback>{getInitials(otherUser.first_name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="text-md font-semibold">
          {otherUser.first_name} {otherUser.last_name}
        </h3>
        <p className="text-sm text-muted-foreground">{messages}</p>
      </div>
    </div>
  );
};

export default ChatUserSection;
