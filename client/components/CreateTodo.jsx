import { useState } from "react";
import { useTodo } from "../context/TodoContext";
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
    <section className="mx-auto w-4/5">
      <div className="flex w-full rounded-md border-2 border-black">
        <input
          value={todoName}
          placeholder="New todolist"
          className="flex-1 rounded-md pl-2 focus:outline-none"
          onChange={handleInputChange}
        />
        <button
          onClick={() => {
            if (todoName === "") {
              toast.error("Todo name cannot be empty!");
              setLoading(false);
              return;
            }

            toast.promise(addNewTodo, {
              loading: "Creating ...",
              success: "Created!",
              error: (err) => `${err.message}`,
            });
          }}
          className={`${loading ? "pointer-events-none bg-gray-600 opacity-70 grayscale" : ""} mr-1 cursor-pointer rounded-md border-2 border-white bg-blue-500 px-2 py-1 text-white duration-150 hover:bg-blue-600 focus:outline-none`}
        >
          Create
        </button>
      </div>
    </section>
  );
}
export default CreateTodo;
