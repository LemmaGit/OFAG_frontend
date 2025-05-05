import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../schema/librarian";
import useMutator from "../../../hooks/useMutator";
import { signupUser } from "../../../helpers/manager";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const AddLibrarian = ({ setIsAddBtnClicked }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "12345678",
    },
  });

  const { mutateAsync, isError, isSuccess } = useMutator(
    signupUser,
    "librarians"
  );

  const onSubmit = async (data) => {
    const d = await mutateAsync(data);
    if (d.message && d.message.includes("{")) {
      const message = JSON.parse(d.message);
      Object.entries(message).forEach(([key, value]) => {
        return setError(key, { type: "server", message: value });
      });
    } else if (d?.status === "error") {
      return setError("root", { type: "server", message: d.message });
    }
    setIsAddBtnClicked(false);
    return toast.success("Successfully Registered");
  };

  return (
    <div className="flex-1 bg-transparent py-8">
      {/* Main Content */}
      <div
        className="container mx-auto p-6 bg-white 
      shadow-lg rounded-lg max-w-lg relative "
      >
        <FiX
          id="closer"
          className="w-5 h-5 text-gray-500 hover:text-gray-700  absolute top-4 right-4 cursor-pointer "
          onClick={() => setIsAddBtnClicked(false)}
        />
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Add Librarian
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-0.5">
              First Name
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("firstName")}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors["firstName"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["firstName"].message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-0.5">
              Last Name
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors["lastName"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["lastName"].message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-0.5">
              Email
            </label>
            <input
              type="email"
              disabled={isSubmitting}
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors["email"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["email"].message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-0.5">
              Contact
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("contact")}
              placeholder="Contact"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors["contact"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["contact"].message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-0.5">
              Username
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("username")}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors["username"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["username"].message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-0.5">
              Password
            </label>
            <input
              type="password"
              disabled
              {...register("password")}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
            />
            {errors["password"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["password"].message}
              </p>
            )}
          </div>
          <div className="">
            {errors["root"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["root"].message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 cursor-pointer ${
                isSubmitting && "cursor-progress"
              }`}
            >
              Add Librarian
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLibrarian;
