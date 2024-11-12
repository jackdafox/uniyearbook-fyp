"use server";

import prisma from "@/app/prisma";

export async function addMajor(formData: FormData) {
  const faculty = await getFaculty(
    Number(formData.get("facultyId") as unknown)
  );

  if (faculty) {
    await prisma.major.create({
      data: {
        name: formData.get("name") as string,
        faculty_id: faculty.id,
      },
    });
  }
}

async function getFaculty(majorId: number) {
  return await prisma.major.findUnique({
    where: { id: majorId },
  });
}