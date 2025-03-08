import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth Context was not provided");

  return context;
}

export default useAuth;
