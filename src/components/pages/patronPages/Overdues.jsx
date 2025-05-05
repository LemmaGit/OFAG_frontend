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
  CircularProgress,
} from "@mui/material";
import {
  formatDateToDDMMYYYY,
  getDayDifference,
} from "../../../helpers/utilFun";
import useFetch from "../../../hooks/useFetch";
import { getOverdueBooks } from "../../../helpers/patron";

const SeeOverdues = () => {
  const {
    isLoading,
    isError,
    data: { books } = {},
  } = useFetch("overdue", getOverdueBooks);

  if (isLoading || !books)
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold ">
          Error fetching{" "}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h5" className="font-bold text-gray-800">
            Overdue Books
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            View the list of books that are overdue and their associated fees.
          </Typography>
        </div>

        {/* Table */}
        {books.length === 0 ? (
          <center>
            <Typography variant="h5" className="mt-6 text-gray-700">
              You have no overdue books.
            </Typography>
          </center>
        ) : (
          <TableContainer
            component={Paper}
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <Table>
              <TableHead>
                <TableRow className="bg-stone-300">
                  <TableCell className="text-white font-bold">
                    Book Title
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Checkedout By
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Check Out Date
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Due Date
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Overdue Days
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Overdue Fee
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow
                    key={book.bookTitle}
                    className="transition-all duration-200 hover:bg-gray-50"
                  >
                    <TableCell className="font-medium text-gray-800">
                      {book.bookTitle}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {book.librarianFullName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {formatDateToDDMMYYYY(book.checkOutDate)}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {formatDateToDDMMYYYY(book.dueDate)}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {getDayDifference(book.overdueDays) + " days"}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      ${formatDateToDDMMYYYY(book.overdueFee)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default SeeOverdues;
