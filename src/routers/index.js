import { createBrowserRouter } from "react-router-dom";
import AdminRoot from "./AdminRoot.js";

import Dashboard from "./../pages/backend/Dashboard";
import AdminLogin from "../pages/backend/auth/AdminLogin.js";

import { loader as admiRootLoader } from "./AdminRoot.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    loader: admiRootLoader,
    children: [
      {
        index: true,
        // path: "dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "login",
      //   element: <AdminLogin />,
      // },
    ],
  },
]);

export default router;
