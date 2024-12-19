"use client";
import { Comment, Event, Participant, User } from "@prisma/client";
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
import Link from "next/link";
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
import { eventDelete } from "@/utils/actions/event";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import EventEditDialog from "./EventEditDialog";

interface EventManageIndividualProps {
  event: Event;
  participant: (Participant & { User: User })[];
  comments?: (Comment & { User: User })[];
}

const EventManageIndividual = ({
  event,
  participant,
  comments,
}: EventManageIndividualProps) => {
  async function handleDelete() {
    const result = await eventDelete(event.id);
    if (!result.success) {
      toast({
        description: "Failed to delete event",
        variant: "destructive",
        duration: 5000,
      });
      return;
    } else {
      toast({
        title: "Event Deleted!",
        description: result.data?.title + " has been deleted",
        duration: 5000,
      });
    }
  }
  return (
    <div className="w-full">
      <img
        src={event.image_url || ""}
        alt={event.title}
        className="w-full h-[15rem] md:h-[20rem] object-cover rounded-lg mt-5"
      />
      <div className="flex flex-col gap-5 mt-5 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 md:items-center">
          <h1 className="text-3xl md:text-5xl tracking-tight font-semibold">
            {event.title}
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
                  <DialogTitle>Edit Event</DialogTitle>
                  <EventEditDialog event={event} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="rounded-full border-red-500 bg-transparent border-1 text-red-500 hover:bg-red-200 text-sm md:text-base">
                  <FaTrash className="mr-1" />
                  Delete Event
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
            {event.description}
          </h2>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            Location
          </h1>
          <h2 className="tracking-tight text-sm md:text-base">
            {event.location}
          </h2>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            Date
          </h1>
          <h2 className="tracking-tight text-sm md:text-base">
            {convertDate(event.start_date)}
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
          <AccordionItem value="participants" className="border-b-0">
            <AccordionTrigger>
              Participants ({participant?.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {participant?.map((participants) => (
                  <div
                    key={participants.User.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            participants.User.profile_picture
                              ? participants.User.profile_picture
                              : "/default-profile.png"
                          }
                        />
                        <AvatarFallback>
                          {getInitials(participants.User.first_name)}
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="text-sm md:text-base tracking-tight">
                        {participants.User.first_name}{" "}
                        {participants.User.last_name}
                      </h1>
                    </div>
                    <Button
                      className="rounded-full bg-transparent text-black border-zinc-400 border-[1px] hover:text-white hover:bg-black hover:border-black text-sm"
                      asChild
                    >
                      <Link href={`/profile/${participants.User.id}`}>
                        View Profile
                      </Link>
                    </Button>
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

export default EventManageIndividual;
