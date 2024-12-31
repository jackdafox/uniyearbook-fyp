import { Comment, Event, Participant, User } from "@prisma/client";
import { MdAccessTime } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { FaCalendar, FaComment, FaUser } from "react-icons/fa6";
import Link from "next/link";

interface EventProps {
  events: (Event & {
    participants: Participant[];
    comments: Comment[];
    user: User;
  })[];
}

const EventCard = ({ events }: EventProps) => {
  return (
    <div className="flex flex-col max-h-96">
      {events.map((event) => (
        <Link href={`/event/${event.id}`}>
          <div
            key={event.id}
            className="flex flex-col gap-10 hover:bg-zinc-100 transition-all cursor-pointer border-b py-10 px-3"
          >
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2 md:gap-5">
                <div className="flex gap-3 items-center">
                  <Avatar className="w-5 h-5 sm:w-7 sm:h-7">
                    <AvatarImage src={event.user.profile_picture || ""} />
                    <AvatarFallback>
                      {getInitials(event.user.first_name)}
                    </AvatarFallback>
                  </Avatar>
                  <h1>
                    {event.user.first_name} {event.user.last_name}
                  </h1>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl md:text-5xl font-bold tracking-tight">
                    {event.title}
                  </h1>
                  <h1 className="text-md md:text-xl text-zinc-600 truncate max-w-[30rem] ">
                    {event.description}
                  </h1>
                </div>
                <div className="flex justify-between mt-10">
                  <div className="flex gap-5 text-zinc-500">
                    <div className="flex items-center gap-2">
                      <FaCalendar />
                      <h1>{convertDate(event.start_date)}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaComment />
                      <h1>{event.comments.length}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <h1>{event.participants.length}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={event.image_url || ""}
                className="w-20 h-16 md:w-52 md:h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const convertDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default EventCard;
