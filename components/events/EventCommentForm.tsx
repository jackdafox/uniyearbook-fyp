"use client";
import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";

type Inputs = z.infer<typeof CommentSchema>;

const EventCommentForm = ({ eventId }: { eventId: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = CommentSchema.parse(data);
    setLoading(true);

    if (!validatedData) {
      return;
    }

    const result = await eventComment(validatedData, eventId);

    if (!result.success) {
      setLoading(false);
      console.log(result.error);
      return;
    } else {
      setLoading(false);
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
      <form
        onSubmit={form.handleSubmit(processForm)}
        className="flex flex-col sm:flex-row gap-3"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Add Comment"
                  className="w-full rounded-full px-5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="rounded-full">
          {loading && <Loader2 className="animate-spin" />}
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default EventCommentForm;
