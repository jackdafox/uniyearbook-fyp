import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Comment, User } from "@prisma/client";
import { getInitials } from "../events/EventProfile";

interface MemoryCommentProps {
  comment: Comment & {
    user: User;
  };
}

const MemoryComment = ({ comment }: MemoryCommentProps) => {
  return (
    <div className="flex flex-col gap-3 max-w-96">
      <div className="flex gap-3 justify-start items-center">
        <Avatar className="w-7 h-7">
          <AvatarImage
            src={
              comment.user.profile_picture ? comment.user.profile_picture : ""
            }
          />
          <AvatarFallback>
            {getInitials(comment.user.first_name)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-[0.8rem] font-bold">
          {comment.user.first_name} {comment.user.last_name}
        </h1>
      </div>
      <p>{comment.content}</p>
    </div>
  );
};

export default MemoryComment;
