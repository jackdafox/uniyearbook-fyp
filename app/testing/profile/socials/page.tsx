import ProfileAddSocial from "@/components/profile/ProfileAddSocial";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[30rem]">
      <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-3 -ml-1">
        Edit Socials
      </h1>
      <p className="max-w-full mb-10 text-sm text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      <ProfileAddSocial />
    </div>
  );
};

export default page;
