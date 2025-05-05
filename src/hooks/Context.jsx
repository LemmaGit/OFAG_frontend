import { loggedUserContext } from "./loggedUserContext";

function Context({ user, children }) {
  return (
    <loggedUserContext.Provider value={user}>
      {children}
    </loggedUserContext.Provider>
  );
}

export default Context;
