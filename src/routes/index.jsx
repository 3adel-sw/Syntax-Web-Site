import { createBrowserRouter } from "react-router-dom";
// Change this:
import LayoutSyntax from "@/components/layout/LayoutSyntax";
// To this:
import Home from "@/Pages/Home";
import Blogs from "@/Pages/Blogs/Blogs";
import Contact from "@/Pages/Contact/Contact";
import DetailCourses from "@/Pages/DetailCourses/DetailCourses";
import Courses from "@/Pages/Courses/Courses";
import NotFound from "@/Pages/NotFound";
// file Home



export const router = createBrowserRouter([
  // {
  //   element: <Home />,
  //   children: [
  //     {

  //       path: "/Home",
  //       element: <Home />,
  //     }
  //   ],
  // },
  {
    element: <LayoutSyntax />, // layout component
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <DetailCourses />,
      },
     
    ],
  },
  { path: "*", element: <NotFound /> },
]);