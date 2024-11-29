import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChatUserSection = ({
  onOpen,
  onText,
}: {
  onOpen: (state: boolean) => void;
  onText: (text: string) => void;
}) => {
  return (
    <div
      className="flex gap-3 justify-start items-center hover:bg-muted p-2 rounded-md cursor-pointer"
      onClick={() => {
        onOpen(false), onText("waw");
      }}
    >
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="w-10 h-10"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="text-md font-semibold">Joshua</h3>
        <p className="text-sm text-muted-foreground">Your personal assistant</p>
      </div>
    </div>
  );
};

export default ChatUserSection;
