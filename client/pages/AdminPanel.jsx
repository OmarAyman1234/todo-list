import toast from "react-hot-toast";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useUrls from "../hooks/useUrls";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import useFetching from "../hooks/useFetching";
import {
  LogOut,
  Edit,
  Trash2,
  Search,
  Lock,
  UserRoundPen,
  UserRoundX,
  KeyRound,
} from "lucide-react";
import checkMaxRole from "../utils/checkMaxRole";

function AdminPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);

  const debounceTimeOut = useRef(null);

  const { setIsFetching } = useFetching();

  const { apiBase, fetchWithAuth } = useUrls();
  const usersApi = apiBase + "/users";

  const auth = useAuth();
  const currentUserRoles = auth.userRoles;
  console.log(checkMaxRole(currentUserRoles));

  async function fetchAllUsers() {
    try {
      setIsFetching(true);
      const res = await fetchWithAuth(usersApi, {}, auth);
      if (res.status === 204) {
        toast.error("No users!");
        setUsers([]);
        return;
      }
      const result = await res.json();
      setUsers(result);
      console.log(result);
    } catch (error) {
      console.error(error.stack);
      toast.error(error.message);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  function searchUsers(e) {
    setSearchValue(e.target.value);
    clearTimeout(debounceTimeOut.current);

    debounceTimeOut.current = setTimeout(() => {
      setSearchResults(
        users.filter((user) => user.username.includes(e.target.value)),
      );
    }, 300);
  }

  return (
    <>
      <Header />
      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="relative w-4/5">
          <input
            onChange={(e) => searchUsers(e)}
            value={searchValue}
            placeholder="Search users (by username)"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 pl-10 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>

        {searchValue.trim() !== "" && (
          <p className="mt-2 text-gray-300">
            Showing {searchResults.length} result
            {searchResults.length !== 1 ? "s" : ""} for "{searchValue}"
          </p>
        )}
      </div>
      <div className="mx-auto mt-6 w-full space-y-4 px-4 md:w-11/12 lg:w-4/5">
        {searchValue.trim() !== "" && searchResults.length === 0 && (
          <p className="mt-2 text-gray-300">
            No results found for "{searchValue}"
          </p>
        )}
        {(searchValue.trim() === "" ? users : searchResults).map((user) => (
          <div
            key={user._id}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md transition-all duration-200 hover:border-gray-500 hover:bg-gray-900"
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="flex-grow">
                <p className="text-sm text-gray-400">
                  ID: <span className="text-white">{user._id}</span>
                </p>
                <p className="mt-1 text-xl font-semibold text-cyan-400">
                  {user.username}
                </p>
                <p className="mt-3 text-sm text-gray-400">
                  Created:{" "}
                  <span className="text-white">
                    {format(new Date(user.createdAt), "E, LLL d, y h:mm a")}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Last updated:{" "}
                  <span className="text-white">
                    {format(new Date(user.updatedAt), "E, LLL d, y h:mm a")}
                  </span>
                </p>
                <div className="mt-3">
                  <p className="text-sm text-gray-400">Roles:</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-gray-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col justify-center gap-2 md:mt-0 md:ml-6 md:w-40">
                {checkMaxRole(currentUserRoles) >= checkMaxRole(user.roles) ? (
                  <>
                    {/* Change pass when clicking on edit user */}
                    {/* <button
                      className="flex w-full cursor-pointer items-center justify-center rounded bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                      onClick={() =>
                        toast(
                          `Change password functionality not implemented yet.`,
                        )
                      }
                    >
                      <KeyRound size={16} className="mr-2" />
                      Change Pass
                    </button> */}
                    <button
                      className="flex w-full cursor-pointer items-center justify-center rounded bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                      onClick={() =>
                        toast(
                          `Logout ${user.username} functionality not implemented yet.`,
                        )
                      }
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout User
                    </button>
                    <button
                      className="flex w-full cursor-pointer items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      onClick={() =>
                        toast(
                          `Edit ${user.username} functionality not implemented yet.`,
                        )
                      }
                    >
                      <UserRoundPen size={16} className="mr-2" />
                      Edit User
                    </button>
                    <button
                      className="flex w-full cursor-pointer items-center justify-center rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                      onClick={() =>
                        toast(
                          `Delete ${user.username} functionality not implemented yet.`,
                        )
                      }
                    >
                      <UserRoundX size={16} className="mr-2" />
                      Delete User
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminPanel;
