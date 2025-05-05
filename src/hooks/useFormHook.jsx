import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function useFormHook(schema, values = null) {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: values,
  });
  useEffect(() => {
    const emptyFileList = new DataTransfer();
    setValue("image", getValues("image") || emptyFileList.files);
  }, [setValue]);
  return {
    register,
    handleSubmit,
    errors,
    setError,
    isSubmitting,
    reset,
    getValues,
    setValue,
    watch,
    clearErrors,
    isDirty,
  };
}

export default useFormHook;
