import UnfinishedTodo from "./UnfinishedTodo";

function UnfinishedTodos() {
  return (
    <section className="mx-auto my-3 w-4/5">
      <h2 className="text-center text-xl font-bold">Unfinished (x)</h2>
      <UnfinishedTodo name="Backend Todo list" creationDate="Today" />
      <UnfinishedTodo name="Backend Todo list" creationDate="Today" />
      <UnfinishedTodo name="Backend Todo list" creationDate="Today" />
    </section>
  );
}

export default UnfinishedTodos;
