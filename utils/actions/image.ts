"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { hash } from "bcrypt";
import { cookies } from "next/headers";

export async function uploadImage(image: File, location: string) {
  const supabase = createServerComponentClient({ cookies });
  const hashedFileName = await hash(image.name, 10);
  const { error } = await supabase.storage
    .from(`${location}`)
    .upload(`public/${hashedFileName}`, image);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from(`${location}`)
    .getPublicUrl(`public/${hashedFileName}`);

  return urlData?.publicUrl;
}
