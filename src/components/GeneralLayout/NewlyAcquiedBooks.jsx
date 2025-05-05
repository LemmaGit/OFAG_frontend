import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

import useFetch from "../../hooks/useFetch";
import { getNewlyAcquiredBooks } from "../../helpers/librarian";
import { formatDateToDDMMYYYY } from "../../helpers/utilFun";
import { useNavigate } from "react-router-dom";

const NewlyAcquiredBooks = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    error,
    data: { books: newlyAcquiredBooks = [] } = {},
  } = useFetch("newly-aquired-books", getNewlyAcquiredBooks);

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
        className="container mx-auto p-6 shadow-lg rounded-lg"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading newly acquired books...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="container mx-auto p-6 rounded-lg">
        <Alert severity="error" sx={{ my: 2 }}>
          <Typography variant="body1">
            {error?.message || "Failed to load book data"}
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      </Box>
    );
  }

  if (newlyAcquiredBooks.length === 0) {
    return (
      <Box className="container mx-auto p-6 rounded-lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          textAlign="center"
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 60,
              color: "text.secondary",
              mb: 2,
              fontWeight: "bold",
            }}
          >
            📚
          </Typography>
          <Typography variant="h6" gutterBottom>
            No New Books Added
          </Typography>
          <Typography variant="body1" color="text.secondary">
            There haven&apos;t been any new book acquisitions recently
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
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
          Newly Acquired Books
        </Typography>

        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-semibold">Book Title</TableCell>
                <TableCell className="font-semibold">ISBN</TableCell>
                <TableCell className="font-semibold">Date Added</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newlyAcquiredBooks.map((book) => (
                <TableRow key={book._id} hover>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.ISBN}</TableCell>
                  <TableCell>{formatDateToDDMMYYYY(book.addedAt)}</TableCell>
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

export default NewlyAcquiredBooks;
