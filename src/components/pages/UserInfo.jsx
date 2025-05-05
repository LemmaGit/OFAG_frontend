import { useContext, useState } from "react";
import { loggedUserContext } from "../../hooks/loggedUserContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/utilFun";
import { toast } from "react-toastify";

function UserInfo() {
  const user = useContext(loggedUserContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/login", { replace: true });
    } catch (_) {
      toast.error("Error logging out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* User Details */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-sm text-blue-100">ID: {user._id}</p>
        </div>

        {/* User Info Fields */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
            <span className="material-icons-outlined mr-3">person</span>
            <div className="flex-1">
              <p className="text-sm text-blue-100">Username</p>
              <p className="font-semibold">{user.username}</p>
            </div>
          </div>
          {user.contact && (
            <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
              <span className="material-icons-outlined mr-3">phone</span>
              <div className="flex-1">
                <p className="text-sm text-blue-100">Contact</p>
                <p className="font-semibold">{user.contact}</p>
              </div>
            </div>
          )}
          <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
            <span className="material-icons-outlined mr-3">email</span>
            <div className="flex-1">
              <p className="text-sm text-blue-100">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="w-full mt-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
          onClick={handleLogout}
        >
          <span className="material-icons-outlined mr-2">logout</span>
          {!isLoggingOut ? "Log Out" : "Logging Out..."}
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
