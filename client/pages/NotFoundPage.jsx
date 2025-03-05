import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 px-4 text-gray-100">
      <div className="max-w-md text-center">
        <div className="mb-4 text-9xl font-bold">404</div>
        <h1 className="mb-6 text-3xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-gray-300">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>
        <Link
          className="inline-block rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg"
          to="/"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
