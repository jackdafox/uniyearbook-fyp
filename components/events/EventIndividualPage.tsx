"use client";
import React from "react";
import EventCarousel from "./EventCarousel";
import EventProfile from "./EventProfile";
import { FaLocationArrow, FaRegCalendar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EventJoin from "./EventJoin";
import { Comment, Event, Participant, User } from "@prisma/client";
import EventCommentForm from "./EventCommentForm";
import { getInitials } from "@/lib/utils";
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
import { Button } from "../ui/button";
import { deleteComment } from "@/utils/actions/user";
import { toast } from "@/hooks/use-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaTrash } from "react-icons/fa6";

interface EventProps {
  event: Event & {
    user: User;
    participant: Participant[];
  };
  comments?: (Comment & {
    user: User;
  })[];
  currentUser: User;
}

const EventIndividualPage = ({ event, comments, currentUser }: EventProps) => {
  async function handleDelete(commentId: number) {
    const result = await deleteComment(commentId);
    if (!result.success) {
      toast({
        description: "Failed to delete event",
        variant: "destructive",
        duration: 5000,
      });
      return;
    } else {
      toast({
        description: "Comment Deleted!",
        duration: 5000,
      });
    }
  }
  return (
    <div className="px-[15rem] flex flex-col py-10">
      <img
        src={event.image_url || ""}
        alt={event.title}
        className="w-full h-[20rem] object-cover rounded-lg mt-5 border hover:shadow-lg  transition-all"
      />
      <div className="flex items-start gap-10 mt-10">
        <div className="flex flex-col items-start w-full px-5">
          <div className="mb-5">
            <h1 className="font-medium text-lg">
              {convertDate(event.start_date)}
            </h1>
            <h1 className="font-semibold text-5xl tracking-tight">
              {event.title}
            </h1>
          </div>
          <EventProfile user={event.user} />
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">
              Date and time
            </h1>
            <div className="flex items-center gap-3 font-medium">
              <FaRegCalendar />
              <p>{convertDate(event.start_date)}</p>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">Location</h1>
            <div className="flex items-center gap-3 font-medium">
              <FaLocationArrow />
              <p>{event.location || "No location provided"}</p>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-5">
              About this event
            </h1>
            <p className="max-w-[55rem] text-gray-500">{event.description}</p>
          </div>
          <div className="flex flex-col gap-5 w-full mt-10">
            <h1 className="font-bold text-2xl tracking-tight mb-2">
              Comments ({comments?.length})
            </h1>
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={comment.user.profile_picture || ""} />
                  <AvatarFallback>
                    {getInitials(comment.user.first_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start w-[38rem]">
                  <div className="flex">
                    <h1 className="font-bold">{comment.user.first_name}</h1>
                    <p className="text-gray-500 ml-2">
                      {convertDateComment(comment.date_posted)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p>{comment.content}</p>
                    {currentUser.id === comment.user.id && (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <FaTrash className="hover:text-zinc-800" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your comment
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(comment.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <EventCommentForm eventId={event.id} />
          </div>
        </div>
        <EventJoin participant={event.participant} id={event.id} />
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

export default EventIndividualPage;
