import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 20;

export const EventSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(300, { message: "Event Title must be at most 300 characters." }),
  image: z.instanceof(File, { message: "Image is required." }),
  location: z.string().min(2, {
    message: "Location must not be empty",
  }),
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
  photo: z.instanceof(File).optional(),
  first_name: z.string().min(1, {
    message: "First Name must be at least 1 characters.",
  }),
  last_name: z.string().min(1, {
    message: "Last Name must be at least 1 characters.",
  }),
  contact: z.string(),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(50000, { message: "Description must be at most 50000 characters." }),
  major: z.string(),
  faculty: z.string(),
  batch: z.string(),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  first_name: z.string().min(1, {
    message: "First Name must be at least 1 characters.",
  }),
  last_name: z.string().min(1, {
    message: "First Name must be at least 1 characters.",
  }),
  major: z.string(),
  faculty: z.string(),
  batch: z.string(),
});

export const MemorySchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Memories Title must not be empty.",
    })
    .max(30, { message: "Memories Title must be at most 30 characters." }),
  photo: z.instanceof(File, { message: "Image is required." }).refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, 'File size must be less than 20MB'),
  description: z
    .string()
    .min(2, {
      message: "Memories Description must not be empty.",
    })
    .max(1000, {
      message: "Memories Description must be at most 1000 characters.",
    }),
  category: z.string({ required_error: "Please select a category." }),
});

export const BatchSchema = z.object({
  name: z.string(),
  major: z.string(),
  faculty: z.string(),
});

export const FacultySchema = z.object({
  name: z.string(),
});

export const MajorSchema = z.object({
  name: z.string(),
  faculty: z.string(),
});

export const CommentSchema = z.object({
  comment: z.string().min(2, { message: "Comment must not be empty" }),
});

export const SocialsSchema = z.object({
  name: z.string(),
  link: z.string(),
});
