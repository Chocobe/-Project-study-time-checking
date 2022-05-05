import AuthorLayout from "../layouts/AuthorLayout/AuthorLayout";

/** @returns { import("react-router-dom").RouteObject } */
const createAuthorRoute = ({ path }) => ({
  path,
  element: <AuthorLayout />,
  children: [
    //
  ],
});

export default createAuthorRoute;