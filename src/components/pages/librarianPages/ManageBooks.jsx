import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Container,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddBook from "./AddBook";
import EditBookDetails from "./EditBookDetails";
import useMutator from "../../../hooks/useMutator";
import { deleteBook } from "../../../helpers/librarian";
import { toast } from "react-toastify";

const ManageBook = ({ isLoading, isError, books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToBeEdited, setBookToBeEdited] = useState(null);
  const { mutateAsync } = useMutator(deleteBook, "books");
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.toLowerCase().trim();

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        (book._id && book._id.toLowerCase().includes(query))
    );

    setFilteredBooks(filtered);
  };

  const handleRemoveBook = async (id) => {
    const res = await mutateAsync(id);
    res.status === "success" && toast.success(res.message);
    res.status === "error" && toast.error(res.message);
  };

  return (
    <>
      <Container className="py-10">
        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-4">
          <form onSubmit={handleSearch} className="flex-grow mr-4">
            <div className="flex gap-4">
              <TextField
                label="Search by Book ID or Title"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{ backgroundColor: "white" }}
              />
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                sx={{
                  // minWidth: "120px",
                  paddingX: 1.2,
                  // paddingY: 1.5,
                  fontWeight: "600",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#1A73E8" },
                }}
              >
                Search
              </Button>
            </div>
          </form>

          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
            sx={{
              // minWidth: "140px",
              paddingX: 1.2,
              paddingY: 1.1,
              fontWeight: "600",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#4CAF50" },
            }}
          >
            Add Book
          </Button>
        </div>

        {/* Loading State */}
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

        {/* Books List or Empty States */}
        {!isLoading && !isError && (
          <>
            {books.length === 0 ? (
              <div className="flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No books available.</p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No books match your search query.</p>
              </div>
            ) : (
              <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table aria-label="Books Table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Book Title</TableCell>
                      <TableCell>ISBN</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <TableRow key={book._id}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.ISBN}</TableCell>
                        <TableCell>{`${book.author.firstName} ${book.author.lastName}`}</TableCell>
                        <TableCell>
                          {!book.isAvailable ? (
                            <span className="text-orange-600 font-bold">
                              BORROWED
                            </span>
                          ) : (
                            <div className="flex gap-2 items-center">
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  setIsEditModalOpen(true);
                                  setBookToBeEdited(book);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleRemoveBook(book._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Container>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="min-h-dvh z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <AddBook setIsAddModalOpen={setIsAddModalOpen} />
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="min-h-dvh z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <EditBookDetails
            setIsEditModalOpen={setIsEditModalOpen}
            book={bookToBeEdited}
          />
        </div>
      )}
    </>
  );
};

export default ManageBook;
