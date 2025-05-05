import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { getHolds } from "../../../helpers/librarian";

const Holds = () => {
  const [search, setSearch] = useState("");
  const [filteredHolds, setFilteredHolds] = useState([]);

  const {
    data: { holds = [] } = {},
    isLoading,
    isError,
  } = useFetch("holds", getHolds);
  const filterHolds = (searchTerm) => {
    if (!searchTerm.trim()) {
      return holds;
    }
    return holds.filter(
      (hold) =>
        hold.bookId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hold.patronId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (hold.title &&
          hold.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Update filtered holds when search or original holds change
  useEffect(() => {
    setFilteredHolds(filterHolds(search));
  }, [search, holds]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const displayHolds = search ? filteredHolds : holds;

  return (
    <Container maxWidth="lg" className="py-10">
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4"
      >
        <TextField
          label="Search by Patron ID, Book ID or Title"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          className="w-full md:w-1/2"
        />
        {search && (
          <Button
            variant="outlined"
            onClick={handleClearSearch}
            color="secondary"
          >
            Clear
          </Button>
        )}
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading holds...
          </Typography>
        </Box>
      ) : isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load holds. Please try again later.
        </Alert>
      ) : holds.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          textAlign="center"
        >
          <Typography variant="h6" gutterBottom>
            No Holds Available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            There are currently no books on hold in the system.
          </Typography>
        </Box>
      ) : displayHolds.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          textAlign="center"
        >
          <Typography variant="h6" gutterBottom>
            No Matching Holds Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            No holds match your search for {`"${search}"`}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleClearSearch}
          >
            Clear Search
          </Button>
        </Box>
      ) : (
        <Paper className="shadow-lg">
          <TableContainer>
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>
                    <strong>Book ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Patron Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Hold Date</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayHolds.map((hold) => (
                  <TableRow key={hold._id}>
                    <TableCell>{hold.bookId?._id}</TableCell>
                    <TableCell>{hold.bookId?.title || "N/A"}</TableCell>
                    <TableCell>{hold.patronId.firstName}</TableCell>
                    <TableCell>
                      {new Date(hold.holdDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Holds;
