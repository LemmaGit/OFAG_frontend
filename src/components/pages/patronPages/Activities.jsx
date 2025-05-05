import { Link, Outlet, useLocation } from "react-router-dom";

function Activities() {
  const location = useLocation();

  return (
    <div className="col-start-2 min-h-[calc(100dvh-5.5rem)]">
      <div className="flex justify-end items-center sm:gap-4 gap-2 mb-6">
        <Link
          to=""
          className={`sm:text-base block sm:px-4 sm:py-2 rounded-md border border-gray-300 px-2 py-1 text-sm ${
            location.pathname === "/activities" &&
            "bg-[#0F123F] border-transparent text-white"
          }`}
        >
          Checkedout
        </Link>
        <Link
          to="reservations"
          className={`sm:text-base block sm:px-4 sm:py-2 rounded-md border border-gray-300 px-2 py-1 text-sm ${
            location.pathname === "/activities/reservations" &&
            "bg-[#0F123F] border-transparent text-white"
          }`}
        >
          Reservations
        </Link>
        {/* <Link
          to="overdues"
          className={`sm:text-base block sm:px-4 sm:py-2 rounded-md border border-gray-300 px-2 py-1 text-sm ${
            location.pathname === "/activities/overdues" &&
            "bg-[#0F123F] border-transparent text-white"
          }`}
        >
          Overdues
        </Link> */}
      </div>
      <Outlet />
    </div>
  );
}

export default Activities;
