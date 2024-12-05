import prisma from "@/app/prisma";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import React from "react";
import Link from "next/link";
import EventPage from "@/components/events/EventPage";

const page = async () => {
  const eventData = await prisma.event.findMany();
  return <EventPage eventData={eventData} />;
};

export default page;
