import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loggedUserContext } from "../../../hooks/loggedUserContext";
import { logout } from "../../../helpers/utilFun";
import {
  FaTimes,
  FaBook,
  FaHome,
  FaBookOpen,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
function PatronNav() {
  const user = useContext(loggedUserContext);
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingout, setIsLoggingout] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  async function handleLogout() {
    try {
      setIsLoggingout(true);
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoggingout(false);
    }
  }
  return (
    <nav className="col-start-1 col-span-full sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-[#0F123F]/90 backdrop-blur-sm ">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/profile" className="flex items-center gap-2">
          <img
            src={user?.avatar}
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-white">
            {user?.firstName}
          </span>
        </Link>
      </div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <Link
            to="/home"
            className={` hover:text-white transition-colors duration-200 ${
              pathname.includes("/home")
                ? "text-white font-bold [text-shadow:_0_0_10px_white]"
                : "text-gray-300"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={` hover:text-white transition-colors duration-200 ${
              pathname.endsWith("/")
                ? "text-white font-bold [text-shadow:_0_0_10px_white]"
                : "text-gray-300"
            }`}
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            to="/activities"
            className={` hover:text-white transition-colors duration-200 ${
              pathname.includes("/activities")
                ? "text-white font-bold [text-shadow:_0_0_10px_white]"
                : "text-gray-300"
            }`}
          >
            My Activity
          </Link>
        </li>
        <li>
          <Link
            to="/request"
            className={` hover:text-white transition-colors duration-200 ${
              pathname.includes("/request")
                ? "text-white font-bold [text-shadow:_0_0_10px_white]"
                : "text-gray-300"
            }`}
          >
            Request
          </Link>
        </li>
      </ul>

      {/* Logout Button (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <button
          className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#1E2A5F] rounded-md hover:bg-[#324185]/90 transition-colors duration-200"
          onClick={async () => await handleLogout()}
          disabled={isLoggingout}
        >
          Log out
        </button>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? (
            <IoMdClose className="w-6 h-6 cursor-pointer" />
          ) : (
            <RxHamburgerMenu className="w-6 h-6 cursor-pointer" />
          )}
        </button>
      </div>

      {/* Full-Screen Dropdown Menu (Mobile) */}

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 h-dvh w-full z-50 bg-[#0F123F]/95 backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Close menu"
          >
            <FaTimes className="h-8 w-8" />
          </button>

          {/* Library branding */}
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="mb-8 flex items-center">
              <FaBook className="h-10 w-10 text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-white">Library Portal</h2>
            </div>

            {/* Navigation links */}
            <nav className="w-full max-w-xs">
              <ul className="flex flex-col items-center gap-6 w-full">
                <li className="w-full border-b border-gray-700/50 pb-2">
                  <Link
                    to="/home"
                    className="flex items-center text-xl text-gray-300 hover:text-white transition-colors duration-200 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHome className="h-6 w-6 mr-3" />
                    Home
                  </Link>
                </li>
                <li className="w-full border-b border-gray-700/50 pb-2">
                  <Link
                    to="/"
                    className="flex items-center text-xl text-gray-300 hover:text-white transition-colors duration-200 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaBookOpen className="h-6 w-6 mr-3" />
                    Books Catalog
                  </Link>
                </li>
                <li className="w-full border-b border-gray-700/50 pb-2">
                  <Link
                    to="/activities"
                    className="flex items-center text-xl text-gray-300 hover:text-white transition-colors duration-200 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHistory className="h-6 w-6 mr-3" />
                    My Activity
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout button */}
            <button
              className="mt-10 cursor-pointer px-6 py-3 text-lg font-medium text-white bg-[#1E2A5F] rounded-lg hover:bg-[#324185]/90 transition-colors duration-200 flex items-center justify-center"
              onClick={async () => await handleLogout()}
              disabled={isLoggingout}
            >
              <FaSignOutAlt className="h-5 w-5 mr-2" />
              {isLoggingout ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default PatronNav;
