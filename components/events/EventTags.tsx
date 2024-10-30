import React from "react";
import { Badge } from "../ui/badge";

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap mb-10 gap-2 max-w-[28rem]">
      {tags.map((tag, index) => (
        <Badge key={index} className="px-3 py-[0.25rem]">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default EventTags;
