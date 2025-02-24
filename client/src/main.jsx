import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import { Toaster } from "react-hot-toast";
import Login from "../pages/Login.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        position: "bottom-right",
        style: { backgroundColor: "#333", color: "white" },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
