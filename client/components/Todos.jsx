import { useState, useEffect } from "react";
import UnfinishedTodos from "./UnfinishedTodos";
import FinishedTodos from "./FinishedTodos";

function Todos() {
  const [unfinishedTodos, setUnfinishedTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  const apiBase = "http://localhost:4444";

  async function fetchTodos() {
    const response = await fetch(apiBase + "/todos");
    if (response.ok) {
      const data = await response.json();
      setTodos(data);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setUnfinishedTodos(todos.filter((todo) => !todo.isCompleted));
    setFinishedTodos(todos.filter((todo) => todo.isCompleted));
  }, [todos]);

  return (
    <>
      <UnfinishedTodos todos={unfinishedTodos} />
      <FinishedTodos todos={finishedTodos} />

      {/* If there are no todos */}
      {unfinishedTodos.length === 0 && finishedTodos.length === 0 ? (
        <h2>You don't have any todos</h2>
      ) : (
        ""
      )}
    </>
  );
}

export default Todos;
