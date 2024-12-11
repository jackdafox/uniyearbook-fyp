"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { FaGear } from "react-icons/fa6";
import EventCard from "./EventCard";
import { Event } from "@prisma/client";

interface EventPageProps {
  eventData: Event[];
}

const EventPage = ({ eventData }: EventPageProps) => {
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
        <Link href="/event/manage">
          <Button>
            <FaGear />
          </Button>
        </Link>
      </div>
      <p className="max-w-full mb-10 text-sm text-zinc-500">
        Browse through our list of upcoming activities and find the perfect
        event for you. Don’t miss out on these amazing opportunities to connect,
        learn, and have fun!
      </p>
      <EventCard events={eventData} />
    </div>
  );
};

export default EventPage;
