"use client";

import ProfileCard from "@/components/class/ProfileCard";
import { Playfair } from "next/font/google";
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

const playfair = Playfair({
  subsets: ["latin"],
  style: "italic",
  weight: ["400"],
  variable: "--font-playfair",
});

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
    <div className="mt-24 py-10 flex flex-col items-center justify-center">
      {/* Top Section */}
      <div className="text-center p-8">
        <h1 className="text-9xl font-semibold tracking-tighter mb-5 px-52">
          {batch.major.name.toUpperCase()}
        </h1>
        <p className="mt-4 tracking-tight text-gray-600">
          <span className="text-3xl text23 tracking-tighter">
            {batch.faculty.name}
          </span>
          <span className="bg-gray-400 px-2 py-1 rounded-xl font-bold text-white mx-2 w-1/2">
            {batch.name}
          </span>
        </p>
      </div>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Yearbook</TabsTrigger>
          <TabsTrigger value="password">Memories</TabsTrigger>
        </TabsList>
        <TabsContent value="yearbook">
          <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-40 mb-10">
            {batch.student.map((student, index: number) => (
              <ProfileCard key={index} student={student} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="memories">
          <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-40 mb-10">
            {(memories || []).map((memory, index) => (
              <MemoryCard2 key={index} memories={memory} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
