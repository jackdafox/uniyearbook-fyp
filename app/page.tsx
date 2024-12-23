import Link from "next/link";
import EditCalendar from "@mui/icons-material/EditCalendar";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from '@mui/icons-material/Settings';
import { blue, orange, pink, red } from "@mui/material/colors";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
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

  if (!user) {
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
      <div className="mt-16 sm:mt-24 flex flex-col items-center justify-center py-6 sm:py-10 px-4">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            The Ultimate Yearbook Experience
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Capture memories, connect with classmates, and celebrate milestones.
          </p>
        </div>

        <div className="w-full max-w-xl mb-6 sm:mb-8 px-4">
          <Searchbar />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl px-4">
          <Link href="/event/create">
            <div className="p-4 sm:p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-pink-300 max-w-fit rounded-lg p-2">
                <EditCalendar
                  sx={{
                    color: pink[500],
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                />
              </div>
              <h2 className="mt-2 sm:mt-4 text-sm sm:text-base">
                Create Event
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                Plan a new event
              </p>
            </div>
          </Link>

          <Link href={batchId ? `/class/${batchId}` : "#"}>
            <div className="p-4 sm:p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-orange-300 max-w-fit rounded-lg p-2">
                <SchoolIcon
                  sx={{
                    color: orange[500],
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                />
              </div>
              <h2 className="mt-2 sm:mt-4 text-sm sm:text-base">Your Class</h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                View your current class
              </p>
            </div>
          </Link>

          <Link href="/event">
            <div className="p-4 sm:p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-blue-300 max-w-fit rounded-lg p-2">
                <CalendarMonthIcon
                  sx={{
                    color: blue[500],
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                />
              </div>
              <h2 className="mt-2 sm:mt-4 text-sm sm:text-base">
                List of Events
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                See upcoming events
              </p>
            </div>
          </Link>

          <Link href="/manage">
            <div className="p-4 sm:p-8 text-black rounded-lg text-center transition cursor-pointer border hover:bg-zinc-100 flex flex-col items-center justify-center">
              <div className="bg-red-300 max-w-fit rounded-lg p-2">
                <SettingsIcon
                  sx={{
                    color: red[500],
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                />
              </div>
              <h2 className="mt-2 sm:mt-4 text-sm sm:text-base">
                Manage Memories & Events
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500">
                Manage your memories and events
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
