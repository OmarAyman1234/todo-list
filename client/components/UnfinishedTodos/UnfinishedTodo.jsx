import { format } from "date-fns";
import { useState } from "react";
import useTodo from "../../hooks/useTodo";
import toast from "react-hot-toast";

function UnfinishedTodo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompletingTodo, setIsCompletingTodo] = useState(false);
  const [todoName, setTodoName] = useState(todo.name);
  const [oldName, setOldName] = useState(todoName);
  const [isDeletingProcess, setIsDeletingProcess] = useState(false);

  const { renameTodo, completeTodo, deleteTodo } = useTodo();

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleEditInputChange(event) {
    setTodoName(event.target.value);
  }

  async function handleRenamingDone(todoId, newName) {
    try {
      await renameTodo(todoId, newName);
      setTodoName(newName);
      setOldName(newName);
      setIsEditing(false);
    } catch (err) {
      setTodoName(oldName);
      setIsEditing(false);
      throw err; //Throw error to the toast.promise();
    }
  }

  async function handleCompletingTodo(todoId) {
    setIsCompletingTodo(true);
    try {
      // If editing and clicked complete, save the value even if the user did not click done
      isEditing ? await renameTodo(todoId, todoName) : "";

      await completeTodo(todoId);
    } finally {
      setIsCompletingTodo(false);
    }
  }

  return (
    <div className="my-3 w-full transform rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md transition duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-grow">
          {isEditing ? (
            <input
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={todoName}
              onChange={handleEditInputChange}
              autoFocus
            />
          ) : (
            <h3 className="mb-1 text-lg font-semibold text-gray-100">
              {todoName}
            </h3>
          )}
          <p className="text-sm text-gray-400">
            Created: {format(todo.createdAt, "E, LLL d, y h:mm a")}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 md:mt-0 md:ml-4">
          {isEditing ? (
            <button
              data-todo-id={todo._id}
              onClick={(event) => {
                const newName = todoName;

                if (oldName === newName) {
                  setIsEditing(false);
                  return;
                }

                if (newName === "") {
                  setIsEditing(false);
                  toast.error("Todo name cannot be empty!");
                  setTodoName(oldName);
                  return;
                }

                const todoId = event.currentTarget.dataset.todoId;
                toast.promise(handleRenamingDone(todoId, newName), {
                  loading: "Renaming...",
                  success: <b>Todo renamed.</b>,
                  error: (err) => <b>{err.message}</b>,
                });
              }}
              className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Done
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="cursor-pointer rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => {
              toast.promise(handleCompletingTodo(todo._id), {
                loading: "Processing...",
                success: <b>Completed!</b>,
                error: (err) => <b>{err.message}</b>,
              });
            }}
            disabled={isCompletingTodo}
            className={`rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none ${
              isCompletingTodo
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            }`}
          >
            Complete
          </button>

          <button
            onClick={() => {
              if (isDeletingProcess) return;

              setIsDeletingProcess(true);

              toast
                .promise(deleteTodo(todo._id), {
                  loading: "Deleting...",
                  success: <b>🗑️ Todo deleted.</b>,
                  error: (err) => <b>{err.message}</b>,
                })
                .finally(() => setIsDeletingProcess(false));
            }}
            disabled={isDeletingProcess}
            className={`rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none ${
              isDeletingProcess
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnfinishedTodo;
