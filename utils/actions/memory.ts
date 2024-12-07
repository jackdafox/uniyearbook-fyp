"use server";
import { CommentSchema, MemorySchema } from "@/lib/form_schema";
import { z } from "zod";
import { getUser } from "./user";
import prisma from "@/app/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./image";

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
