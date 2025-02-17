import { format } from "date-fns";

function FinishedTodo(props) {
  return (
    <>
      <div className="my-2 flex w-full rounded-md border-2 border-black">
        <div className="flex flex-col justify-center">
          <p className="my-2 pl-2 font-semibold">{props.name}</p>
          <p className="my-2 pl-2 text-sm">
            {format(props.completedAt, "E, LLL d, y hh:mm:ss a")}
          </p>
        </div>

        <div className="ml-auto flex flex-col justify-center pr-1">
          <button className="mb-1 cursor-pointer rounded-md bg-gray-700 px-3 py-1 text-sm text-white opacity-70 duration-150 hover:bg-gray-800 focus:outline-none">
            Redo
          </button>
          <button className="cursor-pointer rounded-md bg-red-700 px-6 py-1 text-sm text-white opacity-70 duration-150 hover:bg-red-800 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishedTodo;
