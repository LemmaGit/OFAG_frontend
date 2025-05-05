import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { getNewlyRegisteredPatrons } from "../../helpers/librarian";
import { formatDateToDDMMYYYY } from "../../helpers/utilFun";

const NewlyRegisteredPatrons = () => {
  const {
    data: { patrons: newlyRegisteredPatrons = [] } = {},
    isLoading,
    isError,
    error,
  } = useFetch("newly-registered-patrons", getNewlyRegisteredPatrons);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        className="container mx-auto p-6 rounded-lg"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading patron data...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="container mx-auto p-6 rounded-lg">
        <Alert severity="error" sx={{ my: 2 }}>
          <Typography variant="body1">
            {error?.message || "Failed to load patron data"}
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

  if (newlyRegisteredPatrons.length === 0) {
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
          <Typography variant="h6" gutterBottom>
            No New Patrons Registered
          </Typography>
          <Typography variant="body1" color="text.secondary">
            There haven&apos;t been any new patron registrations recently
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
      <Box className="container mx-auto p-6 rounded-lg">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
          className="text-[#333]"
        >
          Newly Registered Patrons
        </Typography>

        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-semibold">Patron Name</TableCell>
                <TableCell className="font-semibold">Username</TableCell>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell className="font-semibold">Date Added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newlyRegisteredPatrons.map((patron) => (
                <TableRow key={patron._id} hover>
                  <TableCell>{`${patron.firstName} ${patron.lastName}`}</TableCell>
                  <TableCell>{patron.username}</TableCell>
                  <TableCell>{patron.email}</TableCell>
                  <TableCell>
                    {formatDateToDDMMYYYY(patron.registeredAt)}
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

export default NewlyRegisteredPatrons;
