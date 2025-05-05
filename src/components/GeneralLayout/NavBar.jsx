import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { TbLogout2 } from "react-icons/tb";
import { logout } from "../../helpers/utilFun";
import { toast } from "react-toastify";

function NavBar({ avatar, fullName, role, children }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Error logging out. Please try again.");
    }
  };
  return (
    <nav className="px-5 my-5 flex flex-col gap-1">
      <ProfileInfo avatar={avatar} fullName={fullName} role={role} />

      <ul className="border-t-[0.5px] border-t-stone-300/50 flex-1 flex flex-col justify-between items-center py-4 pt-8">
        <div className="flex flex-col gap-3 w-full items-center ">
          {children}
        </div>

        <li>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <TbLogout2 className="w-7 h-7 text-white" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
