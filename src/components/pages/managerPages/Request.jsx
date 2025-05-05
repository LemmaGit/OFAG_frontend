import { useState } from "react";
import {
  FiClock,
  FiUser,
  FiMail,
  FiCheck,
  FiX,
  FiChevronLeft,
} from "react-icons/fi";
import dayjs from "./../../../helpers/dayjs";
import useMutator from "../../../hooks/useMutator";
import { respondToRequests } from "../../../helpers/manager";
import { toast } from "react-toastify";
import getStatusBadge from "./GetBadge";
export default function RequestModal({ request, setIsRequestModalOpen }) {
  if (!request) return null;
  const { mutateAsync: respond } = useMutator(respondToRequests, "requests");
  const [actionLoading, setActionLoading] = useState(false);
  function handleClose() {
    setIsRequestModalOpen(false);
  }
  const handleStatusUpdate = async (status) => {
    setActionLoading(true);
    try {
      const res = await respond({ id: request._id, data: status });
      handleClose();
    } catch (_) {
      toast.error("Error updating request status");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between mb-4">
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiX className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-3 items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {request.subject}
                  </h3>
                  <div>{getStatusBadge(request.status)}</div>
                </div>

                <span className="inline-flex items-center text-sm text-gray-500">
                  <FiClock className="mr-1" />
                  {dayjs(request.requestDate).fromNow(true)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <FiUser className="mr-2 text-gray-400" />
                <span>
                  {request.patronId.firstName} {request.patronId.lastName}
                </span>
                <FiMail className="ml-4 mr-2 text-gray-400" />
                <span>{request.patronId.email}</span>
              </div>
            </div>

            {/* Request message */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 whitespace-pre-line">
                {request.message}
              </p>
            </div>

            {request.status === "pending" && (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={actionLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiX className="mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={actionLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheck className="mr-2" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
