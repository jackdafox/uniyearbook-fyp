"use server";

import prisma from "@/app/prisma";
import { FacultySchema } from "@/lib/form_schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof FacultySchema>;

export async function addFaculty(facultyData: Inputs) {
  try {
    const faculty = await prisma.faculty.create({
      data: {
        name: facultyData.name,
      },
    });

    revalidatePath("/admin");
    return { success: true, data: faculty };
  } catch (error) {
    return { success: false, error: "Failed to create faculty" };
  }
}

export async function deleteFaculty(facultyId: number) {
  try {
    // Delete related majors and batches
    await prisma.major.deleteMany({
      where: {
        faculty_id: facultyId,
      },
    });

    await prisma.batch.deleteMany({
      where: {
        facultyId: facultyId,
      },
    });

    // Delete the faculty
    await prisma.faculty.delete({
      where: {
        id: facultyId,
      },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete faculty" };
  }
}
