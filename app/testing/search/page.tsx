"use client"
import EventSearchPage from "@/components/search/EventSearchPage";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import MemoriesSearchPage from "@/components/search/MemoriesSearchPage";
import ClassSearchPage from "@/components/search/ClassSearchPage";
import StudentSearchPage from "@/components/search/StudentSearchPage";
import { useSearchParams } from "next/navigation";


const Page = ({  }) => {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('q')
  return (
    <div className="w-[80rem]">
      <h1>{search}</h1>
    </div>
  );
};

export default Page;
