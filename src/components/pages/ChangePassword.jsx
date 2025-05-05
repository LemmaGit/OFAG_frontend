import { toast } from "react-toastify";
import useFormHook from "../../hooks/useFormHook";
import useMutator from "../../hooks/useMutator";
import changePasswordSchema from "../../schema/changePassword";
import InputErr from "./InputErr";
import { useState } from "react";
// import { changePassword } from "../../helpers/manager";

function ChangePassword({ handlePasswordChange }) {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const { register, handleSubmit, errors, setError, isSubmitting, reset } =
    useFormHook(changePasswordSchema);
  const { mutateAsync } = useMutator(handlePasswordChange, "password");
  async function submit(data) {
    setIsChangePassword(true);
    try {
      const res = await mutateAsync(data);
      if (res?.status !== "error") {
        toast.success("Successfully update");
        reset();
      } else if (res.message && res.message.includes("{")) {
        const message = JSON.parse(res.message);
        Object.entries(message).forEach(([key, value]) => {
          setError(key, { type: "server", message: value });
        });
      } else {
        setError("root", { type: "server", message: res.message });
      }
    } catch (_) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsChangePassword(false);
    }
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)}>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
            <span className="material-icons-outlined mr-3">lock</span>
            <div className="flex-1">
              <label
                htmlFor="oldPassword"
                className="block text-sm text-blue-100 mb-1"
              >
                Old Password
              </label>
              <input
                {...register("oldpassword")}
                type="password"
                id="oldPassword"
                placeholder="Enter your old password"
                className="w-full bg-transparent focus:outline-none placeholder:text-blue-200"
                required
              />
            </div>
          </div>
          <InputErr errors={errors} inputField="oldpassword" />

          <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
            <span className="material-icons-outlined mr-3">lock</span>
            <div className="flex-1">
              <label
                htmlFor="newPassword"
                className="block text-sm text-blue-100 mb-1"
              >
                New Password
              </label>
              <input
                {...register("newpassword")}
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                className="w-full bg-transparent focus:outline-none placeholder:text-blue-200"
                required
              />
            </div>
          </div>
          <InputErr errors={errors} inputField="newpassword" />
          {/* Confirm New Password */}
          <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
            <span className="material-icons-outlined mr-3">lock</span>
            <div className="flex-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-blue-100 mb-1"
              >
                Confirm New Password
              </label>
              <input
                {...register("confirmpassword")}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your new password"
                className="w-full bg-transparent focus:outline-none placeholder:text-blue-200"
                required
              />
            </div>
          </div>
          <InputErr errors={errors} inputField="confirmpassword" />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center cursor-pointer"
          >
            <span className="material-icons-outlined mr-2">save</span>
            {!isChangePassword ? "Save Changes" : "Saving..."}
          </button>
          <button
            disabled={isSubmitting}
            type="reset"
            className="w-full py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition duration-300 flex items-center justify-center"
          >
            <span className="material-icons-outlined mr-2">cancel</span>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
