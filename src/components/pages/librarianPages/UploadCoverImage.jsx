import { useRef } from "react";

function UploadAvatar({ setValue, errors, getValues }) {
  const fileInputRef = useRef();
  const isUploaded = getValues("image")?.length || false;
  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  function handleChange(e) {
    setValue("image", e.target.files, { shouldValidate: true });
  }
  // flex flex-col
  return (
    <div className=" space-y-4 pb-2 pt-4 ">
      <button
        onClick={handleButtonClick}
        className={`rounded-lg ${
          errors.image || !isUploaded
            ? "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300"
            : "bg-green-500 hover:bg-green-600 focus:ring-green-300"
        } px-4 py-2 text-base text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-base`}
      >
        Upload new Avatar
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        name="image"
        id="image"
        className="hidden"
      />
    </div>
  );
}

export default UploadAvatar;
