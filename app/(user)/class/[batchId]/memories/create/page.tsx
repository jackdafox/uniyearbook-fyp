"use client";
import MemoryForm from "@/components/memories/MemoryForm";
import React from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const batchId = parseInt(searchParams.get("batchId") || "0", 10);
  return (
    <div className="flex justify-center">
      <div className="max-w-[100rem]">
        <h1 className="text-5xl font-semibold tracking-tight mt-10 mb-3 -ml-1">
          Create A Memory
        </h1>
        <p className="max-w-96 mb-10 text-sm text-zinc-500">
          Keep your personal details private. Information you add here is
          visible to anyone who can view your profile.
        </p>
        <MemoryForm batch_id={batchId} />
      </div>
    </div>
  );
};

export default page;
