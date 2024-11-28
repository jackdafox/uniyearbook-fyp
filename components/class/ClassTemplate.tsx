"use client";

import ProfileCard from "@/components/class/ProfileCard";
import {
  Batch,
  Comment,
  Faculty,
  Major,
  Memory,
  Student,
  User,
} from "@prisma/client";
import MemoryCard2 from "../memories/MemoryCard2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ShinyButton from "../ui/shinybutton";
import { Button } from "../ui/button";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

interface ClassClientProps {
  batch: Batch & {
    major: Major;
    faculty: Faculty;
    student: (Student & {
      user: User;
    })[];
  };
  memories?: (Memory & {
    user: User;
  })[];
}

export default function ClassClient({ batch, memories }: ClassClientProps) {
  return (
    <div className="mt-10 py-10 flex flex-col items-center justify-center">
      {/* Top Section */}
      <div className="text-center p-8">
        <h1 className="text-9xl font-semibold tracking-tighter mb-5 px-52">
          {batch.major.name.toUpperCase()}
        </h1>
        <p className="mt-4 tracking-tight text-gray-600">
          <span className="text-xl tracking-tighter">
            {batch.faculty.name} • {batch.name}
          </span>
        </p>
        <Button className="mt-4 rounded-full" >
          <Link href={`/class/${batch.id}/memories/create?batchId=${batch.id}`} className="flex items-center gap-2"> <FiPlus /> Create Memories</Link>
        </Button>
      </div>
      <Tabs
        defaultValue="yearbook"
        className="w-full flex flex-col items-center justify-center"
      >
        <TabsList className="w-[400px]">
          <TabsTrigger className="w-[400px]" value="yearbook">
            Yearbook
          </TabsTrigger>
          <TabsTrigger className="w-[400px]" value="memories">
            Memories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yearbook">
          {batch.student.length > 0 ? (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-40 py-10">
              {batch.student.map((student, index: number) => (
                <ProfileCard key={index} student={student} />
              ))}
            </div>
          ) : (
            <h1 className="text-[2rem] mt-28 tracking-tighter font-semibold text-zinc-300">
              No students in this batch
            </h1>
          )}
        </TabsContent>
        <TabsContent value="memories">
          {memories && memories.length > 0 ? (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-40 mb-10 py-10">
              {(memories || []).map((memory) => (
                <MemoryCard2 key={memory.id} memories={memory} batchId={batch.id} />
              ))}
            </div>
          ) : (
            <h1 className="text-[2rem] mt-28 tracking-tighter font-semibold text-zinc-300">
              No memories in this batch
            </h1>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
