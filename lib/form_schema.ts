import { z } from "zod";
import { zfd } from "zod-form-data";

export const EventSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(300, { message: "Event Title must be at most 300 characters." }),
  image: zfd
    .file()
    .refine((file: any) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file: any) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg or png.",
      }
    ),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(1000, { message: "Description must be at most 1000 characters." }),
  date: z.date({
    required_error: "A date is required.",
  }),
});

export const EditProfileSchema = z.object({
  photo: zfd
    .file()
    .refine((file: any) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file: any) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg or png.",
      }
    ),
  first_name: z.string().min(1, {
    message: "First Name must be at least 1 characters.",
  }),
  last_name: z.string().min(1, {
    message: "First Name must be at least 1 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(1000, { message: "Description must be at most 1000 characters." }),
});

export const MemorySchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, { message: "Username must be at most 30 characters." }),
  photo: zfd
    .file()
    .refine((file: any) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file: any) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg or png.",
      }
    ),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(1000, { message: "Description must be at most 1000 characters." }),
});
