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
    <div className="px-4 md:px-8 lg:px-[2rem] flex flex-col py-5 md:py-10">
      <img
        src={event.image_url || ""}
        alt={event.title}
        className="w-full h-[15rem] md:h-[20rem] lg:h-[25rem] object-cover rounded-lg mt-5 border hover:shadow-lg transition-all"
      />
      <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-10 mt-5 lg:mt-10">
        <div className="flex flex-col items-start w-full px-0 sm:px-2 md:px-5">
          <div className="mb-5 w-full">
            <h1 className="font-medium text-sm sm:text-base md:text-lg">
              {convertDate(event.start_date)}
            </h1>
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              {event.title}
            </h1>
          </div>
          <EventProfile user={event.user} />
          <div className="mt-6 md:mt-8 lg:mt-10 w-full">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-2 md:mb-5">
              Date and time
            </h1>
            <div className="flex items-center gap-3 font-medium text-xs sm:text-sm md:text-base">
              <FaRegCalendar />
              <p>{convertDate(event.start_date)}</p>
            </div>
          </div>
          <div className="mt-6 md:mt-8 lg:mt-10 w-full">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-2 md:mb-5">
              Location
            </h1>
            <div className="flex items-center gap-3 font-medium text-xs sm:text-sm md:text-base">
              <FaLocationArrow />
              <p>{event.location || "No location provided"}</p>
            </div>
          </div>
          <div className="mt-6 md:mt-8 lg:mt-10 w-full">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-2 md:mb-5">
              About this event
            </h1>
            <p className="max-w-full lg:max-w-[55rem] text-gray-500 text-xs sm:text-sm md:text-base">
              {event.description}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full mt-6 md:mt-8 lg:mt-10">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-2">
              Comments ({comments?.length})
            </h1>
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-2 sm:gap-3 items-start">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src={comment.user.profile_picture || ""} />
                  <AvatarFallback>
                    {getInitials(comment.user.first_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start w-full lg:w-[38rem]">
                  <div className="flex flex-wrap items-center">
                    <h1 className="font-bold text-sm sm:text-base">
                      {comment.user.first_name}
                    </h1>
                    <p className="text-gray-500 ml-2 text-xs sm:text-sm">
                      {convertDateComment(comment.date_posted)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-xs sm:text-sm md:text-base">
                      {comment.content}
                    </p>
                    {currentUser.id === comment.user.id && (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <FaTrash className="hover:text-zinc-800 text-sm sm:text-base" />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-[425px]">
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
        <div className="w-full sticky top-5">
          <EventJoin participant={event.participant} id={event.id} />
        </div>
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
