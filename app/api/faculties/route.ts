// app/api/faculties/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/prisma'; // Adjust the path to your Prisma client

export async function GET() {
  try {
    const faculties = await prisma.faculty.findMany();
    return NextResponse.json(faculties);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 2323 });
  }
}
