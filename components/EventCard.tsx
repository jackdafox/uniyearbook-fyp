import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import prisma from "@/app/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface EventImage {
  image_url: string;
}

interface Event {
  id: number;
  title: string;
  description: string | null;
  start_date: Date; // Date in string format
  participant: number;
}

export default function EventCard({
  id,
  title,
  description,
  start_date,
  participant,
}: Event) {
  const { data: session } = useSession();
  // const [joining, setJoining] = useState(false);

  // const handleJoin = async (eventId: number) => {
  //   setJoining(true);
  //   try {
  //     const response = await fetch(`/api/events/${eventId}/join`, {
  //       method: 'POST',
  //     });

  //     if (!response.ok) {
  //       const { message } = await response.json();
  //       alert(message);
  //     } else {
  //       alert('Successfully joined the event!');
  //       // Optionally, refresh the page or re-fetch the events to update the participant count
  //     }
  //   } catch (error) {
  //     console.error('Error joining event:', error);
  //     alert('An error occurred while trying to join the event.');
  //   } finally {
  //     setJoining(false);
  //   }
  // };

  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-800 mb-2">
          Start Date: {start_date.toDateString()}
        </p>
        <p className="text-gray-800 mb-2">Participants: {participant}</p>
        {session && (
          <button
            onClick={() => joinEvent(id)}
            className="mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
          >
          </button>
        )}
      </div>
    </div>
  );
}

async function joinEvent(id: number) {
}
