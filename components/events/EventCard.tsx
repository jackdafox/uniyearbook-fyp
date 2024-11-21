import { Event } from "@prisma/client";
import { Link } from "lucide-react";

interface EventProps {
  events: Event[];
}

const EventCard = ({ events }: EventProps) => {
  return (
    <div className="grid grid-cols-4 gap-10 w-full">
      {events.map((event) => (
        <Link href={`/event/${event.id}`} key={event.id}>
          <div className="flex flex-col max-w-sm border border-gray-300 rounded-lg transition-all ease-in-out cursor-pointer group relative">
            <div className="w-96 h-[10rem] rounded-t-lg overflow-hidden flex justify-center items-center">
              <img
                src={
                  event.image_url
                    ? event.image_url
                    : "https://via.placeholder.com/150"
                }
                alt={`carousel-image-`}
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <div className="mb-3">
                <h1 className="font-semibold text-2xl tracking-tight">
                  {event.title}
                </h1>
                <p>{event.start_date.getDate()}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <span className="text-white text-lg font-semibold tracking-tight">
                View Event
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventCard;
