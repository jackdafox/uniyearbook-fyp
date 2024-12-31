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
    <div>
      {loading ? (
        <Button className="rounded-full" disabled>
          <Loader2 className="animate-spin mr-2" />
          Loading...
        </Button>
      ) : !joined ? (
        <Button
          onClick={handleJoin}
          className="rounded-full"
          disabled={loading}
        >
          Join
        </Button>
      ) : (
        <Button className="rounded-full" disabled>
          Joined
        </Button>
      )}
    </div>
  );
};

export default EventJoin;
