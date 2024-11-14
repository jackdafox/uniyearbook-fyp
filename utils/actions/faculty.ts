"use server";

import prisma from "@/app/prisma";

export async function addFaculty(formData: FormData) {
  await prisma.faculty.create({
    data: {
      name: formData.get("name") as string,
    },
  });
}
