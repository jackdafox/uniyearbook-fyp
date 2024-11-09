import React from "react";
import MemoryCard2 from "../memories/MemoryCard2";

const EventSearchPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight mt-5 -ml-1">
        Events
      </h1>
      <p className="text-lg tracking-tight mt-2">Results : 5</p>
      <hr className="mb-10 mt-2" />
    <div className="columns-3 w-full gap-5 box-border">
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
      <MemoryCard2 />
    </div>
    </div>
  );
};

export default EventSearchPage;
