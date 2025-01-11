import prisma from "@/app/prisma";
import MainPage from "@/components/main/MainPage";
import { getUser } from "@/utils/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      Batch: {
        include: {
          Memory: {
            take: 4,
          },
          Faculty: true,
          Major: true,
        },
      },
    },
  });

  if (!student) {
    redirect("/login");
  }

  const event = await prisma.event.findMany({
    take: 3,
  });

  return (
    <MainPage
      currentUser={user}
      student={{
        ...student,
        batch: {
          ...student.Batch,
          faculty: student.Batch?.Faculty,
          major: student.Batch?.Major,
          memories: student.Batch?.Memory,
        },
      }}
      events={event}
    />
  );
};

export default page;
