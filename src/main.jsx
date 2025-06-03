import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import SetProducts from "./pages/SetProducts.jsx";
import PurchaseTable from "./pages/PurchaseTable.jsx";

const routes = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/setproduct",
    element: <SetProducts />,
  },
  {
    path: "/purchasetable",
    element: <PurchaseTable />,
  },
  {
    path: "/billing",
    element: <>No Billing Info Yet</>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={routes} />
  </StrictMode>
);
