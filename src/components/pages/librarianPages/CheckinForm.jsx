import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import {
  checkin,
  getBookDetails,
  getSettings,
} from "../../../helpers/librarian";
import useMutator from "../../../hooks/useMutator";
import { toast } from "react-toastify";
import { getPossibleConditions } from "../../../helpers/utilFun";

function getConditionChangePrice(checkoutCnd, checkinCnd, settings) {
  if (!checkinCnd) return 0;
  if (checkoutCnd === "new" && checkinCnd === "fair")
    return settings.feeNewToFair;
  if (checkoutCnd === "new" && checkinCnd === "poor")
    return settings.feeNewToPoor;
  if (checkoutCnd === "fair" && checkinCnd === "poor")
    return settings.feeFairToPoor;
  if (checkinCnd === "lost") return settings.feeLostBook;
  return 0;
}

export default function CheckInForm({
  setIsCheckinFormOpen,
  patronId,
  bookId,
  status,
  overdueFee,
  bookConditionWhenCheckedout,
}) {
  const [isFinePaid, setIsFinePaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConditionChanged, setIsConditionChanged] = useState(false);
  const [newCondition, setNewCondition] = useState("");
  let fee = overdueFee || 0;
  let isOverdue = status === "overdue";

  const {
    data: { book } = {},
    isLoading,
    isError,
  } = useFetch("books", getBookDetails(bookId));

  const {
    data: settings,
    isLoading: isLoadingSettings,
    isError: isErrorLoadingSettings,
  } = useFetch("settings", getSettings);

  const { mutateAsync: checkinBook } = useMutator(checkin, "checkedout-books");

  // Calculate fees
  const conditionChangeFee = isConditionChanged
    ? getConditionChangePrice(
        bookConditionWhenCheckedout,
        newCondition,
        settings
      )
    : 0;

  const totalFee = fee + conditionChangeFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        bookId,
        patronId,
        condition: isConditionChanged
          ? newCondition
          : bookConditionWhenCheckedout,
      };

      const res = await checkinBook(data);
      if (res.status === "success") {
        toast.success(res.message);
        setIsCheckinFormOpen(false);
      }
    } catch (_) {
      toast.error("Check-in failed:");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isLoadingSettings) return <LoadingSpinner />;
  if (isError || isErrorLoadingSettings)
    return <ErrorComponent onRetry={() => window.location.reload()} />;

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
    lost: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      dot: "bg-red-500",
    },
  };

  const currentCondition =
    conditionColors[bookConditionWhenCheckedout] || conditionColors.new;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Check-In Book</h2>
          <button
            onClick={() => setIsCheckinFormOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form id="checkInForm" className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Book Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Book Title
              </label>
              <input
                type="text"
                value={book?.title || ""}
                readOnly
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Modern Book Cover and Condition Display */}
            <div className="flex flex-col gap-3">
              {/* Book Cover with Condition Badge */}
              <div className="relative">
                {book?.coverImage ? (
                  <div className="h-48 w-full rounded-lg bg-gray-100 overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full rounded-lg bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200">
                    <span className="text-gray-400">No cover image</span>
                  </div>
                )}
                <div
                  className={`absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full shadow-md ${currentCondition.dot} border-2 border-white`}
                >
                  <span className="text-xs font-bold text-white uppercase">
                    {bookConditionWhenCheckedout.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Condition Label */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">
                  Condition:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${currentCondition.bg} ${currentCondition.border} ${currentCondition.text}`}
                >
                  {bookConditionWhenCheckedout.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Rest of your existing form elements... */}
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="conditionChanged"
                    checked={isConditionChanged}
                    onChange={(e) => {
                      setIsConditionChanged(e.target.checked);
                      setNewCondition(
                        getPossibleConditions(bookConditionWhenCheckedout)[0]
                      );
                    }}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                  />
                </div>
                <label
                  htmlFor="conditionChanged"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Book condition has changed
                </label>
              </div>

              {isConditionChanged && (
                <div className="ml-7">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    New Condition
                  </label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  >
                    {getPossibleConditions(bookConditionWhenCheckedout).map(
                      (condition, i) => (
                        <option key={i} value={condition}>
                          {condition}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}
            </div>

            {/* Fee Breakdown */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="space-y-2">
                {isOverdue && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Overdue Fee:</span>
                    <span className="text-sm font-medium">
                      {fee.toFixed(2)} birr
                    </span>
                  </div>
                )}

                {isConditionChanged && conditionChangeFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Condition Change Fee:
                    </span>
                    <span className="text-sm font-medium">
                      {conditionChangeFee.toFixed(2)} birr
                    </span>
                  </div>
                )}

                {(isOverdue || conditionChangeFee > 0) && (
                  <div className="flex justify-between pt-2 border-t border-blue-100">
                    <span className="text-sm font-medium text-gray-700">
                      Total Fee:
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {totalFee.toFixed(2)} birr
                    </span>
                  </div>
                )}

                {!isOverdue && conditionChangeFee === 0 && (
                  <p className="text-sm text-gray-600">
                    No fees to charge the patron.
                  </p>
                )}
              </div>
            </div>

            {/* Hidden Fields */}
            <input type="hidden" name="bookId" value={bookId} />
            <input type="hidden" name="patronId" value={patronId} />

            {/* Fine Payment Confirmation */}
            {totalFee > 0 && (
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="finePaid"
                    name="finePaid"
                    checked={isFinePaid}
                    onChange={(e) => setIsFinePaid(e.target.checked)}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                  />
                </div>
                <label
                  htmlFor="finePaid"
                  className="ml-3 block text-sm text-gray-700"
                >
                  I confirm that the {totalFee.toFixed(2)} birr fee has been
                  paid
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsCheckinFormOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                (totalFee > 0 && !isFinePaid) ||
                (isConditionChanged && !newCondition)
              }
              className={`flex-1 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                (totalFee > 0 && !isFinePaid) ||
                (isConditionChanged && !newCondition)
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
              }`}
            >
              {!isSubmitting ? "Confirm Check-In" : "Checkingin ..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <h3 className="text-lg font-medium text-gray-800">
        Loading Book Details
      </h3>
      <p className="text-gray-500 mt-2">
        Please wait while we retrieve the information...
      </p>
    </div>
  </div>
);

const ErrorComponent = ({ onRetry }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg
          className="h-6 w-6 text-red-600"
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
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Failed to load book details
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        We couldn&apos;t retrieve the book information. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Retry
      </button>
    </div>
  </div>
);
