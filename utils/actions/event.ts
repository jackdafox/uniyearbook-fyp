"use server";
import { z } from "zod";
import prisma from "@/app/prisma";
import { EventSchema } from "@/lib/form_schema";
import { getUser } from "./user";
import { uploadImage } from "./image";
import { revalidatePath } from "next/cache";
import { CommentSchema } from "@/lib/form_schema";

type Inputs = z.infer<typeof EventSchema>;
type CommentInput = z.infer<typeof CommentSchema>;

export async function addEvent(eventData: FormData) {
  const title = eventData.get("title") as string;
  const description = eventData.get("description") as string;
  const date = eventData.get("date") as string;
  const image = eventData.get("image") as File | null;
  const location = eventData.get("location") as string;

  let imageUrl = "";
  if (image) {
    imageUrl = await uploadImage(image, "event");
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
          location: location,
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

    revalidatePath(`/event/${eventId}`);
    return { success: true };
  }
  return { success: false };
}

async function getEvent(eventId: number) {
  return await prisma.event.findUnique({
    where: { id: eventId },
  });
}

export async function eventJoined(eventId: number) {
  const event = await getEvent(eventId);
  const user = await getUser();

  if (event && user) {
    const participants = await prisma.participant.findFirst({
      where: {
        eventId: eventId,
        userId: user.id,
      },
    });

    if (participants) {
      return true;
    }

    revalidatePath(`/event/${eventId}`);

    return false;
  }

  return false;
}

export async function eventComment(eventForm: CommentInput, eventId: number) {
  const user = await getUser();

  if (user) {
    const comment = await prisma.comment.create({
      data: {
        content: eventForm.comment,
        Event: { connect: { id: eventId } },
        User: { connect: { id: user.id } },
      },
    });

    revalidatePath(`/event/${eventId}`);

    return { success: true, data: comment };
  }

  return { success: false, error: "User not found" };
}
