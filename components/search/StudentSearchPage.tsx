import React from "react";
import StudentSearchCard from "./StudentSearchCard";
import { Batch, Faculty, Major, Student, User } from "@prisma/client";

interface StudentSearchPageProps {
  users: (User & {
    student: Student & {
      batch: Batch & {
        major: Major;
        faculty: Faculty;
      };
    };
  })[];
  search: string
}

const StudentSearchPage = (
  { users, search }: StudentSearchPageProps
) => {
  const filteredStudent = filterStudent({ users, search });
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight mt-5 -ml-1">
        Student
      </h1>
      {filteredStudent ? (
        <>
          <p className="text-lg tracking-tight mt-2">
            Results : {filteredStudent.length}
          </p>
          <hr className="mb-10 mt-2" />
          {users.map((user) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStudent.map((user) => (
                <StudentSearchCard key={user.id} user={user} />
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="columns-3 w-full gap-5 box-border">
            <h1 className="text-[2rem]">No Students Found!</h1>
          </div>
        </>
      )}
    </div>
  );
};

const filterStudent = (
  { users, search }: StudentSearchPageProps
) => {
  if (!search) return null;
  return users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) 
  );
};

export default StudentSearchPage;
