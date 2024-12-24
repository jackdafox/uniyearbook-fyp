"use client";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { MdUpload } from "react-icons/md";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { EventSchema } from "@/lib/form_schema";
import EventDialog from "../dialogs/EventDialog";
import { useDropzone } from "react-dropzone";
import { IoFileTrayOutline } from "react-icons/io5";
import { addEvent } from "@/utils/actions/event";
import { toast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";

type Inputs = z.infer<typeof EventSchema>;

const EventForm = () => {
  const [image, setImage] = useState<File>();
  const [imageName, setImageName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<Inputs>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date);
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[], event: any) => {
      form.setValue("image", acceptedFiles[0]);
      setImage(acceptedFiles[0]);
      setImageName(acceptedFiles[0].name);
    },
    []
  );

  const onDropRejected = useCallback((fileRejections: any[], event: any) => {
    console.log(fileRejections);
    toast({
      title: "File Rejected!",
      description: "Please upload a valid image file",
      duration: 5000,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    onDropRejected,
  });

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

    const result = await addEvent(formData);

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
      router.push("/event");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="flex flex-col lg:flex-row gap-10 w-full max-w-[50rem] px-4 mx-auto mb-10"
      >
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Upload Image</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps({
                      className: cn(
                        "w-full aspect-square border pt-32 justify-center items-center text-center text-sm px-4 sm:px-24 rounded-md cursor-pointer",
                        isDragActive && "border-blue-800 border-2 bg-blue-100"
                      ),
                    })}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <div className="flex flex-col gap-3 text-blue-900 items-center text-center justify-center">
                        <IoFileTrayOutline size={70} />
                        <p>Drop the files here ...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 items-center text-center justify-center lg:mt-0 md:mt-32 sm:mt-24">
                        <IoFileTrayOutline size={70} />
                        <h1 className="px-5">
                          Choose a file or drag and drop here
                        </h1>
                      </div>
                    )}
                    <h1 className="relative top-16 text-zinc-500 break-all">
                      {imageName}
                    </h1>
                  </div>
                </FormControl>
                <FormMessage />
                <EventDialog
                  className={image ? URL.createObjectURL(image) : ""}
                  state={!!image}
                />
              </FormItem>
            )}
          />
          <Button type="submit" className="-mt-3" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
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
          <div className="flex gap-2">
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
                    <PopoverContent className="w-auto p-0">
                      <div className="sm:flex">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                          <ScrollArea className="w-64 sm:w-auto">
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
                          <ScrollArea className="w-64 sm:w-auto">
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
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
