import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Batch, Faculty, Major, Student, User } from "@prisma/client";
import { getInitials } from "../events/EventProfile";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EditProfileForm from "./EditProfileForm";

interface ProfileProps {
  user: User & {
    student: Student & {
      batch: Batch & {
        major: Major,
        faculty: Faculty
      };
    };
  },
  personal: boolean
}

const ProfilePage = ({ user, personal }: ProfileProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Avatar className="w-36 h-36">
        <AvatarImage src={user.profile_picture ? user.profile_picture : ""} />
        <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
      </Avatar>
      <h1 className="text-3xl font-semibold tracking-tight mb-5 mt-2">
        {user.first_name} {user.last_name}
      </h1>
      <h2 className="text-xl font-semibold tracking-tight mb-5">
        {user.student.batch.faculty.name} • {user.student.batch.name} 
      </h2>
      <p className="max-w-lg mb-3 text-center text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>

      {user && personal && (
        <div className="flex gap-2 justify-center items-center">
          <Button className="rounded-full">Edit Profile</Button>
        </div>
      )}

      <Tabs defaultValue="account" className="max-w-screen mt-10">
        <div className="flex justify-center">
          <TabsList className="grid w-[20rem] grid-cols-2 mb-10">
            <TabsTrigger value="account">Events</TabsTrigger>
            <TabsTrigger value="password">Memories</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account" className="w-screen px-32">
          {/* <EditProfileForm /> */}
        </TabsContent>
        <TabsContent value="password" className="w-screen px-32">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
