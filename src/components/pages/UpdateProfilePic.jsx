// import { useState } from "react";
import { schema } from "../schema/avatarSchema";
import { updateAvatar } from "../helper/helper";
import UploadAvatar from "../components/ui/UploadAvatar";
import FormButton from "../components/ui/FormButton";
import InputErr from "../components/ui/InputErr";
import useFormHook from "../hook/useFormHook";
import useMutator from "../hook/useMutator";
import { toast } from "react-toastify";

function UpdateProfilePic() {
  const { handleSubmit, errors, isSubmitting, reset, getValues, setValue } =
    useFormHook(schema);
  const { mutateAsync: updateUserAvatar } = useMutator(updateAvatar);
  async function submit(data) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("image", data.image[0]);
    try {
      await updateUserAvatar(formData);
    } catch (err) {
      toast.error("Something went wrong!");
    }
    reset();
  }
  return (
    <form
      accept="image/*"
      encType="multipart/form-data"
      className="mt-3 flex flex-col justify-start gap-2 pl-4"
      onSubmit={handleSubmit(submit)}
    >
      <UploadAvatar setValue={setValue} errors={errors} getValues={getValues} />
      <InputErr errors={errors} inputField="image" hasNoMargin={true} />
      {!errors.image && getValues("image")?.length && (
        <FormButton label="Confirm Change" isSubmitting={isSubmitting} />
      )}
    </form>
  );
}
export default UpdateProfilePic;
