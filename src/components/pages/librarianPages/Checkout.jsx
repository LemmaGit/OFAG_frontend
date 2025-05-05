import React, { useState } from "react";
import useMutator from "../../../hooks/useMutator";
import {
  checkout,
  searchBooks,
  searchPatrons,
} from "../../../helpers/librarian";

const conditionColors = {
  new: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  fair: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  poor: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    dot: "bg-orange-500",
  },
};
const CheckoutForm = () => {
  // Form state
  const [patronName, setPatronName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedPatron, setSelectedPatron] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [checkoutResponse, setCheckoutResponse] = useState(null);
  const { mutateAsync: checkoutBook } = useMutator(
    checkout,
    "checkedout-books"
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchError(null);
    setCheckoutResponse(null);
    setSelectedPatron(null);
    setSelectedBook(null);

    try {
      const [booksRes, patronsRes] = await Promise.all([
        searchBooks(bookTitle),
        searchPatrons(patronName),
      ]);
      setSearchResults({
        patrons: patronsRes.patrons,
        books: booksRes.books,
      });
    } catch (error) {
      setSearchError("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedPatron || !selectedBook) return;

    try {
      const res = await checkoutBook({
        patronId: selectedPatron._id,
        bookId: selectedBook._id,
      });

      if (res.status === "error") throw new Error(res.message);
      setCheckoutResponse({
        success: true,
        message: `${res.message}.`,
        dueDate: new Date(res.checkoutData.dueDate).toLocaleDateString(),
        checkedoutBookCondition: res.checkoutData.bookConditionWhenCheckedout,
      });
    } catch (error) {
      setCheckoutResponse({
        success: false,
        message: error.message || "Checkout failed. Please try again.",
      });
    }
  };

  const handleReset = () => {
    setPatronName("");
    setBookTitle("");
    setSearchResults(null);
    setSelectedPatron(null);
    setSelectedBook(null);
    setCheckoutResponse(null);
    setSearchError(null);
  };
  return (
    <div className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Book Checkout System
        </h2>
        {searchResults && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
        )}
      </div>

      {!searchResults && (
        <form onSubmit={handleSearch} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Patron
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  className="w-full px-4 py-2  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter patron name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Book
              </label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter book title"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
              isSearching
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSearching ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search"
            )}
          </button>
        </form>
      )}

      {searchError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start">
          <svg
            className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="ml-2 text-sm text-red-700">{searchError}</p>
        </div>
      )}

      {searchResults && (
        <div className="space-y-6 mb-6">
          {selectedPatron ? (
            <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Selected Patron
                  </h3>
                  <p className="font-medium text-gray-900">{`${selectedPatron.firstName} ${selectedPatron.lastName}`}</p>
                </div>
                <button
                  onClick={() => setSelectedPatron(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Matching Patrons
              </h3>
              {searchResults.patrons?.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {searchResults.patrons.map((patron) => (
                    <div
                      key={patron._id}
                      onClick={() => setSelectedPatron(patron)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <p className="font-medium text-gray-900">{`${patron.firstName} ${patron.lastName}`}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No patrons found matching your search
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Selected Book */}
          {selectedBook ? (
            <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Selected Book
                  </h3>
                  <p className="font-medium text-gray-900">
                    {selectedBook.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedBook.isAvailable ? (
                      <span className="inline-flex items-center text-green-600">
                        <svg
                          className="h-3.5 w-3.5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600">
                        <svg
                          className="h-3.5 w-3.5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Unavailable for checkout if not on hold.
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Matching Books
              </h3>
              {searchResults.books.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {searchResults.books.map((book) => (
                    <div
                      key={book._id}
                      onClick={() => setSelectedBook(book)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <p className="font-medium text-gray-900">{book.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {book.isAvailable ? (
                          <span className="inline-flex items-center text-green-600">
                            <svg
                              className="h-3.5 w-3.5 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-600">
                            <svg
                              className="h-3.5 w-3.5 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Unavailable for checkout if not on hold.
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No books found matching your search
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* Checkout Response */}
      {checkoutResponse && (
        <div
          className={`my-4 p-3 rounded-lg border ${
            checkoutResponse.success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {checkoutResponse.success ? (
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-2">
              <p
                className={`text-sm ${
                  checkoutResponse.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {checkoutResponse.message}
              </p>
              {checkoutResponse.dueDate && (
                <p className="text-xs mt-1 text-green-600">
                  Due date: {checkoutResponse.dueDate}
                </p>
              )}
              {checkoutResponse.checkedoutBookCondition && (
                <div className="mt-2 flex items-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      conditionColors[
                        checkoutResponse.checkedoutBookCondition.toLowerCase()
                      ]?.bg || "bg-gray-50"
                    } ${
                      conditionColors[
                        checkoutResponse.checkedoutBookCondition.toLowerCase()
                      ]?.text || "text-gray-800"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-1 ${
                        conditionColors[
                          checkoutResponse.checkedoutBookCondition.toLowerCase()
                        ]?.dot || "bg-gray-500"
                      }`}
                    ></span>
                    Condition: {checkoutResponse.checkedoutBookCondition}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {selectedPatron && selectedBook && (
        <div className="flex space-x-3">
          <button
            onClick={checkoutResponse ? handleReset : handleCheckout}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
              checkoutResponse
                ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 rounded-md"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {checkoutResponse ? "Start New Checkout" : "Check Out Book"}
          </button>
        </div>
      )}
      {searchResults &&
        (!searchResults.books.length || !searchResults.patrons.length) && (
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}
    </div>
  );
};

export default CheckoutForm;
