import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { getMostlyCirculatedBooks } from "../../helpers/librarian";
import { EmojiEmotionsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MostCirculatedBooks = () => {
  const navigate = useNavigate();
  const {
    data: { books: mostCirculatedBooks = [] } = {},
    isLoading,
    isError,
    error,
  } = useFetch("mostly-circulated-books", getMostlyCirculatedBooks);
  function handleDetail(id) {
    navigate(`/book/${id}`);
  }
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        className="container mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading circulation data...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Alert severity="error" sx={{ my: 2 }}>
          <Typography variant="body1">
            {error?.message || "Failed to load circulation data"}
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (mostCirculatedBooks.length === 0) {
    return (
      <Box className="container mx-auto p-6 rounded-lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          textAlign="center"
        >
          <EmojiEmotionsOutlined
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            No books have been circulated yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Check back later when books start getting borrowed
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div className="py-8">
      <Box className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Most Circulated Books
        </Typography>

        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-semibold">Book Title</TableCell>
                <TableCell className="font-semibold">ISBN</TableCell>
                <TableCell className="font-semibold">Borrow Count</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mostCirculatedBooks.map((book) => (
                <TableRow key={book._id} hover>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.ISBN}</TableCell>
                  <TableCell>{book.borrowCount}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleDetail(book._id)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default MostCirculatedBooks;
