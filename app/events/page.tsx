'use client';

import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import { signIn, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '../prisma';

export default async function EventList() {
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     signIn(); // Redirect to the sign-in page if not authenticated
  //   }
  // }, [status]);


  // const [events, setEvents] = useState<Event[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('/api/events');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch events');
  //       }
  //       const data = await response.json();
  //       setEvents(data);
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);
  const { data: session } = useSession()

  if (!session) {
    redirect("/auth/login");
  }

  const userEmail = session.user!.email;
  const events = await prisma.event.findMany()

  return (
    <div className="my-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} id={event.id} title={event.title} description={event.description} participant={event.participant} start_date={event.start_date}/>
      ))}
    </div>
  );
}
