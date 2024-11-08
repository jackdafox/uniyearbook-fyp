import React from "react";
import EventProfile from "../events/EventProfile";

const MemoryIndividual = () => {
  return (
    <div className="flex rounded-3xl h-fit w-fit gap-3 p-3 bg-zinc-100">
      <img
        src="https://www.cultura.id/wp-content/uploads/2023/11/Daniel-Caesar-Never-Enough.jpg"
        className="rounded-xl max-w-96"
      />
      <div className="flex flex-col w-full min-w-96 gap-2">
        <h1 className="text-[2rem] font-semibold">Title</h1>
        <p className="text-sm">Description</p>
      </div>
    </div>
  );
};

export default MemoryIndividual;
