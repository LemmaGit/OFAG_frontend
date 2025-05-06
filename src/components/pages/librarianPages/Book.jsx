function Book({ book, handleDetail }) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100">
      {/* Book Cover */}
      <div className="h-64 relative overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-all duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${book.coverImage})` }}
        ></div>
        {/* Gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent animate-pulse"></div>

          {/* Animated shimmer layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]"></div>

          {/* Pulsing highlights */}
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-white/5 via-white/15 to-transparent animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 bg-white">
        {/* Badges */}
        <div className="flex gap-2 items-center justify-between mb-3">
          <span className="py-1 px-2 bg-amber-100 text-amber-800 text-xs font-medium rounded-lg">
            {book.type}
          </span>
          <span
            className={`py-1 px-2 text-xs font-medium rounded-lg ${
              book.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Title and Author */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
          {book.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          By {`${book.author.firstName} ${book.author.lastName}`}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {book.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={handleDetail}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Book;
