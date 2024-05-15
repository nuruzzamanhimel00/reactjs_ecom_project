import { createBrowserRouter } from "react-router-dom";
import AdminRoot from "./AdminRoot.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
  },
]);

export default router;
