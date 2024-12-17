import EventForm from "@/components/events/EventForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[52rem]">
        <div className="pl-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-6 sm:mt-10 mb-2 sm:mb-3">
            Create Event
          </h1>
          <p className="w-full mb-6 sm:mb-10 text-sm text-zinc-500">
            Organize and promote your own event with ease. Simply fill in the
            details, and you'll be all set to share your event with others.
            Start now and make your event a success!
          </p>
        </div>
        <EventForm />
      </div>
    </div>
  );
};

export default page;
