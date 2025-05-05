function FormButton({ label, isSubmitting }) {
  return (
    <button
      disabled={isSubmitting}
      className="mt-6 block w-full rounded-md bg-yellow-300 px-5 py-2 text-xl text-stone-700 disabled:cursor-not-allowed disabled:opacity-50 ssm:rounded-xl ssm:px-8 ssm:py-3 sm:rounded-full sm:px-8 sm:py-3 sm:text-2xl"
    >
      {label}
    </button>
  );
}

export default FormButton;
