function UnfinishedTodo() {
  return (
    <>
      <div class="flex w-full rounded-md border-2 my-2 border-black">
        <div class="flex flex-col justify-center">
          <p class="my-2 pl-2 font-semibold">Make backend todolist</p>
          <p class="my-2 pl-2 text-sm">Mon Feb 10 2025 15:11:05 GMT+2:00</p>
        </div>

        <div class="ml-auto flex flex-col justify-center pr-1">
          <button class="mb-1 cursor-pointer mt-1 rounded-md bg-gray-700 px-2 py-1 text-sm text-white duration-150 hover:bg-gray-800 focus:outline-none">
            Edit
          </button>
          <button class="mb-1 cursor-pointer rounded-md bg-green-600 px-2 py-1 text-sm text-white duration-150 hover:bg-green-700 focus:outline-none">
            Completed
          </button>
          <button class="mb-1 cursor-pointer rounded-md bg-red-600 px-2 py-1 text-sm text-white duration-150 hover:bg-red-700 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default UnfinishedTodo;
