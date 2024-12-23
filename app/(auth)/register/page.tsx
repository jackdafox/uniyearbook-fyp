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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col border p-5 rounded-md items-center gap-6">
        <Image
          src={Logo}
          width={300}
          height={300}
          alt="Logo"
          className="cursor-pointer w-auto h-auto max-w-[200px] sm:max-w-[300px]"
        />
        <RegisterForm faculty={faculty} major={major} batch={batch} />
      </div>
    </div>
  );
}
