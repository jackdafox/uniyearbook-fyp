import { NextResponse } from "next/server";
import prisma from "@/app/prisma"; // Adjust the path as necessary

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    const batches = await prisma.batch.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query, // This allows partial matches for the batch name
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            Faculty: {
              name: {
                contains: query, // Partial matches for the faculty name
                mode: "insensitive", // Case-insensitive search
              },
            },
          },
          {
            Major: {
              name: {
                contains: query, // Partial matches for the major name
                mode: "insensitive", // Case-insensitive search
              },
            },
          },
        ],
      },
      include: {
        Faculty: true,
        Major: true,
      },
    });
    

    return NextResponse.json(batches);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
