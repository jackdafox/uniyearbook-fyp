import React from "react";
import EventCarousel from "./EventCarousel";
import EventProfile from "./EventProfile";
import { FaLocationArrow, FaRegCalendar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EventJoin from "./EventJoin";
import { Event } from "@prisma/client";

interface EventProps {
    event : Event
}

const EventIndividualPage = ({ event }: EventProps) => {
  return (
    <div>
      {/* <EventCarousel images={event.images} /> */}
      <div className="flex items-start gap-10 mt-10">
        <div className="flex flex-col items-start w-full px-5">
          <div className="mb-5">
            <h1 className="font-medium text-lg">{event.start_date.getDate()}</h1>
            <h1 className="font-semibold text-5xl tracking-tight">
              {event.title}
            </h1>
          </div>
          {/* <EventTags tags={tags} /> */}
          <EventProfile
            picture="https://github.com/shadcn.png"
            username="Jaki"
          />
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">
              Date and time
            </h1>
            <div className="flex items-center gap-3 font-medium">
              <FaRegCalendar />
              <p>Wednesday, November 6 · 8 - 9pm GMT+8. Doors at 6:30pm</p>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">Location</h1>
            <div className="flex items-center gap-3 font-medium">
              <FaLocationArrow />
              <p>Bentley Music Auditorium</p>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">
              About this event
            </h1>
            <p className="max-w-[55rem] text-gray-500">
              {event.description}
            </p>
          </div>
          <div className="flex flex-col gap-5 max-w-[50rem] mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">Comments</h1>
            <div className="flex gap-5 justify-start items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1>Username</h1>
            </div>
            <p>
              Join us for an unforgettable evening with WIM, the acclaimed
              artist behind a distinctive blend of indie, soul, and electronic
              music. As part of his NOICE Asia Tour 2024, WIM will be performing
              live at Bentley Music Auditorium on 6 November at 8PM.
            </p>
          </div>
        </div>
        <EventJoin participant={32} />
      </div>
    </div>
  );
};

export default EventIndividualPage;
