import { CircularProgress } from "@mui/material";
import { getUploadedPdfs } from "../../helpers/utilFun";
import useFetch from "../../hooks/useFetch";
import PdfCard from "./PdfCard";
import { useState } from "react";

function PdfsList({ isPatron = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    isLoading,
    isError,
    data: { pdfs = [] } = {},
  } = useFetch("pdfs", getUploadedPdfs);
  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="col-start-2">
      <div className=" my-4 relative w-1/4 ml-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F123F] text-sm sm:text-base"
        />
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

      {/* Books Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPdfs.length === 0 ? (
            <div className="col-span-full flex justify-center items-center min-h-40 text-gray-500 text-lg">
              <p>No books found.</p>
            </div>
          ) : (
            filteredPdfs.map((pdf) => (
              <PdfCard
                key={pdf._id}
                pdf={pdf}
                isPatron={isPatron}
                handleRead={() => window.open(pdf.URL, "_blank")}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PdfsList;
