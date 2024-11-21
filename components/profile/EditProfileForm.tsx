"use client";
import React from "react";
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
import { Textarea } from "../ui/textarea";
import { EditProfileSchema } from "@/lib/form_schema";
import { User } from "@prisma/client";
import { updateProfile } from "@/utils/actions/user";
import { toast } from "@/hooks/use-toast";

type Inputs = z.infer<typeof EditProfileSchema>;

interface EditProfileProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileProps) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      description: user.details ? user.details : "",
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name : "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = EditProfileSchema.safeParse(data);

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const result = await updateProfile(validatedData.data);
    console.log(result);

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    } else {
      toast({
        title: "Profile Updated!",
        description: "Your profile has been updated successfully",
        duration: 5000,
      });
      form.reset({
        photo: undefined,
        first_name: "",
        last_name: "",
        description: "",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Upload Profile Picture</FormLabel>
              <FormControl>
                <Input id="picture" type="file" className="cursor-pointer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something about you..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
