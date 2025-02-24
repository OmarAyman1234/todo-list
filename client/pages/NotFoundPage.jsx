import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-5 text-4xl font-bold">❌ Page not found.</h1>
      <Link
        className="rounded-md border-2 border-black p-1 hover:bg-gray-200"
        to="/"
      >
        Return to home page
      </Link>
    </div>
  );
}

export default NotFoundPage;
