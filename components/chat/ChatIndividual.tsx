"use client";
import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { Conversation, Message, User } from "@prisma/client";
import { createMessage, getMessages } from "@/utils/actions/chat";
import { Button } from "../ui/button";
import { IoArrowBack } from "react-icons/io5";

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
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center mb-4 gap-3">
        <IoArrowBack onClick={onBack} size={20} className="cursor-pointer"/>
        <h1 className="text-xl font-bold">
          {conversation.user[0].id === currentUser.id
            ? conversation.user[1].first_name
            : conversation.user[0].first_name}
        </h1>
      </div>
      {/* Messages Display */}
      <div className="border rounded-lg p-4 h-[35rem] overflow-y-auto mb-4 bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
        No messages yet. Start the conversation!
          </div>
        ) : (
          messages
        .slice()
        .sort((b, a) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded shadow max-w-[80%] ${
          message.senderId === currentUser.id
            ? "bg-white ml-auto self-end"
            : "bg-white self-start"
            }`}
          >
            <p className="break-words">{message.content}</p>
            <p className="text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        ))
        )}
      </div>

      {/* Input Form */}
      <div className="space-y-2">
        <form ref={formRef} action={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="content"
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
            required
          />
          <Button
            type="submit"
            className="w-full bg-black text-white p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatIndividual;
