"use client";
import { Comment, Event, Memory, Participant, User } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteMemory } from "@/utils/actions/memory";
import MemoryEditDialog from "./MemoryEditDialog";

interface MemoryManageIndividualProps {
  memory: Memory;
  comments?: (Comment & { User: User })[];
}

const MemoryManageIndividual = ({
  memory,
  comments,
}: MemoryManageIndividualProps) => {
  async function handleDelete() {
    const result = await deleteMemory(memory.id);
    if (!result.success) {
      toast({
        description: "Failed to delete memory",
        variant: "destructive",
        duration: 5000,
      });
      return;
    } else {
      toast({
        title: "Memory Deleted!",
        description: result.data?.title + " has been deleted",
        duration: 5000,
      });
    }
  }
  return (
    <div className="w-full">
      <img
        src={memory.image_url || ""}
        alt={memory.title}
        className="w-full h-[15rem] md:h-[20rem] object-cover rounded-lg mt-5"
      />
      <div className="flex flex-col gap-5 mt-5 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 md:items-center">
          <h1 className="text-3xl md:text-5xl tracking-tight font-semibold">
            {memory.title}
          </h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full text-sm md:text-base">
                  <MdEdit className="mr-1" />
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Memory</DialogTitle>
                  <MemoryEditDialog memory={memory} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="rounded-full border-red-500 bg-transparent border-1 text-red-500 hover:bg-red-200 text-sm md:text-base">
                  <FaTrash className="mr-1" />
                  Delete Memory
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            Description
          </h1>
          <h2 className="tracking-tight text-sm md:text-base">
            {memory.description}
          </h2>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            Date
          </h1>
          <h2 className="tracking-tight text-sm md:text-base">
            {convertDate(memory.date_posted)}
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="comments">
            <AccordionTrigger>Comments ({comments?.length})</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-3 items-start">
                    <Avatar className="flex-shrink-0">
                      <AvatarImage src={comment.User.profile_picture || ""} />
                      <AvatarFallback>
                        {getInitials(comment.User.first_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <div className="flex flex-wrap gap-2">
                        <h1 className="font-bold text-sm md:text-base">
                          {comment.User.first_name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                          {convertDateComment(comment.date_posted)}
                        </p>
                      </div>
                      <p className="text-sm md:text-base">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

const convertDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const convertDateComment = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} minute(s) ago`;
    }
    return `${diffHours} hour(s) ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day(s) ago`;
  } else {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month(s) ago`;
  }
};

export default MemoryManageIndividual;
