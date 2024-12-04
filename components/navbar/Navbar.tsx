"use client";
import Image from "next/image";
import Logo from "../image/Logo.png";
import Searchbar from "@/components/search/Searchbar";
import Link from "next/link";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ChatContainer from "../chat/ChatContainer";
import { Conversation, User, Message } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";
import { IconButton } from "@mui/material";

interface NavbarProps {
  currentUser: User & {
    conversations: (Conversation & {
      user: User[];
      messages: (Message & { sender: User })[];
    })[];
  };
  userList: User[];
}

export default function Navbar({ currentUser, userList }: NavbarProps) {
  return (
    <nav className="w-full fixed z-[50] bg-white">
      <div className="flex px-5 py-2 items-center">
        <Link href="/">
          <Image
            src={Logo}
            width={150}
            height={150}
            alt="Logo"
            className="cursor-pointer"
          />
        </Link>
        <Searchbar />
        <div className="ml-auto flex items-center space-x-4">
          <ChatContainer
            currentUser={{
              ...currentUser,
              conversations: (currentUser?.conversations ?? []).map(
                (conversation) => ({
                  ...conversation,
                  user: conversation.user.map((user) => ({
                    ...user,
                  })),
                  messages: conversation.messages.map((message) => ({
                    ...message,
                    sender: {
                      ...message.sender,
                    },
                  })),
                })
              ),
            }}
            userList={userList ? userList.map((user) => ({ ...user })) : []}
          />
          <Link href="/event/create">
            <IconButton>
              <EditCalendarIcon
                sx={{
                  width: 35,
                  height: 35,
                  color: "dimgray",
                }}
              />
            </IconButton>
          </Link>
          <Link href="/profile">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser.profile_picture || ""} />
              <AvatarFallback>
                {getInitials(currentUser.first_name)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
}
