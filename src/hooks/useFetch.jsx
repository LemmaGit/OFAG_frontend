import { useQuery } from "@tanstack/react-query";

function useFetch(queryKey, fetcher) {
  const { error, data, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: fetcher,
  });
  return { error, data, isLoading, isError };
}

export default useFetch;
