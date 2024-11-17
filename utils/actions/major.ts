"use server";

import prisma from "@/app/prisma";
import { MajorSchema } from "@/lib/form_schema";
import { z } from "zod";

type Inputs = z.infer<typeof MajorSchema>;

export async function addMajor(majorData: Inputs) {
  const result = await MajorSchema.safeParse(majorData);

  if (result.success) {
    const faculty = await prisma.faculty.findUnique({
      where: { id: parseInt(majorData.faculty) },
    });

    if (faculty) {
      await prisma.major.create({
        data: {
          name: majorData.name,
          faculty_id: faculty.id,
        },
      });
    }

    return { success: true, data: result.data };
  }

  return { success: false, error: result.error.format() };
}
