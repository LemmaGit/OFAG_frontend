import { FiAlertCircle, FiCheck, FiX } from "react-icons/fi";

const getStatusBadge = (status) => {
  switch (status) {
    case "approved":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <FiCheck className="mr-1" /> Approved
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <FiX className="mr-1" /> Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <FiAlertCircle className="mr-1" /> Pending
        </span>
      );
  }
};

export default getStatusBadge;
