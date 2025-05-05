import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {
  getBookDetails,
  getBooksInReservationOrCheckout,
} from "../../../helpers/patron";
import { CircularProgress } from "@mui/material";
import Layout from "../Layout";

const Loading = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <CircularProgress />
  </div>
);

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
  const {
    data: { booksInReservationOrCheckout } = {},
    isLoading: isLoadingBooksInReservationOrCheckout,
    isError: isErrorFetchingBooksInReservationOrCheckout,
  } = useFetch("unavailable books for patron", getBooksInReservationOrCheckout);
  let notAvailable;
  if (booksInReservationOrCheckout) {
    notAvailable = booksInReservationOrCheckout.find(
      (bookInReservation) => bookInReservation.bookId === book._id.toString()
    )
      ? true
      : false;
  }
  return (
    <Layout>
      <div className="col-start-2 min-h-dvh p-4 sm:p-6">
        {isLoading || (isLoadingBooksInReservationOrCheckout && <Loading />)}
        {(isError || !book || isErrorFetchingBooksInReservationOrCheckout) && (
          <Error />
        )}
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
                  By:{`${book.author.firstName} ${book.author.lastName}`}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {/* Edition */}
                  <div>
                    <p className="text-sm text-gray-500">Edition</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.edition.charAt(0).toUpperCase() +
                        book.edition.slice(1)}{" "}
                      Edition
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.category.charAt(0).toUpperCase() +
                        book.category.slice(1)}
                    </p>
                  </div>

                  {/* Type */}
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.type.charAt(0).toUpperCase() + book.type.slice(1)}
                    </p>
                  </div>

                  {/* Publish Year */}
                  <div>
                    <p className="text-sm text-gray-500">Publish Year</p>
                    <p className="text-lg sm:text-xl font-medium text-gray-800">
                      {book.publicationYear}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {book.type !== "reference" && !notAvailable && (
                    <button
                      className={`w-full sm:w-auto sm:flex-1 px-6 py-3 text-white  rounded-lg text-lg font-semibold sm:rounded-xl cursor-pointer duration-200 shadow-lg hover:shadow-xl ${
                        !book.isAvailable
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={book.type === "reference"}
                      // onClick={placeReservationOnClick}
                    >
                      {book.isAvailable ? "Hold" : "Waitlist"}
                    </button>
                  )}

                  {/* <button className="w-full sm:w-auto sm:flex-1 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                    Hold
                  </button> */}
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
