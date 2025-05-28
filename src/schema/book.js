import { z } from "zod";
const maxFileSize = 3 * 1024 * 1024;
const validTypes = ["image/png", "image/jpeg", "image/jpg"];
const editionOptions = Array.from({ length: 15 }, (_, i) => {
  const num = i + 1;
  let suffix;
  if (num === 1) suffix = "st";
  else if (num === 2) suffix = "nd";
  else if (num === 3) suffix = "rd";
  else suffix = "th";
  return `${num}${suffix} Edition`;
});
const booksSchema = z
  .object({
    copies: z
      .number({
        required_error: "This field is required",
        invalid_type_error: "Copies must be zero or more",
      })
      .min(0, { message: "Copies must be zero or more" }),
    availableCopies: z.number().min(0).optional(),
  })
  .transform((data) => ({
    copies: data.copies,
    availableCopies: data.copies,
  }));
export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  edition: z.string().refine((value) => editionOptions.includes(value), {
    message: "Please select a valid edition (1st to 15th)",
  }),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(FileList)
    .refine((file) => !file || file[0] !== undefined, "Cover image is required")
    .refine(
      (file) => !file || file[0]?.size < maxFileSize,
      "File size exceeds the 3MB limit."
    )
    .refine(
      (file) => !file || validTypes.includes(file[0]?.type),
      "Invalid file type."
    ),
  type: z.enum(["circulation", "reference"], {
    required_error: "Book type is required",
  }),
  category: z.enum(["fiction", "nonfiction", "periodical", "textbook"], {
    required_error: "Category is required",
  }),
  ISBN: z
    .string()
    .min(1, { message: "ISBN is required" })
    .regex(/^\d{13}$/, { message: "ISBN must be 13 digits" }),
  authorFirstName: z
    .string()
    .min(1, { message: "Author First Name is required" }),
  authorLastName: z
    .string()
    .min(1, { message: "Author Last Name is required" }),
  publisher: z.string().min(1, { message: "Publisher is required" }),
  publicationYear: z
    .string()
    .min(1, { message: "Publication Year is required" })
    .regex(/^\d{4}$/, { message: "Year must be a 4-digit number" })
    .refine(
      (value) => {
        const currentYear = new Date().getFullYear();
        return parseInt(value) <= currentYear;
      },
      { message: "Year must be less than or equal to the current year" }
    ),
  books: z
    .object({
      new: booksSchema,
      fair: booksSchema,
      poor: booksSchema,
    })
    .required(),
});
// const booksEditSchema = z.object({
//   copies: z.number().min(0),
//   availableCopies: z.number().min(0),
// });

export const bookEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authorFirstName: z.string().min(1, "Author's first name is required"),
  authorLastName: z.string().min(1, "Author's last name is required"),
  publisher: z.string().min(1, "Publisher is required"),
  publicationYear: z
    .number()
    .min(1000, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  edition: z.string().min(1, "Edition is required"),
  description: z.string().min(1, "Description is required"),
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
  type: z.enum(["circulation", "reference"], {
    required_error: "Book type is required",
  }),
  category: z.enum(["fiction", "nonfiction", "periodical", "textbook"], {
    required_error: "Category is required",
  }),
  books: z
    .object({
      new: booksSchema,
      fair: booksSchema,
      poor: booksSchema,
    })
    .required(),
});
