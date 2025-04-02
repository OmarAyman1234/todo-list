import checkMaxRole from "../../utils/checkMaxRole";
import { LogOut, UserRoundPen, UserRoundX } from "lucide-react";
import { format } from "date-fns";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

function UserCard({ user, isCurrentUser }) {
  const auth = useAuth();
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md transition-all duration-200 hover:border-gray-500 hover:bg-gray-900">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex-grow">
          <p className="text-sm text-gray-400">
            ID: <span className="text-white">{user._id}</span>
          </p>
          <p className="mt-1 text-xl font-semibold text-cyan-400">
            {user.username}
            {isCurrentUser && (
              <span className="ml-2 text-sm text-gray-400">(You)</span>
            )}
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
          {(isCurrentUser ||
            checkMaxRole(auth.authUserData.roles) >=
              checkMaxRole(user.roles)) && (
            <>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
