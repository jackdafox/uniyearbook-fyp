import React from "react";
import EventProfile, { getInitials } from "../events/EventProfile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import MemoryComment from "./MemoryComment";
import { Input } from "../ui/input";

const MemoryIndividual = () => {
  return (
    <div className="flex rounded-3xl h-fit w-fit gap-3 p-3 bg-zinc-100">
      <div className="flex-shrink-0">
        <img
          src="https://wallpapercave.com/wp/wp9247392.jpg"
          className="rounded-xl w-96"
        />
      </div>
      <div className="flex flex-col w-full min-w-96 gap-2">
        <h1 className="text-[1.5rem] font-semibold">Title</h1>
        <p className="text-sm">Description</p>
        <div className="flex justify-between items-center gap-2 mt-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{getInitials("Jaki")}</AvatarFallback>
            </Avatar>
            <h1 className="text-md tracking-tight">Jaki</h1>
          </div>
          <Button className="rounded-full bg-transparent text-black border-zinc-400 border-[1px] hover:text-white hover:bg-black hover:border-black">
            View Profile
          </Button>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Comments</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 max-h-96 overflow-y-scroll">
              <MemoryComment />
              <MemoryComment />
              <MemoryComment />
              <MemoryComment />
              <MemoryComment />
              <MemoryComment />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input
            type="email"
            placeholder="Comment.."
            className="bg-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryIndividual;
