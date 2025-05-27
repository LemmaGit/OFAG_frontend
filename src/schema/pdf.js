import { z } from "zod";
const maxFileSize = 10 * 1024 * 1024;
export const pdfSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pdf: z
    .instanceof(File)
    .refine(
      (file) => file.size < maxFileSize,
      "File size exceeds the 10MB limit."
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed."
    ),

  category: z.enum(["fiction", "nonfiction", "periodical", "textbook"], {
    message: "Category is required",
  }),
  author: z
    .object({
      firstName: z
        .string()
        .min(1, { message: "Author First Name is required" }),
      lastName: z.string().min(1, { message: "Author Last Name is required" }),
    })
    .required(),
});
