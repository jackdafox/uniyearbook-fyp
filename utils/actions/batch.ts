"use server";

import prisma from "@/app/prisma";
import { BatchSchema } from "@/lib/form_schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof BatchSchema>;
export async function addBatch(batchData: Inputs) {
  try {
    const faculty = await getFaculty(parseInt(batchData.faculty));

    const major = await getMajor(parseInt(batchData.major));

    if (faculty && major) {
      const batch = await prisma.batch.create({
        data: {
          name: batchData.name,
          majorId: major.id,
          facultyId: faculty.id,
        },
      });

      revalidatePath("/admin");

      return { success: true, data: batch };
    }

    return { success: false, error: "Failed to create batch" };

  } catch (error) {
    return { success: false, error: "Failed to create batch"};
  }
}

async function getFaculty(facultyId: number) {
  return await prisma.faculty.findUnique({
    where: { id: facultyId },
  });
}

async function getMajor(majorId: number) {
  return await prisma.major.findUnique({
    where: { id: majorId },
  });
}
