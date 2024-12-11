import { Comment, Event, Participant, User } from "@prisma/client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import EventManageIndividual from "./EventManageIndividual";

interface EventManagePageProps {
  events: (Event & {
    participant: (Participant & { User: User })[];
    comments: (Comment & { User: User })[];
  })[];
}

const EventManagePage = ({ events }: EventManagePageProps) => {
  return (
    <div className="px-[10rem] mt-24">
      <h1 className="text-5xl font-semibold tracking-tight leading-[0.75] -ml-1 mb-3">
        Manage Events
      </h1>
      <Accordion type="single" collapsible>
        {events.length > 0 &&
          events.map((event) => (
            <AccordionItem value={event.id.toString()} key={event.id}>
              <AccordionTrigger className="text-xl tracking-tight">{event.title}</AccordionTrigger>
              <AccordionContent>
                <EventManageIndividual
                  event={event}
                  participant={event.participant}
                  comments={event.comments}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default EventManagePage;
