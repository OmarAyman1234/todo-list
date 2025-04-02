import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useFetching from "../hooks/useFetching";
import useUrls from "../hooks/useUrls";
import { UserCog2 } from "lucide-react";
import checkMaxRole from "../utils/checkMaxRole";

function Header() {
  const { setIsFetching } = useFetching();
  const auth = useAuth();

  const { serverUrl, apiBase, fetchWithAuth } = useUrls();

  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthUserData() {
      setIsFetching(true);
      try {
        const res = await fetchWithAuth(apiBase + "/authUserData", {}, auth);

        if (res.status === 401) {
          return;
        }

        if (res.status !== 403) {
          const data = await res.json();

          auth.setAuthUserData({
            roles: data.roles,
            _id: data._id,
            username: data.username,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
          auth.setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setIsFetching(false);
        }, 50);
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

        auth.setIsLoggedIn(false);
        auth.setAuthUserData({});
        navigate("/");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoggingOut(false);
      }
    }
  }

  function renderAdminPanelIcon() {
    if (checkMaxRole(auth.authUserData.roles) > 1) {
      return (
        <Link to="/adminPanel" className="group relative">
          <UserCog2 className="duration-150 hover:text-gray-300" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 hidden rounded bg-gray-500 px-0.5 text-nowrap duration-150 group-hover:block">
            Admin Panel
          </div>
        </Link>
      );
    }
  }
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <Link
            to="/"
            className="mb-4 text-center text-3xl font-extrabold text-purple-400 md:mb-0 md:text-left"
          >
            To<span className="text-blue-400">Do</span> List
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            {auth.isLoggedIn ? (
              <>
                {renderAdminPanelIcon()}
                <span className="px-3 font-medium text-indigo-400">
                  {auth.authUserData.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 text-gray-100 shadow-sm transition-colors duration-200 hover:bg-gray-600"
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
