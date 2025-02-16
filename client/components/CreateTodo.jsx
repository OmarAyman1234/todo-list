function CreateTodo() {
  return (
    <section className="mx-auto w-4/5">
      <div className="flex w-full rounded-md border-2 border-black">
        <input
          placeholder="New todolist"
          className="flex-1 rounded-md pl-2 focus:outline-none"
        />
        <button className="mr-1 cursor-pointer rounded-md border-2 border-white bg-blue-500 px-2 py-1 text-white duration-150 hover:bg-blue-600 focus:outline-none">
          Create
        </button>
      </div>
    </section>
  );
}
export default CreateTodo;
