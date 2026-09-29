import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Skills from "../Skills/Skills";
import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "skills",
        element: <Skills></Skills>,
      },
      {
        path:"about",
        element:<About></About>
      }
    ],
  },
]);

export default router;
