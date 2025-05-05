function InputErr({ errors, inputField, hasNoMargin, hasTopMargin }) {
  return (
    <>
      {errors[inputField] && (
        <div
          className={`${!hasNoMargin && "sm:mb-5 mb-2"} ${
            hasTopMargin && "sm:mt-5 mt-2"
          } md::text-lg text-red-500  sm:text-red-700 text-sm leading-tight sm:leading-normal`}
        >
          {errors[inputField].message}
        </div>
      )}
    </>
  );
}

export default InputErr;
