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
  Alert,
  Box,
} from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { getCheckedoutBooks } from "../../../helpers/librarian";
import dayjs from "dayjs";

import CheckinForm from "./CheckinForm";
import RenewForm from "./RenewForm";
import { useSearchParams } from "react-router-dom";
function getOverDueDays(issue) {
  const isAfterNow = dayjs(dayjs()).isAfter(issue.dueDate);
  console.log(isAfterNow);
  let overdueDays;
  if (isAfterNow) {
    const now = dayjs();
    const dueDate = dayjs(issue.dueDate);
    overdueDays = now.diff(dueDate, "day");
  }
  return overdueDays || 0;
}
const CheckedoutBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckinFormOpen, setIsCheckinFormOpen] = useState(false);
  const [isRenewFormOpen, setIsRenewFormOpen] = useState(false);
  const [checkinProps, setCheckinProps] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: { books = [] } = {},
    isLoading,
    isError,
    error,
  } = useFetch("checkedout-books", getCheckedoutBooks);
  const filterBooks = (term) => {
    if (!term.trim()) return books;

    useEffect(() => {
      setFilteredBooks(filterBooks(searchTerm));
    }, [searchTerm, books]);
    return books.filter(
      (book) =>
        book.patronId.toLowerCase().includes(term.toLowerCase()) ||
        (book.bookDetails.title &&
          book.bookDetails.title.toLowerCase().includes(term.toLowerCase()))
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleRenew = (patronId, bookId) => {
    setSearchParams({ p_id: patronId, id: bookId });
    setIsRenewFormOpen(true);
  };

  const handleCheckin = (issue) => {
    const overdueDays = getOverDueDays(issue);
    setCheckinProps({
      patronId: issue.patronId,
      bookId: issue.bookId,
      status: overdueDays ? "overdue" : "not overdue",
      overdueFee: issue.overdueFinePerDay * overdueDays,
      bookConditionWhenCheckedout: issue.bookConditionWhenCheckedout,
    });
    setIsCheckinFormOpen(true);
  };
  // setSearchParams({ p_id: patronId, id: bookId, s: status, fee, condition });

  const displayBooks = searchTerm ? filteredBooks : books;
  return (
    <>
      <Container maxWidth="lg" className="py-10">
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4"
        >
          <TextField
            label="Search by Patron ID or Title"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-1/2"
          />
          {searchTerm && (
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
              Loading checked-out books...
            </Typography>
          </Box>
        ) : isError ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message || "Failed to load checked-out books"}
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
              No Checked-Out Books
            </Typography>
            <Typography variant="body1" color="text.secondary">
              There are currently no books checked out in the system.
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
                      <strong>Book Title</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Patron Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Check Out Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Due Date</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayBooks.map((issue) => {
                    const isOverdue = issue.status === "overdue";

                    return (
                      <TableRow
                        key={issue._id}
                        sx={{
                          backgroundColor: isOverdue ? "#ff000019" : "",
                        }}
                      >
                        <TableCell>{issue.bookDetails.title}</TableCell>
                        <TableCell>{issue.patronFullName}</TableCell>
                        <TableCell>
                          {new Date(issue.checkoutDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(issue.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            gap: 4,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {!isOverdue && (
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() =>
                                handleRenew(issue.patronId, issue.bookId)
                              }
                            >
                              Renew
                            </Button>
                          )}
                          {isOverdue && (
                            <Typography variant="body2" color="error">
                              Overdue
                            </Typography>
                          )}
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleCheckin(issue)}
                          >
                            Check-In
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
      {isCheckinFormOpen && (
        <div className="min-h-dvh z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <CheckinForm
            setIsCheckinFormOpen={setIsCheckinFormOpen}
            {...checkinProps}
          />
        </div>
      )}
      {isRenewFormOpen && (
        <div className="min-h-dvh z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <RenewForm setIsRenewFormOpen={setIsRenewFormOpen} />
        </div>
      )}
    </>
  );
};

export default CheckedoutBooks;
