"use client";

import EditProfileForm from "@/components/profile/EditProfileForm";

const page = () => {
  return (
    <div className="max-w-[50rem]">
      <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-3 -ml-1">
        Edit Profile
      </h1>
      <p className="max-w-full mb-10 text-sm text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      <EditProfileForm />
    </div>
  );
};

export default page;
