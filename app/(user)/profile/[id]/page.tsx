import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";
import prisma from "@/app/prisma";
import { getUser } from "@/utils/actions/user";
import { redirect } from "next/navigation";

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
      Events: {
        include: {
          Participants: true,
          Comments: true,
          User: true,
        },
      },
      Socials: true,
    },
  });

  const currentUser = await getUser();

  if (!currentUser) {
    redirect("/login");
  }

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
            events:
              user.Events.map((event) => ({
                ...event,
                participants: event.Participants,
                comments: event.Comments,
                user: event.User,
              })) || [],
            socials: user.Socials || [],
          }}
          personal={true}
          message={false}
        />
      </div>
    );
  }

  const userHaveMessage = await prisma.conversation.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [currentUser.id, user.id]
          }
        }
      },
    },
  })

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
          events:
            user.Events.map((event) => ({
              ...event,
              participants: event.Participants,
              comments: event.Comments,
              user: event.User,
            })) || [],
          socials: user.Socials || [],
        }}
        personal={false}
        message={!!userHaveMessage}
      />
    </div>
  );
};

export default page;
