import prisma from "@/app/prisma";
import EventIndividualPage from "@/components/events/EventIndividualPage";
import { getStudent, getUser } from "@/utils/actions/user";

const page = async ({ params }: { params: { id: number } }) => {
  const events = await prisma.event.findUnique({
    where: {
      id: params.id,
    },
    include: {
      User: true,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      eventId: params.id
    },
    include: {
      User: true,
    },
  });

  return (
    <>
      {events && comments ? (
        <EventIndividualPage
          event={{ ...events, user: events.User }}
          comments={comments.map((comment) => ({
            ...comment,
            user: comment.User,
          }))}
        />
      ) : (
        <div>Event not found</div>
      )}
    </>
  );
};

export default page;
