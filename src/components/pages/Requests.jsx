import {
  FiClock,
  FiUser,
  FiMail,
  FiAlertCircle,
  FiLoader,
  FiInbox,
} from "react-icons/fi";
import useFetch from "../../hooks/useFetch";
import { getRequests } from "../../helpers/manager";
import { useState } from "react";
import Request from "./managerPages/Request";
import dayjs from "../../helpers/dayjs";
import getStatusBadge from "./managerPages/GetBadge";
function Requests() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const {
    data: { requests } = {},
    isLoading,
    isError,
  } = useFetch("requests", getRequests);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Patron Requests
        </h1>
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-2xl text-gray-500" />
          <span className="ml-2 text-gray-600">Loading requests...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Patron Requests
        </h1>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6 text-center">
          <FiAlertCircle className="mx-auto text-3xl text-red-500 mb-2" />
          <p className="text-red-600 font-medium">Failed to load requests</p>
          <p className="text-gray-600 mt-1">
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Patron Requests
        </h1>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6 text-center">
          <FiInbox className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">No requests found</p>
          <p className="text-gray-500 mt-1">
            There are currently no patron requests to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Patron Requests
        </h1>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-4 py-3 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3 md:col-span-2">Patron</div>
            <div className="col-span-6 md:col-span-3">Subject</div>
            <div className="hidden md:block md:col-span-4">Message</div>
            <div className="col-span-3 md:col-span-2">Status</div>
            <div className="hidden md:block md:col-span-1">Time</div>
          </div>

          {requests.map((request) => (
            <div
              key={request._id}
              className="grid grid-cols-12 px-4 py-3 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedRequest(request);
                setIsRequestModalOpen(true);
              }}
            >
              <div className="col-span-3 md:col-span-2 flex items-center">
                <FiUser className="text-gray-400 mr-2" />
                <span className="truncate">{`${request.patronId.firstName} ${request.patronId.lastName}`}</span>
              </div>

              <div className="col-span-6 md:col-span-3 font-medium text-gray-900 truncate">
                {request.subject}
              </div>

              <div className="hidden md:block md:col-span-4 text-gray-600 truncate">
                <FiMail className="inline mr-1 text-gray-400" />
                {request.message}
              </div>

              <div className="col-span-3 md:col-span-2">
                {getStatusBadge(request.status)}
              </div>

              <div className="hidden md:block md:col-span-1 text-sm text-gray-500">
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  {dayjs(request.requestDate).fromNow(true)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isRequestModalOpen && (
        <div className="min-h-dvh z-10 absolute inset-0 flex items-center justify-center bg-black/50">
          <Request
            setIsRequestModalOpen={setIsRequestModalOpen}
            request={selectedRequest}
          />
        </div>
      )}
    </>
  );
}

export default Requests;
