import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Conversation, Message, User } from "@prisma/client";
import { getInitials } from "../events/EventProfile";

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
  const messages = conversation.messages;
  const user = conversation.user;
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
        <p className="text-sm text-muted-foreground">
          {messages[messages.length - 1].content}
        </p>
      </div>
    </div>
  );
};

export default ChatUserSection;
