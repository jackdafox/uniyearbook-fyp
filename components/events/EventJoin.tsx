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
    <div className="flex flex-col justify-center items-center border-[1px] flex-wrap p-5 gap-5 px-10 rounded-lg">
      <h1 className="w-full text-center font-semibold ">
        {participant.length} Joined
      </h1>
      {loading ? (
        <Button className="w-[20rem]" disabled>
          <Loader2 className="animate-spin" />
          Loading...
        </Button>
      ) : !joined ? (
        <Button onClick={handleJoin} className="w-[20rem]" disabled={loading}>
          Join
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
