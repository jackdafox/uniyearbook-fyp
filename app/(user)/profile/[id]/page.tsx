import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";
import prisma from "@/app/prisma";

const page = async ({ params }: { params: { id: number } }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
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
    },
  });

  if (!user || !user.Student) {
    return <div>Profile not found</div>;
  }

  const { Student } = user;
  const { Batch } = Student;
  const { Major, Faculty } = Batch;

  return (
    <div>
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
        }}
        personal={false}
      />
    </div>
  );
};

export default page;