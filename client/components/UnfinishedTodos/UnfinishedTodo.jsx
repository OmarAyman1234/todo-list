import { format } from "date-fns";
import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import toast from "react-hot-toast";

function UnfinishedTodo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoName, setTodoName] = useState(todo.name);
  const [oldName, setOldName] = useState(todoName);
  const { renameTodo } = useTodo();

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
              onClick={(event) =>
                toast.promise(
                  handleRenamingDone(
                    event.currentTarget.dataset.todoId,
                    todoName,
                  ),
                  {
                    loading: "Renaming...",
                    success: "Todo renamed.",
                    error: (err) => `${err.message}`,
                  },
                )
              }
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

          <button className="mb-1 cursor-pointer rounded-md bg-green-600 px-2 py-1 text-sm text-white duration-150 hover:bg-green-700 focus:outline-none">
            Complete
          </button>
          <button className="mb-1 cursor-pointer rounded-md bg-red-600 px-2 py-1 text-sm text-white duration-150 hover:bg-red-700 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default UnfinishedTodo;
