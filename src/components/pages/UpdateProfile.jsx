import useFormHook from "../../hooks/useFormHook";
import UploadAvatar from "./UploadAvatar";
import { updateProfileSchema } from "../../schema/profile";
import FormField from "./FormField";
import useMutator from "../../hooks/useMutator";
import { loggedUserContext } from "../../hooks/loggedUserContext";
import { useContext, useState } from "react";
import InputErr from "./InputErr";
import { toast } from "react-toastify";
// import { updateProfileInfo } from "../../helpers/manager";
function UpdateProfile({ handleProfileUpdate }) {
  const [isUpdating, setUpdating] = useState(false);
  const {
    email,
    firstName,
    lastName,
    username,
    avatar: image,
  } = useContext(loggedUserContext);

  const {
    handleSubmit,
    errors,
    isSubmitting,
    getValues,
    setValue,
    setError,
    register,
  } = useFormHook(updateProfileSchema, {
    firstName,
    lastName,
    email,
    username,
    // image,
  });
  // const { mutateAsync: updateUserAvatar, isError, isSuccess } = useMutator();
  const { mutateAsync: updateProfile, isError } = useMutator(
    handleProfileUpdate,
    "user"
  );
  async function submit(data) {
    setUpdating(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && !data.image?.[0]) return;
      if (key === "image" && data.image[0])
        formData.append("image", data.image[0]);
      if (key !== "image") formData.append(key, value);
    });

    const res = await updateProfile(formData);
    if (res?.status !== "error") toast.success("Successfully update");
    else if (res.message && res.message.includes("{")) {
      const message = JSON.parse(res.message);
      Object.entries(message).forEach(([key, value]) => {
        return setError(key, { type: "server", message: value });
      });
    } else {
      setError("root", { type: "server", message: res.message });
    }
    setUpdating(false);
  }
  return (
    <form
      className="space-y-6"
      accept="image/*"
      encType="multipart/form-data"
      onSubmit={handleSubmit(submit)}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
        <div className="space-y-4">
          <FormField
            iconText="person"
            label="First Name"
            id="firstName"
            type="text"
            register={register}
            errors={errors}
          />
          <FormField
            iconText="person"
            label="Last Name"
            id="lastName"
            type="text"
            register={register}
            errors={errors}
          />
          <FormField
            iconText="badge"
            label="Username"
            id="username"
            type="text"
            register={register}
            errors={errors}
          />

          <FormField
            iconText="image"
            id="image"
            label="Profile Picture"
            InputComponent={
              <UploadAvatar
                setValue={setValue}
                errors={errors}
                getValues={getValues}
              />
            }
            register={register}
            errors={errors}
          />
          <InputErr errors={errors} inputField="root" hasTopMargin={true} />
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
          >
            <span className="material-icons-outlined mr-2">save</span>
            {!isUpdating || !isSubmitting ? "Save Changes" : "Saving Changes"}
          </button>
          <button
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

export default UpdateProfile;
