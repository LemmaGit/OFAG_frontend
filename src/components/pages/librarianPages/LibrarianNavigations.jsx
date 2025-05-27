import { GiBackwardTime } from "react-icons/gi";
import { MdOutlineLocalLibrary, MdOutlineSummarize } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscGitPullRequestGoToChanges, VscLibrary } from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";

function LibrarianNavigations() {
  const location = useLocation();

  return (
    <>
      <li>
        <NavLink
          to={null}
          className={`flex items-center gap-3 p-3  transition ${
            location.pathname === "/" && "bg-blue-500 rounded-full"
          }`}
        >
          <GiBackwardTime className="w-7 h-7 text-white" />
          <span className="text-white hidden">Circulation</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="patrons"
          className={`flex items-center gap-3 p-3  transition ${
            location.pathname === "/patrons" && "bg-blue-500 rounded-full"
          }`}
        >
          <MdOutlineLocalLibrary className="w-7 h-7 text-white" />
          <span className="text-white hidden">Patrons</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="books"
          className={`flex items-center gap-3 p-3  transition ${
            location.pathname === "/books" && "bg-blue-500 rounded-full"
          }`}
        >
          <VscLibrary className="w-7 h-7 text-white" />
          <span className="text-white hidden">Books</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="profile"
          className={`flex items-center gap-3 p-3  transition ${
            location.pathname === "/profile" && "bg-blue-500 rounded-full"
          }`}
        >
          <RiUserSettingsLine className="w-7 h-7 text-white" />
          <span className="text-white hidden">Settings</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="requests"
          className={`flex items-center gap-3 p-3  transition ${
            location.pathname === "/requests" && "bg-blue-500 rounded-full"
          }`}
        >
          <VscGitPullRequestGoToChanges className="w-7 h-7 text-white" />
          <span className="text-white hidden">Requests</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="reports"
          className={`flex items-center gap-3 p-3  transition ${
            location.pathname === "/reports" && "bg-blue-500 rounded-full"
          }`}
        >
          <MdOutlineSummarize className="w-7 h-7 text-white" />
          <span className="text-white hidden">Report</span>
        </NavLink>
      </li>
    </>
  );
}

export default LibrarianNavigations;
