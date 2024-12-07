import prisma from "@/app/prisma";
import React from "react";
import EventPage from "@/components/events/EventPage";

const page = async () => {
  const eventData = await prisma.event.findMany();
  return <EventPage eventData={eventData} />;
};

export default page;
