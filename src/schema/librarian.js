import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contact: z
    .string()
    .regex(
      /^(?:(?:\+|00)[1-9]\d{0,3}[-\s]?)?(?:\(?\d{1,4}\)?[-\s]?)?\d{6,14}$/,
      {
        message: "Invalid phone number format",
      }
    ),
  username: z.string().min(4, "Minimum user name length is 4 chars"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});
