import { z } from "zod";
export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long")
});


export const updateUserSchema = z.object({
  username: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});