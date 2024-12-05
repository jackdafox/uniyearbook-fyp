import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      Student: {
        include: {
          Batch: {
            include: {
              Major: true,
              Faculty: true,
            },
          },
        },
      },
      Events: true,
      Memory: true,
      Socials: true,
    },
  });

  if (!user || !user.Student) {
    return <h1>Profile not found</h1>;
  }

  const { Student } = user;
  const { Batch } = Student;
  const { Major, Faculty } = Batch;

  return (
    <div className="mt-20">
      <ProfilePage
        user={{
          ...user,
          student: {
            ...Student,
            batch: {
              ...Batch,
              major: Major,
              faculty: Faculty,
            },
          },
          events: user.Events,
          memories: user.Memory,
          socials: user.Socials,
        }}
        personal={true}
      />
    </div>
  );
};

export default page;
