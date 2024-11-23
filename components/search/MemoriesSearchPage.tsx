import { Memory, User } from "@prisma/client";
import React from "react";
import MemoryCard2 from "../memories/MemoryCard2";

interface MemoriesSearchPageProps {
  memories: (Memory & {
    user: User;
  })[];
}

const MemoriesSearchPage = (
  { memories }: MemoriesSearchPageProps,
  search: string
) => {
  const filteredMemory = filterMemory({ memories }, search);
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight mt-5 -ml-1">
        Memories
      </h1>
      {filteredMemory ? (
        <>
          <p className="text-lg tracking-tight mt-2">
            Results : {filteredMemory.length}
          </p>
          <hr className="mb-10 mt-2" />
          {filteredMemory.map((memory) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <MemoryCard2
                key={memory.id}
                memories={memory}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="columns-3 w-full gap-5 box-border">
            <h1 className="text-[2rem]">No Memory Found!</h1>
          </div>
        </>
      )}
    </div>
  );
};

const filterMemory = (
  { memories }: MemoriesSearchPageProps,
  searchTerm: string
) => {
  if (!searchTerm) return null;
  return memories.filter((memory) =>
    memory.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default MemoriesSearchPage;
