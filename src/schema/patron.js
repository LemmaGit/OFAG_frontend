import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(1, "Provide your first name"),
  lastName: z.string().min(1, "Provide your sur name"),
  username: z.string().min(4, "Minimum user name length is 4 chars"),
  email: z.string().min(1, "Provide your email").toLowerCase().trim().email(),
  password: z.string().min(8, "Minimum password length should be 8"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Provide your email").toLowerCase().trim().email(),
  password: z.string().min(8, "Minimum password length should be 8"),
});
export const changePasswordSchema = z
  .object({
    "old password": z.string().min(8, "Minimum password length should be 8"),
    "new password": z.string().min(8, "Minimum password length should be 8"),
    "confirm new password": z
      .string()
      .min(8, "Minimum password length should be 8"),
  })
  .refine((data) => data["new password"] === data["confirm new password"], {
    message: "Passwords must match",
    path: ["confirm new password"],
  });
