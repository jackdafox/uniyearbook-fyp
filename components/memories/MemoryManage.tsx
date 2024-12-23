import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { MdOutlineEventRepeat } from "react-icons/md";
import { Comment, Memory, User } from "@prisma/client";
import MemoryManageIndividual from "./MemoryManageIndividual";

interface MemoryManageProps {
  memories: (Memory & {
    comment: (Comment & { User: User })[];
  })[];
}

const MemoryManage = ({memories} : MemoryManageProps) => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-[6rem] w-full">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[0.75] -ml-1 mb-3">
        Manage Memories
      </h1>
      <h2 className="py-3 font-semibold">Memories List</h2>
      <Accordion type="single" collapsible>
        {memories.length > 0 ? (
          memories.map((memory) => (
            <AccordionItem value={memory.id.toString()} key={memory.id}>
              <AccordionTrigger className="text-lg sm:text-xl tracking-tight">
                {memory.title}
              </AccordionTrigger>
              <AccordionContent>
                <MemoryManageIndividual
                  memory={memory}
                  comments={memory.comment}
                />
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-[15rem] sm:h-[20rem] gap-3 sm:gap-5 text-zinc-300">
            <MdOutlineEventRepeat
              size={60}
              className="sm:w-[100px] sm:h-[100px]"
            />
            <h1 className="text-xl sm:text-[2rem] tracking-tighter font-semibold text-center">
              No Memories posted
            </h1>
          </div>
        )}
      </Accordion>
    </div>
  );
};

export default MemoryManage;
