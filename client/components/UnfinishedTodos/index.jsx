import UnfinishedTodo from "./UnfinishedTodo";

function UnfinishedTodos() {
  return (
    <section className="w-4/5 mx-auto my-3">
      <h2 className="font-bold text-xl text-center">Unfinished (x)</h2>
      <UnfinishedTodo />
      <UnfinishedTodo />
      <UnfinishedTodo />
    </section>
  );
}

export default UnfinishedTodos;
