"use server";

import prisma from "@/app/prisma";

export async function addBatch(formData: FormData) {
  const faculty = await getFaculty(
    Number(formData.get("facultyId") as unknown)
  );

  const major = await getMajor(Number(formData.get("majorId") as unknown));

  if (faculty && major) {
    await prisma.batch.create({
      data: {
        name: formData.get("name") as string,
        majorId: major.id,
        facultyId: faculty.id,
      },
    });
  }
}

async function getFaculty(majorId: number) {
  return await prisma.major.findUnique({
    where: { id: majorId },
  });
}

async function getMajor(majorId: number) {
  return await prisma.major.findUnique({
    where: { id: majorId },
  });
}
