import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoot from "./AdminRoot.js";

import Dashboard from "./../pages/backend/Dashboard";
import AdminLogin from "../pages/backend/auth/AdminLogin.js";
//category
import CategoryType from "../pages/backend/category-types/index.js"
import CategoryTypeList from "../pages/backend/category-types/CategoryTypeList.js";
import CategoryTyepCreate from "../pages/backend/category-types/CategoryTyepCreate.js";

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
      // {
      //   path: "category-type-list",
      //   element: <CategoryTypeList />,
      // },
      {
        path: "category-type",
        element: <CategoryType />,
        children: [
          {
            index: true,
            element: <Navigate to="list" replace />,
          },
          {
            path: "list",
            element: <CategoryTypeList />,
          },
          {
            path: "create",
            element: <CategoryTyepCreate />,
          },
        ]
      },
    ],
  },
]);

export default router;
