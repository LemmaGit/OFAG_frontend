import { useState } from "react";
import Book from "./Book";
import BooksFilter from "./../patronPages/BooksFilter";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { getBooks } from "../../../helpers/patron";
import { CircularProgress } from "@mui/material";
import Layout from "../Layout";

function Books() {
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const {
    data: { books } = {},
    isLoading,
    isError,
  } = useFetch("books", getBooks);

  function handleDetail(id) {
    navigate(`/book/${id}`);
  }

  return (
    <Layout>
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
          ) : (
            books.map((book) => (
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
