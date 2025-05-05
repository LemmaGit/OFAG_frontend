import { HiOutlineLibrary } from "react-icons/hi";
import { MdOutlineLocalLibrary, MdOutlineSummarize } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { VscLibrary } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="px-5 my-9 flex flex-col gap-4">
      <div className="flex flex-col gap-1 items-center pb-2">
        <div className="w-24 h-24 rounded-full overflow-hidden relative">
          <img src="/img/pic2.jpg" alt="" className="w-full" />
          <div className="w-3 h-3 bg-green-500 absolute right-1 top-3/4 rounded-full"></div>
        </div>
        <div
          className="text-white text-center
          "
        >
          <p
            className="text-lg
            "
          >
            Melisa Spence
          </p>
          <p className="opacity-75">Librarian</p>
        </div>
      </div>

      <ul className="border-t-[0.5px] border-t-stone-300/50 flex-1 flex flex-col justify-between items-center py-4 pt-8">
        <div className="flex flex-col gap-8 w-full items-center ">
          <li className="">
            <Link to="" className="flex items-center gap-3">
              <RxDashboard className="w-7 h-7 text-white" />
              <span className="text-white hidden">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="librarians" className="flex items-center gap-3">
              <HiOutlineLibrary className="w-7 h-7 text-white" />
              <span className="text-white hidden">Librarians</span>
            </Link>
          </li>
          <li>
            <Link to="patrons" className="flex items-center gap-3">
              <MdOutlineLocalLibrary className="w-7 h-7 text-white" />
              <span className="text-white hidden">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="books" className="flex items-center gap-3">
              <VscLibrary className="w-7 h-7 text-white" />
              <span className="text-white hidden">Books</span>
            </Link>
          </li>
          <li>
            <Link to="profile" className="flex items-center gap-3">
              <RiUserSettingsLine className="w-7 h-7 text-white" />
              <span className="text-white hidden">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="reports" className="flex items-center gap-3">
              <MdOutlineSummarize className="w-7 h-7 text-white" />
              <span className="text-white hidden">Report</span>
            </Link>
          </li>
        </div>

        <li>
          <Link to="/logout" className="flex items-center gap-3">
            <TbLogout2 className="w-7 h-7 text-white" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
