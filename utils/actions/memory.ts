import { MemorySchema } from "@/lib/form_schema";
import { z } from "zod";
import { getUser } from "./user";
import prisma from "@/app/prisma";

type Inputs = z.infer<typeof MemorySchema>;

export async function addMemory(profileData: Inputs, batch_id: number) {
  const result = MemorySchema.safeParse(profileData);
  // const file = eventData.image;
  const user = await getUser();

  // // Upload image to Supabase storage
  // const { error } = await supabase.storage
  //   .from("profile")
  //   .upload(`public/${file.name}`, file);

  // if (error) {
  //   throw error;
  // }

  // // Retrieve the public URL of the uploaded image
  // const { data: urlData } = supabase.storage
  //   .from("profile")
  //   .getPublicUrl(`public/${file.name}`);

  if (result.success && user) {
    await prisma.memory.create({
      data: {
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

    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
