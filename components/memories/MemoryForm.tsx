"use client";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "../ui/textarea";
import { MdUpload } from "react-icons/md";
import { MemorySchema } from "@/lib/form_schema";
import { addMemory } from "@/utils/actions/memory";
import { toast } from "@/hooks/use-toast";
import EventDialog from "../dialogs/EventDialog";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { IoFileTrayOutline } from "react-icons/io5";
import { set } from "cypress/types/lodash";
import { Loader2 } from "lucide-react";

type Inputs = z.infer<typeof MemorySchema>;

const MemoryForm = ({ batch_id }: { batch_id: number }) => {
  const [image, setImage] = useState<File>();
  const [imageName, setImageName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(MemorySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[], event: any) => {
      form.setValue("photo", acceptedFiles[0]);
      setImage(acceptedFiles[0]);
      setImageName(acceptedFiles[0].name);
    },
    []
  );

  const onDropRejected = useCallback((fileRejections: any[], event: any) => {
    console.log(fileRejections);
    toast({
      title: "File Rejected!",
      description: "Please upload a valid image file",
      duration: 5000,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg", ".gif"],
      "video/mp4": [".mp4"],
    },
    onDropRejected,
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

    const result = await addMemory(formData, batch_id);

    if (result.error) {
      setLoading(false);
      console.log(result.error);
      return;
    } else {
      setLoading(false);
      toast({
        title: "Memory Added!",
        description: result?.data?.title + " has been added",
        duration: 5000,
      });
      form.reset({
        title: "",
        description: "",
        photo: undefined,
      });
      router.push(`/class/${batch_id}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)}>
        <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-[50rem] items-center lg:items-start">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="w-full lg:w-auto">
                <FormLabel className="text-sm">Upload Image</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps({
                      className: cn(
                        "w-full lg:w-96 h-72 lg:h-96 border pt-20 lg:pt-32 justify-center items-center text-center text-sm px-4 lg:px-24 rounded-md cursor-pointer",
                        isDragActive && "border-blue-800 border-2 bg-blue-100"
                      ),
                    })}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <div className="flex flex-col gap-3 text-blue-900 items-center text-center">
                        <IoFileTrayOutline size={70} />
                        <p>Drop the files here ...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 items-center text-center">
                        <IoFileTrayOutline size={70} />
                        <h1 className="px-5">
                          Choose a file or drag and drop here
                        </h1>
                      </div>
                    )}
                    <h1 className="relative top-16 text-zinc-500">
                      {imageName}
                    </h1>
                  </div>
                </FormControl>
                <FormMessage />
                <EventDialog
                  className={image ? URL.createObjectURL(image) : ""}
                  state={!!image}
                />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
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
            <Button type="submit" className="-mt-3" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default MemoryForm;
