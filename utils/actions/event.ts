"use server";
import { z } from "zod";
import prisma from "@/app/prisma";
import { EventSchema } from "@/lib/form_schema";
import supabase from "@/app/supabase";
import { getStudent, getUser } from "./user";

type Inputs = z.infer<typeof EventSchema>;

export async function addEvent(eventData: Inputs) {
  const result = EventSchema.safeParse(eventData);
  const file = eventData.image;
  const user = await getUser();

  // Upload image to Supabase storage
  const { error } = await supabase.storage
    .from("profile")
    .upload(`public/${file.name}`, file);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("profile")
    .getPublicUrl(`public/${file.name}`);

  if (result.success && user) {
    await prisma.event.create({
      data: {
        title: eventData.title,
        start_date: eventData.date,
        description: eventData.description,
        likes: 0,
        image_url: urlData.toString(),
        User: { connect: { id: user.id } }, // Add the missing Student property
      },
    });

    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}

export async function eventLikes(eventId: number) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    return { success: false, error: "Event not found" };
  }

  await prisma.event.update({
    where: { id: eventId },
    data: { likes: event.likes + 1 },
  });

  return { success: true };
}

export async function eventParticipants(eventId: number) {
  const event = await getEvent(eventId);
  const user = await getUser();

  if (event && user) {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        Participants: { create: { User: { connect: { id: user.id } } } },
      },
    });
    return { success: true };
  }
  return { success: false };
}

async function getEvent(eventId: number) {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
}
