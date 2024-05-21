import {
  React,
  ReactDOM,
  reportWebVitals,
  RouterProvider,
  router,
  store,
  Provider,
} from "./helpers/global-files.js";
import "./index.css";
import "./helpers/gloabl-css.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
