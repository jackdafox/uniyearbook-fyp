import React from "react";
import NavbarPage from "@/components/navbar/NavbarData";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full">
      <NavbarPage />
      <div className="mt-16">{children}</div>
    </div>
  );
};

export default UserLayout;
