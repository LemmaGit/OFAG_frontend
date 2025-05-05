import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedUserContext } from "./loggedUserContext";
import { checkAuthorization } from "../helpers/patron";
import useFetch from "./useFetch";
import Spinner from "./Spinner";

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const { error, data, isLoading, isError } = useFetch(
    "user",
    checkAuthorization
  );

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isError || data?.error) {
      navigate("/login", { replace: true });
    } else if (!isLoading) {
      setLoading(false);
    }
  }, [navigate, isError, error, data, isLoading]);

  if (loading || isLoading) return <Spinner />;
  return (
    <loggedUserContext.Provider value={data.user}>
      {children}
    </loggedUserContext.Provider>
  );
}
