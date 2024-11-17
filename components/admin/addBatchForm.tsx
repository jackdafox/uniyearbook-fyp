"use client"
import { BatchSchema } from "@/lib/form_schema";
import { addBatch } from "@/utils/actions/batch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Faculty, Major } from "@prisma/client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { toast } from "@/hooks/use-toast";

type Inputs = z.infer<typeof BatchSchema>;

interface addBatchFormProps {
  faculty: Faculty[];
  major: Major[];
}

const AddBatchForm = ({ faculty, major }: addBatchFormProps) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(BatchSchema),
  });

  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    
    const validatedData = BatchSchema.safeParse(data);
    

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const result = await addBatch(validatedData.data);
    console.log(result);

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    } else {
      toast({
        title: "Data Added!",
        description: result.data?.name + " has been added",
        duration: 5000
      });
      form.reset({
        name: "",
        faculty: "",
        major: "",
      });
    }
  };

  const filteredMajors = selectedFaculty
    ? major.filter((majors) => majors.faculty_id.toString() === selectedFaculty)
    : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Batch Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Faculty</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] justify-between text-wrap h-full text-start",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? faculty.find(
                              (faculties) => faculties.id.toString() === field.value
                            )?.name
                          : "Select faculty"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Faculty..." />
                      <CommandList>
                        <CommandEmpty>No faculty found.</CommandEmpty>
                        <CommandGroup>
                          {faculty.map((faculties) => (
                            <CommandItem
                              value={faculties.name}
                              key={faculties.id}
                              onSelect={() => {
                                form.setValue("faculty", faculties.id.toString());
                                setSelectedFaculty(faculties.id.toString());
                                form.setValue("major", ""); // Reset major field
                              }}
                            >
                              {faculties.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  faculties.id === Number(field.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Major</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] justify-between text-wrap h-full text-start",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={!selectedFaculty}
                      >
                        {field.value
                          ? major.find(
                              (majors) => majors.id.toString() === field.value
                            )?.name
                          : "Select majors"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Major..." />
                      <CommandList>
                        <CommandEmpty>No major found.</CommandEmpty>
                        <CommandGroup>
                          {filteredMajors.map((majors) => (
                            <CommandItem
                              value={majors.name}
                              key={majors.id}
                              onSelect={() => {
                                form.setValue("major", majors.id.toString());
                              }}
                            >
                              {majors.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  majors.id === Number(field.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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

export default AddBatchForm;
