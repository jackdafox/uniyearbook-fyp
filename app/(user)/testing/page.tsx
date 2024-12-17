import prisma from "@/app/prisma";
import React from "react";

const page = async () => {
  const events = await prisma.event.findMany({});
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-white rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 ease-out shadow-sm hover:shadow-lg border"
          >
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
                {event.title}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-500 leading-relaxed text-base">
                  {event.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
