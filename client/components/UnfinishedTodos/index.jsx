import UnfinishedTodo from "./UnfinishedTodo";

function UnfinishedTodos({ unfinishedTodos }) {
  return unfinishedTodos && unfinishedTodos.length !== 0 ? (
    <section className="mx-auto my-3 w-4/5">
      <h2 className="text-center text-xl font-bold">
        Unfinished ({unfinishedTodos.length})
      </h2>
      {/* <div className="flex flex-col-reverse"> */}
      {unfinishedTodos
        .slice()
        .reverse()
        .map((todo) => (
          <UnfinishedTodo key={todo._id} todo={todo} />
        ))}
      {/* </div> */}
    </section>
  ) : null;
}

export default UnfinishedTodos;
