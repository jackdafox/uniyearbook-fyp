"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { MdUpload } from "react-icons/md";

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "png" || fileType === "jpeg")
      return true;
  }
  return false;
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, { message: "Username must be at most 30 characters." }),
  photo: zfd
    .file()
    .refine((file: any) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file: any) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg or png.",
      }
    ),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(1000, { message: "Description must be at most 1000 characters." }),
});

const MemoryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-5">
          <div className="w-96 h-96 bg-zinc-100 rounded-2xl flex flex-col justify-center items-center hover:bg-zinc-200">
            <MdUpload size={50} />
            <h1 className="text-zinc-500">Upload Image</h1>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Memory Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default MemoryForm;
