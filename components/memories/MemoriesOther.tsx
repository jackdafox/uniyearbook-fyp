"use client";
import { Memory, User } from "@prisma/client";
import React from "react";
import MemoryCard2 from "./MemoryCard2";
import { FaChevronDown } from "react-icons/fa6";

interface MemoriesOtherProps {
  memories: (Memory & {
    user: User;
  })[];
}

const MemoriesOther = ({ memories }: MemoriesOtherProps) => {
  return (
    <div className="w-full flex flex-col px-5 md:px-10 mt-10">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="tracking-tight text-sm font-semibold">
          OTHER MEMORIES
        </h1>
        <FaChevronDown size={15} />
      </div>
      <hr />
      <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {memories.map((memory) => (
          <MemoryCard2
            key={memory.id}
            memories={memory}
            batchId={memory.batch_id}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoriesOther;
