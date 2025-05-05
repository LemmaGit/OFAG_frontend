import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Badge,
} from "@mui/material";

// Sample book data
const sampleBooks = [
  {
    BookId: 1,
    Title: "The Great Gatsby",
    Availability: 3,
    Description: "A classic novel about the American dream.",
    Type: "Fiction",
  },
  {
    BookId: 2,
    Title: "1984",
    Availability: 0,
    Description: "A dystopian novel about totalitarianism.",
    Type: "Fiction",
  },
  {
    BookId: 3,
    Title: "To Kill a Mockingbird",
    Availability: 2,
    Description: "A novel about racial inequality in the American South.",
    Type: "Fiction",
  },
];

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSampleBooks();
  }, []);

  const loadSampleBooks = (searchTerm = "") => {
    const filteredBooks = sampleBooks.filter(
      (book) =>
        book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    loadSampleBooks(e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>
                <Link to="/bookList" style={{ textDecoration: "none" }}>
                  <Typography variant="body2">All Books</Typography>
                </Link>
              </li>
              <li>
                <Link
                  to="/bookList/accounting-and-finance"
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body2">
                    Accounting and Finance
                  </Typography>
                </Link>
              </li>
              <li>
                <Link to="/bookList/acca" style={{ textDecoration: "none" }}>
                  <Typography variant="body2">ACCA</Typography>
                </Link>
              </li>
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <TextField
              label="Search by Title, ISBN, or Call Number"
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              sx={{ marginRight: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => loadSampleBooks(search)}
              sx={{ minWidth: "120px", height: "100%" }}
            >
              Search
            </Button>
          </div>

          <Grid container spacing={4}>
            {books.length === 0 ? (
              <Typography align="center" variant="h6" sx={{ width: "100%" }}>
                No books available
              </Typography>
            ) : (
              books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.BookId}>
                  <Card elevation={3} sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "600", marginBottom: 1 }}
                      >
                        {book.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "600",
                          color: book.Availability > 0 ? "green" : "red",
                        }}
                      >
                        {book.Availability > 0 ? "AVAILABLE" : "NOT AVAILABLE"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "gray", marginBottom: 2 }}
                      >
                        {book.Description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "gray", fontStyle: "italic" }}
                      >
                        {book.Type}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "center", paddingBottom: 2 }}
                    >
                      <Link
                        to={`/bookDetails/${book.BookId}`}
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ textTransform: "none" }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BookList;
