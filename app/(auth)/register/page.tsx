import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import prisma from "@/app/prisma";
import Image from "next/image";
import Logo from "@/components/image/Logo.png";

export default async function SignUpPage() {
  const major = await prisma.major.findMany();

  const faculty = await prisma.faculty.findMany();

  const batch = await prisma.batch.findMany();

  return (
    <div className="flex flex-col border p-5 mt-32 rounded-md items-center gap-6">
      <Image
        src={Logo}
        width={300}
        height={300}
        alt="Logo"
        className="cursor-pointer"
      />
      <RegisterForm faculty={faculty} major={major} batch={batch} />
    </div>
  );
}
