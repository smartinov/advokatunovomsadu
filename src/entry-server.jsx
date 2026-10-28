import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { notFound, routes } from "./routes";
import { renderHead, renderLlms, renderSitemap } from "./head";

export { notFound, routes, renderHead, renderLlms, renderSitemap };

export const render = (route) =>
  renderToString(
    <React.StrictMode>
      <App route={route} />
    </React.StrictMode>
  );
