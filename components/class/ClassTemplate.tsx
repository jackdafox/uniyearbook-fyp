"use client";

import MemoryCard from "@/components/class/MemoryCard";
import ProfileCard from "@/components/class/ProfileCard";
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
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

      {/* Navigation and Add Memory Buttons in the Center */}
      <div className="flex justify-center items-center space-x-4 mb-2">
        <button
          onClick={() => handleSectionChange("yearbook")}
          className={`p-2 h-fit border font-bold border-black ${
            activeSection === "yearbook"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          YEARBOOK
        </button>
        <button
          onClick={() => handleSectionChange("memories")}
          className={`p-2 h-fit border font-bold border-black ${
            activeSection === "memories"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          MEMORIES
        </button>
        <button
          onClick={handleOpenPopup}
          className="p-2 bg-gray-100 text-gray-800 border hover:bg-gray-300"
        >
          Add Memory
        </button>
      </div>

      {/* Toggleable Sections with Transition */}
      <div className="relative w-full p-8">
        <div
          className={`absolute w-full transition-opacity duration-300 transform ${
            isTransitioning || activeSection === "memories"
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          {activeSection === "yearbook" && (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-40 mb-10">
              {batch.student.map((student, index: number) => (
                <ProfileCard key={index} student={student} />
              ))}
            </div>
          )}
        </div>

        <div
          className={`absolute w-full transition-opacity duration-300 transform ${
            isTransitioning || activeSection === "yearbook"
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          {activeSection === "memories" && (
            <div className="w-full p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-20">
                {(memories || []).map((memory, index) => (
                  <MemoryCard2 key={index} memories={memory} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
