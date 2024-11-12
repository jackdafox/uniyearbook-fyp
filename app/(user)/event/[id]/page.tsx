import EventCarousel from "@/components/events/EventCarousel";
import EventJoin from "@/components/events/EventJoin";
import EventProfile from "@/components/events/EventProfile";
import EventTags from "@/components/events/EventTags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLocationArrow, FaRegCalendar } from "react-icons/fa";

const page = () => {
  const images = [
    "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
    "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
  ];
  const tags = ["#location", "#location", "#location", "#location"];
  return (
    <>
      <EventCarousel images={images} />
      <div className="flex items-start gap-10 mt-10">
        <div className="flex flex-col items-start w-full px-5">
          <div className="mb-5">
            <h1 className="font-medium text-lg">Wednesday, November 6</h1>
            <h1 className="font-semibold text-5xl tracking-tight">
              WIM Live in Malaysia
            </h1>
          </div>
          <EventTags tags={tags} />
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
              Join us for an unforgettable evening with WIM, the acclaimed
              artist behind a distinctive blend of indie, soul, and electronic
              music. As part of his NOICE Asia Tour 2024, WIM will be performing
              live at Bentley Music Auditorium on 6 November at 8PM. Known for
              his evocative lyrics and smooth, resonant voice, WIM has
              captivated audiences worldwide with his unique sound. This special
              night will also mark a new chapter for WIM as he steps into the
              spotlight as a solo artist. After an incredible journey with HYBS,
              the duo project with Alyn, WIM has decided to pursue his solo
              career, staying true to the original vision of HYBS as a temporary
              creative endeavor. Fans can expect a setlist filled with both
              familiar favorites and new tracks that showcase his evolving
              artistry. Don't miss this chance to experience WIM's powerful live
              performance. It's a night that promises to be filled with soulful
              melodies, heartfelt storytelling, and a fresh sonic journey.
              Special guest, BABYCHAIR, will perform a 30-minute set before WIM
              takes the stage. Be mesmerized by them!
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
    </>
  );
};

export default page;
