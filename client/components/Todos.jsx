import { useState, useEffect } from "react";
import UnfinishedTodos from "./UnfinishedTodos";
import FinishedTodos from "./FinishedTodos";
import { useTodo } from "../context/TodoContext";

function Todos() {
  const { unfinishedTodos, finishedTodos, todosLoaded } = useTodo();

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
