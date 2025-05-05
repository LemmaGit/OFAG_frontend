import InputErr from "./InputErr";

function FormField({
  iconText,
  label,
  type,
  id,
  InputComponent,
  register,
  errors,
}) {
  return (
    <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
      <span className="material-icons-outlined mr-3">{iconText}</span>
      <div className="flex-1">
        <label
          htmlFor={id || label.split(" ").join("")}
          className="block text-sm text-blue-100 mb-1"
        >
          {label}
        </label>
        {!InputComponent ? (
          <input
            {...register(id)}
            type={type}
            id={id}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="w-full bg-transparent focus:outline-none placeholder:text-blue-200"
            required
          />
        ) : (
          InputComponent
        )}
      </div>
      <InputErr errors={errors} inputField={id} hasTopMargin={true} />
    </div>
  );
}

export default FormField;
