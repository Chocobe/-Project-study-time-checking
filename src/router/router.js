import React from "react";

import {
  useRoutes,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import LoginRedirect from "@/views/LoginRedirect/LoginRedirect";
import Home from "@/views/Home/Home";
import Study from "@/views/Study/Study";

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
    path: "/oauth/redirect",
    element: <LoginRedirect />,
  },
];

const MainRouter = () => useRoutes(routes);
export default MainRouter;