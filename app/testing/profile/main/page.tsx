import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { getInitials } from "@/components/events/EventProfile";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "@/components/profile/EditProfileForm";

const page = () => {
  const profilePicture = "https://avatars.githubusercontent.com/u/47269242?v=4";
  const username = "johndoe";
  const user = true;

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Avatar className="w-36 h-36">
          <AvatarImage src={profilePicture} />
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold tracking-tight mb-5 mt-2">
          {username}
        </h1>
        <p className="max-w-lg mb-3 text-center text-zinc-500">
          Keep your personal details private. Information you add here is
          visible to anyone who can view your profile.
        </p>

        {user && (
          <div className="flex gap-2 justify-center items-center">
            <Button className="rounded-full">Edit Profile</Button>
          </div>
        )}

        <Tabs defaultValue="account" className="max-w-screen mt-10">
          <div className="flex justify-center">
            <TabsList className="grid w-[20rem] grid-cols-2 mb-10">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account" className="w-screen px-32">
            <EditProfileForm />
          </TabsContent>
          <TabsContent value="password" className="w-screen px-32">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
