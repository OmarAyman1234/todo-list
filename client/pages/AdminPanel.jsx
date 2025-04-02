import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useUrls from "../hooks/useUrls";
import useFetching from "../hooks/useFetching";
import UserCard from "../components/AdminPanel/UserCard";

function AdminPanel() {
  //States
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);

  //Refs
  const debounceTimeOut = useRef(null);

  //Custom hooks
  const { setIsFetching } = useFetching();
  const auth = useAuth();
  const { apiBase, fetchWithAuth } = useUrls();
  const usersApi = apiBase + "/users";

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
        users.filter(
          (user) =>
            user.username.includes(e.target.value) &&
            user._id !== auth.authUserData._id,
        ),
      );
    }, 300);
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-100">
          Admin Panel
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Your Account
          </h2>
          {auth.authUserData.createdAt && auth.authUserData.updatedAt ? (
            <UserCard user={auth.authUserData} isCurrentUser={true} />
          ) : (
            <div className="rounded-lg bg-gray-800 p-4 text-gray-400">
              Loading your data...
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-200">
            Manage Users
          </h2>
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="relative w-full md:w-4/5">
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

          <div className="space-y-4">
            {searchValue.trim() !== "" && searchResults.length === 0 && (
              <p className="text-center text-gray-300">
                No results found for "{searchValue}"
              </p>
            )}

            {(searchValue.trim() === "" ? users : searchResults)
              .filter((user) => user._id !== auth.authUserData._id)
              .map((user) => (
                <UserCard key={user._id} user={user} isCurrentUser={false} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminPanel;
