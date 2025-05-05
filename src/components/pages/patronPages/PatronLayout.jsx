import { Outlet, useLocation } from "react-router-dom";
import PatronNav from "./PatronNav";

function PatronLayout() {
  const path = useLocation();
  return (
    <div
      className={`grid grid-cols-[1fr_90%_1fr] gap-y-10 ${
        path.pathname.includes("home") &&
        "bg-gradient-to-r from-[#0F123F] to-[#1E2A5F]"
      }`}
    >
      <PatronNav />
      <div className="col-start-2 ">
        <Outlet />
      </div>
    </div>
  );
}

export default PatronLayout;
