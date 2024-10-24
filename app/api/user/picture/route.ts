// File: pages/api/get-user-profile-picture.ts

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch the user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch user profile by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { profile_picture: true }, // Only select profile_picture field
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const profilePicture = user.profile_picture || null;

    // Log the profile picture for debugging
    console.log(profilePicture);

    // Return the profile picture
    return NextResponse.json({ profilePicture });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
