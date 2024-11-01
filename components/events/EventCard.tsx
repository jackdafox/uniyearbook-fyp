interface Event {
  imageUrl: string;
  title: string;
  date: string;
  author: string;
}

interface EventCardProps {
  items: Event[];
}

const EventCard: React.FC<EventCardProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-10 w-full">
      {items.map((item, index) => (
        <div className="flex flex-col max-w-sm border border-gray-300 rounded-lg transition-all ease-in-out cursor-pointer group relative">
          <div className="w-96 h-[10rem] rounded-t-lg overflow-hidden flex justify-center items-center">
            <img
              src={item.imageUrl}
              alt={`carousel-image-`}
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <div className="mb-3">
              <h1 className="font-semibold text-2xl tracking-tight">
                {item.title}
              </h1>
              <p>{item.date}</p>
            </div>
            <h1 className="font-semibold tracking-tight">By {item.author}</h1>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <span className="text-white text-lg font-semibold tracking-tight">
              View Event
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
