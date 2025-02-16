import FinishedTodo from "./FinishedTodo";
function FinishedTodos() {
  return (
    <section className="mx-auto my-3 w-4/5">
      <h2 className="text-center text-xl font-bold">Finished (x)</h2>
      <FinishedTodo />
      <FinishedTodo />
      <FinishedTodo />
    </section>
  );
}

export default FinishedTodos;
