import { Comment, Event, Participant, User } from "@prisma/client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import EventManageIndividual from "./EventManageIndividual";
import { GoBookmarkSlash } from "react-icons/go";
import { MdOutlineEventRepeat } from "react-icons/md";

interface EventManagePageProps {
  events: (Event & {
    participant: (Participant & { User: User })[];
    comments: (Comment & { User: User })[];
  })[];
}

const EventManagePage = ({ events }: EventManagePageProps) => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-[6rem] w-full">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[0.75] -ml-1 mb-3">
      Manage Events
      </h1>
      <h2 className="py-3 font-semibold">
        Event List
      </h2>
      <Accordion type="single" collapsible>
      {events.length > 0 ? (
        events.map((event) => (
        <AccordionItem value={event.id.toString()} key={event.id}>
          <AccordionTrigger className="text-lg sm:text-xl tracking-tight">
          {event.title}
          </AccordionTrigger>
          <AccordionContent>
          <EventManageIndividual
            event={event}
            participant={event.participant}
            comments={event.comments}
          />
          </AccordionContent>
        </AccordionItem>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-[15rem] sm:h-[20rem] gap-3 sm:gap-5 text-zinc-300">
        <MdOutlineEventRepeat size={60} className="sm:w-[100px] sm:h-[100px]" />
        <h1 className="text-xl sm:text-[2rem] tracking-tighter font-semibold text-center">
          No event posted
        </h1>
        </div>
      )}
      </Accordion>
    </div>
  );
};

export default EventManagePage;
