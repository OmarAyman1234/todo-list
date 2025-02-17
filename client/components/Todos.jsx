import { useState, useEffect } from "react";
import UnfinishedTodos from "./UnfinishedTodos";
import FinishedTodos from "./FinishedTodos";

function Todos() {
  const [unfinishedTodos, setUnfinishedTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosLoaded, setTodosLoaded] = useState(false);

  const apiBase = "http://localhost:4444";

  async function fetchTodos() {
    const res = await fetch(apiBase + "/todos");
    if (res.status === 204) {
      setTodos([]);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
  }

  useEffect(() => {
    async function loadTodos() {
      await fetchTodos();
      setTodosLoaded(true);
    }

    loadTodos();
  }, []);

  useEffect(() => {
    setUnfinishedTodos(todos.filter((todo) => !todo.isCompleted));
    setFinishedTodos(todos.filter((todo) => todo.isCompleted));
  }, [todos]);

  return (
    <>
      {todosLoaded ? (
        <>
          <UnfinishedTodos todos={unfinishedTodos} />
          <FinishedTodos todos={finishedTodos} />

          {/* If there are no todos */}
          {unfinishedTodos.length === 0 && finishedTodos.length === 0 ? (
            <h2 className="mt-6 text-center font-bold">
              You don't have any todos
            </h2>
          ) : (
            ""
          )}
        </>
      ) : (
        <h2 className="mt-6 text-center font-bold">Loading todos ...</h2>
      )}
    </>
  );
}

export default Todos;
