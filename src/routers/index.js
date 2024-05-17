import { createBrowserRouter } from "react-router-dom";
import AdminRoot from "./AdminRoot.js";

import Dashboard from "./../pages/backend/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

export default router;
