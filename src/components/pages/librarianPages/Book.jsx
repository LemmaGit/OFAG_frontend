function Book({ book, handleDetail }) {
  return (
    <div className=" w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
      {/* Book Image with Zoom Effect */}
      <div className="h-64 overflow-hidden">
        <div
          className="h-full bg-cover bg-center transition-all duration-300 transform hover:scale-110"
          style={{ backgroundImage: `url(${book.coverImage})` }}
        ></div>
      </div>

      {/* Blurred Section for Text and Buttons */}
      <div className="p-4 backdrop-blur-md bg-white/50">
        {/* Availability and Type Badges */}
        <div className="flex gap-2 items-center justify-end">
          <span
            className={`block py-1 px-2 text-xs rounded-lg ${
              book.isAvailable
                ? "bg-green-400/75 text-gray-800"
                : "bg-red-400/75 text-gray-800"
            }`}
          >
            {book.isAvailable ? "Available" : "Unavailable"}
          </span>
          <span className="block py-1 px-2 bg-orange-300/75 text-gray-800 text-xs rounded-lg">
            {book.type}
          </span>
        </div>

        {/* Book Title */}
        <h2 className="text-xl font-bold text-gray-800 mt-2">{book.title}</h2>

        {/* Book Author */}
        <p className="text-sm text-gray-600 mt-1">
          By: {`${book.author.firstName} ${book.author.lastName}`}
        </p>

        {/* Book Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {book.description}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 px-4 py-2 bg-transparent border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-600/10 transition-colors duration-200"
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
