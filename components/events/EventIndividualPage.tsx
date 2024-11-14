import React from "react";
import EventCarousel from "./EventCarousel";
import EventProfile from "./EventProfile";
import { FaLocationArrow, FaRegCalendar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EventJoin from "./EventJoin";
import { Comment, Event, User } from "@prisma/client";

interface EventProps {
  event: Event & {
    user: User;
  };
  comments?: (Comment & {
    user: User;
  })[];
}

const EventIndividualPage = ({ event, comments }: EventProps) => {
  return (
    <div>
      {/* <EventCarousel images={event.images} /> */}
      <div className="flex items-start gap-10 mt-10">
        <div className="flex flex-col items-start w-full px-5">
          <div className="mb-5">
            <h1 className="font-medium text-lg">
              {event.start_date.getDate()}
            </h1>
            <h1 className="font-semibold text-5xl tracking-tight">
              {event.title}
            </h1>
          </div>
          {/* <EventTags tags={tags} /> */}
          <EventProfile
            picture={
              event.user.profile_picture ? event.user.profile_picture : ""
            }
            username={event.user.first_name}
          />
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">
              Date and time
            </h1>
            <div className="flex items-center gap-3 font-medium">
              <FaRegCalendar />
              <p>{event.start_date.getDate()}</p>
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
            <p className="max-w-[55rem] text-gray-500">{event.description}</p>
          </div>
          <div className="flex flex-col gap-5 max-w-[50rem] mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">Comments</h1>
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-5 items-start">
                <Avatar>
                  <AvatarImage src={comment.user.profile_picture || ""} />
                  <AvatarFallback>
                    {comment.user.first_name[0] + comment.user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1>{comment.user.first_name}</h1>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <EventJoin participant={32} />
      </div>
    </div>
  );
};

export default EventIndividualPage;
