import React from "react";
import { IoChatbubbleSharp } from "react-icons/io5";
import { Button } from "../ui/button";

const ChatIndividual = ({ onOpen, text }: { onOpen: (state: boolean) => void, text: string }) => {
  return (
    <Button variant="outline" size="icon" onClick={() => onOpen(true)}>
      <IoChatbubbleSharp size={35} color="dimgray" />
      <h1>{text}</h1>
    </Button>
  );
};

export default ChatIndividual;
