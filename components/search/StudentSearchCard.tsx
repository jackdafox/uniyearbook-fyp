import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";
import { Card } from "../ui/card";
import { Batch, Faculty, Major, Student, User } from "@prisma/client";

interface StudentSearchCardProps {
  user: User & {
    student: Student & {
      batch: Batch & {
        major: Major;
        faculty: Faculty;
      };
    };
  };
}

const StudentSearchCard = ({ user }: StudentSearchCardProps) => {
  return (
    <Card className="p-3 hover:bg-zinc-100 cursor-pointer">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.profile_picture || ""} />
          <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold mt-5">{user.first_name} {user.last_name}</h1>
        <h2 className="text-md text-zinc-400 text-center">
          {user.student.batch.faculty.name}
        </h2>
        <h2 className="text-md text-zinc-400 text-center">
        {user.student.batch.major.name}
        </h2>
        <h2 className="text-md font-semibold text-center mt-5">{user.student.batch.name}</h2>
      </div>
    </Card>
  );
};

export default StudentSearchCard;
