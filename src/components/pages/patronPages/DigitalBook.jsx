function DigitalBook({ book, handleClick, handleDetailBtnClick }) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-50/95 backdrop-blur-sm border border-gray-100 hover:border-gray-200 group">
      {/* Image with elegant overlay */}
      <div className="h-64 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${
              book.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/150x200?text=No+Cover"
            })`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/80 via-gray-50/30 to-transparent" />
      </div>

      {/* Content area with elegant slate background */}
      <div className="p-5 bg-slate-100/90 backdrop-blur-sm">
        {/* Title and author */}
        <div className="min-h-[3.5rem]">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {book.volumeInfo.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            By: {book.volumeInfo.authors?.[0] || "Unknown"}
          </p>
        </div>

        {/* Description */}
        <div className="mt-3 min-h-[3rem]">
          <p className="text-sm text-gray-700 line-clamp-2">
            {book.volumeInfo.description || "No description available."}
          </p>
        </div>

        {/* Enhanced buttons with beautiful hover effects */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleClick}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform"
          >
            Read Online
          </button>
          <button
            onClick={handleDetailBtnClick}
            className="flex-1 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default DigitalBook;
