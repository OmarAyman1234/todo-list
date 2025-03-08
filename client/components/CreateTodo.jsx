import { useState } from "react";
import useTodo from "../hooks/useTodo";
import toast from "react-hot-toast";

function CreateTodo() {
  const [todoName, setTodoName] = useState("");
  const [loading, setLoading] = useState(false);
  const { createTodo } = useTodo();

  function handleInputChange(event) {
    setTodoName(event.target.value);
  }

  async function addNewTodo() {
    // Prevent multiple POST requests while a one is being processed.
    if (loading) return;

    setLoading(true);

    try {
      await createTodo(todoName);
      setTodoName("");
    } catch (err) {
      throw err; // Throw the error to the toast.
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full px-4 py-6 md:w-11/12 lg:w-4/5">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={todoName}
            placeholder="Add a new todo"
            className="flex-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && todoName.trim() !== "") {
                toast.promise(addNewTodo, {
                  loading: "Creating...",
                  success: "Created!",
                  error: (err) => `${err.message}`,
                });
              }
            }}
          />
          <button
            onClick={() => {
              if (todoName.trim() === "") {
                toast.error("Todo name cannot be empty!");
                return;
              }

              toast.promise(addNewTodo, {
                loading: "Creating...",
                success: "Created!",
                error: (err) => `${err.message}`,
              });
            }}
            disabled={loading}
            className={`rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </section>
  );
}

export default CreateTodo;
