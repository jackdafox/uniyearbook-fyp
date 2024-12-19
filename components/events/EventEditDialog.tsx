"use client";
import { toast } from "@/hooks/use-toast";
import { EventSchema } from "@/lib/form_schema";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "../ui/calendar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import EventDialog from "../dialogs/EventDialog";
import { Event } from "@prisma/client";
import { z } from "zod";
import { eventUpdate } from "@/utils/actions/event";

type Inputs = z.infer<typeof EventSchema>;

interface EventEditDialogProps {
  event: Event;
}

const EventEditDialog = ({ event }: EventEditDialogProps) => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: event.title,
      description: event.description || "",
      date: new Date(event.start_date),
      location: event.location || "",
    },
  });

  useEffect(() => {
    setImage(event.image_url || "");
  });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("date") || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue("date", newDate);
  }

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = EventSchema.safeParse(data);
    setLoading(true);

    if (!validatedData) {
      console.log("Something went wrong");
      return;
    }

    if (!validatedData.success) {
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("date", data.date.toISOString());
    formData.append("location", data.location);
    if (data.image) {
      formData.append("image", data.image);
    }

    console.log(validatedData.data);

    const result = await eventUpdate(event.id, formData, event.image_url || "");

    if (!result.success) {
      setLoading(false);
      console.log(result.error);
      return;
    } else {
      setLoading(false);
      toast({
        title: "Event Added!",
        description: result.data?.title + " has been added",
        duration: 5000,
      });
      form.reset({
        image: undefined,
        title: "",
        description: "",
        date: new Date(),
      });
    }
  };
  return (
    <div className="flex">
      <div>
        <img
          src={image ? image : ""}
          alt={image}
          className="w-full h-[15rem] md:h-[20rem] lg:h-[25rem] object-cover rounded-lg mt-5 border hover:shadow-lg transition-all"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="flex flex-col gap-2 w-full px-4 mx-auto"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  Upload Profile Picture
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      if (file) {
                        setImage(URL.createObjectURL(file));
                      }
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
                <EventDialog
                  className={
                    field.value ? URL.createObjectURL(field.value) : ""
                  }
                  state={!!field.value}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="What's this event about?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Location</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Where is this event located?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2 w-full">
                <FormLabel>Enter your date & time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MM/dd/yyyy HH:mm")
                        ) : (
                          <span>MM/DD/YYYY HH:mm</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[60]">
                    <div className="flex flex-col sm:flex-row">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={handleDateSelect}
                        initialFocus
                        className="w-full"
                      />
                      <div className="flex flex-row sm:flex-col sm:h-[300px] divide-x sm:divide-x-0 sm:divide-y">
                        <ScrollArea className="h-64 sm:h-auto w-full">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 24 }, (_, i) => i)
                              .reverse()
                              .map((hour) => (
                                <Button
                                  key={hour}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    field.value.getHours() === hour
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange("hour", hour.toString())
                                  }
                                >
                                  {hour}
                                </Button>
                              ))}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>
                        <ScrollArea className="h-64 sm:h-auto w-full">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 12 }, (_, i) => i * 5).map(
                              (minute) => (
                                <Button
                                  key={minute}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    field.value.getMinutes() === minute
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange(
                                      "minute",
                                      minute.toString()
                                    )
                                  }
                                >
                                  {minute.toString().padStart(2, "0")}
                                </Button>
                              )
                            )}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventEditDialog;
