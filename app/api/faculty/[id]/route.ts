// app/api/faculty/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/prisma'; // Adjust the path to your Prisma client

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const facultyId = parseInt(params.id, 10);

  try {
    const majors = await prisma.major.findMany({
      where: { faculty_id: facultyId },
    });

    const batches = await prisma.batch.findMany({
      where: { facultyId },
    });

    return NextResponse.json({ majors, batches });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
