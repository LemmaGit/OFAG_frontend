import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import AddPatron from "./AddPatron";
import useFetch from "../../../hooks/useFetch";
import { getPatrons, removePatron } from "../../../helpers/librarian";
import useMutator from "../../../hooks/useMutator";
// import DataTable from "../reusable-UI/DataTable";

const ManagePatrons = () => {
  const {
    isLoading,
    isError,
    data: { patrons } = {},
  } = useFetch("patrons", getPatrons);
  const { mutateAsync: removepatron } = useMutator(removePatron, "patrons");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredPatrons, setFilteredPatrons] = useState([]);
  useEffect(() => {
    setFilteredPatrons(patrons);
  }, [patrons]);

  // Reset to all books when searchQuery is cleared
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatrons(patrons);
    }
  }, [searchQuery, patrons]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.toLowerCase().trim();

    const filtered = patrons.filter(
      (patron) =>
        patron.firstName.toLowerCase().includes(query) ||
        patron.lastName.toLowerCase().includes(query) ||
        (patron.BookId && patron._id.toLowerCase().includes(query))
    );

    setFilteredPatrons(filtered);
  };

  const handleRemovePatron = async (patronId) => {
    const res = await removepatron(patronId);
  };

  return (
    <div className="container mt-6">
      <div className="flex justify-between mb-6 gap-4">
        <form onSubmit={handleSearch} className="w-1/2 flex space-x-2 gap-2 ">
          <TextField
            label="Search by Patron name"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
          >
            Search
          </Button>
        </form>
        <Button
          type="submit"
          variant="contained"
          color="success"
          size="small"
          onClick={() => setIsAddModalOpen(true)}
        >
          Register Patron
        </Button>
      </div>
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
            <TableContainer component={Paper} className="shadow-lg">
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Patron Id</TableCell> */}
                    <TableCell>Patron Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPatrons?.map((patron) => (
                    <TableRow key={patron._id}>
                      {/* <TableCell>{patron.PatronId}</TableCell> */}
                      <TableCell>
                        {patron.firstName} {patron.lastName}
                      </TableCell>
                      <TableCell>{patron.username}</TableCell>
                      <TableCell>{patron.email}</TableCell>
                      <TableCell>
                        {patron.hasBorrowedBooks ? (
                          <span className="text-yellow-500">BORROWED</span>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleRemovePatron(patron._id)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "red.700",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      {isAddModalOpen && (
        <div className=" z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <AddPatron setIsAddModalOpen={setIsAddModalOpen} />
        </div>
      )}
    </div>
  );
};

export default ManagePatrons;

{
  /* <DataTable
            columns={["Patron ID", "Patron Name", "Username", "Email","Action"]}
            headClassName="bg-gray-100"
            data={patrons}
          />  */
}
