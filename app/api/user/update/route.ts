// app/api/user/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/prisma"; // Adjust the path to your Prisma client

export async function POST(request: Request) {
  try {
    const {
      email,
      firstName,
      lastName,
      details,
      contacts,
      facultyId,
      majorId,
      batchId,
      profilePicture,
    } = await request.json();


    // Step 1: Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }, 
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Step 2: Upsert the student data
    const upsertStudent = await prisma.student.upsert({
      where: {
        userId: user.id,
      },
      update: {
        batch_id: parseInt(batchId, 10),
      },
      create: {
        userId: user.id,
        batch_id: parseInt(batchId, 10),
      },
    });
    
    console.log(`Student upserted:`, upsertStudent);

    // Step 3: Update the user's basic information
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        first_name: firstName,
        last_name: lastName,
        details,
        contacts,
        profile_picture: profilePicture,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json;
  }
}
