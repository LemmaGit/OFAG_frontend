import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../../../schema/patron";
import { FiX } from "react-icons/fi";
import useMutator from "../../../hooks/useMutator";
import { registerPatron } from "../../../helpers/librarian";
import { toast } from "react-toastify";
import { useState } from "react";
function AddPatron({ setIsAddModalOpen }) {
  const [isAddingPatron, setIsAddingPatron] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "12345678",
    },
  });
  const { mutateAsync, isError } = useMutator(registerPatron, "patron");
  const onSubmit = async (data) => {
    setIsAddingPatron(true);
    const res = await mutateAsync(data);
    if (res?.status !== "error") {
      setIsAddModalOpen(false);
      return toast.success("Successfully Registration");
    } else if (res.message && res.message.includes("{")) {
      const message = JSON.parse(res.message);
      Object.entries(message).forEach(([key, value]) => {
        return setError(key, { type: "server", message: value });
      });
    } else {
      setError("root", { type: "server", message: res.message });
    }
  };
  if (isError) return <p>Error</p>;
  return (
    <div className="flex-1 py-8">
      {/* Main Content */}
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg relative">
        <FiX
          className="w-7 h-7 absolute top-4 right-4 text-neutral-800 hover:text-neutral-900 cursor-pointer"
          onClick={() => setIsAddModalOpen(false)}
        />
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Add Patron</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              disabled={isSubmitting}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors["firstName"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["firstName"].message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              disabled={isSubmitting}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors["lastName"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["lastName"].message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              disabled={isSubmitting}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors["email"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["email"].message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              disabled={isSubmitting}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors["username"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["username"].message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full p-3 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              disabled={true}
              required
            />
            {errors["password"] && (
              <p className="text-red-500 text-xs mt-2">
                {errors["password"].message}
              </p>
            )}
            <div className=" mt-2 flex items-center justify-center">
              {errors["root"] && (
                <p className="text-red-500 text-xs mt-2">
                  {errors["root"].message}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              name="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
                isSubmitting && "cursor-not-allowed"
              }`}
            >
              {!isAddingPatron ? "Add Patron" : "Adding..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatron;
