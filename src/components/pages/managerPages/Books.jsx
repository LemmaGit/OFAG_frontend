function BookDetail() {
  return (
    <div className="col-start-2 min-h-dvh p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          <div className="w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src="/img/book.jpg"
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Book Title
            </h1>

            {/* Author */}
            <p className="text-lg sm:text-xl text-gray-600">By: Author Name</p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Edition */}
              <div>
                <p className="text-sm text-gray-500">Edition</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  First Edition
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  Fiction
                </p>
              </div>

              {/* Type */}
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  Circulation
                </p>
              </div>

              {/* Publish Year */}
              <div>
                <p className="text-sm text-gray-500">Publish Year</p>
                <p className="text-lg sm:text-xl font-medium text-gray-800">
                  2023
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8">
              <button className="w-full sm:w-auto sm:flex-1 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Hold
              </button>
              <button className="w-full sm:w-auto sm:flex-1 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Read Online
              </button>
            </div>
          </div>
        </div>

        {/* Book Description */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Description
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            This is a detailed description of the book. It provides an overview
            of the content, themes, and key points covered in the book. The
            description is designed to give readers a clear understanding of
            what to expect from the book. It is written in a concise and
            engaging manner to capture the reader&apos;s interest.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
