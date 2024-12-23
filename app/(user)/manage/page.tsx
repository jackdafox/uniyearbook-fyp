import prisma from "@/app/prisma";
import EventManagePage from "@/components/events/EventManagePage";
import ManagePage from "@/components/profile/ManagePage";
import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/actions/user";
import React from "react";

const page = async () => {
  const user = await getUser();
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userEvents = await prisma.event.findMany({
    where: {
      userId: user.id,
    },
    include: {
      Participants: {
        include: {
          User: true,
        },
      },
      Comments: {
        include: {
          User: true,
        },
      },
    },
  });

  const userMemories = await prisma.memory.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      Comments: {
        include: {
          User: true,
        },
      },
    },
  });

  return (
    <ManagePage
      events={userEvents.map((event) => ({
        ...event,
        participant: event.Participants,
        comments: event.Comments,
      }))}
      memories={userMemories.map((memory) => ({
        ...memory,
        comment: memory.Comments,
      }))}
    />
  );
};

export default page;
