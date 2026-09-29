import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App page={document.body.dataset.page} />
  </React.StrictMode>
);

// Built pages ship prerendered markup; the dev server serves an empty root.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
