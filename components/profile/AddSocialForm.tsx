"use client"
import { toast } from "@/hooks/use-toast";
import { SocialsSchema } from "@/lib/form_schema";
import { addSocials } from "@/utils/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";

type Inputs = z.infer<typeof SocialsSchema>;

const AddSocialForm = () => {
  const router = useRouter();
  const form = useForm<Inputs>({
    resolver: zodResolver(SocialsSchema),
    defaultValues: {
      name: "",
      link: "",
    },
  });
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = SocialsSchema.safeParse(data);

    if (!validatedData) {
      console.log("Something went wrong");
      return;
    }

    if (!validatedData.success) {
      return;
    }

    const result = await addSocials(validatedData.data);

    if (!result.success) {
      console.log(result.error);
      return;
    } else {
      toast({
        title: "Socials Added!",
        description: result.data?.name + " has been added",
        duration: 5000,
      });
      router.push("/profile");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Link Name</FormLabel>
                <FormControl>
                  <Input placeholder="Create a name for the link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Link</FormLabel>
                <FormControl>
                  <Textarea placeholder="Put link here" {...field} />
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

export default AddSocialForm;
