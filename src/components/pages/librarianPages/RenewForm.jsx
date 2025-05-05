import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useMutator from "../../../hooks/useMutator";
import { renew } from "../../../helpers/librarian";

const RenewBook = ({ setIsRenewFormOpen }) => {
  const [searchParams] = useSearchParams();
  const [isRenewing, setIsRenewing] = useState(true);
  const [message, setMessage] = useState("");
  const [newDueDate, setNewDueDate] = useState(null);
  const [renewStatus, setRenewStatus] = useState(null);
  const bookId = searchParams.get("id");
  const patronId = searchParams.get("p_id");

  const {
    isSuccess,
    isError,
    mutateAsync: renewIssue,
  } = useMutator(renew, "checkedout-books");

  useEffect(() => {
    if (!bookId || !patronId) return;
    let isMounted = true;
    const controller = new AbortController();

    const renewFun = async () => {
      try {
        setIsRenewing(true);
        const res = await renewIssue(
          { patronId, bookId },
          { signal: controller.signal }
        );
        if (isMounted) {
          setMessage(res?.message);
          setRenewStatus(res.status === "success");
          if (res.status === "success") {
            setNewDueDate(res.detail?.dueDate || calculateNewDueDate());
          }
        }
      } catch (error) {
        if (error.name !== "AbortError" && isMounted) {
          setMessage(error.message || "Failed to renew book");
          setRenewStatus(false);
        }
      } finally {
        if (isMounted) setIsRenewing(false);
      }
    };

    renewFun();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [patronId, bookId, renewIssue]);

  //! Make sure it comes from the settings
  const calculateNewDueDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    return currentDate.toLocaleDateString();
  };

  // const handleRetry = async () => {
  //   setRenewStatus(null);
  //   setIsRenewing(true);
  //   try {
  //     const res = await renewIssue({ patronId, bookId });
  //     setMessage(res?.message);
  //     setRenewStatus(res.status === "success");
  //     if (res.status === "success") {
  //       setNewDueDate(res.detail?.dueDate || calculateNewDueDate());
  //     }
  //   } catch (error) {
  //     setMessage(error.message || "Failed to renew book");
  //     setRenewStatus(false);
  //   } finally {
  //     setIsRenewing(false);
  //   }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Renew Book</h2>
          <button
            onClick={() => setIsRenewFormOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isRenewing}
          >
            {isRenewing ? (
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
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
            ) : (
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
            )}
          </button>
        </div>

        {isRenewing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <svg
              className="animate-spin h-12 w-12 text-blue-500 mb-4"
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
            <p className="text-gray-600">Processing your renewal request...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Status Message */}
            <div
              className={`p-4 rounded-lg border ${
                renewStatus === true
                  ? "bg-green-50 border-green-100 text-green-700"
                  : renewStatus === false
                  ? "bg-red-50 border-red-100 text-red-700"
                  : "bg-blue-50 border-blue-100 text-blue-700"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {renewStatus === true ? (
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : renewStatus === false ? (
                    <svg
                      className="h-5 w-5 text-red-500"
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
                  ) : (
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message}</p>
                  {renewStatus === false && (
                    <p className="text-xs mt-1">
                      Please try again or contact support
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* New Due Date */}
            {renewStatus === true && newDueDate && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    New Due Date:
                  </span>
                  <span className="text-lg font-semibold text-green-600">
                    {newDueDate}
                  </span>
                </div>
                <div className="mt-2 text-xs text-green-500">
                  (+2 days extension)
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setIsRenewFormOpen(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Close
              </button>

              {/* {renewStatus === false && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex-1 py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewBook;
