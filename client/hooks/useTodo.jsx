import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

function useTodo() {
  const context = useContext(TodoContext);

  if (!context) throw new Error("Context was not provided");

  return context;
}

export default useTodo;
