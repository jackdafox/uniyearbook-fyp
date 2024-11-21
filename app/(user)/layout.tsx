import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <div className="w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default UserLayout;
