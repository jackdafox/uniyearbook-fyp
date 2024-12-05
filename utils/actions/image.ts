"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { hash } from "bcrypt";
import { cookies } from "next/headers";

export async function uploadImage(image: File, location: string) {
  const supabase = createServerComponentClient({ cookies });
  const hashedFileName = await hash(image.name, 10);
  const urlsafe = hashedFileName.replace(/\//g, "").replace(/\+/g, "");
  const fileExtension = image.name.split('.').pop();
  const fullUrl = `${urlsafe}.${fileExtension}`;
  const { error } = await supabase.storage
    .from(`${location}`)
    .upload(`public/${fullUrl}`, image);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from(`${location}`)
    .getPublicUrl(`public/${fullUrl}`);

  return urlData?.publicUrl;
}
