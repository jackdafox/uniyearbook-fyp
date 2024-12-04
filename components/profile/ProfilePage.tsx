"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Batch,
  Event,
  Faculty,
  Major,
  Memory,
  Student,
  User,
} from "@prisma/client";
import { getInitials } from "../events/EventProfile";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventCard from "../events/EventCard";
import MemoryCard2 from "../memories/MemoryCard2";
import Link from "next/link";
import CircleNumber from "../ui/circlenumber";
import { MdEdit, MdOutlineEventRepeat } from "react-icons/md";
import { signOut } from "next-auth/react";
import { IoMdExit } from "react-icons/io";
import { GoBookmarkSlash } from "react-icons/go";

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
  };
  personal: boolean;
}

const ProfilePage = ({ user, personal }: ProfileProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Avatar className="w-36 h-36">
        <AvatarImage src={user.profile_picture ? user.profile_picture : ""} />
        <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
      </Avatar>
      <h1 className="text-3xl font-semibold tracking-tight mt-2">
        {user.first_name} {user.last_name}
      </h1>
      <h2 className="text-lg tracking-tight mb-5">
        {user.student.batch.faculty.name} • {user.student.batch.name}
      </h2>
      <p className="max-w-lg mb-5 text-center text-zinc-500">{user.details ? user.details : "(No description added)"}</p>

      {user && personal && (
        <div className="flex gap-2 justify-center items-center">
          <Link href="/profile/edit">
            <Button className="rounded-full" >
              <MdEdit />
              <h1>Edit Profile</h1>
            </Button>
          </Link>
          <Button className="rounded-full" onClick={() => signOut()}> 
            <IoMdExit />
            <h1>Logout</h1>
          </Button>
        </div>
      )}

      <Tabs defaultValue="events" className="max-w-screen mt-5">
        <div className="flex justify-center">
          <TabsList className="grid w-[20rem] grid-cols-2 mb-10">
            <TabsTrigger value="events">
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-semibold">Events</h1>
                <CircleNumber text={user.events.length.toString()} />
              </div>
            </TabsTrigger>
            <TabsTrigger value="memories">
              <div className="flex gap-2 justify-center items-center">
                <h1 className="font-semibold">Memories</h1>
                <CircleNumber text={user.memories.length.toString()} />
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="events" className="w-screen px-32">
          {user.events.length > 0 ? (
            <EventCard events={user.events} />
          ) : (
            <div className="flex flex-col justify-center items-center h-[20rem] gap-5 text-zinc-300">
              <MdOutlineEventRepeat size={100}/>
              <h1 className="text-[2rem] tracking-tighter font-semibold ">
                No event posted
              </h1>
            </div>
          )}
        </TabsContent>
        <TabsContent value="memories" className="w-screen px-32">
          {user.memories && user.memories.length > 0 ? (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-10 mb-10">
              {(user.memories || []).map((memory, index) => (
                <MemoryCard2
                  key={index}
                  memories={{ ...memory, user: user }}
                  batchId={user.student.batch_id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[20rem] gap-5 text-zinc-300">
              <GoBookmarkSlash size={100}/>
              <h1 className="text-[2rem] tracking-tighter font-semibold ">
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
