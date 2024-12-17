"use client";
import Image from "next/image";
import Logo from "../image/Logo.png";
import Searchbar from "@/components/search/Searchbar";
import Link from "next/link";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ChatContainer from "../chat/ChatContainer";
import { Conversation, User, Message } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "@mui/material";
import { getInitials } from "@/lib/utils";

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
      <div className="md:hidden flex-1 w-fit">
        <Searchbar />
      </div>
      <div className="hidden md:block md:w-full px-4 lg:px-2">
        <Searchbar />
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-2">
        <div className="md:hidden">
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
        </div>

        <div className="hidden md:block">
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
        </div>
        <Link href="/event/create" className="hidden md:flex items-center">
        <IconButton className="w-8 h-8 md:w-10 md:h-10">
          <EditCalendarIcon
          sx={{
            width: { xs: 24, md: 30 },
            height: { xs: 24, md: 30 },
            color: "dimgray",
          }}
          />
        </IconButton>
        </Link>
        <Link href="/profile" className="flex items-center">
        <Avatar className="w-8 h-8 md:w-10 md:h-10">
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
