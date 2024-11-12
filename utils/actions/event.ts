"use server";
import { z } from "zod";
import prisma from "@/app/prisma";
import { EventSchema } from "@/lib/form_schema";

type Inputs = z.infer<typeof EventSchema>;

export async function addEvent(data: Inputs) {
  const result = EventSchema.safeParse(data);

  if (result.success) {
    await prisma.event.create({
      data: {
        title: data.title,
        participant: 0,
        start_date: data.date,
        description: data.description,
      },
    });

    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
