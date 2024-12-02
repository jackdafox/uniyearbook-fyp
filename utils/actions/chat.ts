"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import Pusher from "pusher";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createChat(recipentUserID: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized" };
  }

  const userEmail = session.user?.email;
  if (!userEmail) {
    return { error: "Unauthorized" };
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
  });

  try {
    const chat = await prisma.conversation.create({
      data: {
        name: "Chat + " + Math.random().toString(36).substring(2, 15),
        users: {
          connect: [{ id: user.id }, { id: recipentUserID }],
        },
      },
    });

    return { chat };
  } catch (error) {
    return { error: "Failed to create chat" };
  }
}

export async function createMessage({
  formData,
  conversationID,
}: {
  formData: FormData;
  conversationID: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized" };
  }

  const userEmail = session.user?.email;
  if (!userEmail) {
    return { error: "Unauthorized" };
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
  });

  const content = formData.get("content") as string;
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: "ap1",
    useTLS: true,
  });

  if (!content?.trim()) {
    return { error: "Content and sender are required" };
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        Conversation: { connect: { id: conversationID } },
        sender: {
          connect: { id: user.id },
        },
      },
      include: {
        sender: true,
      },
    });

    pusher.trigger("chat", "hello", message);

    return { message };
  } catch (error) {
    return { error: "Failed to create message" };
  }
}

export async function getMessages(conversationID: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        Conversation: { id: conversationID },
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { messages };
  } catch (error) {
    return { error: "Failed to fetch messages" };
  }
}
