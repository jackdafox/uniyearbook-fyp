import StudentSearchCard from "@/components/search/StudentSearchCard";
import React from "react";

const page = () => {
  return (
    <div className="w-[80rem]">
      <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-10 -ml-1">
        Student
      </h1>
      <div className="flex justify-start w-full gap-3 flex-shrink-0">
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
      </div>
    </div>
  );
};

export default page;
