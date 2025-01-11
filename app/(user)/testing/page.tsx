import prisma from "@/app/prisma";
import React from "react";

const page = async () => {
  return (
    <div className="flex w-full gap-5">
      <div className="flex flex-col gap-5 w-full mt-10">
        <div className="w-56 h-96 bg-gray-300" />
        <div className="w-56 h-96 bg-gray-300" />
        <div className="w-56 h-96 bg-gray-300" />
        <div className="w-56 h-96 bg-gray-300" />
      </div>
    </div>
  );
};

export default page;
