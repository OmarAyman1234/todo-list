import { useState } from "react";

function CreateTodo() {
  const [todoName, setTodoName] = useState("");
  function handleInputChange(event) {
    setTodoName(event.target.value);
  }

  const apiBase = "http://localhost:4444";
  async function addNewTodo() {
    const res = await fetch(apiBase + "/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ todoName: todoName }),
    });

    const data = await res.json();
    return data;
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
          onClick={addNewTodo}
          className="mr-1 cursor-pointer rounded-md border-2 border-white bg-blue-500 px-2 py-1 text-white duration-150 hover:bg-blue-600 focus:outline-none"
        >
          Create
        </button>
      </div>
    </section>
  );
}
export default CreateTodo;
