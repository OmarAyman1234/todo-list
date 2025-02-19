import { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [unfinishedTodos, setUnfinishedTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosLoaded, setTodosLoaded] = useState(false);

  const apiBase = "http://localhost:4444/api/todos";

  async function fetchTodos() {
    const res = await fetch(apiBase);
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
    const res = await fetch(apiBase, {
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

  async function renameTodo(todoId, newName) {
    const res = await fetch(apiBase + `/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName: newName }),
    });
    console.log(res);
    if (res.status === 400) throw new Error("To do name cannot be empty!");

    if (res.status === 204) return;
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
    renameTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Context was not provided");

  return context;
}
