"use client";
import { FacultySchema } from "@/lib/form_schema";
import { addFaculty } from "@/utils/actions/faculty";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

type Inputs = z.infer<typeof FacultySchema>;

const addFacultyForm = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(FacultySchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = FacultySchema.safeParse(data);

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const result = await addFaculty(validatedData.data);
    if (!result.success) {
      console.log(result.error);
      return;
    } else {
      toast({
        title: "Data Added!",
        description: result.data?.name + " has been added",
        duration: 5000
      });
      form.reset({
        name: ""
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Faculty Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default addFacultyForm;
