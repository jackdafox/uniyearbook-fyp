"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { eventJoined, eventParticipants } from "@/utils/actions/event";
import { toast } from "@/hooks/use-toast";
import { Participant } from "@prisma/client";

const EventJoin = ({
  participant,
  id,
}: {
  participant: Participant[];
  id: number;
}) => {
  const [joined, setJoined] = useState(true);

  useEffect(() => {
    checkJoined();
  }, []);

  const checkJoined = async () => {
    const response = await eventJoined(id);
    if (response) {
      setJoined(false);
    }
  };

  const handleJoin = async () => {
    const response = await eventParticipants(id);
    if (response.success) {
      toast({
        description: "Joined Successfully",
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 flex-wrap p-5 gap-5 px-10 rounded-lg">
      <h1 className="w-full text-center font-semibold ">
        {participant.length} Joined
      </h1>
      {joined ? (
        <Button className="w-[20rem]" onClick={handleJoin}>
          Join Now
        </Button>
      ) : (
        <Button className="w-[20rem]" disabled>
          Joined
        </Button>
      )}
    </div>
  );
};

export default EventJoin;
