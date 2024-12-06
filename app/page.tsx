import Link from "next/link";
import EditCalendar from "@mui/icons-material/EditCalendar";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { blue, orange, pink, red } from "@mui/material/colors";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/app/prisma";
import { redirect } from "next/navigation";
import Searchbar from "@/components/search/SearchbarPage";
import Navbar from "@/components/navbar/Navbar";
import NavbarPage from "@/components/navbar/NavbarData";

export default async function Index() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userEmail = session.user?.email!;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
  });

  if(!user) {
    redirect("/login");
  }

  // Fetch the student's batch ID using the user's ID
  const student = user
    ? await prisma.student.findUnique({
        where: { userId: user.id },
      })
    : null;

  const batchId = student?.batch_id;

  return (
    <div className="w-full">
      <NavbarPage />
      <div className="mt-24 flex flex-col items-center justify-center py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">
            The Ultimate Yearbook Experience
          </h1>
          <p className="text-gray-600">
            Capture memories, connect with classmates, and celebrate milestones.
          </p>
        </div>

        <div className="w-full max-w-xl mb-8">
          <Searchbar />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link href="/event/create">
            <div className="p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-pink-300 max-w-fit rounded-lg p-2">
                <EditCalendar sx={{ color: pink[500] }} />
              </div>
              <h2 className="mt-4 text-base">Create Event</h2>
              <p className="mt-4 text-sm text-gray-500">Plan a new event</p>
            </div>
          </Link>

          <Link href={batchId ? `/class/${batchId}` : "#"}>
            <div className="p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-orange-300 max-w-fit rounded-lg p-2">
                <SchoolIcon sx={{ color: orange[500] }} />
              </div>
              <h2 className="mt-4 text-base">Your Class</h2>
              <p className="mt-4 text-sm text-gray-500">
                View your current class
              </p>
            </div>
          </Link>

          <Link href="/event">
            <div className="p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-blue-300 max-w-fit rounded-lg p-2">
                <CalendarMonthIcon sx={{ color: blue[500] }} />
              </div>
              <h2 className="mt-4 text-base">List of Events</h2>
              <p className="mt-4 text-sm text-gray-500">See upcoming events</p>
            </div>
          </Link>

          <Link href="/profile">
            <div className="p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-red-300 max-w-fit rounded-lg p-2">
                <AccountCircleIcon sx={{ color: red[500] }} />
              </div>
              <h2 className="mt-4 text-base">Your Profile</h2>
              <p className="mt-4 text-sm text-gray-500">
                View your profile details
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
