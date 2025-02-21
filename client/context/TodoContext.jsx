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

    const createdTodo = await res.json();
    if (!createdTodo) throw new Error("Failed to create.");

    setTodos((prev) => [...prev, createdTodo]);
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

  async function completeTodo(todoId) {
    const res = await fetch(apiBase + `/${todoId}/complete`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

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
    await fetch(apiBase + `/${todoId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

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

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Context was not provided");

  return context;
}
