import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "../reportWebVitals.js";

//react router
import { RouterProvider } from "react-router-dom";
import router from "../routers/index.js";

//redux toolkit
import { store } from "../store/index.js";
import { Provider } from "react-redux";

//nprogress
import NProgress from "nprogress";

//toast
import { Toast } from "primereact/toast";
export {
  React,
  reportWebVitals,
  ReactDOM,
  RouterProvider,
  router,
  store,
  Provider,
  NProgress,
  Toast,
};

//react router
// export { default as RouterProvider } from "react-router-dom";
// export {default as router} from "./routers";
