import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { getAllPatrons } from "../../helpers/manager";

const AllPatrons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatrons, setFilteredPatrons] = useState([]);

  const {
    data: { patrons = [], total } = {},
    isLoading,
    isError,
  } = useFetch("patrons", getAllPatrons);
  useEffect(() => {
    setFilteredPatrons(patrons);
  }, [patrons]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatrons(patrons);
    }
  }, [searchQuery, patrons]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();

    const filtered = patrons.filter(
      (patron) =>
        patron._id.toLowerCase().startsWith(query) ||
        patron.firstName.toLowerCase().startsWith(query) ||
        patron.lastName.toLowerCase().startsWith(query) ||
        patron.username.toLowerCase().startsWith(query) ||
        patron.email.toLowerCase().startsWith(query)
    );

    setFilteredPatrons(filtered);
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      {/* Main Content */}
      <Container className="flex-grow py-8">
        {/* Total Patrons */}
        <Typography
          variant="h6"
          align="center"
          sx={{ marginBottom: "24px" }}
          className="text-gray-700"
        >
          There are a total of {total} patrons in the system.
        </Typography>

        {/* Search Form */}
        <Box
          component="form"
          onSubmit={handleSearch}
          className="flex justify-start mb-8"
        >
          <Box className="flex w-full max-w-3xl gap-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Patron ID, Name, Username or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              className="mr-2"
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Search
            </Button>
          </Box>
        </Box>

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

        {/* Data States */}
        {!isLoading && !isError && (
          <>
            {patrons.length === 0 ? (
              <div className="flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No patrons available.</p>
              </div>
            ) : filteredPatrons.length === 0 ? (
              <div className="flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No patrons match your search query.</p>
              </div>
            ) : (
              <TableContainer
                component={Paper}
                className="shadow-lg rounded-lg"
              >
                <Table>
                  <TableHead className="bg-gray-200">
                    <TableRow>
                      <TableCell className="font-semibold">
                        Patron Name
                      </TableCell>
                      <TableCell className="font-semibold">Username</TableCell>
                      <TableCell className="font-semibold">Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPatrons.map((patron) => (
                      <TableRow key={patron._id} hover>
                        <TableCell>{`${patron.firstName} ${patron.lastName}`}</TableCell>
                        <TableCell>{patron.username}</TableCell>
                        <TableCell>{patron.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default AllPatrons;
