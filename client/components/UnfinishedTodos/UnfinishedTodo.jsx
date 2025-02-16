function UnfinishedTodo(props) {
  return (
    <>
      <div className="my-2 flex w-full rounded-md border-2 border-black">
        <div className="flex flex-col justify-center">
          <p className="my-2 pl-2 font-semibold">{props.name}</p>
          <p className="my-2 pl-2 text-sm">{props.creationDate}</p>
        </div>

        <div className="ml-auto flex flex-col justify-center pr-1">
          <button className="mt-1 mb-1 cursor-pointer rounded-md bg-gray-700 px-2 py-1 text-sm text-white duration-150 hover:bg-gray-800 focus:outline-none">
            Edit
          </button>
          <button className="mb-1 cursor-pointer rounded-md bg-green-600 px-2 py-1 text-sm text-white duration-150 hover:bg-green-700 focus:outline-none">
            Completed
          </button>
          <button className="mb-1 cursor-pointer rounded-md bg-red-600 px-2 py-1 text-sm text-white duration-150 hover:bg-red-700 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default UnfinishedTodo;
