import prisma from "@/app/prisma";
import EventIndividualPage from "@/components/events/EventIndividualPage";
import { getUser } from "@/utils/actions/user";

const page = async ({ params }: { params: { id: string } }) => {
  const events = await prisma.event.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      User: true,
      Participants: true,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      eventId: parseInt(params.id),
    },
    include: {
      User: true,
    },
  });

  const user = await getUser();

  return (
    <>
      {events && comments && user ? (
        <EventIndividualPage
          event={{
            ...events,
            user: events.User,
            participant: events.Participants,
          }}
          comments={comments.map((comment) => ({
            ...comment,
            user: comment.User,
          }))}
          currentUser={user}
        />
      ) : (
        <div>Event not found</div>
      )}
    </>
  );
};

export default page;
