import { format } from "date-fns";
import { useTodo } from "../../context/TodoContext";
import toast from "react-hot-toast";
import { useState } from "react";

function FinishedTodo({ todo }) {
  const { createTodo, deleteTodo } = useTodo();
  const [isDeletingProcess, setisDeletingProcess] = useState(false);
  const [isReDoing, setIsReDoing] = useState(false);

  return (
    <div className="my-3 w-full rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md transition duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-grow">
          <h3 className="mb-1 text-lg font-semibold text-white">{todo.name}</h3>
          <p className="text-sm text-gray-400">
            Completed: {format(todo.completedAt, "E, LLL d, y h:mm a")}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 md:mt-0 md:ml-4">
          <button
            onClick={() => {
              if (isReDoing) return;

              setIsReDoing(true);
              toast
                .promise(
                  async () => {
                    await createTodo(todo.name);
                    await deleteTodo(todo._id);
                  },
                  {
                    loading: "Re-doing...",
                    success: <b>Todo re-assigned.</b>,
                    error: (err) => <b>{err.message}</b>,
                  },
                )
                .finally(() => setIsReDoing(false));
            }}
            disabled={isReDoing}
            className={`rounded-md bg-cyan-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none ${
              isReDoing ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            Redo
          </button>

          <button
            onClick={() => {
              if (isDeletingProcess) return;

              setisDeletingProcess(true);

              toast
                .promise(deleteTodo(todo._id), {
                  loading: "Deleting...",
                  success: <b>🗑️ Todo deleted.</b>,
                  error: (err) => <b>{err.message}</b>,
                })
                .finally(() => setisDeletingProcess(false));
            }}
            disabled={isDeletingProcess}
            className={`rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none ${
              isDeletingProcess ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishedTodo;
