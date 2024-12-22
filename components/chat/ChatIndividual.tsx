"use client";
import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { Conversation, Message, User } from "@prisma/client";
import { createMessage, getMessages } from "@/utils/actions/chat";
import { Button } from "../ui/button";
import { IoArrowBack, IoLogoWechat } from "react-icons/io5";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

interface ChatIndividualProps {
  onBack: () => void;
  conversation: Conversation & {
    user: User[];
    messages: (Message & {
      sender: User;
    })[];
  };
  currentUser: User;
}

const ChatIndividual = ({
  onBack,
  conversation,
  currentUser,
}: ChatIndividualProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<(Message & { sender: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInitialMessages();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind(conversation.id, function (data: Message & { sender: User }) {
      // Check if message already exists to prevent duplicates
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === data.id)) {
          return prev;
        }
        return [
          { ...data, createdAt: new Date(data.createdAt), sender: data.sender },
          ...prev,
        ];
      });
    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, []);

  async function fetchInitialMessages() {
    setIsLoading(true);
    try {
      const { messages: initialMessages, error } = await getMessages(
        conversation.id
      );
      if (initialMessages) {
        setMessages(
          initialMessages.map((message: Message & { sender: User }) => ({
            ...message,
            createdAt: new Date(message.createdAt),
            sender: message.sender,
          }))
        );
      } else if (error) {
        console.error("Error fetching messages:", error);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    const content = formData.get("content")?.toString().trim();
    if (!content) return;

    // Create optimistic message
    const optimisticMessage: Message & { sender: User } = {
      id: Math.random().toString(36).substring(2, 9),
      content: content,
      conversationId: conversation.id,
      createdAt: new Date(),
      senderId: currentUser.id,
      sender: currentUser,
    };

    try {
      const { message, error } = await createMessage({
        formData,
        conversationID: conversation.id,
      });

      if (error) {
        console.error("Error sending message:", error);
        // Remove optimistic message on error
        setMessages((prev) =>
          prev.filter((m) => m.id !== optimisticMessage.id)
        );
        return;
      }

      if (message) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id
              ? {
                  ...message,
                  createdAt: new Date(message.createdAt),
                  sender: currentUser,
                }
              : msg
          )
        );
      }

      formRef.current?.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
    }
  }
  return (
    <div className="p-2 sm:p-4 w-full max-w-2xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center mb-4 gap-3">
        <IoArrowBack onClick={onBack} size={20} className="cursor-pointer" />
        <Link
          href={`/profile/${
            conversation.user[0].id === currentUser.id
              ? conversation.user[1].id
              : conversation.user[0].id
          }`}
          passHref
        >
          <h1 className="text-lg sm:text-xl font-bold">
            {conversation.user[0].id === currentUser.id
              ? conversation.user[1].first_name
              : conversation.user[0].first_name}
          </h1>
        </Link>
      </div>
      {/* Messages Display */}
      <div className="border rounded-lg p-2 sm:p-4 flex-1 overflow-y-auto mb-4 bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center text-center pt-32 sm:pt-60 text-zinc-300">
            <IoLogoWechat size={40} className="sm:text-[50px]" />
            <h1 className="tracking-tight text-sm sm:text-base max-w-48">
              Send a message to start chatting!
            </h1>
          </div>
        ) : (
          messages
            .slice()
            .sort(
              (b, a) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.senderId === currentUser.id
                    ? " justify-end"
                    : " justify-start"
                }`}
              >
                <Avatar className={`w-7 h-7 ${
                  message.senderId === currentUser.id
                    ? "order-last"
                    : "order-first"
                }`}>
                  <AvatarImage
                    src={
                      message.sender.profile_picture
                        ? message.sender.profile_picture
                        : ""
                    }
                  />
                  <AvatarFallback>
                    {getInitials(message.sender.first_name)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mb-2 p-2 rounded shadow max-w-[85%] sm:max-w-[80%] text-sm sm:text-base`}
                >
                  <p className="break-words">{message.content}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Input Form */}
      <div className="sticky bottom-0 bg-white pt-2">
        <form ref={formRef} action={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="content"
            placeholder="Type a message..."
            className="w-full p-2 border rounded text-sm sm:text-base"
            required
          />
          <Button
            type="submit"
            className="w-full bg-black text-white p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatIndividual;
