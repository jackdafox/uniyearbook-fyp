import prisma from "@/app/prisma"; // Adjust the path to your Prisma instance
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    console.log("Received data for batch creation:", res); // Log incoming data

    const { name, majorId, facultyId } = res;

    // Convert facultyId and majorId to integers
    const facultyIdInt = parseInt(facultyId, 10);
    const majorIdInt = parseInt(majorId, 10);

    // Validate that both IDs are valid numbers
    if (isNaN(facultyIdInt) || isNaN(majorIdInt)) {
      return NextResponse.json({ error: "Invalid faculty or major ID format" }, { status: 400 });
    }

    // Validate that facultyId exists in the database
    const facultyExists = await prisma.faculty.findUnique({
      where: { id: facultyIdInt },
    });

    if (!facultyExists) {
      return NextResponse.json({ error: "Invalid faculty ID" }, { status: 400 });
    }

    // Validate that majorId exists in the database
    const majorExists = await prisma.major.findUnique({
      where: { id: majorIdInt },
    });

    if (!majorExists) {
      return NextResponse.json({ error: "Invalid major ID" }, { status: 400 });
    }

    // Proceed with batch creation
    const batch = await prisma.batch.create({
      data: {
        name,
        majorId: majorIdInt, // Use the converted number
        facultyId: facultyIdInt, // Use the converted number
      },
    });

    return NextResponse.json(batch);
  } catch (error) {
    console.error("Error adding batch:", error); // Log the error details
    return NextResponse.json({ error: error.message || "Error adding batch" }, { status: 500 });
  }
}
