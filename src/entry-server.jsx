import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export const render = (page) =>
  renderToString(
    <React.StrictMode>
      <App page={page} />
    </React.StrictMode>
  );
