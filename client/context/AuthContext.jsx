import { createContext, useState } from "react";

export const AuthContext = createContext();
export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    setAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
