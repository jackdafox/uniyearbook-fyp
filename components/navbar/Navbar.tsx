"use client";
import Image from "next/image";
import Logo from "../image/Logo.png";
import Searchbar from "@/components/search/Searchbar";
import Link from "next/link";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ChatContainer from "../chat/ChatContainer";
import { Conversation, User, Message, Student } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "@mui/material";
import { getInitials } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { IoMdMenu } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa";
import { PiStudent, PiStudentBold } from "react-icons/pi";
import { FaCalendar, FaGear } from "react-icons/fa6";

interface NavbarProps {
  currentUser: User & {
    conversations: (Conversation & {
      user: User[];
      messages: (Message & { sender: User })[];
    })[];
    student: Student;
  };
  userList: User[];
}

export default function Navbar({ currentUser, userList }: NavbarProps) {
  return (
    <nav className="w-full fixed z-[50] bg-white border">
      <div className="flex px-5 py-2 items-center">
        <Link href="/" className="hidden md:block">
          <Image
            src={Logo}
            width={150}
            height={150}
            alt="Logo"
            className="cursor-pointer"
          />
        </Link>
        <div className="md:hidden flex-1 w-full">
          <Drawer>
            <DrawerTrigger>
              <IoMdMenu size={30} color="dimgray" />
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-5 p-5">
                <Link
                  href="/"
                  className="flex items-center gap-3 text-xl font-semibold tracking-tight"
                >
                  <MdHome />
                  Home
                </Link>
                <Link
                  href="/event"
                  className="flex items-center gap-3 text-xl font-semibold tracking-tight"
                >
                  <FaCalendar />
                  View All Events
                </Link>
                <Link
                  href="/event/create"
                  className="flex items-center gap-3 text-xl font-semibold tracking-tight"
                >
                  <FaRegCalendarPlus />
                  Create Event
                </Link>
                <Link
                  href={`/class/${currentUser.student.batch_id}`}
                  className="flex items-center gap-3 text-xl font-semibold tracking-tight"
                >
                  <PiStudentBold />
                  Your Class
                </Link>
                <Link
                  href="/manage"
                  className="flex items-center gap-3 text-xl font-semibold tracking-tight"
                >
                  <FaGear />
                  Manage Events & Memories
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
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
                  width: { xs: 30, md: 30 },
                  height: { xs: 30, md: 30 },
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
