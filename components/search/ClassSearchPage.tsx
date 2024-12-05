"use client";
import { Batch, Faculty, Major, Student } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSearchOff } from "react-icons/md";

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

  if (filteredClass === null)
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
      <h1 className="text-5xl font-semibold tracking-tight -ml-1">Classes</h1>
      {filteredClass?.length > 0 ? (
        <>
          <p className="text-lg tracking-tight mt-2">
            Results : {filteredClass.length}
          </p>
          <hr className="mb-10 mt-2" />
          <div className="flex flex-col gap-6">
            {filteredClass.map((batch) => (
              <Link href={`class/${batch.id}`}>
                <div
                  key={batch.id}
                  className="border p-5 rounded-md hover:scale-[99%] transition-all flex justify-between items-center"
                >
                  <div>
                    <h1 className="text-3xl mb-5 tracking-tight font-semibold">
                      {batch.faculty.name}
                    </h1>
                    <h1 className="text-zinc-500">{batch.major.name}</h1>
                    <h1 className="text-zinc-500">{batch.name}</h1>
                  </div>
                  <IoIosArrowForward size={30} />
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="flex flex-col justify-center items-center h-[20rem] gap-5 text-zinc-300">
            <MdOutlineSearchOff size={100} />
            <h1 className="text-[2rem] tracking-tighter font-semibold ">
              No memories found
            </h1>
          </div>
        </>
      )}
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
