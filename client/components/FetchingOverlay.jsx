import useFetching from "../hooks/useFetching";
import { Loader2 } from "lucide-react";

function FetchingOverlay() {
  const { isFetching } = useFetching();

  if (!isFetching) return null;

  return (
    <div className="bg-opacity-70 fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 backdrop-blur-sm">
      <h1 className="mb-4 text-5xl font-extrabold text-white">
        <span className="text-blue-400">To</span>
        <span className="text-purple-400">Do</span>
        <span className="text-blue-400"> List</span>
      </h1>

      <div className="mb-6 flex items-center justify-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>

      <div className="w-64 overflow-hidden rounded-full bg-gray-700">
        <div className="h-2 animate-pulse bg-gradient-to-r from-blue-400 to-purple-500"></div>
      </div>
    </div>
  );
}

export default FetchingOverlay;
