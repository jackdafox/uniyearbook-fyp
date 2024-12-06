"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import { SocialsSchema } from "@/lib/form_schema";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { uploadImage } from "./image";
import { hash } from "bcrypt";

type Inputs = z.infer<typeof SocialsSchema>;

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
  const contact = profileData.get("contact") as string;

  console.log(batches);

  const user = await getUser();

  let urlData = "";
  if (photo) {
    urlData = await uploadImage(photo, "profile");
  }

  if (user) {
    try {
      const batch = await prisma.batch.findFirst({
        where: {
          id: parseInt(batches),
        },
      });

      const student = await prisma.student.upsert({
        where: { userId: user.id },
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
      });

      if (!photo) {
        urlData = user.profile_picture ?? "";
      }

      const profile = await prisma.user.update({
        where: { id: user.id },
        data: {
          profile_picture: urlData,
          first_name: first_name,
          last_name: last_name,
          details: description,
          contacts: contact,
        },
      });

      return { success: true, data: profile, student };
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  }
  return { success: false, error: "Failed to update profile" };
}

export async function registerUser(profileData: FormData) {
  const email = profileData.get("email") as string;
  const password = profileData.get("password") as string;
  const first_name = profileData.get("first_name") as string;
  const last_name = profileData.get("last_name") as string;
  const batches = profileData.get("batch") as string;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = await hash(password, 10);

    const batch = await prisma.batch.findFirst({
      where: {
        id: parseInt(batches),
      },
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        profile_picture: "",
      },
    });

    const student = await prisma.student.create({
      data: {
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
    });

    return { success: true, data: user, student };
  } catch (error) {
    return { success: false, error: "Failed to register user" };
  }
}

export async function addSocials(socialData: Inputs) {
  const user = await getUser();

  if (user) {
    try {
      const social = await prisma.socials.create({
        data: {
          name: socialData.name,
          link: socialData.link,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return { success: true, data: social };
    } catch (error) {
      return { success: false, error: "Failed to add social" };
    }
  }
  return { success: false, error: "Failed to add social" };
}
