import { createContext, useState, useEffect } from "react";
import fetchWithAuth from "../utils/fetchWithAuth.js";
import useAuth from "../hooks/useAuth.jsx";
import useFetching from "../hooks/useFetching.jsx";
export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [unfinishedTodos, setUnfinishedTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosLoaded, setTodosLoaded] = useState(false);
  const { setIsFetching } = useFetching();

  const auth = useAuth();

  const apiBase = "http://localhost:4444/api/todos";

  async function fetchTodos() {
    try {
      setIsFetching(true);
      const res = await fetchWithAuth(apiBase, {}, auth);

      if (res.status === 204) {
        setTodos([]);
        return;
      } else if (res.status === 200) {
        const data = await res.json();
        setTodos(data);
      } else if (res.status === 401) {
        return;
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsFetching(false);
      }, 50);
    }
  }

  async function createTodo(todoName) {
    const res = await fetchWithAuth(
      apiBase,
      {
        method: "POST",
        body: JSON.stringify({ todoName: todoName }),
      },
      auth,
    );

    if (res.status === 400) {
      throw new Error("Todo name cannot be empty!");
    }

    if (res.status === 401) {
      throw new Error("Log in to create a todo!");
    }

    const createdTodo = await res.json();
    if (!createdTodo) throw new Error("Failed to create.");

    setTodos((prev) => [...prev, createdTodo]);
  }

  async function renameTodo(todoId, newName) {
    const res = await fetchWithAuth(
      apiBase + `/${todoId}`,
      {
        method: "PUT",
        body: JSON.stringify({ newName: newName }),
      },
      auth,
    );
    console.log(res);
    if (res.status === 400) throw new Error("To do name cannot be empty!");

    if (res.status === 401) {
      throw new Error(res.statusText);
    }

    if (res.status === 204) return;
  }

  async function completeTodo(todoId) {
    const res = await fetchWithAuth(
      apiBase + `/${todoId}/complete`,
      {
        method: "PUT",
      },
      auth,
    );

    if (res.status === 401) {
      throw new Error(res.statusText);
    }

    if (res.ok) {
      const completedTodo = await res.json();
      setTodos(
        todos.map((todo) => (todo._id === todoId ? completedTodo : todo)),
      );
    }

    if (res.status === 400)
      throw new Error("Todo ID was not provided or not provided correctly.");
    else if (res.status === 404)
      throw new Error("Todo was not found at the DB.");
  }

  async function deleteTodo(todoId) {
    const res = await fetchWithAuth(
      apiBase + `/${todoId}`,
      {
        method: "DELETE",
      },
      auth,
    );

    if (res.status === 401) {
      throw new Error(res.statusText);
    }

    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
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
    completeTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
