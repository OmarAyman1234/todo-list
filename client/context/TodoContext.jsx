import { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [unfinishedTodos, setUnfinishedTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosLoaded, setTodosLoaded] = useState(false);

  const apiBase = "http://localhost:4444/api";

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

  async function createTodo(todoName) {
    const res = await fetch(apiBase + "/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ todoName: todoName }),
    });

    if (res.status === 400) {
      throw new Error("Todo name cannot be empty!");
    }

    const data = await res.json();
    return data;
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

  const value = {
    unfinishedTodos,
    finishedTodos,
    todosLoaded,
    todos,
    setTodos,
    createTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Context was not provided");

  return context;
}
