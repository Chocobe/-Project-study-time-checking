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
        // FIXME: 테스트 후, 주석 사용하기
        path: "",
        // path: "/study",
        element: <Home />
      },
      {
        // FIXME: 테스트 후, 주석 사용하기
        path: "study",
        // path: "",
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