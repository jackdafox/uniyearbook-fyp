import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

const EventDialog = ({
  className,
  state,
}: {
  className: string;
  state: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!state} className="w-full">
          Preview Image
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden z-[100] p-0" closeIcon={false}>
        {/\.(jpg|png|jpeg|gif)$/i.test(className) ? (
          <img
            src={className ? className : "/default-profile.png"}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={className || ""}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
