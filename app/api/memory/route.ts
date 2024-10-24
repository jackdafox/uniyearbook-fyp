import { NextResponse } from 'next/server';
import prisma from '@/app/prisma'; // Adjust the path to your Prisma client

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, batch_id, imageUrl } = body;

    // Create the new memory in the database
    const newMemory = await prisma.memory.create({
      data: {
        title,
        batch_id,
        MemoryImage: {
          create: {
            image_url: imageUrl,
          },
        },
      },
    });

    // Return the newly created memory
    return NextResponse.json(newMemory, { status: 201 });
  } catch (error) {
    console.error('Error creating memory:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
