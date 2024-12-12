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
        className="w-full h-[20rem] object-cover rounded-lg mt-5"
      />
      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-5 items-center">
          <h1 className="text-5xl tracking-tight font-semibold">
            {event.title}
          </h1>
          <div className="flex gap-2">
            <Button className="rounded-full">
              <MdEdit />
              Edit Details
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button className="rounded-full border-red-500 bg-transparent border-1 text-red-500 hover:bg-red-200">
                  <FaTrash />
                  Delete Event
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
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
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Description</h1>
          <h2 className="tracking-tight">{event.description}</h2>
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Location</h1>
          <h2 className="tracking-tight">{event.location}</h2>
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Date</h1>
          <h2 className="tracking-tight">{convertDate(event.start_date)}</h2>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="comments">
            <AccordionTrigger>Comments ({comments?.length})</AccordionTrigger>
            <AccordionContent>
              {comments?.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={comment.User.profile_picture || ""} />
                    <AvatarFallback>
                      {getInitials(comment.User.first_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <div className="flex">
                      <h1 className="font-bold">{comment.User.first_name}</h1>
                      <p className="text-gray-500 ml-2">
                        {convertDateComment(comment.date_posted)}
                      </p>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="participants" className="border-b-0">
            <AccordionTrigger>
              Participants ({participant?.length})
            </AccordionTrigger>
            <AccordionContent>
              {participant?.map((participants) => (
                <div className="flex justify-between items-center gap-2 mt-3">
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
                    <h1 className="text-md tracking-tight">
                      {participants.User.first_name}{" "}
                      {participants.User.last_name}
                    </h1>
                  </div>
                  <Button
                    className="rounded-full bg-transparent text-black border-zinc-400 border-[1px] hover:text-white hover:bg-black hover:border-black"
                    asChild
                  >
                    <Link href={`/profile/${participants.User.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              ))}
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
