import { createBrowserRouter } from "react-router-dom";
// Change this:
import LayoutSyntax from "@/components/layout/LayoutSyntax";
// To this:
import Home from "@/Pages/Home";
import FeedBacks from "@/Pages/FeedBacks/FeedBacks";
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
        path: "/blogs-detail/:id",
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
        path: "/courses-detail/:id",
        element: <DetailCourses />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events-detail/:id",
        element: <EventsDetails />,
      },
      {
        path: "/feedbacks",
        element: <FeedBacks />,
      },
     
    ],
  },
  { path: "*", element: <NotFound /> },
]);