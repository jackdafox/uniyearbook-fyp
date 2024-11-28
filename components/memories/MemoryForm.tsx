"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
import { MemorySchema } from "@/lib/form_schema";
import { addMemory } from "@/utils/actions/memory";
import { toast } from "@/hooks/use-toast";
import EventDialog from "../dialogs/EventDialog";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof MemorySchema>;

const MemoryForm = ({ batch_id }: { batch_id: number }) => {
  const [image, setImage] = useState(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(MemorySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();

  const processForm: SubmitHandler<Inputs> = async (data) => {

    const validatedData = MemorySchema.safeParse(data);

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const result = await addMemory(formData, batch_id);

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    } else {
      toast({
        title: "Memory Added!",
        description: result?.data?.title + " has been added",
        duration: 5000,
      });
      form.reset({
        title: "",
        description: "",
        photo: undefined,
      });
      router.push(`/class/${batch_id}/memories`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)}>
        <div className="flex gap-5 w-[50rem] items-start">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Upload Image</FormLabel>
                <FormControl>
                  <div className="w-96 h-96 bg-zinc-100 rounded-2xl flex flex-col justify-center items-center hover:bg-zinc-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                          setImage(true);
                        }
                      }}
                      className="hidden"
                      id="upload-image"
                    />
                    <label
                      htmlFor="upload-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <MdUpload size={50} />
                      <h1 className="text-zinc-500">Upload Image</h1>
                      {field.value && (
                        <h1 className="mt-2 text-center">{field.value.name}</h1>
                      )}
                    </label>
                  </div>
                </FormControl>
                <EventDialog
                  className={
                    field.value ? URL.createObjectURL(field.value) : ""
                  }
                  state={image}
                />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-5 w-1/2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Memory Title</FormLabel>
                <FormControl>
                  <Input placeholder="Create a title" {...field} />
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
                  <Textarea placeholder="Create a description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MemoryForm;
