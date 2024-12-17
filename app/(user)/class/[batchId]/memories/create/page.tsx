"use client";
import MemoryForm from "@/components/memories/MemoryForm";
import React from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const batchId = parseInt(searchParams.get("batchId") || "0", 10);
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[50rem]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-6 sm:mt-10 mb-2 sm:mb-3">
        Create A Memory
      </h1>
      <p className="max-w-[50rem] mb-6 sm:mb-10 text-xs sm:text-sm text-zinc-500">
        Capture and share your special moments by creating a memory. Simply
        add your photos, stories, and details to preserve and relive your most
        meaningful experiences. Start creating today!
      </p>
      <MemoryForm batch_id={batchId} />
      </div>
    </div>
  );
};

export default page;
