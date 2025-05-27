import React from "react";
import { FiBookOpen } from "react-icons/fi";

const PdfCard = ({ pdf, handleRead, isPatron = false }) => {
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100">
      {/* PDF Cover Image */}
      <div className="h-64 relative overflow-hidden">
        <img
          src={pdf.coverImage}
          alt={`Cover for ${pdf.title}`}
          className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-white">
        {/* Category Badge */}
        <span className="inline-block py-1 px-2 bg-blue-100 text-blue-800 text-xs font-medium rounded-lg mb-3">
          {pdf.category}
        </span>

        {/* Title and Author */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
          {pdf.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {`${pdf.author.firstName} ${pdf.author.lastName}`}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {pdf.description}
        </p>

        {/* Read Button */}
        {isPatron && (
          <button
            onClick={handleRead}
            className="w-full mt-5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FiBookOpen />
            Read PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default PdfCard;
