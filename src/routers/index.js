import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoot from "./AdminRoot.js";

import Dashboard from "./../pages/backend/Dashboard";
import AdminLogin from "../pages/backend/auth/AdminLogin.js";
//category
import CategoryTypeList from "../pages/backend/category-types/CategoryTypeList.js";

import { loader as admiRootLoader } from "./AdminRoot.js";
import { loader as adminLoginLoader } from "../pages/backend/auth/AdminLogin.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
    loader: adminLoginLoader,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    loader: admiRootLoader,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
        // element: <Dashboard />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "category-type-list",
        element: <CategoryTypeList />,
      },
    ],
  },
]);

export default router;
