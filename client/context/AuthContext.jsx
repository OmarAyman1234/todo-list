import { createContext, useState } from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const [accessToken, setAccessToken] = useState("");

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    authUser,
    setAuthUser,
    accessToken,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
