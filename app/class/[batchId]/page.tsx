import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma"; // Adjust the path to your Prisma instance
import ClassClient from "@/components/class/ClassTemplate"; // Import the client component
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";
import { useEffect } from "react";

export default async function ClassPage({ params }: { params: { batchId: string } }) {

  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to the login page if the user is not authenticated
    redirect("/auth/login");
  }

  const batchId = parseInt(params.batchId, 10);

  // Step 1: Fetch batch information, including related faculty, major, and students
  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
    include: {
      Faculty: true,
      Major: true,
      Student: {
        include: {
          User: true,
        },
      },
    },
  });

  // If the batch is null, redirect to a 404 page
  if (!batch) {
    return notFound();
  }

  // Step 2: Fetch memories associated with the batch using the Batch relation
  const memories = await prisma.memory.findMany({
    where: {
      batch_id: batchId, // Use the batch_id directly as it's a field in the Memory model
    },
    include: {
      MemoryImage: true, // Include related memory images
    },
  });

  return <ClassClient batch={batch} memories={memories} />;
}
