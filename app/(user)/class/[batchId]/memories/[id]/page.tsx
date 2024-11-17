import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import MemoryIndividual from "@/components/memories/MemoryIndividual";
import { Memory } from "@mui/icons-material";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const memories = await prisma.memory.findUnique({
    where: { id: parseInt(params.id) },
    include: { User: true },
  });

  if (!memories) {
    return <div>Memory not found</div>;
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const comments = await prisma.comment.findMany({
    where: { memoryId: parseInt(params.id) },
    include: { User: true },
  });

  return (
    <div>
      <MemoryIndividual
        memories={{ ...memories, user: memories.User }}
        comments={comments.map((comment) => ({
          ...comment,
          user: comment.User,
        }))}
        user={user}
      />
    </div>
  );
};

export default page;
