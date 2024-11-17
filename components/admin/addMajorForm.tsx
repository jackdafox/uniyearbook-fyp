import { MajorSchema } from "@/lib/form_schema";
import { addMajor } from "@/utils/actions/major";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
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
import { z } from "zod";
import { Faculty } from "@prisma/client";

type Inputs = z.infer<typeof MajorSchema>;

interface addMajorFormProps {
  faculty: Faculty[];
}

const addMajorForm = ({ faculty }: addMajorFormProps) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(MajorSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addMajor(data);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
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
                <FormLabel className="text-sm">Batch Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
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
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? faculty.find(
                              (faculties) => faculties.name === field.value
                            )?.name
                          : "Select faculty"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
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
                                form.setValue(
                                  "faculty",
                                  faculties.id.toString()
                                );
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
              </FormItem>
            )}
          />
          <Button type="submit" variant="contained">
            Add Major{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default addMajorForm;
