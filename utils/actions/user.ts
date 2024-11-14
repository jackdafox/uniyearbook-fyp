import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
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
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;
  return await prisma.user.findUnique({
    where: { email: userEmail },
  });
}

export async function updateProfile(profileData: Inputs) {
  const result = EditProfileSchema.safeParse(profileData);
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
    await prisma.user.update({
      where: { id: user.id },
      data: {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        details: profileData.description,
      },
    });

    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
