import { useState } from "react";
import BooksFilter from "../patronPages/BooksFilter";
import Book from "./Book";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Books({ books, isLoading, isError }) {
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const filteredBooks = books.filter((book) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "New" && book.condition === "new") ||
      (filter === "Available" && book.isAvailable);

    const matchesCategory = category === "" || book.category === category;

    return matchesFilter && matchesCategory;
  });
  function handleDetail(id) {
    navigate(`/book/${id}`);
  }
  return (
    <div className="col-start-2">
      <BooksFilter
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
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
          {filteredBooks.length === 0 ? (
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
    </div>
  );
}

export default Books;
