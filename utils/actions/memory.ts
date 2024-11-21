import { MemorySchema } from "@/lib/form_schema";
import { z } from "zod";
import { getUser } from "./user";
import prisma from "@/app/prisma";
import supabase from "@/app/supabase";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof MemorySchema>;

export async function addMemory(profileData: Inputs, batch_id: number) {
  const result = MemorySchema.safeParse(profileData);
  // const file = eventData.image;
  const user = await getUser();

  // Upload image to Supabase storage
  const { error } = await supabase.storage
    .from("memories")
    .upload(`${batch_id}/${profileData.photo.name}`, profileData.photo);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("profile")
    .getPublicUrl(`public/${profileData.photo.name}`);

  if (result.success && user && urlData) {
    try {
      const memory = await prisma.memory.create({
        data: {
          image_url: urlData.publicUrl,
          title: profileData.title,
          description: profileData.description,
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
