import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//prime react
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

//react router
import { RouterProvider } from "react-router-dom";
import router from "./routers";

//import global css
import "./assets/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
