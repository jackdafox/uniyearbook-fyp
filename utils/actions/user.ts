import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import { getServerSession } from "next-auth";

export async function getStudent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;
  return await prisma.student.findFirst({
    where: {
      User: {
        email: userEmail,
      },
    },
  });
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;
  return await prisma.user.findUnique({
    where: { email: userEmail },
  });
}
