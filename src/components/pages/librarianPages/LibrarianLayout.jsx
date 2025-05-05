import { Outlet } from "react-router-dom";
import NavBar from "./../../GeneralLayout/NavBar";
import LibrarianNavigations from "./LibrarianNavigations";
import { useContext } from "react";
import { loggedUserContext } from "../../../hooks/loggedUserContext";

function LibrarianLayout() {
  const user = useContext(loggedUserContext);
  return (
    <div className="h-dvh bg-[#D1D7E3] grid place-items-center overflow-y-scroll">
      <div className="w-[95%] h-[95%] bg-[#0F123F] rounded-4xl grid grid-cols-[max-content_1fr]  overflow-hidden ">
        <NavBar
          avatar={user?.avatar}
          fullName={`${user?.firstName} ${user?.lastName}`}
          role="Librarian"
        >
          <LibrarianNavigations />
        </NavBar>
        <Outlet />
      </div>
    </div>
  );
}

export default LibrarianLayout;
