import prisma from "@/app/prisma";
import SearchPage from "@/components/search/SearchPage";
import React from "react";

const page = async () => {
  const batch = await prisma.batch.findMany({
    include: {
      Faculty: true,
      Major: true,
      Student: true,
    },
  });
  const user = await prisma.user.findMany({
    include: {
      Student: {
        include: {
          Batch: {
            include: {
              Major: true,
              Faculty: true,
            },
          },
        },
      },
    },
  });
  const events = await prisma.event.findMany();
  const memories = await prisma.memory.findMany({
    include: {
      User: true,
    },
  });

  return (
    <div>
      <SearchPage
        batch={batch.map((b) => ({
          ...b,
          faculty: b.Faculty,
          major: b.Major,
          students: b.Student,
        }))}
        events={events}
        memories={memories.map((m) => ({ ...m, user: m.User }))}
        users={user.map((u) => ({
          ...u,
          student: {
            ...u.Student!,
            batch: {
              ...u.Student!.Batch,
              major: u.Student!.Batch?.Major,
              faculty: u.Student!.Batch?.Faculty,
            },
          },
        }))}
      />
    </div>
  );
};

export default page;
