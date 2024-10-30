import React from "react";
import { Button } from "../ui/button";

const EventJoin = ({ participant }: { participant: number }) => {
  return (
    <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 flex-wrap p-5 gap-5 px-10 rounded-lg">
      <h1 className="w-full text-center font-semibold ">{participant} Joined</h1>
      <Button className="w-[20rem]">Join Now</Button>
    </div>
  );
};

export default EventJoin;
