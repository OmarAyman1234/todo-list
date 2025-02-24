import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const serverUrl = "http://localhost:4444";

  async function handleRegister(event) {
    event.preventDefault();

    toast.promise(validateData(), {
      loading: "Registering ...",
      success: (data) => <b>{data.message}</b>,
      error: (err) => <b>{err.message}</b>,
    });

    async function validateData() {
      try {
        const res = await fetch(serverUrl + "/register", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.status !== 201) {
          throw new Error(data.message || "Failed to register.");
        }

        if (res.ok) {
          toast.loading("Please wait ...", { duration: 1000 });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }

        return data;
      } catch (err) {
        throw err; // Throw the error to the toast.
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h1>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm transition-all"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm transition-all"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              Register
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
