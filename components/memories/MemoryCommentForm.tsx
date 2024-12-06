"use client";
import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/lib/form_schema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { eventComment } from "@/utils/actions/event";
import { toast } from "@/hooks/use-toast";
import { memoryComment } from "@/utils/actions/memory";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";
import { getInitials } from "@/lib/utils";

type Inputs = z.infer<typeof CommentSchema>;

interface MemoryCommentFormProps {
  memoryId: number;
  batchId: number;
  user: User;
}

const MemoryCommentForm = ({
  memoryId,
  batchId,
  user,
}: MemoryCommentFormProps) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = CommentSchema.parse(data);

    if (!validatedData) {
      return;
    }

    const result = await memoryComment(validatedData, memoryId, batchId);

    if (!result.success) {
      console.log(result.error);
      return;
    } else {
      toast({
        description: "Comment Posted!",
        duration: 5000,
      });
      form.reset({
        comment: "",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="flex gap-3 max-w-full items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.profile_picture || ""} />
          <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Add Comment"
                  className="w-[23rem] rounded-full px-5 bg-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full">
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default MemoryCommentForm;
