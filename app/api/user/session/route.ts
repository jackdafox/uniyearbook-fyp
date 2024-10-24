// app/api/user/session/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/prisma'; // Adjust the path to your Prisma client
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust path

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "No user is authenticated" }, { status: 401 });
    }

    // Step 1: Fetch the user with the Batch relation included
    let user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        Student: {
          include: {
            Batch: true, // Attempt to include Batch relation
          },
        },
      },
    });

    // // Step 2: If the user has no Batch, fetch again without including it
    // if (user?.Student && !user.Student.Batch) {
    //   let user = await prisma.user.findUnique({
    //     where: {
    //       email: session.user.email,
    //     },
    //     include: {
    //       Student: true, // Fetch Student without Batch relation
    //     },
    //   });
    // }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
