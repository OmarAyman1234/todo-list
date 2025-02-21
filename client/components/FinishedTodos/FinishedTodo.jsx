import { format } from "date-fns";
import { useTodo } from "../../context/TodoContext";
import toast from "react-hot-toast";
import { useState } from "react";

function FinishedTodo({ todo }) {
  const { createTodo, deleteTodo } = useTodo();
  const [isDeletingProcess, setisDeletingProcess] = useState(false);
  const [isReDoing, setIsReDoing] = useState(false);
  return (
    <>
      <div className="my-2 flex w-full rounded-md border-2 border-black">
        <div className="flex flex-col justify-center">
          <p className="my-2 pl-2 font-semibold">{todo.name}</p>
          <p className="my-2 pl-2 text-sm">
            Completed: {format(todo.completedAt, "E, LLL d, y hh:mm:ss a")}
          </p>
        </div>

        <div className="ml-auto flex flex-col justify-center pr-1">
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
                    loading: "Re-doing ...",
                    success: <b>Todo re-assigned.</b>,
                    error: (err) => <b>{err.message}</b>,
                  },
                )
                .finally(() => setIsReDoing(false));
            }}
            className={`${isReDoing ? "pointer-events-none bg-gray-500 opacity-70 grayscale" : ""} mb-1 cursor-pointer rounded-md bg-cyan-700 px-3 py-1 text-sm text-white opacity-70 duration-150 hover:bg-cyan-800 focus:outline-none`}
          >
            Redo
          </button>
          <button
            onClick={() => {
              if (isDeletingProcess) return;

              setisDeletingProcess(true);

              toast
                .promise(deleteTodo(todo._id), {
                  loading: "Deleting ...",
                  success: <b>🗑️ Todo deleted.</b>,
                  error: (err) => <b>{err.message}</b>,
                })
                .finally(() => setisDeletingProcess(false));
            }}
            className={`${isDeletingProcess ? "pointer-events-none bg-gray-500 grayscale" : "bg-red-700"} cursor-pointer rounded-md px-6 py-1 text-sm text-white opacity-70 duration-150 hover:bg-red-800 focus:outline-none`}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishedTodo;
