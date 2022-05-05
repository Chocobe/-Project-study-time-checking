import MainLayout from "../layouts/MainLayout/MainLayout";

/** @returns { import("react-router-dom").RouteObject } */
const createMainRoute = ({ path }) => ({
  path,
  element: <MainLayout />,
  children: [
    //
  ]
});

export default createMainRoute;