import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
        py={8}
      >
        <Paper elevation={3} sx={{ p: 6, borderRadius: 4, width: "100%" }}>
          <Typography
            variant="h1"
            color="primary"
            sx={{ fontSize: "6rem", mb: 2 }}
          >
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" color="text.seos;condary" paragraph>
            The page you&apos;re looking for doesn&apt exist or has been moved.
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate(-1)}
              sx={{ px: 4 }}
            >
              Go Back
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/")}
              sx={{ px: 4 }}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;
