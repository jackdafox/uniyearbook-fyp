"use client";
import React, { useState } from "react";
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
import { EditProfileSchema, RegisterSchema } from "@/lib/form_schema";
import { Batch, Faculty, Major, Student, User } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "../../lib/utils";
import { toast } from "../../hooks/use-toast";
import { registerUser, updateProfile } from "../../utils/actions/user";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof RegisterSchema>;

interface EditProfileProps {
  faculty: Faculty[];
  major: Major[];
  batch: Batch[];
}

const RegisterForm = ({ faculty, major, batch }: EditProfileProps) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>();
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const filteredMajors = selectedFaculty
    ? major.filter((majors) => majors.faculty_id.toString() === selectedFaculty)
    : [];
  const filteredBatch = selectedMajor
    ? batch.filter((batches) => batches.majorId.toString() === selectedMajor)
    : [];

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = RegisterSchema.safeParse(data);
    setLoading(true);

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const formData = new FormData();
    formData.append("email", validatedData.data.email);
    formData.append("password", validatedData.data.password);
    formData.append("first_name", validatedData.data.first_name);
    formData.append("last_name", validatedData.data.last_name);
    formData.append("batch", validatedData.data.batch);

    const result = await registerUser(formData);
    console.log(result);

    if (result.error) {
      // set local error state
      console.log(result.error);
      setLoading(false);
      return;
    } else {
      setLoading(false);
      toast({
        title: "Profile Created!",
        description: "Your profile has been created successfully",
        duration: 5000,
      });
      router.push("/login");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
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
                        "w-full justify-between text-wrap h-full text-start",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? faculty.find(
                            (faculties) =>
                              faculties.id.toString() === field.value
                          )?.name
                        : "Select faculty"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0">
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
                        "w-full justify-between text-wrap h-full text-start",
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
                <PopoverContent className="w-[450px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Faculty..." />
                    <CommandList>
                      <CommandEmpty>No major found.</CommandEmpty>
                      <CommandGroup>
                        {filteredMajors.map((majors) => (
                          <CommandItem
                            value={majors.name}
                            key={majors.id}
                            onSelect={() => {
                              form.setValue("major", majors.id.toString());
                              setSelectedMajor(majors.id.toString());
                              form.setValue("batch", "");
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
        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Batch</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between text-wrap h-full text-start",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!selectedMajor}
                    >
                      {field.value
                        ? batch.find(
                            (batches) => batches.id.toString() === field.value
                          )?.name
                        : "Select batches"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Batches..." />
                    <CommandList>
                      <CommandEmpty>No batch found.</CommandEmpty>
                      <CommandGroup>
                        {filteredBatch.map((batches) => (
                          <CommandItem
                            value={batches.name}
                            key={batches.id}
                            onSelect={() => {
                              form.setValue("batch", batches.id.toString());
                            }}
                          >
                            {batches.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                batches.id === Number(field.value)
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
        <Button type="submit" className="-mt-3" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
