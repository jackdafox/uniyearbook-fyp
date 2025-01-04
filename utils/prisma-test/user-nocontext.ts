import prisma from "@/app/prisma";

interface CreateUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: user,
  });
}
