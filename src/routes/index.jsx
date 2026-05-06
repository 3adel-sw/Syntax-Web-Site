import { createBrowserRouter } from "react-router-dom";
// Change this:
import LayoutSyntax from "@/components/layout/LayoutSyntax";
// To this:
// Home Page
import Home from "@/Pages/Home";
// FeedBacks Page
import FeedBacks from "@/Pages/FeedBacks/FeedBacks";
// Blogs Page
import Blogs from "@/Pages/Blogs/Blogs";
// B2B Collaboration Page
import B2BCollaboration from "@/Pages/B2B/B2BCollaboration";
// Blogs Details Page
import BlogsDetails from "@/Pages/Blogs/BlogsDetails";
// Contact Page
import Contact from "@/Pages/Contact/Contact";
// Detail Courses Page
import DetailCourses from "@/Pages/DetailCourses/DetailCourses";
// Courses Page
import Courses from "@/Pages/Courses/Courses";
// Events Page
import Events from "@/Pages/Events/Events";
// Events Details Page
import EventsDetails from "@/Pages/Events/EventsDetails";
// About Us Page
import AboutUs from "@/Pages/AboutUs/AboutUs";
// Not Found Page
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
      {
        path: "/b2b",
        element: <B2BCollaboration />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
     
    ],
  },
  { path: "*", element: <NotFound /> },
]);