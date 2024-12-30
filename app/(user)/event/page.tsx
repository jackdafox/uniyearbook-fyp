import prisma from "@/app/prisma";
import React from "react";
import EventPage from "@/components/events/EventPage";

const page = async () => {
  const eventData = await prisma.event.findMany({
    include: {
      Participants: true,
      Comments: true,
      User: true,
    },
  });
  return <EventPage eventData={eventData.map((event) => ({
    ...event,
    participants: event.Participants,
    comments: event.Comments,
    user: event.User,
  }))} />;
};

export default page;
