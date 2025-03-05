import UnfinishedTodo from "./UnfinishedTodo";

function UnfinishedTodos({ unfinishedTodos }) {
  return unfinishedTodos && unfinishedTodos.length !== 0 ? (
    <section className="mx-auto w-full px-4 py-6 md:w-11/12 lg:w-4/5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Unfinished
        </h2>
        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {unfinishedTodos.length}
        </span>
      </div>
      <div className="space-y-4">
        {unfinishedTodos
          .slice()
          .reverse()
          .map((todo) => (
            <UnfinishedTodo key={todo._id} todo={todo} />
          ))}
      </div>
    </section>
  ) : null;
}

export default UnfinishedTodos;
