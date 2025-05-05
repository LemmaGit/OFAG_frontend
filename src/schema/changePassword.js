import { z } from "zod";

const changePasswordSchema = z
  .object({
    oldpassword: z.string().min(8, "password is at least 8 characters"),
    newpassword: z.string().min(8, "password must be at least 8 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export default changePasswordSchema;
