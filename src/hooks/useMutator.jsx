import { useMutation, useQueryClient } from "@tanstack/react-query";

function useMutator(fn, queryToInvalidate) {
  const queryClient = useQueryClient();
  const { mutateAsync, isError, isSuccess, mutate } = useMutation({
    mutationFn: fn,
    onSuccess: () => queryClient.invalidateQueries([queryToInvalidate]),
  });
  return { mutateAsync, isError, isSuccess, mutate };
}

export default useMutator;
