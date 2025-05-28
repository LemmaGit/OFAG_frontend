import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiUpload, FiFile, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { pdfSchema } from "../../../schema/pdf";
import useMutator from "../../../hooks/useMutator";
import { uploadPdf } from "../../../helpers/librarian";

export default function UploadPdfModal({ setIsUploadModalOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    getValues,
    reset,
  } = useForm({ resolver: zodResolver(pdfSchema) });
  const { mutateAsync } = useMutator(uploadPdf, "pdfs");
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = React.createRef();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("author", JSON.stringify(data.author));
    delete data.author;
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
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
        reset();
        setIsUploadModalOpen(false);
        return toast.success("Successfully Added a new book");
      }
    } catch (_) {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("pdf", file);
      setFilePreview({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type,
      });
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setValue("pdf", null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Upload PDF</h2>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <FiX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author First Name *
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("author.firstName", {
                  required: "First name is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.author?.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Last Name *
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("author.lastName", {
                  required: "Last name is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.author?.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.author.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              disabled={isSubmitting}
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              disabled={isSubmitting}
              rows={3}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF File *
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
              id="fileInput"
            />

            {!filePreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <FiUpload className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Upload PDF
                </span>
              </button>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FiFile className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {filePreview.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {filePreview.size}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {errors.pdf && (
              <p className="mt-1 text-sm text-red-600">{errors.pdf.message}</p>
            )}
          </div>
          {errors.root && (
            <p className="mt-1 text-sm text-red-600">{errors.root.message}</p>
          )}
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !filePreview}
              className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubmitting || !filePreview
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Uploading..." : "Upload PDF"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
