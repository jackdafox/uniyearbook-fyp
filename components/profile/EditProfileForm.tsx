"use client";
import React, { use, useEffect, useState } from "react";
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
import { Batch, Faculty, Major, Student, User } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { updateProfile } from "../../utils/actions/user";
import EventDialog from "../dialogs/EventDialog";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../events/EventProfile";

type Inputs = z.infer<typeof EditProfileSchema>;

interface EditProfileProps {
  user: User & {
    student: Student & {
      batch: Batch & {
        major: Major;
        faculty: Faculty;
      };
    };
  };
  faculty: Faculty[];
  major: Major[];
  batch: Batch[];
}

const EditProfileForm = ({ user, faculty, major, batch }: EditProfileProps) => {
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>();
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    if (user.profile_picture) {
      setProfilePicture(user.profile_picture);
    }
  }, []);

  const form = useForm<Inputs>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      description: user.details ? user.details : "",
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name : "",
      contact: user.contacts ? user.contacts : "",
      batch: user.student.batch_id.toString(),
      faculty: user.student.batch.facultyId.toString(),
      major: user.student.batch.majorId.toString(),
    },
  });

  const filteredMajors = selectedFaculty
    ? major.filter((majors) => majors.faculty_id.toString() === selectedFaculty)
    : [];
  const filteredBatch = selectedMajor
    ? batch.filter((batches) => batches.majorId.toString() === selectedMajor)
    : [];

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const validatedData = EditProfileSchema.safeParse(data);

    if (!validatedData.success) {
      console.log("Something went wrong");
      return;
    }

    const formData = new FormData();
    if (validatedData.data.photo) {
      formData.append("photo", validatedData.data.photo);
    }
    formData.append("first_name", validatedData.data.first_name);
    formData.append("last_name", validatedData.data.last_name);
    formData.append("contact", validatedData.data.contact);
    formData.append("description", validatedData.data.description);
    formData.append("batch", validatedData.data.faculty);

    const result = await updateProfile(formData);
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
      router.push("/");
    }
  };
  return (
    <div>
      <div className="flex justify-center w-full">
        <Avatar className="w-36 h-36 mb-10">
          <AvatarImage src={profilePicture ? profilePicture : ""} />
          <AvatarFallback>{getInitials(user.first_name)}</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="space-y-5">
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
                        setProfilePicture(URL.createObjectURL(file));
                      }
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <EventDialog
                  className={
                    field.value ? URL.createObjectURL(field.value) : ""
                  }
                  state={!!field.value}
                />
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
          <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="+60123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="flex gap-3 w-full">
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
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
                    <PopoverContent className="w-[350px] p-0">
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
                <FormItem className="flex flex-col w-full">
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
                    <PopoverContent className="w-[350px] p-0">
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
                            "w-[300px] justify-between text-wrap h-full text-start",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={!selectedMajor}
                        >
                          {field.value
                            ? batch.find(
                                (batches) =>
                                  batches.id.toString() === field.value
                              )?.name
                            : "Select batches"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
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
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
