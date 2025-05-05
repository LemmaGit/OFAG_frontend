import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const BookViewer = () => {
  const { bookId } = useParams();
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const embedURL = `https://books.google.com/books?id=${bookId}&printsec=frontcover&output=embed`;

  useEffect(() => {
    // Fallback timeout in case the iframe load event doesn't fire
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    setIframeLoaded(true);
    setLoading(false);
  };

  return (
    <div className="flex-1 w-full h-dvh relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <CircularProgress />
        </div>
      )}
      <iframe
        title="Google Book Preview"
        src={embedURL}
        className="w-full h-full"
        allowFullScreen
        style={{
          border: "none",
          visibility: iframeLoaded ? "visible" : "hidden",
        }}
        onLoad={handleLoad}
        onError={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default BookViewer;
