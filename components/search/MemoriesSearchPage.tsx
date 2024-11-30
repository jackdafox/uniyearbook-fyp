"use client";
import { Memory, User } from "@prisma/client";
import React from "react";
import MemoryCard2 from "../memories/MemoryCard2";

interface MemoriesSearchPageProps {
  memories: (Memory & {
    user: User;
  })[];
  search: string;
}

const MemoriesSearchPage = ({ memories, search }: MemoriesSearchPageProps) => {
  const filteredMemory = filterMemory(memories, search);

  if (filteredMemory === null)
    return (
      <>
        <hr className="mb-10" />
        <div className="columns-3 w-full gap-5 box-border">
          <h1 className="text-[2rem]">No Memory Found!</h1>
        </div>
      </>
    );
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight -ml-1">Memories</h1>
      {filteredMemory?.length > 0 ? (
        <>
          <p className="text-lg tracking-tight mt-2">
            Results : {filteredMemory.length}
          </p>
          <hr className="mb-10 mt-2" />
          <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5 mb-10">
            {filteredMemory.map((memory) => (
              <MemoryCard2
                key={memory.id}
                memories={memory}
                batchId={memory.batch_id}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="flex justify-center items-center h-96">
            <h1 className="text-[2rem] font-semibold text-zinc-500">
              No Memory Found!
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

const filterMemory = (
  memories: (Memory & {
    user: User;
  })[],
  search: string,
) => {
  if (!search) return null;
  return memories.filter((memory) =>
    memory.title.toLowerCase().includes(search.toString().toLowerCase()),
  );
};

export default MemoriesSearchPage;
