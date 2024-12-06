import prisma from "@/app/prisma";
import SearchPage from "@/components/search/SearchPage";
import React from "react";

const Page = async () => {
  const [batch, user, events, memories] = await Promise.all([
    prisma.batch.findMany({ include: { Faculty: true, Major: true, Student: true } }),
    prisma.user.findMany({
      include: {
        Student: {
          include: {
            Batch: { include: { Major: true, Faculty: true } },
          },
        },
      },
    }),
    prisma.event.findMany(),
    prisma.memory.findMany({ include: { User: true, Batch: true } }),
  ]);

  const formattedBatch = batch.map((b) => ({
    ...b,
    faculty: b.Faculty,
    major: b.Major,
    students: b.Student,
  }));

  const formattedMemories = memories.map((m) => ({ ...m, user: m.User }));

  const formattedUsers = user.map((u) => ({
    ...u,
    student: u.Student
      ? {
          ...u.Student,
          batch: u.Student.Batch
            ? {
                ...u.Student.Batch,
                major: u.Student.Batch.Major,
                faculty: u.Student.Batch.Faculty,
              }
            : defaultBatch(),
        }
      : defaultStudent(),
  }));

  return (
    <div className="mt-20 px-60">
      <SearchPage batch={formattedBatch} events={events} memories={formattedMemories} users={formattedUsers} />
    </div>
  );
};

const defaultBatch = () => ({
  id: 0,
  name: '',
  majorId: 0,
  facultyId: 0,
  major: { id: 0, name: '', faculty_id: 0 },
  faculty: { id: 0, name: '' },
});

const defaultStudent = () => ({
  id: 0,
  userId: 0,
  batch_id: 0,
  batch: defaultBatch(),
});

export default Page;
