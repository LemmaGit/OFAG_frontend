import { useState } from "react";
import Book from "./Book";
import DigitalBooksFilter from "./DigitalBooksFilter";
import DigitalBook from "./DigitalBook";
import { CircularProgress, Typography, Alert } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { getGoogleBooks } from "../../../helpers/patron";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DigitalBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSearch() {
    if (!title && !author) {
      setError("Please enter at least a title or author to search");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getGoogleBooks({ q: title, inauthor: author });
      if (data.status === "error") {
        setError(data.message);
        toast.error(data.message);
      } else {
        setData(data);
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again later.");
      toast.error("Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDetailBtnClick(id) {
    navigate(`/book-detail/${id}`);
  }

  return (
    <div className="col-start-2 space-y-4">
      <div className="my-8">
        <DigitalBooksFilter
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          handleSearch={handleSearch}
        />
      </div>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-start-1 col-span-full flex flex-col items-center justify-center space-y-2">
            <CircularProgress />
            <Typography variant="body1">Searching for books...</Typography>
          </div>
        ) : data ? (
          data.books?.length > 0 ? (
            data.books.map((book) => (
              <DigitalBook
                key={book.id}
                book={book}
                handleDetailBtnClick={() => handleDetailBtnClick(book.id)}
                handleClick={() => navigate(`read-book/${book.id}`)}
              />
            ))
          ) : (
            <div className="col-start-1 col-span-full text-center">
              <Typography variant="h6">
                No books found. Try different search terms.
              </Typography>
            </div>
          )
        ) : (
          <div className="col-start-1 col-span-full text-center">
            <Typography
              variant="h6"
              sx={{
                color: "#6b7280", // A nice muted gray
                textAlign: "center",
                fontWeight: 400,
                my: 2,
                opacity: 0.8, // Makes it slightly transparent
              }}
            >
              {!title && !author
                ? "Enter search terms to find books"
                : "Click search to find books"}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default DigitalBooks;
