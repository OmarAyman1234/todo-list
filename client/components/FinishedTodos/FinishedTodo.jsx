import { format } from "date-fns";
import { useTodo } from "../../context/TodoContext";
import toast from "react-hot-toast";

function FinishedTodo({ todo }) {
  const { deleteTodo } = useTodo();
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
          <button className="mb-1 cursor-pointer rounded-md bg-gray-700 px-3 py-1 text-sm text-white opacity-70 duration-150 hover:bg-gray-800 focus:outline-none">
            Redo
          </button>
          <button
            onClick={() => {
              toast.promise(deleteTodo(todo._id), {
                loading: "Deleting ...",
                success: <b>Todo deleted.</b>,
                error: (err) => <b>{err.message}</b>,
              });
            }}
            className="cursor-pointer rounded-md bg-red-700 px-6 py-1 text-sm text-white opacity-70 duration-150 hover:bg-red-800 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishedTodo;
