import React from "react";
import StudentSearchCard from "./StudentSearchCard";

const StudentSearchPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight mt-5 -ml-1">
        Student
      </h1>
      <p className="text-lg tracking-tight mt-2">Results : 5</p>
      <hr className="mb-10 mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
        <StudentSearchCard />
      </div>
    </div>
  );
};

export default StudentSearchPage;
