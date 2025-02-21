import { format } from "date-fns";
import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
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
    <>
      <div className="my-2 flex w-full rounded-md border-2 border-black">
        <div className="flex flex-col justify-center">
          {isEditing ? (
            <input
              className="ml-0.5 rounded-md border-2 border-gray-600 pl-1"
              value={todoName}
              onChange={handleEditInputChange}
            />
          ) : (
            <p className="my-2 pl-2 font-semibold">{todoName}</p>
          )}

          <p className="my-2 pl-2 text-sm">
            Created: {format(todo.createdAt, "E, LLL d, y hh:mm:ss a")}
          </p>
        </div>

        <div className="ml-auto flex flex-col justify-center pr-1">
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
              className="mt-1 mb-1 cursor-pointer rounded-md bg-gray-700 px-2 py-1 text-sm text-white duration-150 hover:bg-gray-800 focus:outline-none"
            >
              Done
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="mt-1 mb-1 cursor-pointer rounded-md bg-gray-700 px-2 py-1 text-sm text-white duration-150 hover:bg-gray-800 focus:outline-none"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => {
              toast.promise(handleCompletingTodo(todo._id), {
                loading: "Processing ...",
                success: <b>Completed!</b>,
                error: (err) => <b>{err.message}</b>,
              });
            }}
            className={`${isCompletingTodo ? "pointer-events-none opacity-70 grayscale" : ""} mb-1 cursor-pointer rounded-md bg-green-600 px-2 py-1 text-sm text-white duration-150 hover:bg-green-700 focus:outline-none`}
          >
            Complete
          </button>
          <button
            onClick={() => {
              if (isDeletingProcess) return;

              setIsDeletingProcess(true);

              toast
                .promise(deleteTodo(todo._id), {
                  loading: "Deleting ...",
                  success: <b>🗑️ Todo deleted.</b>,
                  error: (err) => <b>{err.message}</b>,
                })
                .finally(() => setIsDeletingProcess(false));
            }}
            className={`${isDeletingProcess ? "pointer-events-none bg-gray-500 opacity-70 grayscale" : ""} mb-1 cursor-pointer rounded-md bg-red-600 px-2 py-1 text-sm text-white duration-150 hover:bg-red-700 focus:outline-none`}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default UnfinishedTodo;
