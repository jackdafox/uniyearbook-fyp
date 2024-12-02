import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import Navbar from "./Navbar";

const NavbarPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // or return a placeholder if needed
  }

  const userEmail = session.user?.email!;
  const userProfile = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      conversations: {
        include: {
          users: true,
          messages: {
            include: {
              sender: true,
            },
          },
        },
      },
    },
  });

  if (!userProfile) {
    return null; // or return a placeholder if needed
  }

  const usersWithoutChat = await prisma.user.findMany({
    where: {
      NOT: {
        conversations: {
          some: {
            users: {
              some: {
                id: userProfile.id,
              },
            },
          },
        },
      },
      id: { not: userProfile.id },
    },
  });

  return (
    <Navbar
      currentUser={{
        ...userProfile,
        conversations: userProfile?.conversations.map((conversation) => ({
          ...conversation,
          user: conversation.users.map((user) => ({
            ...user,
          })),
          messages: conversation.messages.map((message) => ({
            ...message,
            sender: {
              ...message.sender,
            },
          })),
        })),
      }}
      userList={usersWithoutChat}
    />
  );
};

export default NavbarPage;
