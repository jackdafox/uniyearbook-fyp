"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import { EditProfileSchema } from "@/lib/form_schema";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { uploadImage } from "./image";

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

export async function updateProfile(profileData: FormData) {
  const photo = profileData.get("photo") as File | null;
  const first_name = profileData.get("first_name") as string;
  const last_name = profileData.get("last_name") as string;
  const description = profileData.get("description") as string;
  const batches = profileData.get("batch") as string;
  
  const user = await getUser();

  let urlData = "";
  if(photo) {
      urlData = await uploadImage(photo, "profile");
  }

  if (user) {
    try {
      const batch = await prisma.batch.findFirst({
        where: {
          id: parseInt(batches),
        }
      })

      const student = await prisma.student.upsert({
        where: { id: user.id },
        update: {
          Batch: {
            connect: {
              id: batch?.id,
            },
          },
        },
        create: {
          Batch: {
            connect: {
              id: batch?.id,
            },
          },
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      const profile = await prisma.user.update({
        where: { id: user.id },
        data: {
          profile_picture: urlData,
          first_name: first_name,
          last_name: last_name,
          details: description,
        },
      });

      return { success: true, data: profile, student };
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  }
  return { success: false, error: "Failed to update profile" };
}
