"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function uploadImage(image: File, location: string) {
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase.storage
    .from(`${location}`)
    .upload(`public/${image.name}`, image);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from(`${location}`)
    .getPublicUrl(`public/${image.name}`);

  return urlData?.publicUrl;
}
