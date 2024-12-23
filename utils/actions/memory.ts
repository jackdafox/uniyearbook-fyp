"use server";
import { CommentSchema, MemorySchema } from "@/lib/form_schema";
import { z } from "zod";
import { getUser } from "./user";
import prisma from "@/app/prisma";
import { revalidatePath } from "next/cache";
import { changeImage, uploadImage } from "./image";

type Inputs = z.infer<typeof MemorySchema>;
type CommentInput = z.infer<typeof CommentSchema>;

export async function addMemory(memoryData: FormData, batch_id: number) {

  const title = memoryData.get("title") as string;
  const description = memoryData.get("description") as string;
  const image = memoryData.get("photo") as File | null;

  let imageUrl = "";
  if (image) {
    imageUrl = await uploadImage(image, "memories");
  }

  const user = await getUser();

  if (user) {
    try {
      const memory = await prisma.memory.create({
        data: {
          image_url: imageUrl,
          title: title,
          description: description,
          User: {
            connect: {
              id: user.id,
            },
          },
          Batch: {
            connect: {
              id: batch_id,
            },
          },
        },
      });

      return { success: true, data: memory };
    } catch (error) {
      return { success: false, error: "Failed to create memory" };
    }
  }
  return { success: false, error: "Failed to create memory" };
}

export async function memoryComment(eventForm: CommentInput, memoryId: number, batchId: number) {
  const user = await getUser();

  if (user) {
    const comment = await prisma.comment.create({
      data: {
        content: eventForm.comment,
        Memory: { connect: { id: memoryId } },
        User: { connect: { id: user.id } },
      },
    });

    revalidatePath(`/class/${batchId}/memories/${memoryId}`);

    return { success: true, data: comment };
  }

  return { success: false, error: "User not found" };
}

export async function deleteMemory(memoryId: number) {
  const user = await getUser();

  if (user) {
    const memory = await prisma.memory.findUnique({
      where: { id: memoryId },
    });

    if (memory) {
      await prisma.memory.delete({
        where: { id: memory.id },
      });

      revalidatePath("/manage");

      return { success: true, data: memory };
    }
  }

  return { success: false };
}

export async function updateMemory(formData: FormData, memoryId: number, initialUrl: string) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("photo") as File | null;

  let imageUrl = "";
  if (image) {
    imageUrl = await changeImage("memories", initialUrl, image);
  }

  const user = await getUser();

  if (user) {
    try {
      const memory = await prisma.memory.update({
        where: { id: memoryId },
        data: {
          image_url: imageUrl,
          title: title,
          description: description,
        },
      });

      revalidatePath(`/manage`);

      return { success: true, data: memory };
    } catch (error) {
      return { success: false, error: "Failed to update memory" };
    }
  }
  return { success: false, error: "Failed to update memory" };
}
