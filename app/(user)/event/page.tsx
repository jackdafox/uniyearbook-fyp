import prisma from "@/app/prisma";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import React from "react";
import Link from "next/link";

const page = async () => {
  const eventData = await prisma.event.findMany();
  return (
    <div className="px-[10rem]">
      <div className="flex gap-5 mt-32 mb-3">
        <h1 className="text-5xl font-semibold tracking-tight leading-[0.75] -ml-1">
          Events
        </h1>
        <Link href="/event/create">
          <Button>
            <FiPlus /> Create Event
          </Button>
        </Link>
      </div>
      <p className="max-w-full mb-10 text-sm text-zinc-500">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      <EventCard events={eventData} />
    </div>
  );
};

export default page;
