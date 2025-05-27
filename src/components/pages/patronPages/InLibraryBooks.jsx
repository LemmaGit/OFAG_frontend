import { useState } from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import dayjs from "dayjs";
import {
  getBooks,
  getBooksInReservationOrCheckout,
  placeReservation,
  removeReservation,
} from "../../../helpers/patron";
import { CircularProgress } from "@mui/material";
import useMutator from "../../../hooks/useMutator";
import { toast } from "react-toastify";
import BooksFilter from "./BooksFilter";

function Books() {
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {
    data: { books } = {},
    isLoading: isFetchingBooks,
    isError: isErrorFetchingBooks,
  } = useFetch("books", getBooks);
  const {
    data: { booksInReservationOrCheckout } = {},
    isLoading: isLoadingBooksInReservationOrCheckout,
    isError: isErrorFetchingBooksInReservationOrCheckout,
    isError,
  } = useFetch("unavailable books for patron", getBooksInReservationOrCheckout);
  // const {
  //   data: { bookIdsInHold, bookIdsInCheckout } = {},
  //   isLoading: isLoadingBooksNotAvailableForHold,
  // } = useFetch("not-available", getBooksInHoldOrCheckout);
  const { isError: hasFailedToPlaceHold, mutateAsync: placeReservationOnBook } =
    useMutator(placeReservation, "reservation");
  const {
    isError: hasFailedToCancelHold,
    mutateAsync: removeReservationOnBook,
  } = useMutator(removeReservation, "reservation");

  async function placeReservationOnClick(id) {
    const res = await placeReservationOnBook(id);
    if (res.status === "success")
      return toast.success("successfully placed reservation");
    else return toast.error(res.message);
  }
  async function cancelReservationOnClick(id) {
    const res = await removeReservationOnBook(id);
    if (res.status === "success")
      return toast.success("Successfully cancelled reservation");
    else return toast.error("Error cancelled hold");
  }
  const filteredBooks = books.filter((book) => {
    //* NEW
    const sevenDaysAgo = dayjs().subtract(7, "day");
    const bookAddedAt = dayjs(book.addedAt);
    const isNew = bookAddedAt.isAfter(sevenDaysAgo);

    const matchesFilter =
      filter === "All" ||
      (filter === "New" && isNew) ||
      (filter === "Available" && book.isAvailable);

    const matchesCategory = category === "" || book.category === category;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });
  function handleDetail(id) {
    navigate(`/book/${id}`);
  }

  return (
    <div className="col-start-2 pt-8">
      <BooksFilter
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        smallMargin={true}
      />
      {isFetchingBooks ||
        (isLoadingBooksInReservationOrCheckout && (
          <div className="flex justify-center items-center min-h-40">
            <CircularProgress />
          </div>
        ))}

      {/* Error State */}
      {isErrorFetchingBooks ||
        (isErrorFetchingBooksInReservationOrCheckout && (
          <div className="flex justify-center items-center min-h-40 text-red-500 font-bold text-xl">
            <p>Something went wrong. Please try again later.</p>
          </div>
        ))}

      {/* Books Grid */}
      {!isFetchingBooks & !isLoadingBooksInReservationOrCheckout &&
        !isErrorFetchingBooks &&
        !isErrorFetchingBooksInReservationOrCheckout && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.length === 0 ? (
              <div className="col-span-full flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No books found.</p>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <Book
                  key={book._id}
                  notAvailable={
                    // book._id.toString() in booksInReservationOrCheckout
                    booksInReservationOrCheckout.find(
                      (bookInReservation) =>
                        bookInReservation.bookId === book._id.toString()
                    )
                      ? true
                      : false
                  }
                  book={book}
                  handleDetail={() => handleDetail(book._id)}
                  placeReservationOnClick={() =>
                    placeReservationOnClick(book._id)
                  }
                  cancelReservationOnClick={() =>
                    cancelReservationOnClick(book._id)
                  }
                />
              ))
            )}
          </div>
        )}
    </div>
  );
}

export default Books;
