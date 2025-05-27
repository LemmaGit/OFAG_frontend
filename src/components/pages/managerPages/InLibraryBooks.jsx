import Book from "./Book";
// import BooksFilter from "./../patronPages/BooksFilter";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { getBooks } from "../../../helpers/patron";
import { CircularProgress } from "@mui/material";
import Layout from "../Layout";
import { useState } from "react";
import dayjs from "dayjs";
import BooksFilter from "../patronPages/BooksFilter";

function Books() {
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {
    data: { books } = {},
    isLoading,
    isError,
  } = useFetch("books", getBooks);
  const filteredBooks = books.filter((book) => {
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
    <Layout>
      <BooksFilter
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {isLoading && (
        <div className="flex justify-center items-center min-h-40">
          <CircularProgress />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex justify-center items-center min-h-40 text-red-500 font-bold text-xl">
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}

      {/* Books Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full flex justify-center items-center min-h-40 text-gray-500 text-lg">
              <p>No books found.</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="col-span-full flex justify-center items-center min-h-40 text-gray-500 text-lg">
              <p>No books found.</p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <Book
                key={book._id}
                book={book}
                handleDetail={() => handleDetail(book._id)}
              />
            ))
          )}
        </div>
      )}
    </Layout>
  );
}

export default Books;
