"use server";

import prisma from "@/app/prisma";
import { MajorSchema } from "@/lib/form_schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof MajorSchema>;

export async function addMajor(majorData: Inputs) {

  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: parseInt(majorData.faculty) },
    });

    if (faculty) {
      const major = await prisma.major.create({
        data: {
          name: majorData.name,
          faculty_id: faculty.id,
        },
      });

      revalidatePath("/admin");

      return { success: true, data: major };
    }

    return { success: false, error: "Failed to create major" };
  }
  catch (error) {
    return { success: false, error: "Failed to create major" };
  }

}
