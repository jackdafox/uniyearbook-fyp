"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Batch,
  Event,
  Faculty,
  Major,
  Memory,
  Socials,
  Student,
  User,
} from "@prisma/client";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventCard from "../events/EventCard";
import MemoryCard2 from "../memories/MemoryCard2";
import Link from "next/link";
import CircleNumber from "../ui/circlenumber";
import { MdEdit, MdOutlineEventRepeat } from "react-icons/md";
import { signOut } from "next-auth/react";
import { IoMdCall, IoMdExit } from "react-icons/io";
import { GoBookmarkSlash } from "react-icons/go";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FaLink } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";

interface ProfileProps {
  user: User & {
    student: Student & {
      batch: Batch & {
        major: Major;
        faculty: Faculty;
      };
    };
    memories: Memory[];
    events: Event[];
    socials: Socials[];
  };
  personal: boolean;
}

const ProfilePage = ({ user, personal }: ProfileProps) => {
  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  }
  return (
    <div className="flex flex-col gap-2 justify-center items-center px-4">
      <Avatar className="w-24 h-24 md:w-36 md:h-36">
        <AvatarImage src={user.profile_picture ? user.profile_picture : ""} />
        <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2 text-center">
        {user.first_name} {user.last_name}
      </h1>
      <h2 className="text-base md:text-lg tracking-tight mb-3 text-center">
        {user.student.batch.faculty.name} • {user.student.batch.name}
      </h2>
      <p className="max-w-lg text-center text-zinc-500 text-sm md:text-base">
        {user.details ? user.details : "(No description added)"}
      </p>
      {user.contacts || user.socials ? (
        <div
          className={`flex gap-3 justify-center flex-wrap ${
            user.contacts?.length || user.socials?.length ? "p-3 md:p-5" : "p-0"
          }`}
        >
          {user.contacts && (
            <HoverCard>
              <HoverCardTrigger
                className="flex gap-3 items-center"
                onClick={() => user.contacts && handleCopy(user.contacts)}
              >
                <IoMdCall size={20} />
                <h1 className="hover:font-semibold cursor-pointer hover:underline text-sm md:text-base">
                  Contact
                </h1>
              </HoverCardTrigger>
              <HoverCardContent className="rounded-md w-fit h-fit">
                {user.contacts}
              </HoverCardContent>
            </HoverCard>
          )}
          {user.socials && user.socials.length > 0 && <h1>•</h1>}
          {user.socials &&
            user.socials.length > 0 &&
            (user.socials.length > 1 ? (
              <Dialog>
                <DialogTrigger className="flex items-center gap-3 cursor-pointer hover:underline">
                  <FaLink />
                  <h1 className="hover:font-semibold text-sm md:text-base">
                    {user.socials[0].name} +{user.socials.length - 1}
                  </h1>
                </DialogTrigger>
                <DialogContent className="w-[90%] md:w-full">
                  <div className="flex flex-col gap-3">
                    {user.socials.map((social) => (
                      <div className="flex flex-col gap-2 py-3" key={social.id}>
                        <h1 className="font-semibold">{social.name}</h1>
                        <div className="flex gap-2 items-center hover:underline">
                          <FaLink />
                          <Link
                            href={`${social.link}`}
                            className="text-sm md:text-base break-all"
                          >
                            {social.link}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex gap-3 justify-center items-center hover:underline">
                <FaLink />
                <Link
                  href={`${user.socials[0].link}`}
                  className="text-sm md:text-base break-all"
                >
                  {user.socials[0].link}
                </Link>
              </div>
            ))}
        </div>
      ) : null}

      {user && personal && (
        <div className="flex gap-2 justify-center items-center flex-wrap">
          <Link href="/profile/edit">
            <Button className="rounded-full text-sm md:text-base">
              <MdEdit />
              <h1>Edit Profile</h1>
            </Button>
          </Link>
          <Button
            className="rounded-full text-sm md:text-base"
            onClick={() => signOut()}
          >
            <IoMdExit />
            <h1>Logout</h1>
          </Button>
        </div>
      )}

      <Tabs defaultValue="events" className="w-full mt-5">
        <div className="flex justify-center">
          <TabsList className="grid w-[16rem] md:w-[20rem] grid-cols-2 mb-10">
            <TabsTrigger value="events">
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-semibold text-sm md:text-base">Events</h1>
                <CircleNumber text={user.events.length.toString()} />
              </div>
            </TabsTrigger>
            <TabsTrigger value="memories">
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-semibold text-sm md:text-base">Memories</h1>
                <CircleNumber text={user.memories.length.toString()} />
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="events" className="w-full px-4 md:px-32">
          {user.events.length > 0 ? (
            <EventCard events={user.events} />
          ) : (
            <div className="flex flex-col justify-center items-center h-[20rem] gap-5 text-zinc-300">
              <MdOutlineEventRepeat size={60} className="md:text-[100px]" />
              <h1 className="text-xl md:text-[2rem] tracking-tighter font-semibold text-center">
                No event posted
              </h1>
            </div>
          )}
        </TabsContent>
        <TabsContent value="memories" className="w-full px-4 md:px-32">
          {user.memories && user.memories.length > 0 ? (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
              {(user.memories || []).map((memory) => (
                <MemoryCard2
                  key={memory.id}
                  memories={{ ...memory, user: user }}
                  batchId={user.student.batch_id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[20rem] gap-5 text-zinc-300">
              <GoBookmarkSlash size={60} className="md:text-[100px]" />
              <h1 className="text-xl md:text-[2rem] tracking-tighter font-semibold text-center">
                No memories posted
              </h1>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
