"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { eventJoined, eventParticipants } from "@/utils/actions/event";
import { toast } from "@/hooks/use-toast";
import { Participant } from "@prisma/client";
import { Loader2 } from "lucide-react";

const EventJoin = ({
  participant,
  id,
}: {
  participant: Participant[];
  id: number;
}) => {
  const [joined, setJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkJoined();
  }, []);

  const checkJoined = async () => {
    const response = await eventJoined(id);
    setJoined(response);
    setLoading(false);
  };

  const handleJoin = async () => {
    setLoading(true);
    const response = await eventParticipants(id);
    if (response.success) {
      setJoined(true);
      toast({
        description: "Joined Successfully",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center border-[1px] flex-wrap p-3 sm:p-5 gap-3 sm:gap-5 px-4 sm:px-10 rounded-lg w-full max-w-[24rem] mx-auto">
      <h1 className="w-full text-center font-semibold text-sm sm:text-base">
      {participant.length} Joined
      </h1>
      {loading ? (
      <Button className="w-full sm:w-[20rem]" disabled>
        <Loader2 className="animate-spin mr-2" />
        Loading...
      </Button>
      ) : !joined ? (
      <Button onClick={handleJoin} className="w-full sm:w-[20rem]" disabled={loading}>
        Join
      </Button>
      ) : (
      <Button className="w-full sm:w-[20rem]" disabled>
        Joined
      </Button>
      )}
    </div>
  );
};

export default EventJoin;
