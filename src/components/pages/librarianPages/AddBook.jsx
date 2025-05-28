import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "../../../schema/book";
import UploadCoverImage from "./UploadCoverImage";
import useMutator from "../../../hooks/useMutator";
import { addBook } from "../../../helpers/librarian";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import { getOrdinalSuffix } from "../../../helpers/utilFun";
export default function AddBook({ setIsAddModalOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  const { mutateAsync, isError, isSuccess } = useMutator(addBook, "books");
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(
      "author",
      JSON.stringify({
        firstName: data.authorFirstName,
        lastName: data.authorLastName,
      })
    );
    formData.append("books", JSON.stringify(data.books));
    delete data.authorFirstName;
    delete data.authorLastName;
    delete data.books;
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") return formData.append("image", data.image[0]);
      formData.append(key, value);
    });

    try {
      const res = await mutateAsync(formData);
      if (res.message && res.message.includes("{")) {
        const message = JSON.parse(res.message);
        Object.entries(message).forEach(([key, value]) => {
          return setError(key, { type: "server", message: value });
        });
      } else if (res?.status === "error") {
        return setError("root", { type: "server", message: res.message });
      } else if (res.status !== "error") {
        setIsAddModalOpen(false);
        return toast.success("Successfully Added a new book");
      }
    } catch (_) {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add New Book</h2>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <FiX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form
          accept="image/*"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6"
        >
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("title")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                type="number"
                disabled={isSubmitting}
                {...register("ISBN")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.ISBN && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ISBN.message}
                </p>
              )}
            </div>
          </div>

          {/* Author Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author First Name
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("authorFirstName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.authorFirstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.authorFirstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Last Name
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("authorLastName")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.authorLastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.authorLastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Publication Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publisher
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("publisher")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.publisher && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.publisher.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publication Year
              </label>
              <input
                type="number"
                disabled={isSubmitting}
                {...register("publicationYear")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.publicationYear && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.publicationYear.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Edition
              </label>
              <select
                disabled={isSubmitting}
                {...register("edition")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Edition</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (num) => (
                    <option
                      key={num}
                      value={`${num}${getOrdinalSuffix(num)} Edition`}
                    >
                      {num}
                      {getOrdinalSuffix(num)} Edition
                    </option>
                  )
                )}
              </select>
              {errors.edition && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.edition.message}
                </p>
              )}
            </div>
          </div>

          {/* Inventory Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-blue-800 mb-1">
                  New Copies
                </label>
                <input
                  type="number"
                  disabled={isSubmitting}
                  {...register("books.new.copies", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-blue-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
                {errors.books?.new?.copies && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.books.new.copies?.message}
                  </p>
                )}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-yellow-800 mb-1">
                  Fair Copies
                </label>
                <input
                  type="number"
                  disabled={isSubmitting}
                  {...register("books.fair.copies", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-yellow-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  min="0"
                />
                {errors.books?.fair?.copies && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.books.fair.copies?.message}
                  </p>
                )}
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-red-800 mb-1">
                  Poor Copies
                </label>
                <input
                  type="number"
                  disabled={isSubmitting}
                  {...register("books.poor.copies", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-red-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
                {errors.books?.poor?.copies && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.books.poor.copies?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                disabled={isSubmitting}
                {...register("type")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="circulation">Circulation</option>
                <option value="reference">Reference</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                disabled={isSubmitting}
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="periodical">Periodical</option>
                <option value="textbook">Textbook</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Description & Cover Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                disabled={isSubmitting}
                rows={5}
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <UploadCoverImage
                setValue={setValue}
                errors={errors}
                getValues={getValues}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>
          {errors.root && (
            <p className="mb-1 text-sm text-red-600">{errors.root.message}</p>
          )}
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
