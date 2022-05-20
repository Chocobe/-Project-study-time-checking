import React from "react";

import {
  useRoutes,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import Home from "@/views/Home";
import Study from "@/views/Study";

/** @type { import("react-router-dom").RouteObject[] } */
const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "study",
        element: <Study />,
      },
    ],
  },
  {
    path: "/oauth",
    element: <MainLayout />,
    children: [
      {
        path: "redirect",
        element: <Study />,
      },
    ],
  },
];

const MainRouter = () => useRoutes(routes);
export default MainRouter;