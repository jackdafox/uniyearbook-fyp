"use client";
import EventSearchPage from "@/components/search/EventSearchPage";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import MemoriesSearchPage from "@/components/search/MemoriesSearchPage";
import ClassSearchPage from "@/components/search/ClassSearchPage";
import StudentSearchPage from "@/components/search/StudentSearchPage";

const page = () => {
  return (
    <div className="w-[80rem]">
      <div className="w-full mt-10">
        <Tabs
          variant="light"
          placement="top"
          color="primary"
          classNames={{
            tabContent: "text-black",
          }}
        >
          <Tab key="events" title="Events">
            <EventSearchPage />
          </Tab>
          <Tab key="memories" title="Memories">
            <MemoriesSearchPage />
          </Tab>
          <Tab key="class" title="Class">
            <ClassSearchPage />
          </Tab>
          <Tab key="student" title="Students">
            <StudentSearchPage />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};


export default page;
