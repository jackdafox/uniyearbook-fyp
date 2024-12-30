import React from "react";
import MemoryCard2 from "../memories/MemoryCard2";
import { Comment, Event, Participant, User } from "@prisma/client";
import EventCard from "../events/EventCard";
import { MdOutlineSearchOff } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";

interface EventSearchPageProps {
  events: (Event & {
    participants: Participant[];
    comments: Comment[];
    user: User;
  })[];
  search: string;
}

const EventSearchPage = ({ events, search }: EventSearchPageProps) => {
  const filteredEvents = filterEvents(events, search);

  if (filteredEvents === null) {
    return (
      <>
        <hr className="mb-10 mt-2" />
        <div className="columns-3 w-full gap-5 box-border">
          <h1 className="text-[2rem]">No Event Found!</h1>
        </div>
      </>
    );
  }
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight -ml-1">Events</h1>
      {filteredEvents.length > 0 ? (
        <>
          <p className="text-lg tracking-tight mt-2">
            Results : {filteredEvents.length}
          </p>
          <hr className="mb-10 mt-2" />
          <div className="w-full">
            <EventCard events={filteredEvents} />
          </div>
          <div className="flex justify-center mt-10 text-zinc-300">
            <FaCircle size={8}/>
          </div>
        </>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="flex flex-col justify-center items-center h-[20rem] gap-5 text-zinc-300">
            <MdOutlineSearchOff size={100} />
            <h1 className="text-[2rem] tracking-tighter font-semibold ">
              No event found
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

const filterEvents = (
  events: (Event & {
    participants: Participant[];
    comments: Comment[];
    user: User;
  })[],
  searchTerm: string
) => {
  if (!searchTerm) return null;
  return events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default EventSearchPage;
