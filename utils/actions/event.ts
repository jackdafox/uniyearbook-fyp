"use server";
import { z } from "zod";
import prisma from "@/app/prisma";
import { EventSchema } from "@/lib/form_schema";
import supabase from "@/app/supabase";
import { getStudent, getUser } from "./user";

type Inputs = z.infer<typeof EventSchema>;

export async function addEvent(eventData: Inputs) {
  const file = eventData.image;
  const user = await getUser();

  // Upload image to Supabase storage
  const { error } = await supabase.storage
    .from("event")
    .upload(`public/${file.name}`, file);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("event")
    .getPublicUrl(`public/${file.name}`);

  if (user) {
    try {
      const event = await prisma.event.create({
        data: {
          title: eventData.title,
          start_date: eventData.date,
          description: eventData.description,
          likes: 0,
          image_url: urlData.publicUrl,
          User: { connect: { id: user.id } }, // Add the missing Student property
        },
      });

      return { success: true, data: event };
    } catch (error) {
      return { success: false, error: error };
    }
  }
  return { success: false, error: "User Not Found" };
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
