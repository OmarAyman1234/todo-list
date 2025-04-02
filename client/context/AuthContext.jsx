import { createContext, useState } from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUserData, setAuthUserData] = useState({
    username: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    roles: [],
  });

  const [accessToken, setAccessToken] = useState("");

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    authUserData,
    setAuthUserData,
    accessToken,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
