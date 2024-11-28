import prisma from "@/app/prisma"; // Adjust the path to your Prisma instance
import ClassClient from "@/components/class/ClassTemplate"; // Import the client component

export default async function ClassPage({
  params,
}: {
  params: { batchId: string };
}) {
  const batchId = parseInt(params.batchId, 10);

  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
    include: {
      Faculty: true,
      Major: true,
      Student: {
        include: {
          User: true,
        },
      },
    },
  });

  // If the batch is null, redirect to a 404 page
  if (!batch) {
    return <div>Batch not found</div>;
  }

  const { Faculty, Major, Student } = batch;
  const studentsWithUsers = Student.map((student) => ({
    ...student,
    user: student.User,
  }));

  const memories = await prisma.memory.findMany({
    where: { batch_id: batchId },
    include: { User: true },
  });

  return (
    <ClassClient
      batch={{
        ...batch,
        faculty: Faculty,
        major: Major,
        student: studentsWithUsers,
      }}
      memories={memories.map((memory) => ({
        ...memory,
        user: memory.User,
      }))}
    />
  );
}
