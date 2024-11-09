import EventSearchPage from "@/components/search/EventSearchPage";
import StudentSearchPage from "@/components/search/StudentSearchPage";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="w-[80rem]">
      <div className="mt-10 flex gap-2">
        <Button className="bg-black text-white rounded-xl px-3 py-2 font-semibold">
          Student
        </Button>
        <Button className="bg-black text-white rounded-xl px-3 py-2 font-semibold">
          Class
        </Button>
        <Button className="bg-black text-white rounded-xl px-3 py-2 font-semibold">
          Memories
        </Button>
        <Button className="bg-black text-white rounded-xl px-3 py-2 font-semibold">
          Events
        </Button>
      </div>
      <EventSearchPage />
    </div>
  );
};

export default page;
