"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Create the server action in a separate file (e.g., actions.ts)
// import { createEvent } from "@/app/actions";

const CreateEvent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  

  // async function handleSubmit(formData: FormData) {
  //   try {
  //     await createEvent({
  //       title: formData.get("title") as string,
  //       description: formData.get("description") as string,
  //       start_date: formData.get("startDate") as string,
  //     });

  //     alert("Event created successfully!");
  //     router.refresh();
  //     // Reset form (the form will reset automatically when the page refreshes)
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred while creating the event.");
  //   }
  // }

  return (
    <div className="mt-56 flex items-center justify-center text-black">
      <div className="w-full max-w-2xl p-8 border border-gray-600 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Create Event
        </h1>
        <form action={handleSubmit} className="space-y-6">
          <div className="w-full">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
              required
            />
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 text-white font-semibold rounded-md bg-black hover:bg-gray-900"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
// // /app/actions.ts

// 'use server'

// import { prisma } from "@/lib/prisma";

// export async function createEvent(data: {
//   title: string;
//   description: string;
//   start_date: string;
// }) {
//   try {
//     const event = await prisma.event.create({
//       data: {
//         title: data.title,
//         description: data.description,
//         start_date: new Date(data.start_date),
//       },
//     });
//     return event;
//   } catch (error) {
//     console.error('Failed to create event:', error);
//     throw new Error('Failed to create event');
//   }
// }