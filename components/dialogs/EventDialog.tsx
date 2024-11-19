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

const EventDialog = ({className, state} : {className: string, state:boolean}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={!state} className="w-full">Preview Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <img src={className} alt="event" className="w-full h-full object-cover rounded-2xl"/>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
