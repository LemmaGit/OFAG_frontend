import useFormHook from "../../hooks/useFormHook";
import loginSchema from "../../schema/login";
import useMutator from "../../hooks/useMutator";
import InputErr from "./InputErr";
import { useEffect } from "react";
import { checkToken, login } from "../../helpers/utilFun";
import { toast } from "react-toastify";
import { FiBook, FiLock, FiMail } from "react-icons/fi";

function LoginForm() {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    isSubmitting,
    reset,
    watch,
    clearErrors,
  } = useFormHook(loginSchema);
  const { mutateAsync } = useMutator(login, "auth");

  useEffect(() => {
    const subscription = watch(() => {
      clearErrors("root");
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  async function submit(data) {
    const d = await mutateAsync(data);
    reset();
    if (d.status && d.status !== "error") {
      const res = await checkToken();
      if (res.status === "success") {
        toast.success("Successfully Logged in!");
        window.location.replace("/");
      }
    } else if (d.message && d.message.includes("{")) {
      const message = JSON.parse(d.message);
      Object.entries(message).forEach(([key, value]) => {
        return setError(key, { type: "server", message: value });
      });
    } else {
      setError("root", { type: "server", message: d.message });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Book Shelf Decoration */}
        <div className="flex justify-center mb-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-2 w-8 bg-amber-700 rounded-t-full"
              ></div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Decorative Book Spine */}
          <div className="h-2 bg-gradient-to-r from-amber-600 to-amber-800"></div>

          <div className="p-8">
            {/* Header with Icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <FiBook className="text-blue-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                OFAG Library System
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Access your library account
              </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                  />
                </div>
                <InputErr errors={errors} inputField="email" />
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                  />
                </div>
                <InputErr errors={errors} inputField="password" />
              </div>

              {/* Error Message */}
              <InputErr errors={errors} inputField="root" hasTopMargin={true} />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                  isSubmitting ? "opacity-80" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Login to Your Account"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Need help?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Books at Bottom */}
        <div className="flex justify-center mt-4 space-x-1">
          {["bg-red-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"].map(
            (color, i) => (
              <div
                key={i}
                className={`h-2 w-10 ${color} rounded-b-full shadow-md`}
              ></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
