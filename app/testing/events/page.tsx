import EventProfile from "@/components/events/EventProfile";
import { Badge } from "@/components/ui/badge";

const page = () => {
  return (
    <>
      <div className="flex flex-col mb-5">
        <h1 className="font-medium text-lg">Wednesday, November 6</h1>
        <h1 className="font-semibold text-5xl tracking-tight">
          WIM Live in Malaysia
        </h1>
      </div>
      <div className="flex flex-wrap mb-10 gap-2 max-w-[28rem]">
        <Badge className="px-3 py-[0.25rem]">Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
        <Badge>Badge</Badge>
      </div>
      <EventProfile />
    </>
  );
};

export default page;
