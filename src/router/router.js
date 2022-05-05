import React, {
  //
} from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import createMainRoute from "./mainRoute";
import createAuthorRoute from "./authorRoute";

/** @type { import("react-router-dom").RouteObject[] } */
const routes = [
  createAuthorRoute({ path: "/author" }),
  createMainRoute({ path: "/" }),
];

const Router = () => {
  return (
    <Routes>
      {routes.map(({ path, element, children }, idx) => {
        return (
          <Route 
            path={path} 
            element={element} 
            children={children}
            key={idx} 
          />
        )
      })}
    </Routes>
  );
};

export default Router;