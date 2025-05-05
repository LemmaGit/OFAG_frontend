import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../components/pages/LoginForm";
// import { Suspense } from "react";
// import Spinner from "../hooks/Spinner";
import NotFound from "../components/pages/404NotFound";
import ErrorPage from "../components/pages/ErrorPage";

import LibrarianLayout from "../components/pages/librarianPages/LibrarianLayout";
import ManagerLayout from "../components/pages/managerPages/ManagerLayout";
import PatronLayout from "../components/pages/patronPages/PatronLayout";

// Import all page components
import { librarianRouteChildren as LibrarianPages } from "./Children";
import { managerRouteChildren as ManagerPages } from "./Children";
import { patronRouteChildren as PatronPages } from "./Children";

export const createRoleBasedRouter = (userRole) => {
  if (!userRole) {
    return createBrowserRouter([
      {
        path: "*",
        element: <LoginForm />,
      },
    ]);
  }

  const commonRoutes = [
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  let roleRoutes = [];

  switch (userRole) {
    case "librarian":
      roleRoutes = [
        {
          path: "/",
          element: <LibrarianLayout />,
          errorElement: <ErrorPage />,
          children: LibrarianPages,
        },
      ];
      break;

    case "manager":
      roleRoutes = [
        {
          path: "/",
          element: <ManagerLayout />,
          errorElement: <ErrorPage />,
          children: ManagerPages,
        },
      ];
      break;

    case "patron":
      roleRoutes = [
        {
          path: "/",
          element: <PatronLayout />,
          errorElement: <ErrorPage />,
          children: PatronPages,
        },
      ];
      break;

    default:
      return createBrowserRouter([
        {
          path: "*",
          element: <LoginForm />,
        },
      ]);
  }

  return createBrowserRouter([...roleRoutes, ...commonRoutes]);
};
