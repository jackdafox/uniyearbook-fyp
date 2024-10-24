import { NextResponse } from 'next/server';
import prisma from '@/app/prisma'; // Ensure you have a prisma.ts file in /lib
import { getServerSession } from 'next-auth'; // Adjust this based on your authentication setup
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust path as necessary

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // Fetch the session
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Extract the user's email from the session
  const userEmail = session.user.email;

  // Fetch the user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // If user is not found, return an error
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Fetch the student by user ID
  const student = await prisma.student.findUnique({
    where: { userId: user.id },
  });

  // If student is not found, return an error
  if (!student) {
    return NextResponse.json({ message: 'Student record not found' }, { status: 404 });
  }

  const studentId = student.id;
  const eventId = parseInt(params.id, 10);

  try {
    // Check if the student has already joined this event
    const existingParticipant = await prisma.participant.findUnique({
      where: {
        studentId_eventId: { studentId, eventId },
      },
    });

    if (existingParticipant) {
      return NextResponse.json({ message: 'You have already joined this event.' }, { status: 400 });
    }

    // Add the participant and update the event participant count
    await prisma.participant.create({
      data: { studentId, eventId },
    });

    await prisma.event.update({
      where: { id: eventId },
      data: { participant: { increment: 1 } },
    });

    return NextResponse.json({ message: 'Joined successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
