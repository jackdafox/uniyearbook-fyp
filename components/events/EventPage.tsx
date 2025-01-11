"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { FaGear } from "react-icons/fa6";
import EventCard from "./EventCard";
import { Comment, Event, Participant, User } from "@prisma/client";

interface EventPageProps {
  eventData: (Event & {
    participants: Participant[];
    comments: Comment[];
    user: User;
  })[];
}

const EventPage = ({ eventData }: EventPageProps) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-[5rem] mt-20">
      <div className="flex sm:flex-row gap-3 sm:gap-5 mt-16 sm:mt-24 mb-3 items-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[0.75] -ml-1">
          Events
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/event/create">
            <Button>
              <FiPlus /> Create Event
            </Button>
          </Link>
        </div>
      </div>
      <p className="max-w-full mb-6 text-sm text-zinc-500">
        Browse through our list of upcoming activities and find the perfect
        event for you. Don't miss out on these amazing opportunities to connect,
        learn, and have fun!
      </p>
      {eventData.length > 0 ? (
        <EventCard events={eventData} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-semibold text-zinc-500">
            No events found
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            There are no upcoming events at the moment. Check back later for
            updates!
          </p>
        </div>
      )}
    </div>
  );
};

export default EventPage;
