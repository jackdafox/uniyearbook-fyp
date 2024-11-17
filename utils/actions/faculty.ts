"use server";

import prisma from "@/app/prisma";
import { FacultySchema } from "@/lib/form_schema";
import { z } from "zod";

type Inputs = z.infer<typeof FacultySchema>;

export async function addFaculty(facultyData: Inputs) {
  const result = FacultySchema.safeParse(facultyData);

  if (result.success) {
    await prisma.faculty.create({
      data: {
        name: facultyData.name,
      },
    });

    return { success: true, data: result.data };
  }

  return { success: false, error: result.error.format() };
}
