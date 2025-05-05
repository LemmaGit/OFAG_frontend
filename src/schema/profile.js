import { z } from "zod";
const maxFileSize = 3 * 1024 * 1024;
const validTypes = ["image/png", "image/jpeg", "image/jpg"];

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "Provide your first name"),
  lastName: z.string().min(1, "Provide your sur name"),
  username: z.string().min(4, "Minimum user name length is 4 chars"),
  image: z
    .instanceof(FileList)
    .transform((file) => (file.length > 0 ? file : undefined))
    .optional()
    .refine(
      (file) => !file || file[0] !== undefined,
      "If provided, image must be a valid file."
    )
    .refine(
      (file) => !file || file[0]?.size < maxFileSize,
      "File size exceeds the 3MB limit."
    )
    .refine(
      (file) => !file || validTypes.includes(file[0]?.type),
      "Invalid file type."
    ),
  // z
  //   .instanceof(FileList)
  //   .refine((file) => !file || file[0] !== undefined, {
  //     message: "image is required.",
  //   })
  //   .refine((file) => file[0]?.size < maxFileSize, {
  //     message: "File size exceeds the 3MB limit.",
  //   })
  //   .refine((file) => validTypes.includes(file[0]?.type), {
  //     message: "Invalid file type.",
  //   }),
});

export const changePasswordSchema = z
  .object({
    "old password": z.string().min(8, "Incorrect password"),
    "new password": z.string().min(8, "Minimum password length should be 8"),
    "confirm new password": z.string(),
  })
  .refine((data) => data["new password"] === data["confirm new password"], {
    message: "Passwords must match",
    path: ["confirm new password"],
  });
