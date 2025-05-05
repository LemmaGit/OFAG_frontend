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
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditLibrarianDetails from "./EditLibrarianDetails";
import AddLibrarian from "./AddLibrarian";
import useFetch from "../../../hooks/useFetch";
import { getAllLibrarians, removeLibrarian } from "../../../helpers/manager";
import useMutator from "../../../hooks/useMutator";
import { toast } from "react-toastify";

const SeeAllLibrarians = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [librarianToEdit, setLibrarianToEdit] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [filteredLibrarians, setFilteredLibrarians] = useState([]);

  const {
    data: { librarians = [], total } = {},
    isLoading,
    isError,
  } = useFetch("librarians", getAllLibrarians);

  const { mutateAsync: remove } = useMutator(removeLibrarian, "librarians");
  useEffect(() => {
    setFilteredLibrarians(librarians);
  }, [librarians]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLibrarians(librarians);
    }
  }, [searchQuery, librarians]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();

    const filtered = librarians.filter(
      (librarian) =>
        librarian._id.toLowerCase().includes(query) ||
        librarian.firstName.toLowerCase().includes(query) ||
        librarian.lastName.toLowerCase().includes(query) ||
        librarian.username.toLowerCase().includes(query)
    );

    setFilteredLibrarians(filtered);
  };

  const handleEdit = (librarian) => {
    setLibrarianToEdit(librarian);
    setEditModalOpen(true);
  };

  const handleRemove = async (id) => {
    const res = await remove(id);
    res.status === "success" && toast.success(res.message, { autoClose: 500 });
    res.status === "error" && toast.error(res.message, { autoClose: 500 });
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      {/* Main Content */}
      <Container className="flex-grow py-8">
        {/* Total Librarians */}
        <Typography variant="h6" align="center" className="mb-12 text-gray-700">
          There are a total of {total} librarians in the system.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            justifyContent: "start",
            marginBottom: "24px",
            marginTop: "4px",
            gap: "6px",
            marginBlockStart: "16px",
          }}
          className=""
        >
          <Box className="flex w-full max-w-3xl gap-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Librarian Id, Name or Username"
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
          <Button
            type="button"
            variant="contained"
            color="success"
            size="small"
            onClick={() => setIsAddBtnClicked(true)}
          >
            Add
          </Button>
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
            {librarians.length === 0 ? (
              <div className="flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No librarians available.</p>
              </div>
            ) : filteredLibrarians.length === 0 ? (
              <div className="flex justify-center items-center min-h-40 text-gray-500 text-lg">
                <p>No librarians match your search query.</p>
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
                        Librarian Name
                      </TableCell>
                      <TableCell className="font-semibold">Username</TableCell>
                      <TableCell className="font-semibold">Email</TableCell>
                      <TableCell className="font-semibold">Contact</TableCell>
                      <TableCell className="font-semibold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLibrarians.map((librarian) => (
                      <TableRow key={librarian._id} hover>
                        <TableCell>{`${librarian.firstName} ${librarian.lastName}`}</TableCell>
                        <TableCell>{librarian.username}</TableCell>
                        <TableCell>{librarian.email}</TableCell>
                        <TableCell>{librarian.contact}</TableCell>
                        <TableCell>
                          <div className="flex sm:gap-4 gap-2">
                            <button
                              onClick={() => handleEdit(librarian)}
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            >
                              <FaEdit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRemove(librarian._id)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Container>

      {/* Modals */}
      {isEditModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <EditLibrarianDetails
            setIsModalOpen={setEditModalOpen}
            selectedLibrarian={librarianToEdit}
          />
        </div>
      )}
      {isAddBtnClicked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <AddLibrarian setIsAddBtnClicked={setIsAddBtnClicked} />
        </div>
      )}
    </div>
  );
};

export default SeeAllLibrarians;
