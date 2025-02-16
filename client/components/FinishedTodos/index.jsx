import FinishedTodo from "./FinishedTodo";
function FinishedTodos() {
  return (
    <section className="mx-auto my-3 w-4/5">
      <h2 className="text-center text-xl font-bold">Finished (x)</h2>
      <FinishedTodo name="Backend Todo list" finishDate="yesterday morning" />
      <FinishedTodo name="Backend Todo list" finishDate="yesterday morning" />
      <FinishedTodo name="Backend Todo list" finishDate="yesterday morning" />
    </section>
  );
}

export default FinishedTodos;
