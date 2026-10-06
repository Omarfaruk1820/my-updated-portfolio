import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Skills from "../Skills/Skills";
import About from "../Pages/About";
import Projects from "../Projects/Projects";
import ProjectDetails from "../Projects/ProjectDetails";
import Services from "../Services/Services";
import Contact from "../Contact/Contact";
import SkillsDetails from "../Skills/SkillsDetails";

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
        element: <Skills />,
      },
      {
        path: "skills/:id",
        element: <SkillsDetails />,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },

      {
        path: "Services",
        element: <Services></Services>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
    ],
  },
]);

export default router;
