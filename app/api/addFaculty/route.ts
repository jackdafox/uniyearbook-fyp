import prisma from "@/app/prisma"; // Adjust the path to your Prisma instance
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { name } = res;

  try {
    const faculty = await prisma.faculty.create({
      data: {
        name,
      },
    });

    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json({ error: "Error adding faculty" }, { status: 500 });
  }
}
