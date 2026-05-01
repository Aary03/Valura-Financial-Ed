import { z } from "zod";

export const magicLinkSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const registerSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
