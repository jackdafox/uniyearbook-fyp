import {
  Batch,
  Event,
  Faculty,
  Major,
  Memory,
  Student,
  User,
} from "@prisma/client";
import React from "react";
import Searchbar from "../search/SearchbarPage";
import Link from "next/link";
import { EditCalendar } from "@mui/icons-material";
import { blue, orange, pink, red } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

interface MainPageProps {
  currentUser: User;
  student: Student & {
    batch: Batch & {
      memories: Memory[];
      faculty: Faculty;
      major: Major;
    };
  };
  events: Event[];
}

const MainPage = ({ currentUser, student, events }: MainPageProps) => {
  return (
    <div className="flex flex-col gap-5 px-4 sm:px-8 md:px-14 pt-16 sm:pt-24">
      <h1 className="font-semibold tracking-tighter text-3xl sm:text-5xl">
        Welcome, <span className="text-zinc-500">{currentUser.last_name}</span>
      </h1>
      <Searchbar />
      <Link href={`/class/${student.batch_id}`}>
        <div className="flex flex-col justify-between items-start bg-gradient-to-b from-gray-100 to-zinc-300 p-5 rounded-xl tracking-tighter hover:scale-[99%] transition-all">
          <h1 className="text-zinc-500 font-semibold">YOUR CLASS</h1>
          <div className="mt-48 sm:mt-96">
            <h1 className="text-zinc-500 text-sm sm:text-base">
              {student.batch.faculty.name} • {student.batch.name}
            </h1>
            <h1 className="font-semibold tracking-tighter text-4xl sm:text-7xl -ml-1">
              {student.batch.major.name}
            </h1>
          </div>
        </div>
      </Link>
      <h1 className="font-semibold tracking-tight text-xl">Quick Access</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        <Link href="/event/create">
          <div className="p-5 text-white font-semibold tracking-tight rounded-lg text-center transition cursor-pointer bg-gradient-to-t from-pink-400 to-pink-300 flex flex-col items-center justify-center hover:shadow-xl hover:scale-[99%]">
            <div className="bg-pink-300 max-w-fit rounded-lg p-2">
              <EditCalendar sx={{ color: pink[500], fontSize: "1.25rem" }} />
            </div>
            <h2 className="mt-2 text-sm sm:text-base">Create Event</h2>
          </div>
        </Link>

        <Link href={student.batch_id ? `/class/${student.batch_id}` : "#"}>
          <div className="p-5 text-white font-semibold tracking-tight rounded-lg text-center transition cursor-pointer bg-gradient-to-t from-yellow-500 to-yellow-300 flex flex-col items-center justify-center hover:shadow-xl hover:scale-[99%]">
            <div className="bg-orange-300 max-w-fit rounded-lg p-2">
              <SchoolIcon sx={{ color: orange[500], fontSize: "1.25rem" }} />
            </div>
            <h2 className="mt-2 text-sm sm:text-base">Your Class</h2>
          </div>
        </Link>

        <Link href="/event">
          <div className="p-5 text-white font-semibold tracking-tight rounded-lg text-center transition cursor-pointer bg-gradient-to-t from-blue-400 to-blue-300 flex flex-col items-center justify-center hover:shadow-xl hover:scale-[99%]">
            <div className="bg-blue-300 max-w-fit rounded-lg p-2">
              <CalendarMonthIcon
                sx={{ color: blue[500], fontSize: "1.25rem" }}
              />
            </div>
            <h2 className="mt-2 text-sm sm:text-base">List of Events</h2>
          </div>
        </Link>

        <Link href="/manage">
          <div className="p-3 sm:p-5 text-white font-semibold tracking-tight rounded-lg text-center transition cursor-pointer bg-gradient-to-t from-red-400 to-red-300 flex flex-col items-center justify-center hover:shadow-xl hover:scale-[99%]">
            <div className="bg-red-500 max-w-fit rounded-lg p-2">
              <SettingsIcon sx={{ color: red[200], fontSize: "1.25rem" }} />
            </div>
            <h2 className="mt-2 text-sm sm:text-base">
              Manage Memories & Events
            </h2>
          </div>
        </Link>
      </div>
      <h1 className="font-semibold tracking-tight text-xl">
        Your Class Memories
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {student.batch.memories.map((memory) => (
          <Link
            href={`/class/${student.batch.id}/memories/${memory.id}`}
            key={memory.id}
          >
            <div className="flex flex-col gap-2 transition ease-out mb-3 overflow-hidden group h-48 sm:h-96 px-2 -ml-2 hover:scale-[99%]">
              {memory.image_url &&
              memory.image_url.toLowerCase().match(/\.(jpg|png|jpeg|gif)$/) ? (
                <img
                  src={
                    memory.image_url ? memory.image_url : "/default-profile.png"
                  }
                  className="object-cover rounded-lg h-full group-hover:shadow-xl transition ease-in-out"
                />
              ) : (
                <video
                  src={memory.image_url}
                  autoPlay
                  loop
                  muted
                  className="h-full"
                />
              )}
              <div className="flex gap-2 items-center">
                <h1 className="tracking-tight font-bold text-base sm:text-xl">
                  {memory.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="font-semibold tracking-tight text-xl">Events for You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {events.map((event) => (
          <Link href={`/event/${event.id}`} key={event.id}>
            <div className="flex flex-col gap-2 transition ease-out mb-3 overflow-hidden group px-2 -ml-2 hover:scale-[99%]">
              <img
                src={event.image_url ? event.image_url : "/default-profile.png"}
                className="object-cover rounded-lg h-48 sm:h-96 group-hover:shadow-xl transition ease-in-out"
              />
              <div className="flex gap-2 items-center">
                <h1 className="tracking-tight font-bold text-base sm:text-xl">
                  {event.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
