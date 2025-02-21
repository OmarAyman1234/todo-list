import { format } from "date-fns";
import { useTodo } from "../../context/TodoContext";
import toast from "react-hot-toast";
import { useState } from "react";

function FinishedTodo({ todo }) {
  const { deleteTodo } = useTodo();
  const [isDeletingProcess, setisDeletingProcess] = useState(false);
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
          <button className="mb-1 cursor-pointer rounded-md bg-cyan-700 px-3 py-1 text-sm text-white opacity-70 duration-150 hover:bg-cyan-800 focus:outline-none">
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
