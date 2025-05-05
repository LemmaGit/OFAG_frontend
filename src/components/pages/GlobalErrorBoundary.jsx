import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

// Custom Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 4,
        backgroundColor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 6, maxWidth: 600, textAlign: "center" }}>
        <Typography variant="h3" color="error" gutterBottom>
          ⚠️ Oops! Something went wrong
        </Typography>

        <Box
          component="pre"
          sx={{
            backgroundColor: "rgba(0,0,0,0.05)",
            p: 2,
            borderRadius: 1,
            overflowX: "auto",
            mb: 4,
            textAlign: "left",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {error.message}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          We&apos;ve hit an unexpected error
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

// Global Error Boundary Component
export default function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
