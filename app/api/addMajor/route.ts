import prisma from "@/app/prisma"; // Adjust the path to your Prisma instance
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    console.log("Received data for major creation:", res); // Log incoming data

    const { name, faculty_id } = res;

    // Convert faculty_id to a number
    const facultyIdInt = parseInt(faculty_id, 10);

    // Validate that faculty_id is a valid number
    if (isNaN(facultyIdInt)) {
      return NextResponse.json({ error: "Invalid faculty ID format" }, { status: 400 });
    }

    // Validate that faculty_id exists in the database
    const facultyExists = await prisma.faculty.findUnique({
      where: { id: facultyIdInt },
    });

    if (!facultyExists) {
      return NextResponse.json({ error: "Invalid faculty ID" }, { status: 400 });
    }

    // Proceed with major creation
    const major = await prisma.major.create({
      data: {
        name,
        faculty_id: facultyIdInt, // Use the converted number
      },
    });

    return NextResponse.json(major);
  } catch (error) {
    console.error("Error adding major:", error); // Log the error details
    return NextResponse;
  }
}
