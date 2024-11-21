import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import supabase from "@/app/supabase";
import { EditProfileSchema } from "@/lib/form_schema";
import { getServerSession } from "next-auth";
import { z } from "zod";

type Inputs = z.infer<typeof EditProfileSchema>;

export async function getStudent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;
  return await prisma.student.findFirst({
    where: {
      User: {
        email: userEmail,
      },
    },
  });
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; 
  }

  const userEmail = session.user?.email!;
  return await prisma.user.findUnique({
    where: { email: userEmail },
  });
}

export async function updateProfile(profileData: Inputs) {
  const file = profileData.photo;
  const user = await getUser();

  // Upload image to Supabase storage
  const { error } = await supabase.storage
    .from("profile")
    .upload(`public/${file.name}`, file);

  if (error) {
    throw error;
  }

  // Retrieve the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("profile")
    .getPublicUrl(`public/${file.name}`);

  if (user) {
    try {
      const profile = await prisma.user.update({
        where: { id: user.id },
        data: {
          profile_picture: urlData.publicUrl,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          details: profileData.description,
        },
      });

      return { success: true, data: profile };
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  }
  return { success: false, error: "Failed to update profile" };
}
