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
import useFetch from "../../../hooks/useFetch";
import { getCheckedoutBooks } from "../../../helpers/patron";
import { formatDateToDDMMYYYY } from "../../../helpers/utilFun";

const CheckedoutBooks = () => {
  const {
    isLoading,
    isError,
    data: { books } = {},
  } = useFetch("checkedout", getCheckedoutBooks);
  if (isLoading)
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
        <div className="mb-8">
          <Typography variant="h5" className="font-bold text-gray-800">
            Checkedout Books
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            View the list of books you have checked out and their current
            status.
          </Typography>
        </div>

        {!books || books?.length === 0 ? (
          <center>
            <Typography variant="h5" className="mt-6 text-gray-700">
              You didn&apos;t check out any book.
            </Typography>
          </center>
        ) : (
          <TableContainer
            component={Paper}
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <Table>
              <TableHead>
                <TableRow className="bg-neutral-300">
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
                  <TableCell className="text-white font-bold">Status</TableCell>
                  <TableCell align="center" className="text-white font-bold">
                    Overdue Fee
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow
                    key={book._id}
                    className={`transition-all duration-200 hover:bg-gray-50 ${
                      book.status === "overdue" ? "bg-red-50" : "bg-white"
                    }`}
                  >
                    <TableCell className="font-medium text-gray-800">
                      {book.bookTitle}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {book.librarianFullName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {formatDateToDDMMYYYY(book.checkoutDate)}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {formatDateToDDMMYYYY(book.dueDate)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          book.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {book.status}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="text-gray-700">
                      {book.overduefee} Birr
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

export default CheckedoutBooks;
