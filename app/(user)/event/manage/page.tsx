import prisma from "@/app/prisma";
import EventManagePage from "@/components/events/EventManagePage";
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



  return (
    <EventManagePage
      events={userEvents.map((event) => ({
        ...event,
        participant: event.Participants,
        comments: event.Comments,
      }))}
    />
  );
};

export default page;
