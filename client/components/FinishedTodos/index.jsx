import FinishedTodo from "./FinishedTodo";
function FinishedTodos({ todos }) {
  return todos && todos.length !== 0 ? (
    <section className="mx-auto my-3 w-4/5">
      <h2 className="text-center text-xl font-bold">
        Finished ({todos.length})
      </h2>
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <FinishedTodo
            key={todo._id}
            name={todo.name}
            completedAt={todo.completedAt}
          />
        ))}
    </section>
  ) : null;
}

export default FinishedTodos;
