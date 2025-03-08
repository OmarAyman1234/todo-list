import { useState, useEffect } from "react";
import UnfinishedTodos from "./UnfinishedTodos";
import FinishedTodos from "./FinishedTodos";
import useTodo from "../hooks/useTodo";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Todos() {
  const { unfinishedTodos, finishedTodos, todosLoaded } = useTodo();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {todosLoaded && isLoggedIn && (
        <>
          <UnfinishedTodos unfinishedTodos={unfinishedTodos} />
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
      )}

      {!isLoggedIn ? (
        <div className="flex h-48 w-full items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 p-8 shadow-md">
          <div className="text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-100">
              Welcome to ToDo List!
            </h2>
            <p className="mb-5 text-gray-400">
              Log in to start using the service.
            </p>
            <Link
              to="/login"
              className="focus:ring-opacity-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-2 font-medium text-white shadow-md transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Log In
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Todos;
