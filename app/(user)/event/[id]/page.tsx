import prisma from "@/app/prisma";
import EventIndividualPage from "@/components/events/EventIndividualPage";

const page = async ({ params }: { params: { id: string } }) => {
  const events = await prisma.event.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return (
    <>
      {events ? <EventIndividualPage event={events} /> : <div>Event not found</div>}
    </>
  );
};

export default page;
