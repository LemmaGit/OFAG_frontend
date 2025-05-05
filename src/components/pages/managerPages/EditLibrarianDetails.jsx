import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useMutator from "../../../hooks/useMutator";
import { editDetail } from "../../../helpers/manager";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

// Zod schema for form validation
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "user name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Contact must be at least 10 characters"),
});

const EditLibrarianDetails = ({ setIsModalOpen, selectedLibrarian }) => {
  const { mutateAsync, isError, isSuccess } = useMutator(
    editDetail,
    `${selectedLibrarian._id}`
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: selectedLibrarian.firstName,
      lastName: selectedLibrarian.lastName,
      username: selectedLibrarian.username,
      email: selectedLibrarian.email,
      contact: selectedLibrarian.contact,
    },
  });

  const onSubmit = async (data) => {
    delete data.email;
    delete data.contact;
    data.librarianId = selectedLibrarian._id;
    const res = await mutateAsync(data);
    if (res.message && res.message.includes("{")) {
      const message = JSON.parse(res.message);
      Object.entries(message).forEach(([key, value]) => {
        return setError(key, { type: "server", message: value });
      });
    } else if (res.status === "error") {
      return setError("root", { type: "server", message: res.message });
    }
    setIsModalOpen(false);
    return toast.success("Successfully Updated");
  };
  //min-h-screen
  return (
    <div className="flex-1 bg-transparent py-8">
      {/* Main Content */}
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
        <div className="sticky top-0 bg-white flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Edit Librarian Details
          </h1>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <FiX className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              First Name
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("firstName")}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-2">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Last Name
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              {...register("username")}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              readOnly
              {...register("email")}
              defaultValue={selectedLibrarian.email}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold">
              Contact
            </label>
            <input
              type="text"
              readOnly
              {...register("contact")}
              defaultValue={selectedLibrarian.contact}
              placeholder="Contact"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-2">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center space-y-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
                isSubmitting ? "cursor-progress" : "cursor-pointer"
              }`}
            >
              Update Details
            </button>
            {/* <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              disabled={isSubmitting}
              className="w-full py-3 rounded-md hover:border-gray-400 focus:outline-none transition duration-300 border border-gray-200"
            >
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLibrarianDetails;
