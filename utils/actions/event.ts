"use server";
import { z } from "zod";
import prisma from "@/app/prisma";
import { EventSchema } from "@/lib/form_schema";
import supabase from "@/app/supabase";
import { getStudent, getUser } from "./user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { image } from "@nextui-org/theme";
import { uploadImage } from "./image";

type Inputs = z.infer<typeof EventSchema>;

export async function addEvent(eventData: FormData) {
  const title = eventData.get("title") as string;
  const description = eventData.get("description") as string;
  const date = eventData.get("date") as string;
  const image = eventData.get("image") as File | null;

  let imageUrl = ''
  if (image) {
    imageUrl = await uploadImage(image, 'event')
  }

  const user = await getUser();

  if (user) {
    try {
      const event = await prisma.event.create({
        data: {
          title: title,
          start_date: date,
          description: description,
          likes: 0,
          image_url: imageUrl,
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
