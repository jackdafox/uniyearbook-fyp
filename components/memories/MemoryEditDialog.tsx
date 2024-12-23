"use client";
import { toast } from "@/hooks/use-toast";
import { MemorySchema } from "@/lib/form_schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import EventDialog from "../dialogs/EventDialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Memory } from "@prisma/client";
import { updateMemory } from "@/utils/actions/memory";
import { z } from "zod";

type Inputs = z.infer<typeof MemorySchema>;

interface MemoryEditDialogProps {
  memory: Memory;
}

const MemoryEditDialog = ({ memory }: MemoryEditDialogProps) => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(MemorySchema),
    defaultValues: {
      title: memory.title,
      description: memory.description || "",
    },
  });

  useEffect(() => {
    setImage(memory.image_url);
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = MemorySchema.safeParse(data);
    setLoading(true);

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

    const result = await updateMemory(formData, memory.id, memory.image_url);

    if (result.error) {
      setLoading(false);
      console.log(result.error);
      return;
    } else {
      setLoading(false);
      toast({
        title: "Memory Updated!",
        duration: 5000,
      });
    }
  };
  return (
    <div className="flex gap-3">
      <img
        src={image}
        alt={image}
        className="w-48 object-cover rounded-lg mt-5 border hover:shadow-lg transition-all"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="flex flex-col gap-2 w-full px-4 mx-auto">
            <FormField
              control={form.control}
              name="photo"
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
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              {loading ? "Submitting..." : "Submit"}
            </Button>
        </form>
      </Form>
    </div>
  );
};

export default MemoryEditDialog;
