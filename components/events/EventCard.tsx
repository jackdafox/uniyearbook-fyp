import { Event } from "@prisma/client";
import { Link } from "lucide-react";
import { MdAccessTime } from "react-icons/md";

interface EventProps {
  events: Event[];
}

const EventCard = ({ events }: EventProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {events.map((event) => (
        <a
          href={`/event/${event.id}`}
          className="flex flex-col max-w-sm border border-gray-300 rounded-lg transition-all ease-in-out cursor-pointer group relative overflow-hidden"
        >
          <div className="w-96 h-[10rem] rounded-t-lg overflow-hidden flex justify-start items-center">
            <img
              src={
                event.image_url
                  ? event.image_url
                  : "https://via.placeholder.com/150"
              }
              alt={`carousel-image-`}
            />
          </div>
          <div className="p-3">
            <div>
              <h1 className="font-semibold text-lg tracking-tight">
                {event.title}
              </h1>
              <div className="flex gap-2 items-center">
                <MdAccessTime />
                <h1 className="text-sm">{convertDate(event.start_date)}</h1>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <span className="text-white text-lg font-semibold tracking-tight">
              View Event
            </span>
          </div>
        </a>
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
