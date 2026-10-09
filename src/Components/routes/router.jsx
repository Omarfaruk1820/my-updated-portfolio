import { createBrowserRouter, Navigate } from "react-router-dom";

// Public Layout
import MainLayout from "../Layout/MainLayout";

// Public Pages
import Home from "../Pages/Home";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";

import Skills from "../Skills/Skills";
import SkillsDetails from "../Skills/SkillsDetails";

import Projects from "../Projects/Projects";
import ProjectDetails from "../Projects/ProjectDetails";

import Services from "../Services/Services";
import ServiceDetails from "../Services/ServiceDetails";

import Contact from "../Contact/Contact";

// Authentication
import Login from "../Auth/AdminLogin";

// Admin Protection and Layout
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "../Admin/AdminLayout";

// Admin Pages
import AdminDashboard from "../Admin/AdminDashboard";
import AdminProjects from "../Admin/AdminProjects";
import AdminServices from "../Admin/AdminServices";
import AdminSkills from "../Admin/AdminSkills";
import AdminContacts from "../Admin/AdminContacts";
import AdminExperience from "../Admin/AdminExperience";
import AdminEducation from "../Admin/AdminEducation";

const router = createBrowserRouter([
  // ========================================
  // Public Routes
  // ========================================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
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
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        // Keep the old login URL working.
        path: "login",
        element: <Navigate to="/admin/login" replace />,
      },
    ],
  },

  // ========================================
  // Admin Login (Public Route)
  // ========================================
  {
    path: "/admin/login",
    element: <Login />,
    errorElement: <NotFound />,
  },

  // ========================================
  // Protected Admin Routes
  // ========================================
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "projects",
            element: <AdminProjects />,
          },
          {
            path: "services",
            element: <AdminServices />,
          },
          {
            path: "skills",
            element: <AdminSkills />,
          },
          {
            path: "contacts",
            element: <AdminContacts />,
          },
          {
            path: "experience",
            element: <AdminExperience />,
          },
          {
            path: "education",
            element: <AdminEducation />,
          },
        ],
      },
    ],
  },

  // ========================================
  // Catch-All Route
  // ========================================
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
