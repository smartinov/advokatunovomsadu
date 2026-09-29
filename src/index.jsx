import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { findRoute } from "./routes";

const path = "/" + location.pathname.slice(import.meta.env.BASE_URL.length);
const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App route={findRoute(path)} />
  </React.StrictMode>
);

// Built pages ship prerendered markup; the dev server serves an empty root.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
