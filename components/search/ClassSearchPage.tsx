import { Batch, Faculty, Major, Student } from "@prisma/client";
import React from "react";

interface ClassSearchPageProps {
  batch: (Batch & {
    faculty: Faculty;
    major: Major;
    students: Student[];
  })[];
  search: string;
}

const ClassSearchPage = ({ batch, search }: ClassSearchPageProps) => {
  const filteredClass = filterClass({ batch, search });
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight mt-5 -ml-1">
        Classes
      </h1>
      {filteredClass ? (
        <></>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="columns-3 w-full gap-5 box-border">
            <h1 className="text-[2rem]">No Class Found!</h1>
          </div>
        </>
      )}
      <p className="text-lg tracking-tight mt-2">Results : 5</p>
      <hr className="mb-10 mt-2" />
      <div className="columns-3 w-full gap-5 box-border">
        {/* <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 /> */}
      </div>
    </div>
  );
};

function filterClass({ batch, search }: ClassSearchPageProps) {
  if (!search) return null;
  return batch.filter(
    (batch) =>
      batch.name.toLowerCase().includes(search.toLowerCase()) ||
      batch.faculty.name.toLowerCase().includes(search.toLowerCase()) ||
      batch.major.name.toLowerCase().includes(search.toLowerCase())
  );
}

export default ClassSearchPage;
