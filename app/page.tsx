import Link from "next/link";
import EditCalendar from "@mui/icons-material/EditCalendar";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { blue, orange, pink, red } from "@mui/material/colors";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@/app/prisma";
import { redirect } from "next/navigation";
import Searchbar from "@/components/search/SearchbarPage";
import Navbar from "@/components/navbar/Navbar";
import NavbarPage from "@/components/navbar/NavbarData";
import { getUser } from "@/utils/actions/user";
import MainPage from "@/components/main/MainPage";

export default async function Index() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      Batch: {
        include: {
          Memory: {
            take: 4,
          },
          Faculty: true,
          Major: true,
        },
      },
    },
  });

  if (!student) {
    redirect("/login");
  }

  const event = await prisma.event.findMany({
    take: 3,
  });

  return (
    <div>
      <NavbarPage />
      <MainPage
        currentUser={user}
        student={{
          ...student,
          batch: {
            ...student.Batch,
            faculty: student.Batch?.Faculty,
            major: student.Batch?.Major,
            memories: student.Batch?.Memory,
          },
        }}
        events={event}
      />
    </div>
  );
}
