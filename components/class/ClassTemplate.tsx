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
import { MdOutlineEventRepeat } from "react-icons/md";

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
  personal: boolean;
}

export default function ClassClient({
  batch,
  memories,
  personal,
}: ClassClientProps) {
  return (
    <div className="mt-5 md:mt-10 py-5 md:py-10 flex flex-col items-center justify-center">
      {/* Top Section */}
      <div className="text-center p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl lg:text-9xl font-semibold tracking-tighter mb-3 md:mb-5 px-4 md:px-20 lg:px-52">
          {batch.major.name.toUpperCase()}
        </h1>
        <p className="mt-2 md:mt-4 tracking-tight text-gray-600">
          <span className="text-base md:text-xl tracking-tighter">
            {batch.faculty.name} • {batch.name}
          </span>
        </p>
        {personal && (
          <Button className="mt-4 rounded-full">
            <Link
              href={`/class/${batch.id}/memories/create?batchId=${batch.id}`}
              className="flex items-center gap-2"
            >
              <FiPlus /> Create Memories
            </Link>
          </Button>
        )}
      </div>
      <Tabs
        defaultValue="yearbook"
        className="w-full flex flex-col items-center justify-center"
      >
        <TabsList className="w-[300px] md:w-[400px]">
          <TabsTrigger className="w-full" value="yearbook">
            Yearbook
          </TabsTrigger>
          <TabsTrigger className="w-full" value="memories">
            Memories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yearbook" className="w-full">
          {batch.student.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 px-4 md:px-20 lg:px-40 py-5 md:py-10">
              {batch.student.map((student, index: number) => (
                <ProfileCard
                  key={index}
                  student={student}
                  batchName={batch.name}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-xl md:text-[2rem] mt-14 md:mt-28 tracking-tighter font-semibold text-zinc-300">
              <h1 className="text-[2rem] mt-28 tracking-tighter font-semibold text-zinc-300">
                No students in this batch
              </h1>
            </h1>
          )}
        </TabsContent>
        <TabsContent value="memories" className="w-full">
          {memories && memories.length > 0 ? (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-3 xl:px-32 mb-10 py-10">
              {(memories || []).map((memory) => (
                <MemoryCard2
                  key={memory.id}
                  memories={memory}
                  batchId={batch.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[25rem] gap-10 text-zinc-300">
              <MdOutlineEventRepeat size={100} />
              <h1 className="text-[2rem] tracking-tighter font-semibold ">
                No memories in this batch
              </h1>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
