import React from "react";
import MemoryCard2 from "../memories/MemoryCard2";
import { Event } from "@prisma/client";
import EventCard from "../events/EventCard";

interface EventSearchPageProps {
  events: Event[];
  search: string
}

const EventSearchPage = ({ events, search }: EventSearchPageProps) => {
  const filteredEvents = filterEvents(events, search);
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight mt-5 -ml-1">
        Events
      </h1>
      {filteredEvents ? (
        <>
          <p className="text-lg tracking-tight mt-2">
            Results : {events.length}
          </p>
          <hr className="mb-10 mt-2" />
          <div className="columns-3 w-full gap-5 box-border">
            <EventCard events={filteredEvents} />
          </div>
        </>
      ) : (
        <>
          <hr className="mb-10 mt-2" />
          <div className="columns-3 w-full gap-5 box-border">
            <h1 className="text-[2rem]">No Events Found!</h1>
          </div>
        </>
      )}
    </div>
  );
};

const filterEvents = (events: Event[], searchTerm: string) => {
  if (!searchTerm) return null;
  return events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default EventSearchPage;
