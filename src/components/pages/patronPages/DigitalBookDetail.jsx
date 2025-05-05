import { useNavigate, useParams } from "react-router-dom";
import { getGoogleBook } from "../../../helpers/patron";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../../hooks/Spinner";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  function handleRead() {
    return navigate(`/read-book/${id}`);
  }
  const { isLoading, isError, error, data, retry } = useFetch(
    "online-book",
    () => getGoogleBook(id)
  );

  if (isLoading)
    return (
      <div className="col-start-2 min-h-dvh flex items-center justify-center">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <p className="text-lg text-gray-600">Loading book details...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="col-start-2 min-h-dvh flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Failed to load book
          </h2>
          <p className="text-gray-600">
            {error?.message || "An unknown error occurred"}
          </p>
          <button
            onClick={retry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  if (!Object.keys(data).length) return null;

  const { volumeInfo } = data.book;
  return (
    <div className="col-start-2 min-h-dvh p-4 sm:p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {/* Book Cover */}
          <div className="w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <img
              src={
                volumeInfo.imageLinks?.thumbnail ||
                volumeInfo.imageLinks?.smallThumbnail ||
                "/book-placeholder.jpg"
              }
              alt={volumeInfo.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/book-placeholder.jpg";
              }}
            />
          </div>

          {/* Book Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {volumeInfo.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                By: {volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-sm text-gray-500">Publisher</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  {volumeInfo.publisher || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  {volumeInfo.categories?.join(", ") || "Not categorized"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Published Date</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  {volumeInfo.publishedDate || "Unknown"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Pages</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  {volumeInfo.pageCount || "Not specified"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
              <button
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow hover:shadow-md flex items-center justify-center gap-2"
                onClick={handleRead}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Read Online
              </button>
            </div>
          </div>
        </div>

        {/* Book Description */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Description
          </h2>
          <div className="prose max-w-none text-gray-600">
            {volumeInfo.description ? (
              <p className="whitespace-pre-line">{volumeInfo.description}</p>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                No description available for this book.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
