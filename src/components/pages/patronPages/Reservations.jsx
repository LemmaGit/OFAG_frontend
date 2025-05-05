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
  CircularProgress,
} from "@mui/material";
import { getReservations, removeReservation } from "../../../helpers/patron";
import useFetch from "../../../hooks/useFetch";
import {
  formatDateToDDMMYYYY,
  getDayDifference,
} from "../../../helpers/utilFun";
import useMutator from "../../../hooks/useMutator";
import { toast } from "react-toastify";

const YourReservations = () => {
  const {
    isLoading,
    isError,
    data: { reservations } = {},
  } = useFetch("reservation", getReservations);
  const {
    isError: hasFailed,
    isSuccess,
    mutateAsync,
  } = useMutator(removeReservation, "reservation");

  async function cancelReservation(id) {
    const res = await mutateAsync(id);
    if (res.status === "success")
      return toast.success("Successfully cancelled");
    else return toast.error("Error cancelling");
  }
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
          Error fetching
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h5" className="font-bold text-gray-800">
            Reservations
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            View the list of books you have in your reservations.
          </Typography>
        </div>

        {/* Table */}
        {reservations && reservations.length === 0 ? (
          <center>
            <Typography variant="h5" className="mt-6 text-gray-700">
              You didn&apos;t have a reservation.
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
                    Reservation Date
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Expiration Date
                  </TableCell>
                  <TableCell className="text-white font-bold">
                    Reservation Type
                  </TableCell>
                  <TableCell align="center" className="text-white font-bold">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations?.map((reservation) => (
                  <TableRow
                    key={reservation._id}
                    className="transition-all duration-200 hover:bg-gray-50"
                  >
                    <TableCell className="text-gray-700">
                      {reservation.bookId.title}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {formatDateToDDMMYYYY(reservation.holdDate)}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      In {getDayDifference(reservation.expirationDate, true)}{" "}
                      Days
                    </TableCell>
                    <TableCell>
                      <span
                        className={`py-1 px-2 rounded-sm text-stone-700 ${
                          reservation.reservationType === "hold"
                            ? "bg-orange-300"
                            : "bg-emerald-300"
                        }`}
                      >
                        {reservation.reservationType}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition-all duration-200"
                        onClick={async () =>
                          await cancelReservation(reservation.bookId._id)
                        }
                      >
                        Cancel
                      </Button>
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

export default YourReservations;
