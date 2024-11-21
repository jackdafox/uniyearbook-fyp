"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { MemorySchema } from "@/lib/form_schema";
import { addMemory } from "@/utils/actions/memory";
import { toast } from "@/hooks/use-toast";

type Inputs = z.infer<typeof MemorySchema>;

const MemoryForm = ({ batch_id }: { batch_id: number }) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(MemorySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {

    const validatedData = MemorySchema.safeParse(data);

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const result = await addMemory(validatedData.data, batch_id);

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    } else {
      toast({
        title: "Data Added!",
        description: result?.data?.title + " has been added",
        duration: 5000,
      });
      form.reset({
        title: "",
        description: "",
        photo: undefined,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
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
