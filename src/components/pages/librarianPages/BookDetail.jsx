import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { getBookDetails } from "../../../helpers/librarian";
import { CircularProgress } from "@mui/material";
import Layout from "../Layout";

// Loading Component
const Loading = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <CircularProgress />
  </div>
);

// Error Component
const Error = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <p className="text-lg text-red-500">
      Something went wrong. Please try again later.
    </p>
  </div>
);

function BookDetail() {
  const { bookId } = useParams();
  const {
    isLoading,
    isError,
    data: { book } = {},
  } = useFetch("book", getBookDetails(bookId));
  return (
    <Layout>
      <div className="col-start-2 min-h-dvh p-4 sm:p-6">
        {isLoading && <Loading />}
        {(isError || !book) && <Error />}
        {book && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
              <div className="w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src={book.coverImage}
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                  {book.title}
                </h1>

                {/* Author */}
                <p className="text-lg sm:text-xl text-gray-600">
                  By: {`${book.author.firstName} ${book.author.lastName}`}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Edition</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.edition}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Publish Year</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.publicationYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Description */}
            <div className="mt-8 sm:mt-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                Description
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BookDetail;
