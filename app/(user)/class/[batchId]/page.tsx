import prisma from "@/app/prisma"; // Adjust the path to your Prisma instance
import ClassClient from "@/components/class/ClassTemplate"; // Import the client component
import { getUser } from "@/utils/actions/user";

export default async function ClassPage({
  params,
}: {
  params: { batchId: string };
}) {
  const currentUser = await getUser();
  const batchId = parseInt(params.batchId, 10);

  if (!currentUser) {
    return <div>User not found</div>;
  }

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

  // Check if the current user is in the batch
  const isUserInBatch = batch?.Student.some(
    (student) => student.userId === currentUser.id
  );
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

  if (!isUserInBatch) {
    return (<ClassClient
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
      personal={false}
    />);
  }

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
      personal={isUserInBatch}
    />
  );
}
