import { z } from "zod";
const maxFileSize = 3 * 1024 * 1024;
const validTypes = ["image/png", "image/jpeg", "image/jpg"];
export const schema = z.object({
  image: z
    .instanceof(FileList)
    .refine((file) => !file || file[0] !== undefined, {
      message: "image is required.",
    })
    .refine((file) => file[0]?.size < maxFileSize, {
      message: "File size exceeds the 3MB limit.",
    })
    .refine((file) => validTypes.includes(file[0]?.type), {
      message: "Invalid file type.",
    }),
});
