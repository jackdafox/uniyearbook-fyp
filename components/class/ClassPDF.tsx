import {
  Batch,
  Faculty,
  Major,
  Memory,
  Socials,
  Student,
  User,
} from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

interface ClassPDFProps {
  batch: Batch & {
    major: Major;
    faculty: Faculty;
    student: (Student & {
      user: User & {
        socials: Socials[];
        memories: Memory[];
      };
    })[];
  };
  memories?: (Memory & {
    user: User;
  })[];
  personal: boolean;
}

const ClassPDF = ({ batch, memories, personal }: ClassPDFProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tighter">
        {batch.major.name.toUpperCase()}
      </h1>
      <p className="mt-2 tracking-tight text-gray-600">
        <span className="text-base md:text-xl tracking-tighter">
          {batch.faculty.name} • {batch.name}
        </span>
      </p>
      <div className="grid grid-cols-3 w-full gap-5 mt-10">
        {batch.student.map((student) => (
          <div className="relative flex flex-col items-start">
            <img
              src={
                student.user.profile_picture
                  ? student.user.profile_picture
                  : "https://placehold.co/320x288"
              }
              className="w-full sm:w-80 h-52 object-cover"
              alt={`${student.user.first_name}'s profile`}
            />
            <h1 className="text-lg font-bold text-black mt-2 tracking-tight">
              {student.user.first_name} {student.user.last_name}
            </h1>
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-3 w-full gap-5"
        style={{ pageBreakBefore: "always" }}
      >
        {memories?.map((memory) => (
          <div className="flex flex-col gap-1 mb-3 overflow-hidden">
            {memory.image_url &&
            memory.image_url.toLowerCase().match(/\.(jpg|png|jpeg|gif)$/) ? (
              <img
                src={
                  memory.image_url ? memory.image_url : "/default-profile.png"
                }
                className="object-cover"
              />
            ) : (
              <video src={memory.image_url} autoPlay loop muted />
            )}
            <h1 className="text-[0.5rem]">
              {memory.user.first_name} {memory.user.last_name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPDF;
