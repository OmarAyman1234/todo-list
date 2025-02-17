import UnfinishedTodo from "./UnfinishedTodo";

function UnfinishedTodos({ todos }) {
  return todos && todos.length !== 0 ? (
    <section className="mx-auto my-3 w-4/5">
      <h2 className="text-center text-xl font-bold">
        Unfinished ({todos.length})
      </h2>
      {todos.map((todo, index) => (
        <UnfinishedTodo
          key={index}
          name={todo.name}
          creationDate={todo.createdAt}
        />
      ))}
    </section>
  ) : null;
}

export default UnfinishedTodos;
