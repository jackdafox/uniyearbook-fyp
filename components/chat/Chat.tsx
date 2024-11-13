"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

export default function Chat({
  roomId,
  userId,
}: {
  roomId: string;
  userId: number;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socketInitializer();
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");
    socket = io();

    socket.emit("join-room", roomId);

    socket.on("new-message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send-message", {
        content: message,
        userId,
        roomId,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold">{msg.user.first_name}:</span>
            <span className="ml-2">{msg.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
      </form>
    </div>
  );
}
