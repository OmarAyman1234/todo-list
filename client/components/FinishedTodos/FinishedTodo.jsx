function FinishedTodo(props) {
  return (
    <>
      <div class="my-2 flex w-full rounded-md border-2 border-black">
        <div class="flex flex-col justify-center">
          <p class="my-2 pl-2 font-semibold">{props.name}</p>
          <p class="my-2 pl-2 text-sm">{props.finishDate}</p>
        </div>

        <div class="ml-auto flex flex-col justify-center pr-1">
          <button class="mb-1 cursor-pointer rounded-md bg-gray-700 px-3 py-1 text-sm text-white opacity-70 duration-150 hover:bg-gray-800 focus:outline-none">
            Redo
          </button>
          <button class="cursor-pointer rounded-md bg-red-700 px-6 py-1 text-sm text-white opacity-70 duration-150 hover:bg-red-800 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishedTodo;
