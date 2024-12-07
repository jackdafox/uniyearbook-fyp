import EventForm from "@/components/events/EventForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[100rem]">
        <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-3 -ml-1">
          Create Event
        </h1>
        <p className="max-w-[30rem] mb-10 text-sm text-zinc-500">
          Organize and promote your own event with ease. Simply fill in the
          details, and you'll be all set to share your event with others. Start
          now and make your event a success!
        </p>
        <EventForm />
      </div>
    </div>
  );
};

export default page;
