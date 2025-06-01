import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const routes = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/add-product",
    element: <>Another page perharps?</>,
  },
  {
    path: "/add-category",
    element: <>Display all categories</>,
  },
 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
