import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import { Toaster } from "react-hot-toast";
import Login from "../pages/Login.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { FetchingProvider } from "../context/FetchingContext.jsx";
import FetchingOverlay from "../components/FetchingOverlay.jsx";
import { UrlsProvider } from "../context/UrlsContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <>
    <Toaster
      toastOptions={{
        position: "bottom-right",
        style: { backgroundColor: "#333", color: "white" },
      }}
    />
    <UrlsProvider>
      <AuthProvider>
        <FetchingProvider>
          <FetchingOverlay />
          <RouterProvider router={router} />
        </FetchingProvider>
      </AuthProvider>
    </UrlsProvider>
  </>,
);
