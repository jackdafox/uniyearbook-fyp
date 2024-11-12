"use server";

import prisma from "@/app/prisma";

export async function addEvent(formData: FormData) {
  await prisma.event.create({
    data : {
        title: formData.get("title") as string,
        participant: 0,
        start_date: new Date(formData.get("start_date") as string),
        description: formData.get("description") as string
    }
  })
}