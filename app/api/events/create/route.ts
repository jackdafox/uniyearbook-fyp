// app/api/events/create/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/prisma'; // Adjust the path to your Prisma client

export async function POST(request: Request) {
  const { title, description, start_date } = await request.json();

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        start_date: new Date(start_date),
        participant: 0,
      },
    });

    return NextResponse.json({ message: 'Event created successfully!', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
