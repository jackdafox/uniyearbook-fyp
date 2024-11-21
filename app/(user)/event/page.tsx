import prisma from "@/app/prisma";
import EventCard from "@/components/events/EventCard";
import EventIndividualPage from "@/components/events/EventIndividualPage";
import React from "react";

const page = async () => {
  const eventData = await prisma.event.findMany();
  return (
    <div>
      <EventCard events={eventData} />
    </div>
  );
};

export default page;
