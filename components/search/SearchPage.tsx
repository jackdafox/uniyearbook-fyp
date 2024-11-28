"use client";
import EventSearchPage from "@/components/search/EventSearchPage";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import MemoriesSearchPage from "@/components/search/MemoriesSearchPage";
import ClassSearchPage from "@/components/search/ClassSearchPage";
import StudentSearchPage from "@/components/search/StudentSearchPage";
import {
  Batch,
  Event,
  Faculty,
  Major,
  Memory,
  Student,
  User,
} from "@prisma/client";
import { useSearchParams } from "next/navigation";

interface SearchPageProps {
  events: Event[];
  memories: (Memory & {
    user: User;
  })[];
  batch: (Batch & {
    faculty: Faculty;
    major: Major;
    students: Student[];
  })[];
  users: (User & {
    student: Student & {
      batch: Batch & {
        major: Major;
        faculty: Faculty;
      };
    };
  })[];
}

const SearchPage = ({ events, memories, batch, users }: SearchPageProps) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("q") || "";

  console.log("Search query:", search);
  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <Tabs
          variant="light"
          placement="top"
          color="primary"
          classNames={{
            tabContent: "text-black",
          }}
          className="-ml-1"
        >
          <Tab key="events" title="Events">
            <EventSearchPage events={events} search={search} />
          </Tab>
          <Tab key="memories" title="Memories">
            <MemoriesSearchPage memories={memories} search={search} />
          </Tab>
          <Tab key="class" title="Class">
            <ClassSearchPage batch={batch} search={search} />
          </Tab>
          <Tab key="student" title="Students">
            <StudentSearchPage users={users} search={search} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchPage;
