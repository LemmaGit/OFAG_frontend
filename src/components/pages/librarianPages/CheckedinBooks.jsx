import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { getCheckedinBooks } from "../../../helpers/librarian";

const CheckedinBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const {
    data: { books = [] } = {},
    isLoading,
    isError,
    error,
  } = useFetch("checked-in", getCheckedinBooks);
  // Filter books based on search term
  const filterBooks = (term) => {
    if (!term.trim()) return books;
    return books.filter(
      (book) =>
        book.bookId.startsWith(term) ||
        book.patronFullName.toLowerCase().startsWith(term.toLowerCase()) ||
        book.bookDetails.title.toLowerCase().startsWith(term.toLowerCase())
    );
  };

  // Update filtered books when search or original books change
  useEffect(() => {
    setFilteredBooks(filterBooks(searchTerm));
  }, [searchTerm, books]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const displayBooks = searchTerm ? filteredBooks : books;

  return (
    <Box className=" py-8 px-4 md:px-12">
      <Box className="max-w-6xl mx-auto p-6 rounded-lg ">
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
        >
          <TextField
            label="Search by patron name, book id, or title"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            className="sm:w-80"
          />
          {searchTerm && (
            <Button
              variant="outlined"
              onClick={handleClearSearch}
              color="secondary"
              size="small"
            >
              Clear
            </Button>
          )}
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading checked-in books...
            </Typography>
          </Box>
        ) : isError ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message || "Failed to load checked-in books"}
          </Alert>
        ) : books.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
            textAlign="center"
          >
            <Typography variant="h6" gutterBottom>
              No Checked-in Books
            </Typography>
            <Typography variant="body1" color="text.secondary">
              There are currently no checked-in books in the system.
            </Typography>
          </Box>
        ) : displayBooks.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
            textAlign="center"
          >
            <Typography variant="h6" gutterBottom>
              No Matching Books Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              No books match your search for {`"${searchTerm}"`}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleClearSearch}
              size="small"
            >
              Clear Search
            </Button>
          </Box>
        ) : (
          <TableContainer component={Paper} className="shadow-md rounded-lg">
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#E3F2FD" }}>
                  <TableCell className="font-semibold">Book Title</TableCell>
                  <TableCell className="font-semibold">Patron Name</TableCell>
                  <TableCell className="font-semibold">Checkedin By</TableCell>
                  <TableCell className="font-semibold">Check in Date</TableCell>
                  <TableCell className="font-semibold">
                    Condition(checkout)
                  </TableCell>
                  <TableCell className="font-semibold">
                    Condition(checkin)
                  </TableCell>
                  <TableCell className="font-semibold">
                    Total Fee (Birr)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayBooks.map((book, idx) => (
                  <TableRow
                    key={book.bookId + `${Math.random()}`}
                    hover
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#FAFAFA" : "white",
                    }}
                  >
                    <TableCell>{book.bookDetails.title}</TableCell>
                    <TableCell>{book.patronFullName}</TableCell>
                    <TableCell>{book.librarianFullName}</TableCell>
                    <TableCell>
                      {new Date(book.checkinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{book.bookConditionWhenCheckedout}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          book.bookConditionWhenCheckedin === "lost" &&
                          "text-red-500"
                        }`}
                      >
                        {book.bookConditionWhenCheckedin}
                      </span>
                    </TableCell>
                    <TableCell>{book.totalFee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default CheckedinBooks;
