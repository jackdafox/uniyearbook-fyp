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
import { Comment, Memory, User } from "@prisma/client";

interface MemoryProps {
  memories: Memory & {
    user: User;
  };
  comments?: (Comment & {
    user: User;
  })[];
}

const MemoryIndividual = ({ memories, comments }: MemoryProps) => {
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(e.target.value);

  }

  return (
    <div className="flex rounded-3xl h-fit w-fit gap-3 p-3 bg-zinc-100">
      <div className="flex-shrink-0">
        <img
          src={memories.image_url ? memories.image_url : "/default-profile.png"}
          className="rounded-xl w-96"
        />
      </div>
      <div className="flex flex-col w-full min-w-96 gap-2">
        <h1 className="text-[1.5rem] font-semibold">{memories.title}</h1>
        <p className="text-sm">{memories.description}</p>
        <div className="flex justify-between items-center gap-2 mt-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={
                  memories.user.profile_picture
                    ? memories.user.profile_picture
                    : "/default-profile.png"
                }
              />
              <AvatarFallback>
                {getInitials(memories.user.first_name)}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-md tracking-tight">
              {memories.user.first_name} {memories.user.last_name}
            </h1>
          </div>
          <Button className="rounded-full bg-transparent text-black border-zinc-400 border-[1px] hover:text-white hover:bg-black hover:border-black">
            View Profile
          </Button>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Comments</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 max-h-96 overflow-y-scroll">
              {comments?.map((comment) => (
                <MemoryComment key={comment.id} comment={comment} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* todo: add handle submit */}
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
