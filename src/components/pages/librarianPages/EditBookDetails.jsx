import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiX } from "react-icons/fi";
import useMutator from "../../../hooks/useMutator";
import { editBook } from "../../../helpers/librarian";
import { bookEditSchema } from "../../../schema/book";
import { toast } from "react-toastify";
import InputErr from "../InputErr";
import { getOrdinalSuffix } from "../../../helpers/utilFun";

const EditBookDetail = ({ setIsEditModalOpen, book }) => {
  const { new: newBooks, fair: fairBooks, poor: poorBooks } = book.books;
  // const emptyFileList = new DataTransfer().files;
  const bookCoverImageURL = book.coverImage;

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookEditSchema),
    defaultValues: {
      title: book.title,
      authorFirstName: book.author.firstName,
      authorLastName: book.author.lastName,
      publisher: book.publisher,
      publicationYear: book.publicationYear,
      edition: book.edition,
      description: book.description,
      type: book.type,
      category: book.category,
      books: book.books,
    },
  });
  const { mutateAsync } = useMutator(editBook, "books");
  const onSubmit = async (data) => {
    data.author = JSON.stringify({
      firstName: data.authorFirstName,
      lastName: data.authorLastName,
    });
    data.books = JSON.stringify(data.books);
    data.bookId = book._id;

    delete data.authorFirstName;
    delete data.authorLastName;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && !data.image) return;
      if (key === "image" && data.image)
        formData.append("image", data.image[0]);
      if (key !== "image") formData.append(key, value);
    });

    const res = await mutateAsync(formData);
    if (res.status && res.status !== "error") {
      setIsEditModalOpen(false);
      toast.success("Successfully Updated!");
    } else if (res.message && res.message.includes("{")) {
      const message = JSON.parse(res.message);
      Object.entries(message).forEach(([key, value]) => {
        return setError(key, { type: "server", message: value });
      });
    } else {
      setError("root", { type: "server", message: res.message });
    }
  };
  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Edit Book Details</h2>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <form
            accept="image/*"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 flex-1"
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Book Title
                    </label>
                    <input
                      type="text"
                      // readOnly={isSubmitting}
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
                      Publisher
                    </label>
                    <input
                      type="text"
                      readOnly={isSubmitting}
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
                      Author First Name
                    </label>
                    <input
                      type="text"
                      readOnly={isSubmitting}
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
                      readOnly={isSubmitting}
                      {...register("authorLastName")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.authorLastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.authorLastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publication Year
                    </label>
                    <input
                      type="number"
                      readOnly={isSubmitting}
                      {...register("publicationYear", { valueAsNumber: true })}
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
                    {/* <input
                      type="text"
                      readOnly={isSubmitting}
                      {...register("edition")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /> */}
                    <select
                      readOnly={isSubmitting}
                      // value={book.edition}
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
              </div>

              {/* Classification Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Classification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      readOnly={isSubmitting}
                      {...register("category")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Book Type
                    </label>
                    <select
                      readOnly={isSubmitting}
                      {...register("type")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="circulation">Circulation</option>
                      <option value="reference">Reference</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Inventory Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Inventory
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* New Copies */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-sm font-medium text-blue-800">
                        New Copies
                      </label>
                      <span className="text-xs text-blue-600">
                        Available: {newBooks.availableCopies}
                      </span>
                    </div>
                    <input
                      type="number"
                      readOnly={isSubmitting}
                      // {...register("newCopies", { valueAsNumber: true })}
                      {...register("books.new.copies", { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-blue-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                    {errors.books?.new?.copies && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.newCopies.message}
                      </p>
                    )}
                  </div>

                  {/* Fair Copies */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-sm font-medium text-yellow-800">
                        Fair Copies
                      </label>
                      <span className="text-xs text-yellow-600">
                        Available: {fairBooks.availableCopies}
                      </span>
                    </div>
                    <input
                      type="number"
                      readOnly={isSubmitting}
                      // {...register("fairCopies", { valueAsNumber: true })}
                      {...register("books.fair.copies", {
                        valueAsNumber: true,
                      })}
                      className="w-full px-3 py-2 border border-yellow-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      min="0"
                    />
                    {errors.books?.fair?.copies && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.books.fair.copies.message}
                      </p>
                    )}
                  </div>

                  {/* Poor Copies */}
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-sm font-medium text-red-800">
                        Poor Copies
                      </label>
                      <span className="text-xs text-red-600">
                        Available: {poorBooks.availableCopies}
                      </span>
                    </div>
                    <input
                      type="number"
                      readOnly={isSubmitting}
                      // {...register("poorCopies", { valueAsNumber: true })}
                      {...register("books.poor.copies", {
                        valueAsNumber: true,
                      })}
                      className="w-full px-3 py-2 border border-red-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                    />
                    {errors.books?.poor?.copies && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.books.poor.copies.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Description
                </h3>
                <div>
                  <textarea
                    readOnly={isSubmitting}
                    {...register("description")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Cover Image Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Cover Image
                </h3>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    readOnly={isSubmitting}
                    {...register("image")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <InputErr errors={errors} inputField="root" hasTopMargin={true} />

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Book Cover Preview Section */}
          <div className="p-6 md:p-8 md:border-l border-gray-200 flex flex-col items-center">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Book Cover Preview
              </h3>
              <div className="w-48 h-64 bg-gray-100 rounded-lg shadow-md overflow-hidden relative">
                {bookCoverImageURL ? (
                  <img
                    src={bookCoverImageURL}
                    alt="Book cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No cover image
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Current cover image</p>
                <p className="text-xs text-gray-400 mt-1">
                  New image will replace this
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookDetail;
