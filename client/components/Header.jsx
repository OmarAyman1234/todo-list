import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import fetchWithAuth from "../utils/fetchWithAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Header() {
  const { isLoggedIn, authUser, setIsLoggedIn, setAuthUser } = useAuth();

  const auth = useAuth();

  const navigate = useNavigate();

  const serverUrl = "http://localhost:4444";
  const apiBase = "http://localhost:4444/api";

  useEffect(() => {
    async function getAuthUserData() {
      try {
        const res = await fetchWithAuth(apiBase + "/authUserData", {}, auth);
        console.log(res);

        if (res.status !== 403) {
          const data = await res.json();

          setAuthUser(data.username);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getAuthUserData();
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  async function handleLogout() {
    // Prevent multiple requests
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    toast.promise(() => processLogout(), {
      loading: "Logging out ...",
    });
    async function processLogout() {
      try {
        await fetchWithAuth(
          serverUrl + "/logout",
          {
            method: "POST",
          },
          auth,
        );

        setIsLoggedIn(false);
        setAuthUser(null);
        navigate("/login");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoggingOut(false);
      }
    }
  }
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-100 md:mb-0 md:text-left">
            To Do List
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            {isLoggedIn ? (
              <>
                <span className="px-3 font-medium text-indigo-400">
                  {authUser}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-gray-700 px-4 py-2 text-gray-100 shadow-sm transition-colors duration-200 hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md border border-indigo-500 px-4 py-2 text-indigo-400 shadow-sm transition-colors duration-200 hover:bg-indigo-900 hover:text-indigo-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
