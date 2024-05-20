import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoot from "./AdminRoot.js";

import Dashboard from "./../pages/backend/Dashboard";
import Test from "./../pages/backend/Test";
import HelloWorld from "./../pages/backend/HelloWorld.js";
import AdminLogin from "../pages/backend/auth/AdminLogin.js";

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
        path: "test",
        element: <Test />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "hello-world",
        element: <HelloWorld />,
      },
    ],
  },
]);

export default router;
