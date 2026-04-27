import { createBrowserRouter } from "react-router-dom";
// Change this:
import LayoutSyntax from "@/components/layout/LayoutSyntax";
// To this:
import Home from "@/Pages/Home";
import Blogs from "@/Pages/Blogs/Blogs";
import BlogsDetails from "@/Pages/Blogs/BlogsDetails";
import Contact from "@/Pages/Contact/Contact";
import DetailCourses from "@/Pages/DetailCourses/DetailCourses";
import Courses from "@/Pages/Courses/Courses";
import Events from "@/Pages/Events/Events";
import EventsDetails from "@/Pages/Events/EventsDetails";
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
        path: "/blogs/:id",
        element: <BlogsDetails />,
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
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/details",
        element: <EventsDetails />,
      },
     
    ],
  },
  { path: "*", element: <NotFound /> },
]);