"use server";

import prisma from "@/app/prisma";
import { BatchSchema } from "@/lib/form_schema";
import { z } from "zod";

type Inputs = z.infer<typeof BatchSchema>;
export async function addBatch(batchData: Inputs) {
  const result = BatchSchema.safeParse(batchData);

  if (result.success) {
    const faculty = await getFaculty(Number(batchData.faculty));

    const major = await getMajor(Number(batchData.major));

    if (faculty && major) {
      await prisma.batch.create({
        data: {
          name: batchData.name,
          majorId: major.id,
          facultyId: faculty.id,
        },
      });
    }

    return { success: true, data: result.data };
  }

  return { success: false, error: result.error.format() };
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
