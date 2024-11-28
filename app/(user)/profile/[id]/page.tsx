import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";
import prisma from "@/app/prisma";
import { getUser } from "@/utils/actions/user";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
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
      Memory: true,
      Events: true,
    },
  });

  const currentUser = await getUser();

  if (!user || !user.Student) {
    return <div>Profile not found</div>;
  }

  const { Student } = user;
  const { Batch } = Student;
  const { Major, Faculty } = Batch;

  if (currentUser?.id === user.id) {
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
            memories: user.Memory || [],
            events: user.Events || [],
          }}
          personal={true}
        />
      </div>
    );
  }

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
          memories: user.Memory || [],
          events: user.Events || [],
        }}
        personal={false}
      />
    </div>
  );
};

export default page;
