import { Outlet } from "react-router-dom";
import NavBar from "./../../GeneralLayout/NavBar";
import ManagerNaigations from "./ManagerNavigations";
import { useContext } from "react";
import { loggedUserContext } from "../../../hooks/loggedUserContext";
function ManagerLayout() {
  const user = useContext(loggedUserContext);
  return (
    <div className="h-dvh bg-[#D1D7E3] grid place-items-center ">
      <div className="w-[95%] h-[95%] bg-[#0F123F] rounded-4xl grid grid-cols-[max-content_1fr] relative overflow-auto">
        <NavBar
          avatar={user.avatar}
          fullName={`${user.firstName} ${user.lastName}`}
          role="Manager"
        >
          <ManagerNaigations />
        </NavBar>
        <Outlet />
      </div>
    </div>
  );
}

export default ManagerLayout;
