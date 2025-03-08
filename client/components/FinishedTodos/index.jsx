import FinishedTodo from "./FinishedTodo";

function FinishedTodos({ todos }) {
  return todos && todos.length !== 0 ? (
    <section className="mx-auto w-full px-4 py-6 md:w-11/12 lg:w-4/5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Finished</h2>
        <span className="rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-gray-200">
          {todos.length}
        </span>
      </div>
      <div className="space-y-4">
        {todos
          .slice()
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
          .map((todo) => (
            <FinishedTodo key={todo._id} todo={todo} />
          ))}
      </div>
    </section>
  ) : null;
}

export default FinishedTodos;
