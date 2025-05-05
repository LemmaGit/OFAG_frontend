import { checkAuthorization } from "../helpers/utilFun";
import useFetch from "./useFetch";

export function useAuth() {
  const { data, isLoading, isError } = useFetch("user", checkAuthorization);
  return { user: data?.user, role: data?.role, isLoading, isError };
}
